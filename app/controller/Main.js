Ext.define('Imaginary.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            takePhotoBtn: '#takePhotoBtn',
            photoContainer: '#photos'
        },
        control: {
            takePhotoBtn: {
                tap: 'getPhoto'
            }
        }
    },

    originalImageUri: null,

    getPhoto: function() {
        var self = this;

        self.getCameraPicture(function(imageURI) {
            self.originalImageUri = imageURI;
            self.showPhotoPopup(imageURI);
        });

    },

    getCameraPicture: function(callback) {

        // if (Ext.browser.is.PhoneGap) {

        //     var onSuccess = function(imageURI) {
        //         if (callback) callback(imageURI);
        //     }

        //     var onFail = function(message) {
        //         alert('Failed because: ' + message);
        //         if (callback) callback();
        //     }

        //     navigator.camera.getPicture(onSuccess, onFail, {
        //         quality: 50,
        //         targetWidth: 1000,
        //         targetHeight: 1000,
        //         destinationType: navigator.camera.DestinationType.FILE_URI,
        //         mediaType: navigator.camera.MediaType.PICTURE,
        //         sourceType: navigator.camera.PictureSourceType.CAMERA,
        //         encodingType: navigator.camera.EncodingType.JPEG,
        //         correctOrientation: true,
        //         saveToPhotoAlbum: false
        //     });

        // } else {
            // Emulate captured image
            if (callback) callback('resources/images/test.jpg');
        // }

    },

    getEffects: function() {
        var effectsStore = Ext.getStore('Effects');
        var data = effectsStore.getData();
        return data ? data.all : null;
    },

    applyEffect: function(effect, thumbData, callback) {

        var img = new Image();

        img.onload = function () {

            var oc = document.createElement('canvas'),
                octx = oc.getContext('2d');

            oc.width = img.width;
            oc.height = img.height;

            octx.drawImage(img, 0, 0, img.width, img.height);

            P = new Pixastic(octx, 'resources/lib/');
            P[effect.name](effect.options).done(function() {
                var data = oc.toDataURL();
                if (callback) callback(data);
            }, function(p) {
                // display progress here;
            });

        };

        img.src = thumbData;

    },

    showPhotoPopup: function(imageURI) {
        
        var self = this;

        var popup = Ext.create('Imaginary.view.NewPicture');
        Ext.Viewport.add(popup);
        popup.show();

        var effects = self.getEffects();

        var effectsContainer = Ext.getCmp('effectsContainer');

        self.resizeImage(imageURI, function(thumbData) {

            effects.forEach(function(item) {

                var effect = item.getData();

                var effectImage = Ext.create('Ext.Img', {
                    src: thumbData,
                    height: 64,
                    width: 64,
                    margin: '2 2 2 2'
                });

                effectImage.on('tap', function() {
                    
                    var thumbs = effectsContainer.getItems();
                    var index = thumbs.items.indexOf(this);

                    popup.setMasked({ xclass: 'Imaginary.LoadMask' });
                    self.applyEffect(effects[index].data, self.originalImageUri, function(imageDataFiltered) {
                        self.setPreviewImage(imageDataFiltered);
                        popup.setMasked(false);
                    });

                });

                effectsContainer.add(effectImage);

            });

            var thumbs = effectsContainer.getItems();
            var i = 0;
            var item = thumbs.items[i];

            self.applyEffect(effects[i].data, thumbData, function cb(thumbDataFiltered) {
                if (i < thumbs.items.length-1) {
                    item.setSrc(thumbDataFiltered);
                    i++;
                    item = thumbs.items[i];
                    return self.applyEffect(effects[i].data, thumbData, cb);
                }
            });

        });

        popup.on('hide', function() {
            popup.destroy();
        });

        self.setPreviewImage(imageURI);

        Ext.getCmp('retakePhotoBtn').on('tap', function() {
            self.getCameraPicture(self.setPreviewImage);
        });

        Ext.getCmp('savePhotoBtn').on('tap', function() {
            var filteredImageURI = Ext.getCmp('photoPreview').getSrc();
            self.savePhoto(filteredImageURI, function() {
                popup.hide();
            });
        });

        Ext.getCmp('cancelPhotoBtn').on('tap', function() {
            popup.hide();
        });

    },

    setPreviewImage: function(imageURI) {
        Ext.getCmp('photoPreview').setSrc(imageURI);
    },

    resizeImage: function(imageURI, callback) {

        var img = new Image();

        img.onload = function () {

            var oc = document.createElement('canvas'),
                octx = oc.getContext('2d');

            var ratio = 160/img.width;

            var newWidth = img.width*ratio;
            var newHeight = img.height*ratio;
            oc.width = newWidth;
            oc.height = newHeight;
            octx.drawImage(img, 0, 0, newWidth, newHeight);

            if (callback) callback(oc.toDataURL());
        };

        img.src = imageURI;
    },

    copyPhotoToPersistentStore: function(fileURI, callback) {
        var self = this;

        self.saveToLibrary(fileURI, function(imageUrl) {
            console.log('Saved image to the library: ' + imageUrl);
            var d = new Date();
            var n = d.getTime();
            
            var newFileName = n + ".jpg";
            var myFolderApp = "Imaginary";

            var onError = function(error) {
                alert(error.code);
                if (callback) callback();
            }

            function convertDataURIToBinary(dataURI) {
                var BASE64_MARKER = ';base64,';
                var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
                var base64 = dataURI.substring(base64Index);
                var raw = window.atob(base64);
                var rawLength = raw.length;
                var array = new Uint8Array(new ArrayBuffer(rawLength));

                for (i = 0; i < rawLength; i++) {
                    array[i] = raw.charCodeAt(i);
                }
                return array;
            }

            var ui8a = convertDataURIToBinary(fileURI);
            var bb = new Blob([ui8a], { type: "image/jpeg" });

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
            function (fileSystem) {
                fileSystem.root.getFile(newFileName, {create: true, exclusive: false}, 
                    function (fileEntry) {
                        fileEntry.createWriter(function (writer) {

                            writer.onwrite = function(e) {

                                fileSystem.root.getDirectory(myFolderApp, {
                                    create: true,
                                    exclusive: false
                                },
                                function(directory) {
                                    fileEntry.copyTo(directory, newFileName, function(entry) {
                                        if (callback) callback(entry.toURL());
                                    }, onError);
                                },
                                onError);

                            };                        
                            writer.seek(0);
                            writer.write(bb);

                        }, onError);
                    }, onError);
            }, onError);
        });

    },

    saveToLibrary: function(base64Data, callback) {

        window.ImageToLibraryPlugin.saveToLibrary([base64Data], function(imageUrl) {
            if (callback) callback(imageUrl, null);
        }, function(error) {
            if (callback) callback();
        });

    },

    savePhoto: function(imageURI, callback) {
        
        var self = this;
        self.copyPhotoToPersistentStore(imageURI, function(persistentImageURI) {

            var picture = Ext.create('Imaginary.model.Picture', {
                url: persistentImageURI
            });
            var pictureStore = Ext.getStore('Pictures');
            pictureStore.add(picture);
            pictureStore.sync();
            
            var photoContainer = self.getPhotoContainer();
            Imaginary.app.getController('Pictures').addPictureToContainer(picture, photoContainer)

            if (callback) callback();

        })

    }

});