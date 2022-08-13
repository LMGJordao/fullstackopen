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
      <Part name={props.parts[0].name} number={props.parts[0].exercises} />
      <Part name={props.parts[1].name} number={props.parts[1].exercises} />
      <Part name={props.parts[2].name} number={props.parts[2].exercises} />
    </>
  );
};

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1, part2, part3];
  const course = {
    name: 'Half Stack application development',
    parts: parts
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
};

export default App;