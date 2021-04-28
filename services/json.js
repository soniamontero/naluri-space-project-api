const fs = require("fs");

const readJson = async (file) => {
  const parsedData = await new Promise((res, rej) => {
    fs.readFile(file, (err, data) => {
      try {
        res(data && data.length ? JSON.parse(data) : {});
      } catch (error) {
        console.log(error);
        rej(error);
      }
    });
  });
  return parsedData || {};
};

const writeJson = (object, file) => {
  let data = JSON.stringify(object, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
  fs.writeFileSync(file, data);
};

module.exports.readJson = readJson;
module.exports.writeJson = writeJson;
