import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ComparedFavourite from "../../components/ComparedFavourite";
import SearchForm from "../../components/SearchForm";
import socket from "../../utils/socketConnect";
import classes from "../../styles/ByFriendList.module.css";
import sleep from "../../utils/sleep";

const ByFriendList = () => {
  const [friendFavourites, setFriendFavourites] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [foundNone, setFoundNone] = useState(false);
  const [displayForm, setDisplayForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTimeMessage, setSearchTimeMessage] = useState(0);

  const router = useRouter();
  const rootUser = useSelector((state) => state.user.rootUser);

  let numClients = null;

  useEffect(() => {
    socket.on(
      "num-clients-searching-response",
      (numClientsSearching) => (numClients = numClientsSearching)
    );
  }, []);

  const submitHandler = async (formData) => {
    setIsLoading(true);
    if (!rootUser) {
      router.push("/");
      setIsLoading(false);
      return;
    }

    if (formData.searchUser.trim() == "") {
      setErrorMessage("Please enter a username");
      setIsLoading(false);
      return;
    }

    socket.emit("begin-search");
    socket.emit("num-clients-searching");
    await sleep(1000);
    setSearchTimeMessage(numClients * 2 * formData.searchLimit);

    if (!numClients) {
      setErrorMessage(
        "Sorry, could not communicate with server. Please try again."
      );
      return;
    }

    try {
      const { data: friendsAndFavourites } = await axios.post(
        "/api/searchByFriend",
        {
          rootUser,
          searchUser: formData.searchUser,
          searchLimit: formData.searchLimit,
          sleepTime: numClients * 2000,
        }
      );

      setSearchTimeMessage(0);
      socket.emit("end-search");

      if (!Array.isArray(friendsAndFavourites)) {
        setErrorMessage(friendsAndFavourites.message);
        setIsLoading(false);
        return;
      } else if (friendsAndFavourites.length == 0) {
        setFoundNone(true);
        setIsLoading(false);
        return;
      }

      setFriendFavourites(friendsAndFavourites);
      setErrorMessage("");
      setFoundNone(false);
      setDisplayForm(false);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
    }
  };

  return (
    <>
      <Head>
        <title>Search by Friend</title>
      </Head>
      <SearchForm
        onFormSubmit={submitHandler}
        errorMessage={errorMessage}
        displayForm={displayForm}
        userInputLabel="Enter the user whose friend list to search through:"
      />
      <div className={classes["compared-favourites"]}>
        {friendFavourites.length > 0 &&
          friendFavourites.map((elem, index) => (
            <ComparedFavourite compared={elem} index={index + 1} key={index} />
          ))}
        {foundNone && <p className={classes["found-none"]}>Found none</p>}
        {isLoading && <div className={classes["loading-spinner"]}></div>}
        {searchTimeMessage > 0 && (
          <p>
            It&apos;ll take about {searchTimeMessage} seconds to complete your
            search.
          </p>
        )}
      </div>
    </>
  );
};

export default ByFriendList;
