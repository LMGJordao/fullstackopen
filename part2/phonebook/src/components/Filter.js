const Filter = ({setFilter}) => {
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };
  
    return (
      <>
        <h3>Filter</h3>
        <div>filter shown with:<input onChange={handleFilterChange} /></div>
      </>
    );
  };
  
  export default Filter;