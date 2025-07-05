import { useDispatch } from "react-redux";

import Button from "./Button";

import { useAccount } from "../contexts/AccountContext";
import { stepInc } from "../features/plans/planSlice";

function First() {
  const { name, setName, phone, setPhone, email, setEmail } = useAccount();

  const dispatch = useDispatch();

  function handleNext(e) {
    e.preventDefault();
    dispatch(stepInc());
  }

  return (
    <div className="step-info-div">
      <h1>Personal Info</h1>
      <p>Please, provide your name, email and phone number.</p>

      <form>
        <label htmlFor="name">Name*</label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Ivan Borisov"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email*</label>
        <input
          id="email"
          type="text"
          placeholder="e.g. i.borisov12@outlook.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="phone">Phone*</label>
        <input
          id="phone"
          type="text"
          placeholder="e.g. 0884791410"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button className="next" onClick={handleNext}>
          Next
        </Button>
      </form>
    </div>
  );
}

export default First;
