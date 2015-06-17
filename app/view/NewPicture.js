Ext.define('Imaginary.view.NewPicture', {
    extend: 'Ext.Panel',
    xtype: 'newpicture',
    requires: [
        'Ext.TitleBar',
        'Ext.Button',
        'Ext.Img',
        'Ext.field.Text'
    ],
    config: {
        height: '100%',
        width: '100%',
        centered: true,
        showAnimation: 'slideIn',
        hideAnimation: 'slideOut',
        hidden: true,
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'New Photo'
            },
            {
                xtype: 'container',
                width: '100%',
                height: '100%',
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'image',
                        id: 'photoPreview',
                        width: '100%',
                        flex: 8
                    },
                    {
                        xtype: 'container',
                        id: 'effectsContainer',
                        flex: 1,
                        width: '100%',
                        layout: {
                            type: 'hbox',
                            pack: 'center',
                            align: 'center'
                        },
                        scrollable: {
                            direction: 'horizontal',
                            directionLock: true
                        }
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            pack: 'center',
                            align: 'center'
                        },
                        items: [
                            {
                                xtype: 'button',
                                id: 'retakePhotoBtn',
                                text: 'Retake',
                                flext: 1,
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: 'button',
                                id: 'savePhotoBtn',
                                text: 'Save',
                                flext: 1,
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: 'button',
                                id: 'cancelPhotoBtn',
                                text: 'Close',
                                flext: 1,
                                margin: '0 5 0 5'
                            }

                        ]
                    }
                ]
            }
        ]
    }
});
