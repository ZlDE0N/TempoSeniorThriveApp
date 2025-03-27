import { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button } from "@/views/dashboard/ui/button";
import Gauge from "@/views/dashboard/ui/gauge";
import { motion } from "framer-motion";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import useGuestStore from '../../store/onboarding_store/guestStore';
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faExclamationTriangle,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const calculateThriveScore = (): number => {
  const AnswersAndDeductions = {
    morningEnergy: {
      options: [
        "I feel refreshed and ready to go",
        "It takes me a little while to get going, but then I'm fine",
        "My morning energy depends on how well I slept",
        "Mornings are usually difficult for me",
      ],
      deductions: [1, 3, 5, 7],
    },
    meals: {
      options: [
        "I enjoy preparing varied and complex meals",
        "I am comfortable preparing most meals.",
        "I prepare only very simple meals.",
        "I order meals or eat out regularly.",
        "Meal preparation is difficult for me.",
      ],
      deductions: [3, 5, 6, 9, 12],
    },
    everydayTasks: {
      options: [
        "I manage all tasks independently and comfortably.",
        "I handle most tasks with ease.",
        "I can manage, but sometimes need to pace myself.",
        "I find it difficult to manage many tasks.",
      ],
      deductions: [1, 4, 7, 10],
    },
    sleepHours: {
      options: ["7-9 hours", "6 hours", "5 hours", "4 hours or less"],
      deductions: [1, 3, 5, 7],
    },
    homeMovement: {
      options: [
        "Completely confident and at ease.",
        "Mostly comfortable, I move without much worry.",
        "I move carefully and take my time.",
        "I need to be very careful and feel unsteady.",
      ],
      deductions: [1, 4, 7, 10],
    },
    mobilityAids: {
      options: [
        "No, I don't use any mobility devices.",
        "Yes, I use a cane.",
        "Yes, I use a walker.",
        "Yes, I use a wheelchair.",
        "Other support",
      ],
      deductions: [3, 5, 7, 10],
    },
    vision: {
      options: [
        "Excellent, I have no difficulty seeing",
        "Good, I have minor vision issues that are corrected with glasses or contacts",
        "Fair, I have noticeable vision problems that sometimes affect my daily activities",
        "Poor, my vision significantly impacts my daily life",
      ],
      deductions: [2, 5, 8, 10],
    },
    balanceHistory: {
      options: [
        "I haven't had any slips or falls",
        "I've had one or two close calls, but no falls",
        "I've had a minor slip or stumble",
        "I've had a fall or multiple concerning stumbles",
      ],
      deductions: [1, 3, 5, 7],
    },
    supportAccess: {
      options: [
        "Have several people to call",
        "Know at least one person to ask",
        "Try to manage on my own",
        "Not be sure who to ask",
      ],
      deductions: [1, 3, 5, 7],
    },
    connections: {
      options: [
        "Very often, I feel deeply connected",
        "Quite often, I have regular contact",
        "Sometimes, but I wish it were more",
        "Rarely, I often feel isolated",
      ],
      deductions: [1, 3, 5, 7],
    },
  };

  let score = 100;

  // Calculate deductions for each category
  Object.entries(AnswersAndDeductions).forEach(([key, { options, deductions }]) => {
    const storedAnswer = localStorage.getItem(`st_onboarding_${key}`);
    
    if (storedAnswer) {
      const answerIndex = options.indexOf(storedAnswer);
      if (answerIndex !== -1 && deductions[answerIndex] !== undefined) {
        score -= deductions[answerIndex];
      }
    }
  });

  // Ensure score doesn't go below 0
  return Math.max(0, Math.round(score));
};

const ImageWithBoundingBox = ({ imageUrl, item }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log(imageUrl, item);
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
      if (!item.area) return;
      const [y1, x1, y2, x2] = item.area;
      const width = ((x2 - x1)/1000) * canvas.width;
      const height = ((y2 - y1)/1000) * canvas.height;
      const x = x1 * canvas.width/1000;
      const y = y1 * canvas.height/1000;

      // Set the color from the item
      const boxColor = item.color + "66" || "#FFFFFF66"; // Use the color from the item, default to white if not provided

      // Fill the bounding box with transparent color
      ctx.fillStyle = boxColor; // The "80" adds transparency (50% opacity)
      ctx.fillRect(x, y, width, height);

      // Draw the border of the bounding box
      ctx.strokeStyle = boxColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);
    };
  }, [imageUrl, item]);

  return (
    <canvas ref={canvasRef} className="max-h-[60vh] max-w-full rounded-lg surrounding-shadow"></canvas>
  );
};


