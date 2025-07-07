import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "../../contexts/AccountContext";
import Button from "../../components/Button";
import { stepDec } from "./planSlice";

function Fourth() {
  const plan = useSelector((store) => store.plan);

  const { total } = useAccount();
  const dispatch = useDispatch();

  function handleBack(e) {
    e.preventDefault();

    dispatch(stepDec());
  }

  return (
    <div className="step-info-div">
      <h1>Finishing Up</h1>
      <p>Double check everything look OK before continue.</p>
      <div className="summary-container">
        <div className="summarySelectedPlan">
          <p>
            {plan.selectedPlan.planName}({plan.payment})
          </p>
          <p className="plan-price">
            {plan.payment === "month"
              ? `+$${plan.selectedPlan.planPrice}/${plan.payment}`
              : `+$${plan.selectedPlan.planPrice * 12}/${plan.payment}`}
          </p>
        </div>
        <br />

        <div className="summarySelectedAddOns">
          {plan.addsOn[plan.addsOn.length - 1].map((addOn) => (
            <div key={addOn.price} className="adds-on-div">
              <p>{addOn?.title}</p>
              {/* <p>{`$${addOn[index]?.price}`}</p> */}
              {plan.payment === "month" ? (
                <p className="addOn-price">{`$${addOn?.price}/${plan.payment}`}</p>
              ) : (
                <p className="addOn-price">{`$${addOn?.price * 12}/${
                  plan.payment
                }`}</p>
              )}
            </div>
          ))}
        </div>

        <div className="total">
          <p>{`Total (${plan.payment})`}</p>
          <p>{`+$${total}/${plan.payment}`}</p>
        </div>
      </div>
      <div className="buttons">
        <Button className="back" onClick={handleBack}>
          Back
        </Button>
        <Button
          onClick={() => alert("Sucessfully sended details! ")}
          className="next"
        >
          Finish
        </Button>
      </div>
    </div>
  );
}

export default Fourth;
