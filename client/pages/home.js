import Link from "next/link";
import Head from "next/head";

import classes from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={classes.main}>
      <Head>
        <title>Home</title>
      </Head>
      <h1>There are two different ways you can search for users:</h1>
      <section className={classes["search-methods"]}>
        <div>
          <Link href="/search/byFriendList" passHref>
            <span>Search by Friend List</span>
          </Link>
          <p>
            Compare your favourties to the friends of another person&apos;s
            profile
          </p>
        </div>
        <div>
          <Link href="search/byTree" passHref>
            <span>Search by Tree</span>
          </Link>
          <p>
            Compare your favourites to people&apos;s friends using a tree search
            with another person&apos;s profile as the place to start the search
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
