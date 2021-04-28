const express = require("express");
const app = express();
const port = 8000;
const { displayPi, startCalculatePi } = require("./services/pi");
const cors = require("cors");

startCalculatePi();

app.use(cors());

app.get("/", async (req, res) => {
  res.json(await displayPi());
});

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});
