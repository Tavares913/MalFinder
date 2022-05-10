const getFriendsData = require("../../utils/friendsData/getFriendsData");
const getFriendsFromFriends = require("../../utils/friendsData/getFriendsFromFriends");
const getProfileData = require("../../utils/profileData/getProfileData");
const getFavourites = require("../../utils/profileData/getFavourites");
const sameFavourites = require("../../utils/compareFavourites/sameFavourites");
const sleep = require("../../utils/sleep");

// searchByFriend() returns a list of all favourites in common between rootUser and the friends of searchUser
const searchByFriend = async (req, res) => {
  const { rootUser, searchUser, searchLimit, sleepTime } = req.body;

  const rootProfileData = await getProfileData(rootUser);

  if (!rootProfileData) {
    return res.json({
      message:
        "Couldn't perform search. Please verify that you entered the data correctly",
    });
  }

  const rootFavourites = getFavourites(rootProfileData);
  const searchUserFriendsData = await getFriendsData(searchUser);

  if (!searchUserFriendsData) {
    return res.json({
      message:
        "Couldn't perform search. Please verify that you entered the search user's username correctly",
    });
  }

  const searchUserFriends = getFriendsFromFriends(searchUserFriendsData);

  let comparedFavourites = [];
  let i = 0;
  for (let friend of searchUserFriends) {
    if (friend == rootUser) {
      continue;
    }

    await sleep(sleepTime);
    const curFriendProfileData = await getProfileData(friend);

    if (!curFriendProfileData) {
      continue;
    }

    const curFriendFavourites = getFavourites(curFriendProfileData);

    const rootAndCurFriendSameFavourites = sameFavourites(
      rootFavourites,
      curFriendFavourites
    );

    const userAndComparedFavs = {
      user: friend,
      comparedFavourites: rootAndCurFriendSameFavourites,
    };

    comparedFavourites.push(userAndComparedFavs);
    i++;
    if (i == searchLimit) {
      break;
    }
  }

  comparedFavourites.sort((elem1, elem2) => {
    if (
      elem1.comparedFavourites.totalSame > elem2.comparedFavourites.totalSame
    ) {
      return -1;
    }
    return 1;
  });

  res.json(comparedFavourites);
};

export default searchByFriend;
