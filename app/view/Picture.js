Ext.define('Imaginary.view.Picture', {
    extend: 'Ext.Panel',
    xtype: 'picture',
    requires: [
        'Ext.TitleBar',
        'Ext.Button',
        'Ext.Img'
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
                        flex: 9
                    },
                    {
                        xtype: 'container',
                        width: '100%',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            pack: 'center',
                            align: 'center'
                        },
                        items: [
                            {
                                xtype: 'button',
                                id: 'deletePhotoBtn',
                                text: 'Delete',
                                iconCls: 'trash',
                                ui: 'decline',
                                flext: 1,
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: 'button',
                                id: 'closePhotoBtn',
                                text: 'Close',
                                iconCls: 'delete',
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
