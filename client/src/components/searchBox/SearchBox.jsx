import React, { useState } from "react";

import { ReactComponent as SearchIcon } from "../../img/icon.svg";
import { withRouter } from "react-router-dom";

import styles from "./searchBox.module.scss";

const SearchBox = ({ history }) => {
  const [showInput, setShowInput] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <>
      {showInput ? (
        <div className={styles.searchIcon}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div
              className={styles.inputIcon}
              onClick={() => setShowInput(false)}
            >
              <SearchIcon />
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.searchIcon} onClick={() => setShowInput(true)}>
          <SearchIcon />
        </div>
      )}
    </>
  );
};

export default withRouter(SearchBox);
