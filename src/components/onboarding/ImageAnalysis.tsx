import { Button } from "@/components/dashboard/ui/button";
import { cn } from "@/lib/utils";
import { Link, useParams, useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

export default function ImageAnalysis() {
  const { roomId } = useParams<{ roomId: string }>();
  const allLocalStorageData = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      allLocalStorageData[key] = localStorage.getItem(key);
    }
  }


  const userName = localStorage.getItem("st_onboarding_name");
  useEffect(() => {
    console.log(allLocalStorageData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  async function analyzeImage(imageData) {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-safety-snapshot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      prompt: "Describe the content of this image",
      image: imageData // Encode your image as a Base64 string or suitable format
    })
  });

  const data = await response.json();
  console.log(data);
}
const [analysisResult, setAnalysisResult] = useState("");

useEffect(() => {
  async function fetchAnalysis() {
    const result = await analyzeImage("https://unsplash.com/photos/woman-reading-a-magazine-aODtyhXEAjg");
    setAnalysisResult(result.body); // Assuming 'body' is part of the returned data
  }
  
  fetchAnalysis();
}, []);
  return (
    <OnboardingLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
              <h1 className="text-2xl font-bold">Image Analysis</h1>
      <p>Room ID: {roomId}</p>
      <p>
        {analysisResult}
      </p>
      </div>
    </OnboardingLayout>
  );
}
