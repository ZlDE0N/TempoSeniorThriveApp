import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useParams, useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

export default function ImageAnalysis() {
  const imageUrl =  "https://www.marthastewart.com/thmb/lxfu2-95SWCS0jwciHs1mkbsGUM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-living-rooms-wb-1-bc45b0dc70e541f0ba40364ae6bd8421.jpg"
  const { roomId } = useParams<{ roomId: string }>();
  const allLocalStorageData = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      allLocalStorageData[key] = localStorage.getItem(key);
    }
  }

  const userName = localStorage.getItem("st_onboarding_name");

  async function analyzeImage(imageUrl: string, prompt: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-integration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ 
          imageUrl: imageUrl,
          prompt: prompt,
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


  const [analysisResult, setAnalysisResult] = useState("");

  useEffect(() => {
  async function fetchAnalysis() {
    setAnalysisResult("Analyzing...");

    const result = await analyzeImage(
      imageUrl,
      "Analyze the image and give a brief description of what's in it."
    );

    setAnalysisResult(result.candidates[0].content.parts[0].text || "Analysis complete, but no description available.");
  }

  fetchAnalysis();
}, []);


  return (
    <OnboardingLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-2xl font-bold">Image Analysis</h1>
        <div className="w-full flex items-center justify-center p-8">
          <img 
            className="w-full"
          src={imageUrl} 
          />
        </div>
        <p>Room ID: {roomId}</p>
        <p>{analysisResult}</p>
      </div>
    </OnboardingLayout>
  );
}

