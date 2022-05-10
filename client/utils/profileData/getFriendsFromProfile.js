// getFriendsFromProfie() returns the first 10 friends of user from their profile page
const getFriendsFromProfile = ($) => {
  const friends = [];
  let i = 1;
  while (i <= 10) {
    const friend = $(
      `div[class='user-friends pt4 pb12'] a:nth-child(${i})`
    ).text();

    if (friend && friend.trim() != "") {
      friends.push(friend);
    } else if (i == 10) {
      break;
    }

    i++;
  }
  return friends;
};

module.exports = getFriendsFromProfile;
