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

  const navPaths = [
    "/onboarding/name",
    "/onboarding/age",
    "/onboarding/living-situation",
    "/onboarding/health",
    "/onboarding/morning-energy",
    "/onboarding/meals",
    "/onboarding/everyday-tasks",
    "/onboarding/sleep-hours",
    "/onboarding/home-movement",
    "/onboarding/mobility-aids",
    "/onboarding/vision",
    "/onboarding/balance-history",
    "/onboarding/support-access",
    "/onboarding/connections",
  ];

  useEffect(() => {
    // Check if previous questions have been anwered
    // navigate to the corresponding navPath if an
    // answer is not found
    const checkUntil = props.sectionIndex;
    for (let i = 0; i < checkUntil; i++) {
      if (!localStorage.getItem(`st_onboarding_${keysToCheck[i]}`)) {
        console.log("Answer: " + keysToCheck[i] + " is not found in localStorage");
        navigate(navPaths[i]);
        break;
      }
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
    { label: "Daily Life", sectionTotal: 4 },
    { label: "Mobility & Stability", sectionTotal: 4 },
    { label: "Support & Connections", sectionTotal: 2 },
  ];
  const segmentCount = segments.length;
  const getSumUpToNth = (arr, n) => 
    arr.slice(0, n).reduce((sum, item) => sum + item.sectionTotal, 0);
  return (
    <OnboardingLayout showBackButton={true} backPath={props.backPath}>
      <div className="container mx-auto px-4 md:py-12 py-6 max-w-2xl">
        {/* Progress Bar */}
        <div className="w-full h-auto flex flex-wrap flex-row items-end justify-center">
          {segments.map((segment,index) => ( 
            <div 
              key={index}
              className="w-[9.5vh] md:w-32 px-1 flex h-full flex-col pb-4 md:pb-8"
            > 
              <div className="w-full text-center pb-2 flex items-center justify-center font-bold md:text-lg text-xs">
                {segment.label}
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
              <p className="text-center text-base md:text-lg text-slate-600 mb-6 md:mb-8">
                {props.subtitle}
              </p>
            )}
            <form 
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4">
          <motion.div
            initial={
            isExiting?
            { opacity: 1, x: 0 }
            :
            { opacity: 0, x: 50 }
            }
            animate={
            isExiting?
            { opacity: 0, x: -50 }
            :
            { opacity: 1, x: 0 }
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
              {/* Questions */}
              {props.items.map((item) => (
                <div key={item.key} className="p-4 flex flex-col gap-2 rounded-md">
                  <div className="text-st_black md:text-xl text-lg">
                    {item.icon && (
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-base md:text-xl pr-2 text-st_black"
                      />
                    )}
                    {item.question}
                  </div>
                  { item.subtitle && (
                    <p className="text-slate-600 text-xs md:text-sm">{item.subtitle}</p>
                  )}
                { item.type === "input" && (
                  <input
                    className="md:text-lg text-base border-2 p-3 mt-4 rounded-md outline-none aria-selected:border-st_light_orange focus:border-st_light_orange border-st_black"
                    placeholder={"Enter your preferred " + item.key}
                    onChange={(e) =>
                      handleChange(item.key, e.target.value)
                    }
                  />)
                  || item.type === "checkbox" && (
                    <div className="pt-4">
                      <p className="text-slate-600 text-base">
                        (Select none, one or many that apply)
                      </p>
                      <div className="flex flex-col gap-2">
                        {item.options.map((option) => (
                          <label
                            key={option}
                            className={`${answers[item.key]?.[option]? "bg-blue-50 border-st_light_blue" : "bg-gray-50 border-slate-100"} border-2 text-lg p-4 transition rounded-md flex items-center gap-2 cursor-pointer`}
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
                  ) || item.type === "radio" && (
                    <div className="pt-4">
                      <p className="text-slate-600 text-sm md:text-base">
                        (Select one)
                      </p>
                      <div className="flex flex-col gap-2">
                        {item.options.map((option) => (
                          <label
                            key={option}
                            className={`${answers[item.key] === option? "bg-blue-50 border-st_light_blue" : "bg-gray-50 border-slate-100"} border-2 text-sm md:text-lg p-4 transition rounded-md flex items-center gap-2 cursor-pointer`}
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
                <Button
                  type="button"
                  className="cursor-pointer w-1/2"
                  size="lg"
                  onClick={() => {
                    props.items.forEach(item => {
                      localStorage.setItem(`st_onboarding_${item.key}`, answers[item.key] ?? '');
                      setIsExiting(true);
                      setTimeout(
                        () => {
                      navigate(nextSection)                        
                        }, 500
                      );
                    });

                  }}
                  className={
                    (allAnswersFilled)?
                      `shadow-md hover:shadow-xl border-2 border-st_dark_blue hover:border-white text-lg bg-st_dark_blue hover:bg-st_light_blue px-8 py-6 h-auto`
                    :
                      `pointer-events-none cursor-not-allowed opacity-50 shadow-md border-2 hover:bg-st_dark_blue border-st_dark_blue text-lg bg-st_dark_blue px-8 py-6 h-auto`
                  }
                  asChild
                >
                  <div className="cursor-pointer text-sm md:text-xl w-1/2 h-full">{buttonLabel}</div>
                </Button>
              </div>
            </form>
        </div>

        {/* Skip option */}
        {allowSkip && false 
        && (
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
  );
}
