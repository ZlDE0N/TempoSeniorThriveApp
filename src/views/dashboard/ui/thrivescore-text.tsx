export default function ThriveScoreText ( props: {
  className?
}){
  const tailwindClasses = props.className || "";

  return (
    <div className={tailwindClasses+" inline"}>
      <span className="text-st_light_orange">
        Thrive
      </span>
      <span className="text-st_light_blue">
        Score™
      </span>
    </div>
  );
};

