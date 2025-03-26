const Filter = ({ searchTerm, setSearchTerm }) => {
    return (
      <div>
        Filter shown with:{" "}
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
    );
  };
  
  export default Filter;
  