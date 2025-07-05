const initialState = {
  step: 1,
  selectedPlan: { planName: "Arcade", planPrice: 9 },
  payment: "month",
  addsOn: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/stepInc":
      return {
        ...state,
        step: state.step + 1,
      };

    case "account/stepDec":
      if (state.step === 1) return state;
      return {
        ...state,
        step: state.step - 1,
      };

    case "account/selectPlan":
      return {
        ...state,
        step: 2,
        selectedPlan: {
          planName: action.payload.planName,
          planPrice: action.payload.planPrice,
        },
      };

    case "account/payment":
      return {
        ...state,
        step: 2,
        payment: action.payload,
      };

    case "account/addsOn":
      return {
        ...state,
        step: 3,
        addsOn: [...state.addsOn, action.payload],
      };

    default:
      return state;
  }
}

export function stepInc() {
  return { type: "account/stepInc" };
}

export function stepDec() {
  return { type: "account/stepDec" };
}

export function selectPlan(name, price) {
  return {
    type: "account/selectPlan",
    payload: { planName: name, planPrice: price },
  };
}

export function selectPayment(payment) {
  return { type: "account/payment", payload: payment };
}

export function createAddsOn(addsOn) {
  return { type: "account/addsOn", payload: addsOn };
}
