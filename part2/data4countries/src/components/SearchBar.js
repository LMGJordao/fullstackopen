const SearchBar = ({setSearch}) => {
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    return (
        <div>
            find countries <input onChange={handleSearchChange} />
        </div>
    );
};

export default SearchBar;