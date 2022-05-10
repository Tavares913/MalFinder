import Link from "next/link";
import Head from "next/head";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Luxurious+Script&family=Roboto+Mono:wght@200&family=Roboto:wght@100&display=swap"
          rel="stylesheet"
        />
      </Head>

      <nav className={classes.navbar}>
        <section className={classes["main-logo"]}>
          <Link href="/">MalFinder</Link>
        </section>
        <section className={classes["navbar-links"]}>
          <Link href="/home">
            <span className={classes.link}>Home</span>
          </Link>
          <Link href="/search/byFriendList">
            <span className={classes.link}>Search by Friend List</span>
          </Link>
          <Link href="/search/byTree">
            <span className={classes.link}>Search by Tree</span>
          </Link>
          <Link href="/help">
            <span className={classes.link}>Help</span>
          </Link>
        </section>
      </nav>

      <div>{props.children}</div>

      <footer className={classes.footer}>
        <span className={classes["footer-content"]}></span>
      </footer>
    </>
  );
};

export default Layout;
