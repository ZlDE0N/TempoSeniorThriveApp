import { Button } from "@/views/dashboard/ui/button";
import { cn } from "@/lib/utils";
import { Link, useParams, useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner, faCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import useGuestStore from '../../store/onboarding_store/guestStore';
import { createClient } from '@supabase/supabase-js';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const statusTexts = [
  "Your photo is on its way to ThriveVision for a quick safety scan!",
  "Just making sure everything’s clear. ThriveVision is prepping your photo for a closer look",
  "Scanning your space now, looking for ways to help you thrive safely at home",
  "Results are ready!"
];

const ProgressStep = ({ stageIndex, analysisError }: { stageIndex: number; analysisError: string }) => (
  <div className="relative min-h-14 md:min-h-16 w-full overflow-hidden md:text-xl text-lg">
    {analysisError ? (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute w-full flex flex-row justify-center items-start gap-2 p-2 text-red-500"
      >
        <span className="text-center md:text-left break-words max-w-full">
          <FontAwesomeIcon icon={faTimes} className="mt-1 inline mr-2" />
          {analysisError}
        </span>
      </motion.div>
    ) : (
      statusTexts.map((text, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: index === stageIndex ? 1 : 0, 
            y: index === stageIndex ? 0 : 10,
            height: index === stageIndex ? 'auto' : 0
          }}
          transition={{ duration: 0.5 }}
          className={`absolute w-full flex justify-center items-start gap-2 p-1 ${
            index === stageIndex ? 'text-black' : 'text-gray-400'
          }`}
        >
          <span className="text-center break-words max-w-full">
          {stageIndex !== 3 ? (
            <FontAwesomeIcon
              icon={index === stageIndex ? faSpinner : faCheck}
              className={
                index === stageIndex 
                  ? "animate-spin text-blue-500 flex-shrink-0 mr-2 inline mt-1" 
                  : "text-green-500 flex-shrink-0 mt-1 mr-2"
              }
            />
          ) : (
            <FontAwesomeIcon
              icon={faCheck}
              className="text-green-500 inline flex-shrink-0 mt-1 mr-2"
            />
          )}
          {text}
          </span>
        </motion.div>
      ))
    )}
  </div>
);

