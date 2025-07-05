import { useSelector } from "react-redux";

const titles = ["YOUR INFO", "SELECT PLAN", "ADDS-ON", "SUMMARY"];

function Sidebar() {
  const step = useSelector((store) => store.plan.step);

  return (
    <div className="sidebar">
      <div className="steps">
        {titles.map((stepTitle, index) => (
          <Step
            key={index}
            step={step}
            currentDivIndex={index + 1}
            title={stepTitle}
          />
        ))}
      </div>
    </div>
  );
}

function Step({ step, currentDivIndex, title }) {
  return (
    <div className="step">
      <div
        className={step === currentDivIndex ? "stepIcon selected" : "stepIcon"}
      >
        {currentDivIndex}
      </div>
      <div className="step-labels">
        <p className="step-step">STEP {currentDivIndex}</p>
        <p className="step-title">{title}</p>
      </div>
    </div>
  );
}

export default Sidebar;
