const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.number}</p>
    </>
  );
}

const Header = (props) => {
  return (
    <header>
      <h1>{props.course}</h1>
    </header>
  );
};

const Content = (props) => {
  return (
    <>
      <Part name={props.parts[0][0]} number={props.parts[0][1]} />
      <Part name={props.parts[1][0]} number={props.parts[1][1]} />
      <Part name={props.parts[2][0]} number={props.parts[2][1]} />
    </>
  )
};

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises}</p>
    </>
  )
};

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[[part1, exercises1], [part2, exercises2], [part3, exercises3]]}/>
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
};

export default App;