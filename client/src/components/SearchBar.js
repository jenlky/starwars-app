import React from "react";

const SearchBar = ({ name, setName, searchName }) => {
  return (
    <React.Fragment>
      <input
        type="search"
        className="searchbar"
        aria-label="Search by person name"
        placeholder="Enter person name"
        size="25"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyPress={e => {
          if (e.which === 13) {
            return searchName(name);
          }
        }}
      />
    </React.Fragment>
  );
};

export default SearchBar;
