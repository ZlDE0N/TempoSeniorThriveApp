import { Button } from "@/views/dashboard/ui/button";
import { cn } from "@/lib/utils";
import { Link, useParams, useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner, faCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

const ImageWithBoundingBoxes = ({ imageUrl, feedbackData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Load the image
    img.src = imageUrl;
    img.onload = () => {
      // Set canvas dimensions based on the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Draw bounding boxes for issues, independence barriers, and engagement opportunities
      const drawBoundingBoxes = (items) => {
        try {
          items.forEach((item) => {
            const [x1, y1, x2, y2] = item.area;
            const width = (x2 - x1) * canvas.width;
            const height = (y2 - y1) * canvas.height;
            const x = x1 * canvas.width;
            const y = y1 * canvas.height;

            // Set the color from the item
            const boxColor = item.color + "50" || "#FFFFFF50"; // Use the color from the item, default to white if not provided

            // Fill the bounding box with transparent color
            ctx.fillStyle = boxColor; // The "80" adds transparency (50% opacity)
            ctx.fillRect(x, y, width, height);

            // Draw the border of the bounding box
            ctx.strokeStyle = boxColor;
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);
          });
        } catch (error) {
          return;
        }
      };

      // Draw bounding boxes for all categories
      drawBoundingBoxes(feedbackData.issues);
      drawBoundingBoxes(feedbackData.engagement_opportunities);
    };
  }, [imageUrl, feedbackData]);

  return (
    <canvas ref={canvasRef} className="w-full rounded-lg shadow-xl"></canvas>
  );
};

const ProgressStep = ({ stageIndex, analysisError }: { stageIndex: number; analysisError: string }) => (
  <div className="relative h-12 overflow-hidden text-lg">
    {analysisError ? (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute w-full h-12 flex justify-center items-center space-x-2 text-red-500"
      >
        <FontAwesomeIcon icon={faTimes} className="text-red-500" />
        <span>{analysisError}</span>
      </motion.div>
    ) : (
      statusTexts.map((text, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: index === stageIndex ? 1 : 0, y: index === stageIndex ? 0 : 10 }}
          transition={{ duration: 0.5 }}
          className={`absolute w-full h-8 flex justify-center items-center space-x-2 ${index === stageIndex ? 'text-black' : 'text-gray-400'}`}
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
          <span>{text}</span>
        </motion.div>
      ))
    )}
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
  const [ analysisError, setAnalysisError ] = useState("");
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
        setAnalysisError("Error uploading image");
        return;
      }
      
      setAssessmentStage("Verifying");
      setStageIndex(1);

      // Verify the image
      try {
        const result = await verifyImage(image_path, roomId);
        try {
          verificationResult = JSON.parse(result.candidates[0]?.content?.parts[0]?.text.replaceAll("json", "").replaceAll("```",""));
          console.log(verificationResult);
          if (verificationResult.check_status !== "passed")
          {
            setAnalysisError(`Image did not pass. Reason: ${verificationResult.reason}`);
            return;
          }
        } catch (error) {
          setAnalysisError("Error verifying image");
          return;
        }
      } catch (error) {
        setAnalysisError("Error verifying image");
        return;
      }

      setAssessmentStage("Scanning");
      setStageIndex(2);
      // Perform safety scan
      try {
        const result = await safetyScanImage(image_path, roomId, questionnaireString);
        try {
          safetyScanResult = JSON.parse(result.candidates[0]?.content?.parts[0]?.text.replaceAll("json", "").replaceAll("```",""));
          console.log(safetyScanResult);
          setAnalysisResult(safetyScanResult);
        } catch (error) {
          setAnalysisError("Error performing safety scan");
          return;
        }
      } catch (error) {
        setAnalysisError("Error performing safety scan");
        return;
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
          {stageIndex !== 3 &&
            <img 
              className="w-full rounded-lg shadow-xl"
            src={imageUrl} 
            />
            ||
            <ImageWithBoundingBoxes imageUrl={imageUrl} feedbackData={analysisResult} />
          }
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
            onClick={() => {setBlob(convertedImage)}}
            size="lg" 
            className="mt-6 text-white shadow-md hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue text-lg px-8 py-6 h-auto" 
            asChild>
            <Link to={`/onboarding/room-assessment/${roomId}`}>
              <FontAwesomeIcon icon={faArrowLeft} className="pr-2 text-lg" />
              Try a different image
            </Link>
          </Button>
        }
      </div>
    </OnboardingLayout>
  );
}
