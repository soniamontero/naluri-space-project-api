const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Bali!");
});

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});
