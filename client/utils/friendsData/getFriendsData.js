const axios = require("axios");
const cheerio = require("cheerio");

// getFriendsData() returns the cheerio data from the friends page of user
const getFriendsData = async (user) => {
  let response;
  try {
    response = await axios.get(
      `https://myanimelist.net/profile/${user}/friends`
    );
  } catch (e) {
    return false;
  }

  const $ = cheerio.load(response.data);

  return $;
};

module.exports = getFriendsData;
