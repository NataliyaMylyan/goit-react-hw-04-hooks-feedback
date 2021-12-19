import { useState, useEffect } from "react";
import Statistics from "../Statistics/Statistics.jsx";
import FeedbackOptions from "../Feedback/FeedbackOptions.jsx";
import Section from "../Section/Section.jsx";
import Notification from "../Notification/Notification.jsx";
import s from "./App.module.css";

const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {
  const [state, setState] = useState(initialState);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const handleBtnClick = (event) => {
    const { innerText } = event.target;
    setState((prevState) => ({
      ...prevState,
      [innerText]: prevState[innerText] + 1,
    }));
  };

  useEffect(() => {
    const newTotal = Object.values(state).reduce(
      (acc, value) => acc + value,
      0
    );
    setTotal(newTotal);
    if (newTotal) setPercentage(Math.round((state.good * 100) / newTotal));
  }, [state]);

  const statistics = Object.entries(state);
  const options = Object.keys(state);

  return (
    <div className={s.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleBtnClick} />
      </Section>
      <Section title="Statistics">
        {!!total && (
          <Statistics
            statistics={statistics}
            total={total}
            positiveFeedback={percentage}
          />
        )}
        {!total && <Notification message="There is no feedback" />}
      </Section>
    </div>
  );
};

export default App;
