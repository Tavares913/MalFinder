const getProfileData = require("../../utils/profileData/getProfileData");
const getFavourites = require("../../utils/profileData/getFavourites");
const sameFavourites = require("../../utils/compareFavourites/sameFavourites");
const getFriendsFromProfile = require("../../utils/profileData/getFriendsFromProfile");

const profilesVisistedContainsUser = (profilesVisited, friend) => {
  for (let profile of profilesVisited) {
    if (profile.user == friend) {
      return true;
    }
  }
  return false;
};

const removeFirst = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    swap(arr, i, i + 1);
  }
  arr.pop();
};

const swap = (arr, a, b) => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const testTree = async () => {
  const rootUser = "Tavares913";
  const searchUser = "snoopydragon";
  const searchLimit = 5;

  const rootUserProfileData = await getProfileData(rootUser);

  console.log("after first profile data");

  const rootUserFavourites = getFavourites(rootUserProfileData);

  console.log("after first get favourites");

  const queue = [];
  const profilesVisited = [];

  queue.push(searchUser);

  while (queue.length !== 0) {
    if (profilesVisited.length >= searchLimit) {
      break;
    }
    const curUser = queue[0];

    if (
      profilesVisistedContainsUser(profilesVisited, curUser) ||
      curUser == rootUser
    ) {
      removeFirst(queue);
      continue;
    }

    const curUserProfileData = await getProfileData(curUser);
    if (!curUserProfileData) {
      continue;
    }
    const curUserFriends = getFriendsFromProfile(curUserProfileData);
    const curUserFavourites = getFavourites(curUserProfileData);
    const curComparedFavourites = sameFavourites(
      rootUserFavourites,
      curUserFavourites
    );
    const curUserAndCurComparedFavourites = {
      user: curUser,
      comparedFavourites: curComparedFavourites,
    };

    if (curUserFriends.length !== 0) {
      curUserFriends.forEach((friend) => {
        if (
          !profilesVisistedContainsUser(profilesVisited, friend) &&
          friend !== rootUser
        ) {
          queue.push(friend);
        }
      });
    }

    profilesVisited.push(curUserAndCurComparedFavourites);
    removeFirst(queue);
  }

  console.log("after loop");

  const sortedComparedFavourites = profilesVisited.sort((elem1, elem2) => {
    if (
      elem1.comparedFavourites.totalSame > elem2.comparedFavourites.totalSame
    ) {
      return -1;
    }
    return 1;
  });

  console.log("final result: " + sortedComparedFavourites);
};

exports.handler = testTree;
