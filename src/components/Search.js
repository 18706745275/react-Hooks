import React, { useState,useRef } from "react";


const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const inputEl = useRef(null);
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
    console.log(inputEl)
    inputEl.current.focus();
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
      <form className="search">
        <input
          ref={inputEl}
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
    );
}

export default Search;