// Supabase setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ImageAnalysis() {
  const isUploading = useRef(false);
  const [ isExiting, setIsExiting ] = useState(false);
  const [ imageUrl, setImageUrl ] = useState("");
  const [ supabaseImagePath, setSupabaseImagePath ] = useState("");
  const [ supabaseImageUrl, setSupabaseImageUrl ] = useState("");
  const [ analysisError, setAnalysisError ] = useState("");
  const { roomImages, setRoomImage, analysisResults, setAnalysisResult } = useGuestStore();
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const userName = localStorage.getItem("st_onboarding_name") || "guest";
  const fileName = `guests/guest_${roomId}_${Date.now()}.jpeg`;
  const [ assessmentStage, setAssessmentStage] = useState("Uploading")
  const [ stageIndex, setStageIndex] = useState(0)
  const { executeRecaptcha } = useGoogleReCaptcha();


  // Construct a questionnaire json with all the obtained answers
  const keysToCheck = [
    "name",
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
    "What is your first name?",
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

  // Validate reCaptcha
  async function validateCaptcha(reason: string) {
  console.log("executeRecaptcha:", executeRecaptcha);
    const recaptchaToken = await executeRecaptcha(reason);
    const response = await fetch(`${supabaseUrl}/functions/v1/captcha-validation`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ token: recaptchaToken })
    });

    const data = await response.json();
    if (!data.success) {
      console.error(data);
      throw new Error("reCaptcha validation failed");
    }
    return;
  }

  // Upload the image to supabase
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
      throw error; 
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
    if (!roomImages[roomId]) {
      navigate("/onboarding/room-selection");
      return;
    }
    if (analysisResults[roomId]) {
      setAnalysisResult(roomId, null)
      navigate("/onboarding/room-selection"); 
      return;
    }
    if (!executeRecaptcha) return;
    if (isUploading.current) return;
    isUploading.current = true;
    // Create the object URL for the image preview
    setImageUrl(URL.createObjectURL(roomImages[roomId]));


    const uploadAndAnalyze = async () => {
      try {
        await validateCaptcha("room_assessment");
      } catch (error) {
        console.error(error);
        setAnalysisError("Error: " + error.message);
        return;
      }

      let image_path: string | undefined;
      let verificationResult: string | undefined;
      let safetyScanResult: string | undefined;

      // Upload the image to Supabase
      try {
        image_path = await uploadImage(roomImages[roomId]);
      } catch (error) {
        setAnalysisError("Error uploading image: " + error.message);
        return;
      }
      
      setAssessmentStage("Verifying");
      setStageIndex(1);

      // Verify the image
      try {
        const result = await verifyImage(image_path, roomId);
        try {
          console.log(result.candidates[0]?.content?.parts[0]?.text.replaceAll("json", "").replaceAll("```",""));
          verificationResult = JSON.parse(result.candidates[0]?.content?.parts[0]?.text.replaceAll("json", "").replaceAll("```",""));
          if (verificationResult.check_status !== "passed")
          {
            setAnalysisError(`Image not accepted. Reason: ${verificationResult.reason}`);
            return;
          }
        } catch (error) {
          console.error(error);
          setAnalysisError("Error verifying image: " + error.message);
          return;
        }
      } catch (error) {
        setAnalysisError("Error verifying image: " + error.message);
        return;
      }

      setAssessmentStage("Scanning");
      setStageIndex(2);
      // Perform safety scan
      try {
        const result = await safetyScanImage(image_path, roomId, questionnaireString);
        try {
          console.log(result);
          safetyScanResult = JSON.parse(result.candidates[0]?.content?.parts[0]?.text.replaceAll("json", "").replaceAll("```",""));
          console.log(safetyScanResult);
          setAnalysisResult(roomId, safetyScanResult);
        } catch (error) {
          setAnalysisError("Error performing safety scan: AI output is not formatted correctly");
          return;
        }
      } catch (error) {
        setAnalysisError("Error performing safety scan: " + error.message);
        return;
      }

      setAssessmentStage("Results");
      setStageIndex(3);
      
    }
    // Call the async function
    uploadAndAnalyze();
  }, [roomImages, executeRecaptcha]);

  useEffect(() => {
    if (stageIndex !== 3) return;
    setTimeout(() => {
      setIsExiting(true)
    }, 500) 
    setTimeout(() => {
      setIsExiting(true)
      navigate(`/onboarding/analysis-results/${roomId}`);
    }, 1250) 
  }, [stageIndex])

  return (
    <OnboardingLayout showLoginLink={false}>
      <motion.div
        initial={{opacity: 1, y: 0}}
        animate={{opacity: isExiting? 0 : 1, y: isExiting? -10 : 0}}
        transition={{ duration:0.5, ease: "easeOut" }}
      >
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-2xl font-bold">Image Analysis</h1>
        <div className="w-full rounded-lg flex items-center justify-center py-8">
            <img 
              className="max-w-full max-h-96 rounded-lg shadow-xl"
            src={imageUrl} 
            />
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-4 mb-4">
          <motion.div
            className={`transition ${analysisError !== "" ? "bg-red-400" : stageIndex === 3 ? "bg-green-400" : "bg-st_light_blue"} h-4 rounded-full`}
            initial={{ width: `${stageIndex * 25}%` }}
            animate={{ width: `${stageIndex * 25 + 25}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        {/* Progress Labels */}
        <ProgressStep analysisError={analysisError} stageIndex={stageIndex} />

        {/* Back button */}
        {analysisError !== "" &&
          <Button 
            onClick={() => {setRoomImage(roomId, null)}}
            size="lg" 
            className="mt-6 text-white shadow-md hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue text-lg px-8 py-6 h-auto" 
            asChild>
            <Link to={`/onboarding/room-assessment/${roomId}`}>
              <FontAwesomeIcon icon={faArrowLeft} className="pr-2 md:text-xl text-lg" />
              Try a different image
            </Link>
          </Button>
        }
        {stageIndex === 3 && analysisResults[roomId] && false && (
          <pre className="w-full text-justify">
            {JSON.stringify(analysisResult[roomId], null, 2)}
          </pre>
        )}
      </div>
      </motion.div>
    </OnboardingLayout>
  );
}
