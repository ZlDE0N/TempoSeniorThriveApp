import { Button } from "@/views/dashboard/ui/button";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faExclamationTriangle,
  faWandMagicSparkles,
  faBed,
  faCouch,
  faCamera,
  faUpload,
  faClock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import useBlobStore from '../../store/onboarding_store/guestStore';

export default function RoomAssessment() {

  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<Blob | null>(null);

  const { setBlob } = useBlobStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const convertToJpeg = async (imageUrl: string) => {
    const image = new Image();
    image.src = imageUrl;

    await new Promise((resolve) => {
        image.onload = () => resolve(null);
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const maxWidth = 1290;
    const maxHeight = 720;

    // Calculate new dimensions to maintain aspect ratio
    const aspectRatio = image.width / image.height;
    if (image.width > maxWidth || image.height > maxHeight) {
        if (image.width / maxWidth > image.height / maxHeight) {
            canvas.width = maxWidth;
            canvas.height = maxWidth / aspectRatio;
        } else {
            canvas.height = maxHeight;
            canvas.width = maxHeight * aspectRatio;
        }
    } else {
        canvas.width = image.width;
        canvas.height = image.height;
    }

    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a JPEG Blob
    const jpegBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 0.75); // Adjust quality (0.8 is 80%)
    });

    return jpegBlob;
};

  // Image selecting
  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Clear previous state
    setSelectedImage(null);
    setCapturedImage(null);
    setError(null);

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Invalid file type. Please upload an image (JPG, PNG, etc.).");
      return;
    }

    // Display image preview
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    reader.onerror = () => setError("Failed to read the uploaded image.");
    reader.readAsDataURL(file);
  };

  const handleTakePhoto = async () => {
    setCapturedImage(null);
    setSelectedImage(null);
    setShowCamera(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err.name === "NotAllowedError") {
        setError("Camera access denied. Please enable camera permissions.");
      } else if (err.name === "NotFoundError") {
        setError("No camera found. Please connect a camera and try again.");
      } else if (err.name === "NotReadableError") {
        setError("Camera is already in use by another application.");
      } else {
        setError("An unexpected error occurred while accessing the camera.");
      }

      setShowCamera(false);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL("image/png"); // Get image data URL
        setCapturedImage(imageData);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    setShowCamera(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };


  const getRoomMessage = () => {
    switch (roomId) {
      case "bathroom":
        return "Great pick! The bathroom is key to daily confidence, and small changes here can make a big difference.";
      case "bedroom":
        return "Perfect! Your bedroom should be a haven of comfort, let's make sure it supports your daily rhythm.";
      case "livingroom":
        return "Wonderful choice! The living room is where life happens, let's make sure it works perfectly for you.";
      default:
        return "Excellent choice! Let's look at how this room can better support your daily activities.";
    }
  };

  const getRoomTitle = () => {
    switch (roomId) {
      case "bathroom":
        return "Bathroom Assessment";
      case "bedroom":
        return "Bedroom Assessment";
      case "livingroom":
        return "Living Room Assessment";
      default:
        return "Room Assessment";
    }
  };

  const getRoomIcon = () => {
    switch (roomId) {
      case "bathroom":
        return faBath;
      case "bedroom":
        return faBed;
      case "livingroom":
        return faCouch;
      default:
        return faCouch;
    }
  };

  const getRoomImage = () => {
    switch (roomId) {
      case "bathroom":
        return "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "bedroom":
        return "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80";
      case "livingroom":
        return "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80";
      default:
        return "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80";
    }
  };

  useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  // Redirect if no room is selected
  useEffect(() => {
    if (!roomId) {
      navigate("/onboarding/room-selection");
    }
  }, [roomId, navigate]);

  // Convert images to jpeg
  useEffect(() => {
    if (!capturedImage && !selectedImage) return;

    const convertImage = async () => {
      const imageToConvert = capturedImage || selectedImage;
      if (!imageToConvert) return;
      try {
        const imageConverted = await convertToJpeg(imageToConvert);
        setConvertedImage(imageConverted);
      } catch (error) {
        console.error('Error converting image:', error);
      }
    };

    convertImage();
  }, [selectedImage, capturedImage]);

  return (
    <OnboardingLayout
      showBackButton={true}
      backPath="/onboarding/room-selection"
    >
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div 
          className="bg-white rounded-xl surrounding-shadow p-8"
        >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          { (capturedImage || selectedImage) && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-center mb-6">
                <FontAwesomeIcon
                  icon={getRoomIcon()}
                  className="text-4xl text-st_black"
                />
              </div>
              <h1 className="text-center w-full text-3xl font-bold">
                Is this your {roomId}?
              </h1>
              <div className="flex py-6 justify-center items-center">
                <img
                  src={capturedImage || selectedImage}
                  alt={`${roomId} image`}
                  className="max-w-full w-full rounded-lg"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8"
              >
                <h3 className="font-medium text-slate-800 mb-3">
                  For best results, please make sure that your picture...
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-st_light_blue">•</span>
                    <span>
                    Shows your {roomId} in its entirety
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-st_light_blue">•</span>
                    <span>
                      Is well illuminated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-st_light_blue">•</span>
                    <span>
                      Is not blurry                      
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-st_light_blue">•</span>
                    <span>
                      Doesn't have any people in it
                    </span>
                  </li>
                </ul>
              </motion.div>
              <div className="grid gap-3 grid-rows-1 md:grid-cols-2">
                <button 
                  className="w-full text-lg p-5 shadow-md hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue text-white rounded-md flex items-center justify-center gap-2"
                  onClick={()=>{setSelectedImage(null); setCapturedImage(null);}}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-lg" />
                  No, go back
                </button>
                <div className="w-full flex justify-center">
                  <Button 
                    onClick={() => {setBlob(convertedImage)}}
                    size="lg" className="w-full text-lg px-8 py-6 h-auto" asChild>
                    <Link to={`/onboarding/image-analysis/${roomId}`}>
                      Yes, analyze with AI 
                    <FontAwesomeIcon icon={faWandMagicSparkles} className="pl-2 text-lg" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ) ||
          (
          <div>
          <div className="flex justify-center mb-6">
            <FontAwesomeIcon
              icon={getRoomIcon()}
              className="text-4xl text-st_black"
            />
          </div>

          <h1 className="text-3xl font-bold text-st_black text-center mb-6">
            {getRoomTitle()}
          </h1>

          <div className="rounded-lg overflow-hidden mb-6 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faClock}
                  spin
                  className="text-2xl text-st_light_blue"
                />
              </div>
            )}
            <motion.img
              src={getRoomImage()}
              alt={`${roomId} visualization`}
              className="w-full h-64 object-cover"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onLoad={() => setIsLoading(false)}
            />
          </div>

          <p className="text-xl text-center text-slate-700 mb-8">
            {getRoomMessage()}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8"
          >
            <h3 className="font-medium text-slate-800 mb-3">
              What happens next:
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-st_light_blue">1.</span>
                <span>Take a photo or upload an image of your {roomId}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-st_light_blue">2.</span>
                <span>
                  Our AI will analyze the space for safety and convenience
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-st_light_blue">3.</span>
                <span>
                  You'll receive personalized recommendations for simple
                  improvements
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Error Message Display */}
          {error && (
            <div className="my-4 bg-red-500 text-white p-4 rounded-md flex items-center gap-2">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              {error}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button 
              className="w-full md:w-56 text-lg p-5 shadow-md hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue text-white rounded-md flex items-center justify-center gap-2"
              onClick={handleTakePhoto}
            >
              <FontAwesomeIcon icon={faCamera} className="text-lg" />
              Take Photo
            </button>
            {/* Upload Button */}
            <label
              htmlFor="upload-input"
              className="w-full md:w-56 cursor-pointer"
            >
              <div
                className="w-full text-lg p-5 shadow-md hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue text-white rounded-md flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faUpload} className="text-lg" />
                Upload Image
              </div>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageSelection}
                className="hidden"
              />
            </label>
          </motion.div>
            {/* Camera Preview Modal */}
            {showCamera && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 relative">
                  <video ref={videoRef} className="w-full rounded-lg" />
                  <Button
                    onClick={handleCapture}
                    className="mt-4 bg-green-600 text-xl w-full text-center text-white px-4 py-6 rounded"
                  >
                    <FontAwesomeIcon icon={faCamera} className="pr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>
            )}

            {/* Hidden canvas for capturing */}
            <canvas ref={canvasRef} width="640" height="480" className="hidden" />
          </div>
          )
          }
          <p className="text-center pt-4 w-full text-sm">
            Photos are used only for assessment  
            and are kept private and secure.
          </p>
        </motion.div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
