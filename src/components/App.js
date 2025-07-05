import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import First from "./First";
import Second from "../features/plans/Second";
import Third from "../features/plans/Third";
import Fourth from "../features/plans/Fourth";
// import Second from "./Second";
// import Third from "./Third";
// import Fourth from "./Fourth";

function App() {
  const step = useSelector((store) => store.plan.step);

  return (
    <div className="app">
      <Sidebar />
      {/*Според това, коя стъпка е, ще се показва различен компонент */}
      {step === 1 && <First />}
      {step === 2 && <Second />}
      {step === 3 && <Third />}
      {step === 4 && <Fourth />}
    </div>
  );
}

export default App;