export default function ThriveScorePreview() {
  const [showBlur, setShowBlur] = useState(false);
  const thriveScore = calculateThriveScore();
  const { roomId } = useParams<{ roomId: string }>();
  const [ imageUrl, setImageUrl ] = useState("");
  const [ currentAnnotation, setCurrentAnnotation ] = useState([0, 0, 0, 0]);
  const { roomImages, setRoomImage, analysisResults, setAnalysisResult } = useGuestStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!analysisResults[roomId]) navigate("/onboarding/room-selection"); 
    if (!roomImages[roomId]) navigate("/onboarding/room-selection"); 
    setImageUrl(URL.createObjectURL(roomImages[roomId]));
  }, [analysisResults, roomId, navigate]);

  const roomData = analysisResults[roomId] || {
    safety_score: 75,
    issues: [],
    independence_barriers: [],
    engagement_opportunities: [],
    additional_notes: ""
  };

  const getTagColor = (tag: string) => {
    if (tag.includes('Low')) return 'bg-green-100 text-green-800';
    if (tag.includes('Medium')) return 'bg-yellow-100 text-yellow-800';
    if (tag.includes('High')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getIcon = (tag: string) => {
    if (tag.includes('Low')) return faCircle;
    if (tag.includes('Medium')) return faExclamationTriangle;
    if (tag.includes('High')) return faCircleExclamation;
    return faCircle;
  }


  // Animate the ThriveScore on load
  useEffect(() => {
    window.scrollTo({ top: 0 });

    // Show blur effect after 10 seconds
    const blurTimer = setTimeout(() => {
      setShowBlur(true);
    }, 10000);

    return () => {
      clearTimeout(blurTimer);
    };
  }, []);
  return (
    <OnboardingLayout showBackButton={false} backPath="/onboarding/transition">
      <div className="flex w-full items-center justify-start">
        <div className="pl-10 py-12 max-w-5xl">
          <div className="bg-white rounded-xl surrounding-shadow p-8 md:p-12">
            <h1 className="text-3xl font-bold text-st_black mb-8 text-center">
              Your Personalized ThriveScore™
            </h1>

            <div className="flex flex-col gap-10 items-center">
              <motion.div
                className="w-full max-w-md flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-white rounded-xl surrounding-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="scale-150 my-8">
                  <Gauge value={thriveScore} />
                </div>
                <p className="text-center text-slate-600 mt-6 max-w-sm">
                  Based on your responses, we've calculated your initial
                  ThriveScore™. This score will improve as you implement our
                  recommendations.
                </p>
                <div className="mt-4 text-center">
                  <span className="text-2xl font-bold text-st_light_blue">
                    {thriveScore}
                  </span>
                  <span className="text-slate-500 text-lg"> / 100</span>
                </div>
              </motion.div>

              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative bg-white rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold text-slate-700">
                      Your Personalized Action Plan
                    </h3>
                  </div>

                  <p className="text-slate-600 text-lg mb-6">
                    These personalized recommendations will help you maintain independence
                    and improve your well-being. Start with what feels right for you.
                  </p>

                  <div className="space-y-10">
                    {/* Safety Issues */}
                    {roomData.issues.length > 0 && (
                      <div>
                        <h3 className="w-full text-center text-lg font-semibold text-purple-600 mb-4 flex flex-col justify-center items-center">
                          Safety Issues
                          <div className="w-full h-[2px] bg-purple-600 rounded-full"/>
                        </h3>
                        <div className="space-y-4">
                          {roomData.issues.map((issue, index) => (
                            <div
                              key={`safety-${index}`}
                              className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                              onMouseEnter={() => setCurrentAnnotation(issue)}
                              onMouseLeave={() => setCurrentAnnotation(null)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    id={`safety-${index}`}
                                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                  />
                                </div>
                                <div className="text-lg flex-1">
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    <div className="flex items-center text-sm text-slate-600">
                                      <div className={`p-1 px-2 rounded-full ${getTagColor(issue.impact)}`}>
                                        <FontAwesomeIcon className="pr-1" icon={
                                          getIcon(issue.impact)
                                        }/>
                                        {issue.impact} risk
                                      </div>
                                    </div>
                                  </div>
                                  <label
                                    htmlFor={`safety-${index}`}
                                    className="font-medium text-slate-800 cursor-pointer"
                                  >
                                    {issue.title}
                                  </label>
                                  <p className="text-slate-600 mt-1">
                                    {issue.recommendation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Independence Barriers */}
                    {roomData.independence_barriers.length > 0 && (
                      <div>
                        <h3 className="w-full text-center text-blue-600 text-lg font-semibold mb-4 flex flex-col justify-center items-center">
                          Independence Barriers
                          <div className="w-full h-[2px] bg-blue-600 rounded-full"/>
                        </h3>
                        <div className="space-y-4">
                          {roomData.independence_barriers.map((barrier, index) => (
                            <div
                              key={`independence-${index}`}
                              className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                              onMouseEnter={() => setCurrentAnnotation(barrier)}
                              onMouseLeave={() => setCurrentAnnotation(null)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    id={`independence-${index}`}
                                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                  />
                                </div>
                                <div className="text-lg flex-1">
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    <div className="flex items-center text-sm text-slate-600">
                                      <div className={`p-1 px-2 rounded-full ${getTagColor(barrier.impact)}`}>
                                        <FontAwesomeIcon className="pr-1" icon={
                                          getIcon(barrier.impact)
                                        }/>
                                        {barrier.impact} impact
                                      </div>
                                    </div>
                                  </div>
                                  <label
                                    htmlFor={`safety-${index}`}
                                    className="font-medium text-slate-800 cursor-pointer"
                                  >
                                    {barrier.title}
                                  </label>
                                  <p className="text-slate-600 mt-1">
                                    {barrier.recommendation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Engagement Opportunities */}
                    {roomData.engagement_opportunities.length > 0 && (
                      <div>
                        <h3 className="w-full text-center text-lg font-semibold text-green-600 mb-4 flex flex-col justify-center items-center">
                          Engagement Opportunities
                          <div className="w-full h-[2px] bg-green-600 rounded-full"/>
                        </h3>
                        <div className="space-y-4">
                          {roomData.engagement_opportunities.map((opportunity, index) => (
                            <div
                              key={`engagement-${index}`}
                              className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                              onMouseEnter={() => setCurrentAnnotation(opportunity)}
                              onMouseLeave={() => setCurrentAnnotation(null)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    id={`engagement-${index}`}
                                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                  />
                                </div>
                                <div className="text-lg flex-1">
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    <div className="flex items-center text-sm text-slate-600">
                                      <div className={`p-1 px-2 rounded-full ${getTagColor(opportunity.impact)}`}>
                                        <FontAwesomeIcon className="pr-1" icon={
                                          faCircle
                                        }/>
                                        {opportunity.impact} effort
                                      </div>
                                    </div>
                                  </div>
                                  <label
                                    htmlFor={`engagement-${index}`}
                                    className="font-medium text-slate-800 cursor-pointer"
                                  >
                                    {opportunity.title}
                                  </label>
                                  <p className="text-slate-600 mt-1">
                                    {opportunity.recommendation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {roomData.additional_notes && (
                    <div className="mt-16 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-800 mb-2">Additional Notes</h3>
                      <p className="text-blue-700">{roomData.additional_notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none fixed flex pr-20 mt-10 items-end justify-end top-0 left-0 w-full h-full " >
          <div className="flex flex-col items-center justify-center max-w-2xl h-full w-full ">
            <h3 className="text-3xl font-bold text-center w-full">
              Your {roomId} scores:
            </h3>
            <div className="text-base grid py-4 grid-cols-3 gap-4 ">
              <div className="flex p-3 shadow-md border-b-4 border-purple-600 rounded-xl text-purple-600 items-center justify-center flex-col">
                <p>Safety</p>
                <p className="">{roomData.safety_score}</p>
              </div>
              <div className="flex p-3 shadow-md border-b-4 border-blue-600 rounded-xl text-blue-600 items-center justify-center flex-col">
                <p>Independence</p>
                <p className="">{roomData.independence_score}</p>
              </div>
              <div className="flex p-3 shadow-md border-b-4 border-green-600 rounded-xl text-green-600 items-center justify-center flex-col">
                <p>Engagement</p>
                <p className="">{roomData.engagement_score}</p>
              </div>
            </div>
            <ImageWithBoundingBox className="surrounding-shadow" imageUrl={imageUrl} item={currentAnnotation}/>
          </div>
        </div>
        {false && (
          <motion.div
            className="fixed top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-white/90 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-st_black mb-4 text-center px-6">
              Want to see more recommendations?
            </h3>
            <p className="text-slate-600 mb-8 text-center max-w-md px-6">
              Create an account to access all your personalized
              recommendations and start improving your ThriveScore™
              today.
            </p>
            <Button
              size="lg"
              className="text-lg bg-st_light_blue hover:bg-st_dark_blue text-white px-10 py-6 h-auto rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
              asChild
            >
              <Link to="/register">Create Account</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </OnboardingLayout>
  );
}
