// getFriendsFromFriends() returns the list of friends from the cheerio data passed to it from the freinds page of user
const getFriendsFromFriends = ($) => {
  const friendsArr = $("div[class='boxlist-container friend mb16']")
    .text()
    .replace(/\n\n/g, "")
    .replace(/ /g, "")
    .replace(
      /(\d\d?minutes?ago)|(Friendssince...\d\d?,(\d\d\d\d)?\d\d?:\d\d(A|P)M)|(\d\d?hours?ago)|(Friendssince(Yesterday|(\d days ago)),\d\d?:\d\d(A|P)M)|((Yesterday|(\d days ago)),\d\d?:\d\d(A|P)M)|(...\d\d?,\d\d?:\d\d(A|P)M)|(...\d\d?,\d\d\d\d\d\d?:\d\d(A|P)M)/g,
      ""
    )
    .replace(/\n\n/g, " ")
    .trim()
    .replace(/\n/g, " ")
    .replace(/  /g, "")
    .split(" ");

  return friendsArr;
};

module.exports = getFriendsFromFriends;
