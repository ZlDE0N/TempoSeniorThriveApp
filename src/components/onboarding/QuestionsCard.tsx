import { Button } from "@/views/dashboard/ui/button";
import { Label } from "@/views/dashboard/ui/label";
import { useMemo, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from "@/views/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OnboardingLayout from "./OnboardingLayout";
import { clearAnswers, checkPreviousQuestions, getFirstUnansweredQuestion } from '@/utils/onboardingUtils';
import useGuestStore from '@/store/onboarding_store/guestStore';

export default function QuestionsCard( props: {
  title: string,
  subtitle?: string,
  allowSkip?: boolean,
  items: {
    question: string,
    subtitle?: string,
    type: "input" | "radio" | "checkbox",
    options: string[],
    answer?: string,
    key: string,
  }
  nextSection: string,
  backPath: string,
  conditionalNextSection?: string,
  condition?: (answer: string) => boolean,  
  sectionIndex: number,
  sectionTotal: number,
  buttonLabel?: string,
}){

  const navigate = useNavigate();
  const { beenHereBefore, setBeenHereBefore } = useGuestStore();
  const [ showBeenHereBefore, setShowBeenHereBefore ] = useState(false);

  useEffect(() => {
    if (beenHereBefore !== true) return;
    // Show a message if session was restored
    setShowBeenHereBefore(true);
    setBeenHereBefore(false);
  }, [beenHereBefore]);

  useEffect(() => {
    // Navigate to FUQ if any previous question is
    // missing
    if (!checkPreviousQuestions(props.sectionIndex)) {
      navigate(getFirstUnansweredQuestion());
    }

    // Scroll to top on mount
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);

  const [answers, setAnswers] = useState(
    Object.fromEntries(
      props.items.map((item) => [
        item.key,
        item.type === "checkbox"
          ? Object.fromEntries(item.options.map((option) => [option, false]))
          : null
      ])
    )
  );

  useEffect(() => {
    if (!props.condition || !props.conditionalNextSection) {return}
    if (props.condition(answers)){
      setNextSection(props.conditionalNextSection);
    }
    else {
      setNextSection(props.nextSection);
    }
  }, [answers])

  const [nextSection, setNextSection] = useState(props.nextSection)
  const [isExiting, setIsExiting] = useState(false)


  const allAnswersFilled = Object.values(answers).every(
    (value) => value !== null && value !== ""
  );

  const handleChange = (key: string, value: string | { [option: string]: boolean }) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const allowSkip = props.allowSkip || false;
  const buttonLabel = props.buttonLabel || "Next Step";
  const conditionalNextSection = props.conditionalNextSection || false;
  const segments = [
    { label: "Personal Profile", sectionTotal: 4 },
    { label: "Daily \n Life", sectionTotal: 4 },
    { label: "Mobility & Stability", sectionTotal: 4 },
    { label: "Support & Connections", sectionTotal: 2 },
  ];
  const segmentCount = segments.length;
  const getSumUpToNth = (arr, n) => 
    arr.slice(0, n).reduce((sum, item) => sum + item.sectionTotal, 0);
  return (
  <OnboardingLayout showBackButton={true} backPath={props.backPath}>
    <div className="container mx-auto px-4 md:py-12 max-w-2xl">
      {showBeenHereBefore && (
        <div className="mb-8 p-8 rounded-xl bg-blue-50 border border-blue-200 shadow-md">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl mb-4 font-bold text-blue-900">
              Pick up where you left off
            </h2>
            <p className="text-xl text-st_black mb-8">
              We've restored your progress from your last visit
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-xl text-st_black">
                Prefer a fresh start?
              </p>
              <button
                className="px-4 py-2 text-lg font-medium rounded-lg hover:bg-green-700 bg-green-600 text-white shadow-md border-green-600 hover:border-white border-2 transition-all hover:shadow-lg"
                onClick={()=>{
                  clearAnswers();
                  navigate("/onboarding/name")
                }}
              >
                Start From Scratch
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Progress Bar */}
      <div className="w-full h-auto flex flex-wrap flex-row items-end justify-center">
        {segments.map((segment, index) => (
          <div 
            key={index}
            className="w-[9.5vh] md:w-32 px-1 flex h-full flex-col pb-4 md:pb-8"
          > 
            <div className="w-full text-center flex pb-2 flex-col items-center justify-end font-bold md:text-lg text-xs min-h-[3.5rem]">
              {segment.label.split('\n').map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </div>
            <div className="w-full bg-slate-100 rounded-full overflow-hidden h-2">
              {props.sectionIndex >= getSumUpToNth(segments, index + 1) ? (
                <div className="w-full h-full bg-green-400" />
              ) : props.sectionIndex >= getSumUpToNth(segments, index) && (
                <motion.div
                  className={`bg-st_light_blue h-full rounded-full`}
                  initial={{ width: `${Math.max(0, (props.sectionIndex - getSumUpToNth(segments, index))) * (100 / segment.sectionTotal)}%` }}
                  animate={{ width: `${(props.sectionIndex + 1 - getSumUpToNth(segments, index)) * (100 / segment.sectionTotal)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl surrounding-shadow px-4 py-6 md:py-8 md:px-8">
        <h1 className="md:text-3xl text-2xl font-bold text-st_black text-center mb-4">
          {props.title}
        </h1>
        {props.subtitle && (
          <p className="text-center text-lg md:text-xl text-st_black mb-6 md:mb-8">
            {props.subtitle}
          </p>
        )}
        
        {/* Form with proper submission handling */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (allAnswersFilled) {
              props.items.forEach(item => {
                localStorage.setItem(`st_onboarding_${item.key}`, answers[item.key] ?? '');
              });
              setIsExiting(true);
              setTimeout(() => {
                navigate(nextSection);
              }, 500);
            }
          }}
          className="space-y-4"
        >
          <motion.div
            initial={
              isExiting ?
              { opacity: 1, x: 0 } :
              { opacity: 0, x: 50 }
            }
            animate={
              isExiting ?
              { opacity: 0, x: -50 } :
              { opacity: 1, x: 0 }
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Questions */}
            {props.items.map((item) => (
              <div 
                key={item.key} 
                className="p-4 flex flex-col gap-2 rounded-md"
                role="group"
                aria-labelledby={`${item.key}-label`}
              >
                <div 
                  id={`${item.key}-label`}
                  className="text-st_black md:text-xl text-lg"
                >
                  {item.icon && (
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-base md:text-xl pr-2 text-st_black"
                    />
                  )}
                  {item.question}
                </div>
                {item.subtitle && (
                  <p className="text-slate-600 text-xs md:text-sm">{item.subtitle}</p>
                )}
                
                {item.type === "input" && (
                  <input
                    className="md:text-lg text-base border-2 p-3 mt-4 rounded-md outline-none aria-selected:border-st_light_orange focus:border-st_light_orange border-st_black"
                    placeholder={"Enter your preferred " + item.key}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && allAnswersFilled) {
                        e.preventDefault();
                        document.getElementById('submit-button')?.click();
                      }
                    }}
                  />
                )}
                {item.type === "checkbox" && (
                  <div className="pt-4">
                    <p className="text-st_black text-base md:text-lg">
                      (Select none, one or many that apply)
                    </p>
                    <div className="flex flex-col gap-2">
                      {item.options.map((option) => (
                        <label
                          key={option}
                          className={`${answers[item.key]?.[option] ? "bg-blue-50 border-st_light_blue" : "bg-gray-50 border-slate-100"} border-2 text-lg p-4 transition rounded-md flex items-center gap-2 cursor-pointer`}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              const updatedOptions = {
                                ...answers[item.key],
                                [option]: !answers[item.key]?.[option]
                              };
                              handleChange(item.key, updatedOptions);
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={answers[item.key]?.[option] || false}
                            onChange={(e) => {
                              const updatedOptions = {
                                ...answers[item.key],
                                [option]: e.target.checked || null
                              };
                              handleChange(item.key, updatedOptions);
                            }}
                          />
                          <FontAwesomeIcon
                            icon={answers[item.key]?.[option] ? faSquareCheck : faSquare}
                            className="text-2xl text-st_black"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {item.type === "radio" && (
                  <div className="pt-4">
                    <p className="text-st_black text-base md:text-lg">
                      (Select one)
                    </p>
                    <div className="flex flex-col md:gap-4 gap-2">
                      {item.options.map((option) => (
                        <label
                          key={option}
                          className={`${answers[item.key] === option ? "bg-blue-50 border-st_light_blue" : "bg-gray-50 border-slate-100"} border-2 text-sm md:text-lg p-4 transition rounded-md flex items-center gap-2 cursor-pointer`}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleChange(
                                item.key,
                                answers[item.key] === option ? null : option
                              );
                            }
                          }}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            name={item.key}
                            value={option}
                            checked={answers[item.key] === option}
                            onChange={() =>
                              handleChange(
                                item.key,
                                answers[item.key] === option ? null : option
                              )
                            }
                          />
                          <FontAwesomeIcon
                            icon={answers[item.key] === option ? faCircleDot : faCircle}
                            className="md:text-2xl text-xl text-st_black"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <div className="pt-4 text-white flex justify-center">
            <div className="grid w-full gap-3 grid-rows-1 md:grid-cols-2">
              {/* Back button as type="button" to prevent form submission */}
              <button 
                type="button"
                className="w-full text-lg md:text-xl p-5 shadow-md border-2 border-st_dark_blue bg-white hover:bg-gray-100 hover:gray-200 text-st_dark_blue rounded-md flex items-center justify-center gap-2"
                onClick={() => {
                  navigate(props.backPath);
                }}
              >
                Back
              </button>
              <div className="w-full flex justify-center">
                <Button 
                  id="submit-button"
                  disabled={!allAnswersFilled}
                  type="submit"
                  onClick={() => {
                    if (allAnswersFilled) {
                      props.items.forEach(item => {
                        localStorage.setItem(`st_onboarding_${item.key}`, answers[item.key] ?? '');
                      });
                      setIsExiting(true);
                    }
                  }}
                  size="lg" 
                  className={
                    allAnswersFilled ?
                    `md:text-xl text-lg shadow-md w-full hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue px-8 py-6 h-auto` :
                    `md:text-xl text-lg pointer-events-none w-full cursor-not-allowed opacity-50 shadow-md border-2 hover:bg-st_dark_blue border-st_dark_blue bg-st_dark_blue px-8 py-6 h-auto`
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Skip option */}
      {allowSkip && false && (
        <div className="mt-4 text-center">
          <Link
            to={nextSection}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            I'd prefer to skip this step
          </Link>
        </div>
      )}
    </div>
  </OnboardingLayout>
)};;
