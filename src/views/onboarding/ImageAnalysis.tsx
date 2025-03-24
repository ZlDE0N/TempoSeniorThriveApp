import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useParams, useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import useBlobStore from '../../store/onboarding_store/guestStore';
import { createClient } from '@supabase/supabase-js';


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
  const allLocalStorageData = {};
  const userName = localStorage.getItem("st_onboarding_name") || "guest";
  const fileName = `guests/guest_${roomId}_${Date.now()}.jpeg`;


  // Get all the user answers from local storage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      allLocalStorageData[key] = localStorage.getItem(key);
    }
  }

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

      console.log('File uploaded successfully:', data);
      console.log(fileName);
      return data.path;
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  }

  // Verifies that the image is suited for the safety scan
  async function verifyImage(imagePath: string, roomId: string) {
    console.log(imagePath, roomId);
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

  // Redirect if no room or image is selected
  useEffect(() => {
    if (!roomId) {
      navigate("/onboarding/room-selection");
    }
  }, [roomId]);

  useEffect(() => {
    const uploadAndSetPath = async () => {
      if (!blob) navigate("/onboarding/room-selection"); 
      if (isUploading.current) return;

      isUploading.current = true;
      // Create the object URL for the image preview
      setImageUrl(URL.createObjectURL(blob));

      let image_path: string | undefined;
      let result: string | undefined;

      // Upload the image to Supabase
      try {
        image_path = await uploadImage(blob);
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      // Verify the image
      try {
        result = await verifyImage(image_path, roomId);
        setAnalysisResult(result.candidates[0]?.content?.parts[0]?.text || "Analysis complete, but no description available.");
      } catch (error) {
        console.error("Error verifying image:", error);
      }
      
    }
    // Call the async function
    uploadAndSetPath();
  }, [blob]);

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
