import useGuestStore from '@/store/onboarding_store/guestStore';

// Clears all  answers on local storage
export function clearAnswers(){
  const keys = [
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
    keys.forEach(key => {
    localStorage.removeItem(`st_onboarding_${key}`);
  });
};

// Checks if previous questions have been answered by index
export function checkPreviousQuestions(index: number){
  const keys = [
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

  const routes = [
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

  for (let i = 0; i < index; i++) {
    if (!localStorage.getItem(`st_onboarding_${keys[i]}`)) {
      console.log("Answer: " + keys[i] + " is not found in localStorage");
      return false;
    }
  }
  return true;
}

// Gets the route to the first unanswered question
export function getFirstUnansweredQuestion(navigate: any){
  const keys = [
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

  const routes = [
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

  // Find the first missing key
  const unansweredIndex = keys.findIndex(
    (key) => !localStorage.getItem(`st_onboarding_${key}`)
  );

  // Return unnanswered question path if it exists
  if (unansweredIndex !== -1) {
    return routes[unansweredIndex];
  }

  // Return safety scan route
  return "/onboarding/room-assessment";
}
