const axios = require("axios");
const cheerio = require("cheerio");

const getRecentOnlineUsersHandler = async (req, res) => {
  const { data } = await axios.get("https://myanimelist.net/users.php");
  const $ = cheerio.load(data);

  const recentUsers = $("td.borderClass")
    .text()
    .replace(/ /g, "")
    .replace(/\n/g, "")
    .replace(/\dseconds?ago/g, " ")
    .split(" ");

  recentUsers.pop();

  res.json(recentUsers);
};

export default getRecentOnlineUsersHandler;
