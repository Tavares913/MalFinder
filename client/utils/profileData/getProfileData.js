const axios = require("axios");
const cheerio = require("cheerio");

// getProfileData() returns the raw profile data of user
const getProfileData = async (user) => {
  let response;
  try {
    response = await axios.get(`https://myanimelist.net/profile/${user}`);
  } catch (e) {
    return false;
  }
  const $ = cheerio.load(response.data);
  return $;
};

module.exports = getProfileData;
