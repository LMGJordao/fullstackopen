import { useState } from 'react';

const StatisticLine = ({name, count}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{count}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if (0 === good + bad + neutral) return <p>No feedback given</p>;

  const total = good + bad + neutral;
  const avg = (good - bad) / total;
  const positive = (good * 100/ total) + " %";

  return (
    <>
      <table>
        <tbody>
          <StatisticLine name={"good"} count={good} />
          <StatisticLine name={"bad"} count={bad} />
          <StatisticLine name={"neutral"} count={neutral} />
          <StatisticLine name={"all"} count={neutral + good + bad} />
          <StatisticLine name={"average"} count={avg} />
          <StatisticLine name={"positive"} count={positive} />
        </tbody>
      </table>
    </>
  );
};

const Button = ({onClick, name}) => {
  return (
    <button onClick={onClick}>
      {name}
    </button>
  );
};
 
const Header = ({name}) => {
  return (
    <h1>
      {name}
    </h1>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodHandler = () => setGood(good + 1);
  const neutralHandler = () => setNeutral(neutral + 1);
  const badHandler = () => setBad(bad + 1);

  return (
    <div>
      <Header name={"give feedback"} />
      <Button name={"good"} onClick={goodHandler} />
      <Button name={"neutral"} onClick={neutralHandler} />
      <Button name={"bad"} onClick={badHandler} />
      <Header name={"statistics"} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;