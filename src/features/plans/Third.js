import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAddsOn, stepDec, stepInc } from "./planSlice";
import Button from "../../components/Button";
import { useAccount } from "../../contexts/AccountContext";
// import { createAddsOn } from "../features/plans/planSlice";

const initialAddOns = [
  {
    title: "Online service",
    text: "Access to multiplayer games",
    price: 1,
  },
  {
    title: "Larger Storage",
    text: "Extra 1TB of storage",
    price: 2,
  },
  {
    title: "Customazable profile ",
    text: "Customize themes on your profile",
    price: 2,
  },
];

const prices = [1, 2, 2];

function Third() {
  // Масив със състояния за всеки чекбокс
  const [checked, setChecked] = useState([false, false, false]);
  const dispatch = useDispatch();

  const payment = useSelector((store) => store.plan.payment);

  const { setTotal } = useAccount();

  function handleChange(index) {
    setChecked((prev) => prev.map((item, i) => (i === index ? !item : item)));
  }

  function handleNext(e) {
    e.preventDefault();

    const selectedAddOns = initialAddOns.filter((_, idx) => checked[idx]);
    if (payment === "month") {
      setTotal(
        (total) =>
          Number(total) +
          selectedAddOns.reduce((acc, addOn) => acc + Number(addOn.price), 0)
      );
    } else {
      setTotal(
        (total) =>
          Number(total) +
          selectedAddOns.reduce(
            (acc, addOn) => acc + Number(addOn.price) * 12,
            0
          )
      );
    }

    dispatch(createAddsOn(selectedAddOns));
    dispatch(stepInc());
  }

  function handleBack(e) {
    e.preventDefault();

    dispatch(stepDec());
  }

  return (
    <div className="step-info-div">
      <h1>Pick add-ons</h1>
      <p>Add-ons help enchance your gaming experience.</p>

      {initialAddOns.map((addOn, idx) => (
        <AddOns
          checked={checked[idx]}
          onChange={() => handleChange(idx)}
          key={addOn.title}
          addOn={addOn}
          price={prices[idx]}
        />
      ))}

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

function AddOns({ checked, onChange, addOn, price }) {
  const payment = useSelector((store) => store.plan.payment);

  return (
    <div className="add-on">
      <Checkbox
        checked={checked}
        onChange={onChange}
        color="primary"
        size="medium"
        sx={{ padding: 1 }}
      />
      <div className="add-on-contents">
        <div className="add-on-title">{addOn.title}</div>
        <div className="add-on-text">{addOn.text}</div>
      </div>
      <div className="add-on-price">
        {payment === "month"
          ? `+$${price}/${payment}`
          : `+$${price * 12}/${payment}`}
      </div>
    </div>
  );
}

export default Third;
