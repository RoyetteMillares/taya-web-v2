const path = require("path");

module.exports = {
  resolve: {
    modulesDirectories: ["stylesheets"],
    extensions: ["", ".js", ".ts", ".less", ".css", ".html"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
};
