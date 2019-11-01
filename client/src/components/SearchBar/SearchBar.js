import React from "react";

const SearchBar = () => {
  return (
    <React.Fragment>
      <label htmlFor="name-search">Person name</label>
      <input
        type="search"
        id="name-search"
        aria-label="Search by person name"
        placeholder="Enter person name"
      />
    </React.Fragment>
  );
};

export default SearchBar;
