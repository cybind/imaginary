Ext.define('Imaginary.controller.Pictures', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            photoContainer: '#photos'
        }
    },

    launch: function() {
        
        var pictures = this.getPictures();
        var photoContainer = this.getPhotoContainer();

        for (var i = 0; i < pictures.length; i++) {
            this.addPictureToContainer(pictures[i], photoContainer);
        }

    },

    getPictures: function() {
        var pictureStore = Ext.getStore('Pictures');
        var data = pictureStore.getData();
        return data ? data.all : null;
    },


    addPictureToContainer: function(picture, container) {

        var self = this;

        var thumb = Ext.create('Ext.Img', {
            src: picture.get('url'),
            height: 80,
            width: '20%',
            border: 3,
            style: 'float: left; border-color: white; border-style: solid;'
        });

        thumb.picture = picture;

        thumb.on('tap', function() {
            
            var thumb = this;

            var popup = Ext.create('Imaginary.view.Picture');
            Ext.Viewport.add(popup);
            popup.show();

            popup.on('hide', function() {
                popup.destroy();
            });

            Ext.getCmp('photoPreview').setSrc(thumb.picture.get('url'));

            Ext.getCmp('deletePhotoBtn').on('tap', function() {
                Ext.Msg.confirm("Confirmation", "Are you sure you want to delete this picture?", function(buttonId, value, opt) {
                    if (buttonId == 'yes') {
                        self.deletePicture(thumb);
                        popup.hide();
                    }
                });
            });

            Ext.getCmp('closePhotoBtn').on('tap', function() {
                popup.hide();
            });

        });

        container.add(thumb);

    },

    deletePicture: function(thumb) {

        // delete from file system
        var fileURI = thumb.picture.get('url');
        fileURI = '/Imaginary/' + fileURI.substring(fileURI.lastIndexOf('/')+1);
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
            fileSys.root.getFile(fileURI, {create: false, exclusive: false}, function(fileEntry) {
                fileEntry.remove(onSuccess, onError);
            }, onError);        
        },
        onError);

        var onSuccess = function(entry) {
            console.log("Removal succeeded");
        }

        var onError = function(error) {
            console.log("Error removing file: " + error.code);
        }

        // delete from database
        var pictureStore = Ext.getStore('Pictures');
        pictureStore.remove(thumb.picture);

        // delete from view
        thumb.destroy();
    }

});
