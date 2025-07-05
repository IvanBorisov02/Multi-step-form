import { useDispatch, useSelector } from "react-redux";
import { selectPayment, selectPlan, stepDec, stepInc } from "./planSlice";

import arcadeIcon from "../../assets/images/icon-arcade.svg";
import advancedIcon from "../../assets/images/icon-advanced.svg";
import proIcon from "../../assets/images/icon-pro.svg";
import Button from "../../components/Button";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAccount } from "../../contexts/AccountContext";

const plans = [
  {
    planName: "Arcade",
    planPrice: 9,
    planIcon: arcadeIcon,
  },
  {
    planName: "Advanced",
    planPrice: 12,
    planIcon: advancedIcon,
  },
  {
    planName: "Pro",
    planPrice: 15,
    planIcon: proIcon,
  },
];

function Second() {
  // const [period, setPeriod] = useState("month");

  const { setTotal } = useAccount();

  const dispatch = useDispatch();
  const payment = useSelector((store) => store.plan.payment);
  const selectedPlan = useSelector((store) => store.plan.selectedPlan);

  function handleBack(e) {
    e.preventDefault();

    dispatch(stepDec());
  }

  function handleNext(e) {
    e.preventDefault();

    if (!selectedPlan)
      throw new Error("Please, select a plan before continue forward!");

    if (payment === "month") {
      setTotal((total) => total + Number(selectedPlan.planPrice));
    } else {
      setTotal((total) => total + Number(selectedPlan.planPrice) * 12);
    }

    dispatch(stepInc());
  }

  const handleChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      // setPeriod(newPeriod);
      dispatch(selectPayment(newPeriod));
    }
  };

  return (
    <div className="step-info-div">
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>
      <div className="plan-list">
        {plans.map((plan) => (
          <Plan plan={plan} key={plan.planPrice} />
        ))}
      </div>

      <div className="toggle">
        <ToggleButtonGroup
          value={payment}
          exclusive
          onChange={handleChange}
          aria-label="Period"
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <ToggleButton
            value="month"
            aria-label="Monthly"
            sx={{
              textTransform: "none",
              fontWeight: payment === "month" ? "bold" : "regular",
            }}
          >
            Month
          </ToggleButton>
          <ToggleButton
            value="yearly"
            aria-label="Yearly"
            sx={{
              textTransform: "none",
              fontWeight: payment === "yearly" ? "bold" : "regular",
            }}
          >
            Yearly
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="buttons">
        <Button className="back" onClick={handleBack}>
          Back
        </Button>

        <Button className="next" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

function Plan({ plan }) {
  const { payment, selectedPlan } = useSelector((store) => store.plan);

  const dispatch = useDispatch();

  return (
    <div
      className={`${
        selectedPlan.planName === plan.planName
          ? "plan-item selected"
          : "plan-item"
      }`}
      onClick={() => dispatch(selectPlan(plan.planName, plan.planPrice))}
    >
      <img src={plan.planIcon} alt={`${plan.planName}-plan`}></img>
      <p className="plan-name">{plan.planName}</p>
      <p className="plan-price">
        {payment === "month"
          ? `$${plan.planPrice}/${payment}`
          : `$${Number(plan.planPrice) * 12}/${payment}`}
      </p>
    </div>
  );
}

export default Second;
