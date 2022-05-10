import { useState, useRef } from "react";

import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  const [searchLimit, setSearchLimit] = useState(0);

  const hasError = props.errorMessage.trim() != "";

  const userInputRef = useRef();
  const searchRangeRef = useRef();

  const searchLimitChangeHandler = () => {
    setSearchLimit(searchRangeRef.current.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.onFormSubmit({
      searchUser: userInputRef.current.value,
      searchLimit: searchRangeRef.current.value,
    });
  };

  const formClasses = `${classes.form} ${
    props.displayForm ? "" : classes.invisible
  }`;
  const errorClasses = `${classes.error} ${hasError ? "" : classes.invisible}`;

  return (
    <form className={formClasses} onSubmit={onFormSubmit}>
      <label htmlFor="user">{props.userInputLabel}</label>
      <input
        className={classes["user-input"]}
        type="text"
        id="user"
        ref={userInputRef}
      />
      <label htmlFor="search-limit">Search limit: {searchLimit}</label>
      <input
        type="range"
        id="search-limit"
        min="0"
        max="50"
        onChange={searchLimitChangeHandler}
        ref={searchRangeRef}
      />
      <div class={errorClasses}>{props.errorMessage}</div>
      <button>Submit</button>
    </form>
  );
};

export default SearchForm;
