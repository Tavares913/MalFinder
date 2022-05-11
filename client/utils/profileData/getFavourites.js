// removeComments() removes all of the comments from an array of page elements
const removeComments = (favArr) => {
  let result = [];
  for (let i = 0; i < favArr.length; i++) {
    if (favArr[i].includes("All Comments")) {
      return result;
    }
    result.push(favArr[i]);
  }
  return result;
};

// makeFavObj() returns an object of the user's favourites using an array of profile page elements
const makeFavObj = (favArr) => {
  let obj = {
    anime: [],
    manga: [],
    characters: [],
    people: [],
  };
  for (let i = 0; i < favArr.length; i++) {
    if (favArr[i].includes("Anime (")) {
      const num = parseInt(favArr[i].replace(/[^0-9]/g, ""));
      for (let j = i + 1; j <= i + num; j++) {
        obj.anime.push(favArr[j]);
      }
    } else if (favArr[i].includes("Manga (")) {
      const num = parseInt(favArr[i].replace(/[^0-9]/g, ""));

      for (let j = i + 1; j <= i + num; j++) {
        obj.manga.push(favArr[j]);
      }
    } else if (favArr[i].includes("Character (")) {
      const num = parseInt(favArr[i].replace(/[^0-9]/g, ""));
      for (let j = i + 1; j <= i + 2 * num; j += 2) {
        obj.characters.push({ name: favArr[j], source: favArr[j + 1] });
      }
    } else if (favArr[i].includes("People (")) {
      const num = parseInt(favArr[i].replace(/[^0-9]/g, ""));
      for (let j = i + 1; j <= i + num; j++) {
        obj.people.push(favArr[j]);
      }
    }
  }

  return obj;
};

// Returns an object of the user's favourites given the raw profile data
const getFavourites = ($) => {
  const strFavs = $("div[class='container-right']")
    .text()
    .replaceAll("\n", "")
    .replaceAll(/ {2,}/g, "  ")
    .replaceAll(/.+?(?=Favorites)/g, "")
    .replace("Favorites ", "")
    .split("  ");

  let favArr = strFavs.filter(
    (elem) =>
      !(
        elem.includes("TV·") ||
        elem.includes("Manga·") ||
        elem.includes("ONA·") ||
        elem.includes("Movie·") ||
        elem.includes("Light Novel·")
      )
  );

  favArr = removeComments(favArr);
  const favs = makeFavObj(favArr);

  return favs;
};

module.exports = getFavourites;
