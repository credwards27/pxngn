// Dependencies
const webpack = require("webpack"),
    path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            }
        ]
    },
    
    mode: "development",
    watch: false
};
