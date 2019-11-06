import React, { useState } from "react";


const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  // 搜索框改变
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }
  // 重置输入框
  const resetInputField = () => {
    setSearchValue("")
  }
  // 点击提交
  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
      <form className="search">
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
    );
}

export default Search;