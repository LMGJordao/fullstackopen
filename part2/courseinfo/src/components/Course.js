const Part = ({part}) => <p>{part.name} {part.exercises}</p>;

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <h3>total of {total} exercises</h3>
    );
};

const Header = ({name}) => <h1>{name}</h1>;

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
            <Total parts={parts} />
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
};

export default Course;