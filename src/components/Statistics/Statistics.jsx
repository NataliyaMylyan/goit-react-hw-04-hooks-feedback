import React from "react";
import PropTypes from "prop-types";
import s from "./Statistics.module.css";

const Statistics = ({ statistics, total, positiveFeedback }) => {
  return (
    <ul className={s.statistics}>
      {statistics.map(([key, value]) => (
        <li key={key} className={s.goodValue}>
          {key}: {value}
        </li>
      ))}
      <li className={s.totalValue}>Total: {total}</li>
      <li className={s.positiveValue}>
        Positive feedback: {positiveFeedback}%
      </li>
    </ul>
  );
};

Statistics.propTypes = {
  statistics: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  positiveFeedback: PropTypes.number.isRequired,
};

export default Statistics;
