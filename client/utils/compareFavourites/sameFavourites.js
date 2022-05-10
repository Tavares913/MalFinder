// sameFavourites() retuns an object of common favourites between favs1 and favs2
const sameFavourites = (favs1, favs2) => {
  const same = {
    anime: { numAnimeSame: 0, animeSame: [] },
    manga: { numMangaSame: 0, mangaSame: [] },
    characters: { numCharactersSame: 0, charactersSame: [] },
    people: { numPeopleSame: 0, peopleSame: [] },
    totalSame: 0,
  };

  for (let lst1Fav of favs1.anime) {
    for (let lst2Fav of favs2.anime) {
      if (lst1Fav == lst2Fav) {
        same.anime.numAnimeSame++;
        same.anime.animeSame.push(lst1Fav);
        same.totalSame++;
      }
    }
  }

  for (let lst1Fav of favs1.manga) {
    for (let lst2Fav of favs2.manga) {
      if (lst1Fav == lst2Fav) {
        same.manga.numMangaSame++;
        same.manga.mangaSame.push(lst1Fav);
        same.totalSame++;
      }
    }
  }

  for (let lst1Fav of favs1.characters) {
    for (let lst2Fav of favs2.characters) {
      if (lst1Fav.name == lst2Fav.name) {
        same.characters.numCharactersSame++;
        same.characters.charactersSame.push(lst1Fav);
        same.totalSame++;
      }
    }
  }

  for (let lst1Fav of favs1.people) {
    for (let lst2Fav of favs2.people) {
      if (lst1Fav == lst2Fav) {
        same.people.numPeopleSame++;
        same.people.peopleSame.push(lst1Fav);
        same.totalSame++;
      }
    }
  }

  return same;
};

module.exports = sameFavourites;
