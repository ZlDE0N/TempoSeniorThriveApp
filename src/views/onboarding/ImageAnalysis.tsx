import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useParams, useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import useBlobStore from '../../store/onboarding_store/guestStore';
import { createClient } from '@supabase/supabase-js';

const statusTexts = [
  "Uploading image to our servers",
  "Verifying image",
  "Performing safety scan",
  "Results are ready!"
];

const ProgressStep = ({ stageIndex }: { stageIndex: number }) => (
  <div className="relative w-full h-12 text-xl flex items-center text-center justify-center overflow-hidden">
    {statusTexts.map((text, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: index === stageIndex ? 1 : 0, y: index === stageIndex ? 0 : -10 }}
        transition={{ duration: 0.5 }}
        className={`absolute w-full flex justify-center items-center space-x-2 ${index === stageIndex ? 'text-black' : 'text-gray-400'}`}
      >
        {stageIndex !== 3 &&
          <FontAwesomeIcon
            icon={index === stageIndex ? faSpinner : faCheck}
            className={index === stageIndex ? "animate-spin text-blue-500" : "text-green-500"}
          />
          ||
          <FontAwesomeIcon
            icon={faCheck}
            className={"text-green-500"}
          />
        }
        <span className="text-center">{text}</span>
      </motion.div>
    ))}
  </div>
);

// Supabase setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ImageAnalysis() {
  const isUploading = useRef(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [ imageUrl, setImageUrl ] = useState("");
  const [ supabaseImagePath, setSupabaseImagePath ] = useState("");
  const [ supabaseImageUrl, setSupabaseImageUrl ] = useState("");
  const { blob, clearBlob } = useBlobStore();
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const userName = localStorage.getItem("st_onboarding_name") || "guest";
  const fileName = `guests/guest_${roomId}_${Date.now()}.jpeg`;
  const [ assessmentStage, setAssessmentStage] = useState("Uploading")
  const [ stageIndex, setStageIndex] = useState(0)

  // Construct a questionnaire json with all the obtained answers
  const keysToCheck = [
    "age",
    "livingSituation",
    "health",
    "morningEnergy",
    "meals",
    "everydayTasks",
    "sleepHours",
    "homeMovement",
    "mobilityAids",
    "vision",
    "balanceHistory",
    "supportAccess",
    "connections",
  ];
  
  const questions = [
    "What is your age range?",
    "What is your curent lliving situation?",
    "How would you rate your general health?",
    "How would you describe your energy levels when you wake up in the morning?",
    "When it comes to meals, how comfortable are you with preparing or managing them?",
    "How would you describe your ability to handle everyday tasks around your home, like chores or personal care?",
    "How many hours of sleep do you typically get each night?",
    "How confident do you feel moving around your home?",
    "Do you regularly use any mobility devices?",
    "How would you rate your vision?",
    "In the past three months, how often have you experienced a slip, stumble, or fall?",
    "If you needed help with something, you would:",
    "How often do you feel connected to friends, family, or your community?",
  ];
  
  const questionnaire = keysToCheck.reduce((result, key, index) => {
  const answer = localStorage.getItem(`st_onboarding_${key}`) || "Not answered";
  result[key] = {
    question: questions[index],
    answer
  };
  return result;
  }, {} as Record<string, { question: string; answer: string }>);

  const questionnaireString = JSON.stringify(questionnaire, null, 2);

  async function uploadImage(blob) {
    try {
      const { data, error } = await supabase.storage
      .from('room-assessment-images')
      .upload(fileName, blob, {
        cacheControl: '3600',
        upsert: false,  // Set to true to overwrite file if exists
        contentType: 'image/jpeg',
      });

      if (error) {
        throw error;
      }

      return data.path;
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  }

  // Verifies that the image is suited for the safety scan
  async function verifyImage(imagePath: string, roomId: string) {
    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/room-image-validation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({ 
            imagePath: imagePath,
            roomId: roomId,
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error analyzing image:", error);
      return { message: "Failed to analyze image." };
    }
  }

  // Perform safety scan
  async function safetyScanImage(imagePath: string, roomId: string, questionnaireAnswers: string) {
    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/room-safety-scan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({ 
            imagePath: imagePath,
            roomId: roomId,
            questionnaireAnswers: questionnaireAnswers,
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error analyzing image:", error);
      return { message: "Failed to analyze image." };
    }
  }

  // Redirect if no room or image is selected
  useEffect(() => {
    if (!roomId) {
      navigate("/onboarding/room-selection");
    }
  }, [roomId]);

  useEffect(() => {
    const uploadAndAnalyze = async () => {
      if (!blob) navigate("/onboarding/room-selection"); 
      if (isUploading.current) return;

      isUploading.current = true;
      // Create the object URL for the image preview
      setImageUrl(URL.createObjectURL(blob));

      let image_path: string | undefined;
      let verificationResult: string | undefined;
      let safetyScanResult: string | undefined;

      // Upload the image to Supabase
      try {
        image_path = await uploadImage(blob);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      
      setAssessmentStage("Veryifying");
      setStageIndex(1);

      // Verify the image
      try {
        const result = await verifyImage(image_path, roomId);
        try {
          verificationResult = JSON.parse(result.candidates[0]?.content?.parts[0]?.text);
        } catch (error) {
          verificationResult = "Failed to parse verification result.";
        }
      } catch (error) {
        console.error("Error verifying image:", error);
      }

      setAssessmentStage("Scanning");
      setStageIndex(2);
      // Perform safety scan
      try {
        const result = await safetyScanImage(image_path, roomId, questionnaireString);
        try {
          safetyScanResult = result.candidates[0]?.content?.parts[0]?.text;
          setAnalysisResult(safetyScanResult);
        } catch (error) {
          safetyScanResult= "Failed to parse verification result.";
          setAnalysisResult(safetyScanResult);
        }
      } catch (error) {
        console.error("Error performing safety scan on image:", error);
      }

      setAssessmentStage("Results");
      setStageIndex(3);
      
    }
    // Call the async function
    uploadAndAnalyze();
  }, [blob]);

  return (
    <OnboardingLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-2xl font-bold">Image Analysis</h1>
        <div className="w-full rounded-lg flex items-center justify-center py-8">
          <img 
            className="w-full rounded-lg shadow-xl"
          src={imageUrl} 
          />
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-4 mb-4">
          <motion.div className={`transition ${stageIndex === 3? `bg-green-400` : `bg-blue-400`} h-4 rounded-full`}
            initial={{ width: `${stageIndex * 25}%` }}
            animate={{ width: `${stageIndex * 25 + 25}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        {/* Progress Labels */}
        <ProgressStep stageIndex={stageIndex} />

      </div>
    </OnboardingLayout>
  );
}
