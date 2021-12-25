import { useState } from "react";
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

  const handleBtnClick = (event) => {
    const { innerText } = event.target;
    setState((prevState) => ({
      ...prevState,
      [innerText]: prevState[innerText] + 1,
    }));
  };

  const totalFeedback = () => {
    return Object.values(state).reduce((acc, value) => acc + value, 0);
  };

  const positivePercentage = () => {
    const total = totalFeedback();
    const percentage = Math.round((state.good * 100) / total);
    return total ? percentage : 0;
  };

  const statistics = Object.entries(state);
  const options = Object.keys(state);
  const total = totalFeedback();
  const percentage = positivePercentage();

  return (
    <div className={s.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleBtnClick} />
      </Section>
      <Section title="Statistics">
        {total > 0 && (
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
