import Head from "next/head";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { useRef } from "react";
import { useRouter } from "next/router";

import classes from "../styles/index.module.css";

const Home = () => {
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const usernameSubmissionHandler = (event) => {
    event.preventDefault();
    dispatch(userActions.setRootUser(usernameRef.current.value));
    router.push("/home");
  };

  return (
    <div className={classes.main}>
      <Head>
        <title>MalFinder</title>
      </Head>

      <h1>MalFinder</h1>
      <p>
        Welcome to MalFinder, a simple app that lets you find other MAL users
        who share similar favourites.
      </p>
      <form className={classes.form} onSubmit={usernameSubmissionHandler}>
        <label htmlFor="username">Please enter your mal username:</label>
        <input type="text" id="username" ref={usernameRef} />
        <button>Enter</button>
      </form>
    </div>
  );
};

export default Home;
