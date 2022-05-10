import { useState } from "react";
import classes from "./ComparedFavourite.module.css";

const ComparedFavourite = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const comparedObj = props.compared;
  const index = props.index;

  const { user } = comparedObj;
  const { animeSame } = comparedObj.comparedFavourites.anime;
  const { mangaSame } = comparedObj.comparedFavourites.manga;
  const { charactersSame } = comparedObj.comparedFavourites.characters;
  const { peopleSame } = comparedObj.comparedFavourites.people;
  const { totalSame } = comparedObj.comparedFavourites;

  const showDetailsHandler = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const detailsSectionClasses = `${classes["details-info"]} ${
    !showDetails ? classes.invisible : ""
  }`;

  return (
    <div className={classes.main}>
      <section className={classes["summary-info"]}>
        <span>{index}.</span>
        <span>{user}</span>
        <div className={classes["total-same-button"]}>
          <span>{totalSame} shared</span>
          <button onClick={showDetailsHandler}>
            {showDetails ? "▲" : "▼"}
          </button>
        </div>
      </section>
      <section className={detailsSectionClasses}>
        <p>
          You and {user} share {totalSame} favourited items in common.
        </p>
        <h2>Anime in common:</h2>
        {animeSame.length > 0 && (
          <ol>
            {animeSame.map((anime, index) => (
              <p>
                {index + 1}. {anime}
              </p>
            ))}
          </ol>
        )}
        {animeSame.length == 0 && <p>No anime in common.</p>}
        <h2>Manga in common:</h2>
        {mangaSame.length > 0 && (
          <ol>
            {mangaSame.map((manga, index) => (
              <p>
                {index + 1}. {manga}
              </p>
            ))}
          </ol>
        )}
        {mangaSame.length == 0 && <p>No manga in common.</p>}
        <h2>Characters in common:</h2>
        {charactersSame.length > 0 && (
          <ol>
            {charactersSame.map((character, index) => (
              <p>
                {index + 1}. {character.name} ({character.source})
              </p>
            ))}
          </ol>
        )}
        {charactersSame.length == 0 && <p>No characters in common.</p>}
        <h2>People in common:</h2>
        {peopleSame.length > 0 && (
          <ol>
            {peopleSame.map((person, index) => (
              <p>
                {index + 1}. {person}
              </p>
            ))}
          </ol>
        )}
        {peopleSame.length == 0 && <p>No people in common.</p>}
        <a
          className={classes["profile-link"]}
          href={`https://myanimelist.net/profile/${user}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Profile
        </a>
      </section>
    </div>
  );
};

export default ComparedFavourite;
