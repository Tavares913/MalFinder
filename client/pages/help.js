import Head from "next/head";

import classes from "../styles/Help.module.css";

const Help = () => {
  return (
    <div className={classes.main}>
      <Head>
        <title>Help</title>
      </Head>
      <section>
        <h1>How does the searching work?</h1>
        <p>
          The searching is currently based on pepople&apos;s favourites, and
          maybe I&apos;ll implement searching based on their anime/manga lists
          later. People&apos;s favourties are scraped from their profile pages,
          and compared to one another. Doing so sends one request to mal per
          user, which is why the searches may take some time. It&apos;s the time
          between each request is currently set to (2 seconds) * (the number of
          people currently searching at the time of search initiation). This
          means that if you begin a search with a limit of 20 people while 4
          others are still searching, it&apos;ll take 80 seconds + request time
          to mal (probably another (search limit / 3) seconds).
        </p>
      </section>
      <section>
        <h1>Friend list search:</h1>
        <p>
          This search function goes through all of the friends that a user has,
          and compares the favourites you have on your profile to each friend,
          then returns the results. (especially useful on profiles that have
          many friends)
        </p>
      </section>
      <section>
        <h1>Tree search:</h1>
        <p>
          This search function compares your favourties to a user, then goes
          into all of their friends and compares their friends&apos; favourtites
          to yours, then goes into those people&apos;s friends, etc. It&apos;s a
          breadth first search.
        </p>
      </section>
    </div>
  );
};

export default Help;
