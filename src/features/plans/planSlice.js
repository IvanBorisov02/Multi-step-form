import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  selectedPlan: { planName: "Arcade", planPrice: 9 },
  payment: "month",
  addsOn: [],
  check: [false, false, false],
};

const planSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    stepInc(state) {
      state.step += 1;
    },
    stepDec(state) {
      if (state.step === 1) return;

      state.step -= 1;
    },
    selectPlan: {
      prepare(planName, planPrice) {
        return {
          payload: {
            planName,
            planPrice,
          },
        };
      },

      reducer(state, action) {
        state.step = 2;
        state.selectedPlan = {
          planName: action.payload.planName,
          planPrice: action.payload.planPrice,
        };
      },
    },
    selectPayment(state, action) {
      state.payment = action.payload;
    },
    createAddsOn(state, action) {
      state.step = 3;
      state.addsOn = [...state.addsOn, action.payload];
    },
    toggleCheck(state, action) {
      state.check = state.check.map((item, i) =>
        i === action.payload ? !item : item
      );
    },
  },
});

export default planSlice.reducer;
export const {
  stepInc,
  stepDec,
  selectPlan,
  selectPayment,
  createAddsOn,
  toggleCheck,
} = planSlice.actions;
