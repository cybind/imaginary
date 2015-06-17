cordova.define("com.cybind.imaginary.imagetolibrary.imagetolibrary", function(require, exports, module) { var exec = require('cordova/exec');

var ImageToLibraryPlugin = {
    saveToLibrary: function(types, success, fail) {
        console.log('calling ImageToLibraryPlugin.js');
        exec(success, fail, "ImageToLibraryPlugin", "saveImage", types);
    }
};

module.exports = ImageToLibraryPlugin;

});
