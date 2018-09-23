module.exports = {
    presets: [ "@babel/env" ],
    
    plugins: [
        [ "@babel/plugin-proposal-class-properties", {
            loose: true
        } ],
        [ "babel-plugin-transform-builtin-extend", {
            globals: [ "Error" ]
        } ]
    ]
};
