module.exports = require("babel-jest").createTransformer({
  presets: ["@babel/env", "@babel/react"],
  sourceMaps: "inline",
  retainLines: true
});
