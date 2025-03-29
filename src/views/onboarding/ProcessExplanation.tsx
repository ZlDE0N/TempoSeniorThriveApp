import { Button } from "@/views/dashboard/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import Gauge from "@/views/dashboard/ui/gauge";
import ThriveScoreText from "@/views/dashboard/ui/thrivescore-text";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faSun, faCheck, faCheckCircle, faUserCircle, faSpinner, faHome, faUtensils, faBed, faHeart } from "@fortawesome/free-solid-svg-icons";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import { getFirstUnansweredQuestion } from '@/utils/onboardingUtils';
import thrivingSeniors from "@/assets/images/thriving-seniors.jpeg"
import useGuestStore from '@/store/onboarding_store/guestStore';

export default function ProcessExplanation() {
  const [thriveScore, setThriveScore] = useState(75);
  const [isLoading, setIsLoading] = useState(true);
  const { beenHereBefore, setBeenHereBefore } = useGuestStore();
  const navigate = useNavigate();
  
  // Refs for scroll-triggered animations
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const introTextRef = useRef(null);
  const featuresRef = useRef(null);
  const featuresItemsRef = useRef(null); // New ref for the items container
  const benefitsRef = useRef(null);
  const privacyRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Animation controls
  const titleControls = useAnimation();
  const imageControls = useAnimation();
  const introTextControls = useAnimation();
  const featuresControls = useAnimation();
  const featuresItemsControls = useAnimation(); // New control for items
  const benefitsControls = useAnimation();
  const privacyControls = useAnimation();
  const ctaControls = useAnimation();
  
  // Check if elements are in view
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-100px" });
  const isIntroTextInView = useInView(introTextRef, { once: true, margin: "-100px" });
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const isFeaturesItemsInView = useInView(featuresItemsRef, { once: true, margin: "-100px" }); // New inView check
  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });
  const isPrivacyInView = useInView(privacyRef, { once: true, margin: "-100px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Set up the score interval
    const interval = setInterval(() => {
      setThriveScore(Math.floor(Math.random() * 51 + 25));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Trigger animations when elements come into view
    if (isTitleInView) titleControls.start("visible");
    if (isImageInView) imageControls.start("visible");
    if (isIntroTextInView) introTextControls.start("visible");
    if (isFeaturesInView) featuresControls.start("visible");
    if (isFeaturesItemsInView) featuresItemsControls.start("visible"); // Trigger items separately
    if (isBenefitsInView) benefitsControls.start("visible");
    if (isPrivacyInView) privacyControls.start("visible");
    if (isCtaInView) ctaControls.start("visible");
  }, [
    isTitleInView, 
    isImageInView, 
    isIntroTextInView, 
    isFeaturesInView,
    isFeaturesItemsInView, // Include new check
    isBenefitsInView, 
    isPrivacyInView, 
    isCtaInView
  ]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Increased stagger delay
        delayChildren: 0.3 // Added initial delay
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <OnboardingLayout showBackButton={true} backPath="/onboarding/expectations">
      <div className="container mx-auto px-4 py-12 max-w-4xl md:pb-36 pb-24">
                {/* Title with animation */}
        <motion.h1 
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={fadeInUp}
          className="md:text-4xl text-2xl font-bold text-st_black text-center mb-6"
        >
          Welcome! Let's Make Your Home a Haven
        </motion.h1>

        {/* Image with animation */}
        <motion.div 
          ref={imageRef}
          initial="hidden"
          animate={imageControls}
          variants={scaleUp}
          className="w-full flex items-center justify-center"
        >
          <div className="relative rounded-xl overflow-hidden max-w-3xl shadow-lg mb-12 bg-white">
            <div className="aspect-w-16 aspect-h-9 relative">
              <div className="w-full h-full">
                {/* Image Skeleton */}
                {isLoading && (
                  <div className="absolute top-0 flex items-center justify-center left-0 h-full w-full bg-gray-200">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-st_light_blue"/>
                  </div>
                )}
                <img
                  src={thrivingSeniors}
                  alt="Senior enjoying home activities"
                  className="w-full h-full object-cover"
                  onLoad={() => {setIsLoading(false)}}
                />
              </div>
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="invisible md:visible absolute bottom-4 right-4 md:bottom-6 md:right-6 rounded-md bg-white bg-opacity-50 shadow-md"
                >
                  <div className="p-2 rounded-md flex flex-col gap-2 items-center justify-center">
                    <div className="text-md bg-white rounded-sm p-2 md:text-xl text-st_black font-bold">
                      <span className="text-st_light_orange">Thrive</span><span className="text-st_light_blue">Score™</span>
                    </div>
                    <div className="px-4 flex rounded-md border-b-0 border-white items-center justify-center">
                      <Gauge size="" label="" value={78}/>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="md:invisible absolute bottom-2 right-2 md:bottom-6 md:right-6 rounded-md bg-white bg-opacity-50 shadow-md"
                >
                  <div className="p-1 rounded-md flex flex-col items-center justify-center">
                    <div className="text-sm bg-white rounded-sm mb-1 p-1 md:text-xl text-st_black font-bold">
                      <span className="text-st_light_orange">Thrive</span><span className="text-st_light_blue">Score™</span>
                    </div>
                    <div className="px-4 flex rounded-md border-b-0 border-white items-center justify-center">
                      <Gauge size="50" label="" value={78}/>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Intro text with animation */}
        <motion.p 
          ref={introTextRef}
          initial="hidden"
          animate={introTextControls}
          variants={fadeInUp}
          className="md:text-xl text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto"
        >
          In just a few moments, you'll tell us about your day –
          <br />
          simple things that help you feel safe and confident at home.
        </motion.p>

        {/* Features section with staggered animations */}
        <motion.div 
          ref={featuresRef}
          initial="hidden"
          animate={featuresControls}
          variants={fadeIn}
          className="bg-white rounded-xl surrounding-shadow p-8 mb-12"
        >
          <motion.h2 
            variants={fadeInUp}
            className="md:text-2xl w-full text-center text-xl font-semibold text-st_black mb-6"
          >
            Here's what we'll explore together
          </motion.h2>

          {/* Items container with separate animation trigger */}
          <motion.div 
            ref={featuresItemsRef}
            initial="hidden"
            animate={featuresItemsControls}
            variants={staggerContainer}
            className="space-y-6 mb-8"
          >
            {[
              { icon: faUserCircle, title: "Quick Profile", description: "Basic information to personalize your assessment" },
              { icon: faSun, title: "Daily Living", details: ["Morning energy", "Meal preparation", "Everyday tasks", "Sleep hours"] },
              { icon: faHome, title: "Mobility & Stability", details: ["Home movement", "Mobility aids", "Vision & safety", "Balance history"] },
              { icon: faHeart, title: "Support & Connections", details: ["Support access", "Connections"] },
              { icon: faBed, title: "Safety Scan", description: "A simple photo helps spot opportunities for confidence" },
            ].map((step, index) => (
              <motion.div 
                variants={staggerItem} 
                className="flex gap-4" 
                key={index}
                custom={index} // Pass index for custom delays if needed
              >
                <div className="flex-shrink-0 md:w-10 md:h-10 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <div>
                  <h3 className="font-bold text-st_black text-lg md:text-xl">{step.title}</h3>
                  {step.details ? (
                    <ul className="text-slate-600 md:text-xl space-y-1">
                      {step.details.map((detail, i) => (
                        <li key={i}><FontAwesomeIcon icon={faCheck}/> {detail}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-600 md:text-xl ">{step.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              variants={staggerItem}
              className="w-full flex items-center justify-center pt-8 font-bold text-center text-xl md:text-2xl"
            >
              <div className="md:w-10 md:h-10 w-6 h-6 rounded-full mr-2 bg-green-100 flex items-center justify-center text-green-600">
                <FontAwesomeIcon icon={faCheckCircle} className="" />
              </div>
              Your result
            </motion.div>
            
            <motion.div 
              variants={staggerItem}
              className="w-full surrounding-shadow bg-gradient-to-b from-slate-50 to-white md:text-xl text-center text-lg p-4 rounded-lg bg-opacity-15"
            >
              A personalized <ThriveScoreText/> with practical recommendations
              <div className="relative w-full flex items-center justify-center my-8">
                <Gauge value={thriveScore} />
              </div>
              <div className="md:text-lg text-base px-4 text-justify">
                Your ThriveScore™ is a clear snapshot of how well you're thriving in your home environment. It reflects your well-being, independence, and sense of connection. By following our personalized recommendations, you'll find simple yet powerful ways to improve your score — helping you build a safer, more connected, and more confident lifestyle every day.
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        {/* Benefits section with animation */}
        <motion.div 
          ref={benefitsRef}
          initial="hidden"
          animate={benefitsControls}
          variants={fadeIn}
          className="bg-blue-50 rounded-xl p-8 mb-12"
        >
          <motion.h2 
            variants={fadeInUp}
            className="md:text-2xl text-xl font-semibold text-st_black mb-6 text-center"
          >
            You'll Love How Easy This Is
          </motion.h2>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {["Just like chatting with a friend", "Answer at your own pace", "No medical knowledge needed", "Clear indications about every step"].map((text, index) => (
              <motion.div 
                variants={staggerItem}
                className="flex md:text-xl text-lg items-start gap-3" 
                key={index}
              >
                <div className="text-blue-600 text-xl">✦</div>
                <p className="text-slate-700">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>


        {/* Privacy section with animation */}
        <motion.div 
          ref={privacyRef}
          initial="hidden"
          animate={privacyControls}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h3 className="font-semibold text-xl text-st_black mb-2">
            Your Story, Your Privacy:
          </h3>
          <p className="text-slate-600 text-lg max-w-md mx-auto">
            Everything you share stays private and secure.
            <br />
            We're here to listen, not judge.
          </p>
        </motion.div>

        {/* CTA section with animation */}
        <motion.div 
          ref={ctaRef}
          initial="hidden"
          animate={ctaControls}
          variants={fadeInUp}
          className="text-center"
        >
          <motion.h3 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.2 }
              }
            }}
            className="text-2xl font-semibold text-st_black mb-6"
          >
            Ready for a friendly chat about thriving at home?
          </motion.h3>
        </motion.div>
      </div>

      {/* Sticky Button at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-white/0 py-4 px-8 pb-0 shadow-md"
      >
        <div className="p-4 bg-white/100 backdrop-blur-sm border-0 border-b-0 rounded-b-none border-green-200 surrounding-shadow mx-auto max-w-2xl rounded-lg flex justify-center">
          <button
            className="text-lg rounded-md md:text-xl text-white px-8 py-6 h-auto bg-green-600 hover:shadow-md border-2 border-green-600 hover:border-white hover:bg-green-700 w-full"
            onClick={()=>{
              const targetRoute = getFirstUnansweredQuestion();
              // Global state to keep track of whether we 
              // are recovering a previous session or not
              if (targetRoute !== "/onboarding/name"){
                setBeenHereBefore(true);
              }
              navigate(targetRoute);
            }}
          >
            Let's begin
          </button>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
}
