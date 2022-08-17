const Number = ({name, phone, handleDelete}) => <div>{name} {phone} <button onClick={handleDelete}>delete</button></div>;

export default Number;