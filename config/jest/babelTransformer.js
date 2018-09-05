module.exports = require("babel-jest").createTransformer({
  presets: ["env"],
  sourceMaps: "inline",
  retainLines: true
});
