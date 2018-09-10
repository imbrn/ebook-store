const path = require("path");

const projectRoot = process.cwd();
const srcPath = path.resolve(projectRoot, "src");

module.exports = {
  verbose: true,
  roots: [srcPath],
  transform: { "\\.js$": "<rootDir>/babelTransformer.js" },
  setupFiles: ["<rootDir>/setup.js"],
  setupTestFrameworkScriptFile: "<rootDir>/setupTestFramework.js",
  moduleNameMapper: {
    "\\.css$": "<rootDir>/mocks/styleMock.js",
    "\\.svg$": "<rootDir>/mocks/svgMock.js"
  }
};
