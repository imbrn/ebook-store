module.exports = require("babel-jest").createTransformer({
  presets: ["@babel/env", "@babel/react"],
  plugins: ["@babel/plugin-syntax-class-properties"],
  sourceMaps: "inline",
  retainLines: true
});
