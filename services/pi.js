const { readJson, writeJson } = require("./json");

const displayPi = async () => {
  return (await getLatestPi()).pi;
};

const getLatestPi = async () => {
  return await readJson("./stores/pi.json");
};

const startCalculatePi = async () => {
  let parsedData = await getLatestPi();
  let pi = parsedData.pi || "",
    q = parsedData.q ? BigInt(parsedData.q) : 1n,
    r = parsedData.r ? BigInt(parsedData.r) : 180n,
    t = parsedData.t ? BigInt(parsedData.t) : 60n,
    i = parsedData.i ? BigInt(parsedData.i) : 2n,
    y = parsedData.y ? BigInt(parsedData.y) : undefined,
    u = parsedData.u ? BigInt(parsedData.u) : undefined;

  const calculation = () => {
    y = (q * (27n * i - 12n) + 5n * r) / (5n * t);
    u = 3n * (3n * i + 1n) * (3n * i + 2n);
    r = 10n * u * (q * (5n * i - 2n) + r - y * t);
    q = 10n * q * i * (2n * i - 1n);
    t = t * u;
    i = i + 1n;

    pi += y.toString();

    return setTimeout(() => {
      writeJson({ pi, q, r, t, i, y, u }, "./stores/pi.json");
      calculation(q, r, t, i, y, u);
    }, 1000);
  };
  calculation(q, r, t, i, y, u);
};

module.exports.startCalculatePi = startCalculatePi;
module.exports.displayPi = displayPi;
