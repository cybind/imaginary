Ext.define('Imaginary.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Button',
        'Ext.Img'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'New Photo',
                iconCls: 'lens',

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
                                xtype: 'button',
                                id: 'takePhotoBtn',
                                text: 'Take Photo',
                                iconCls: 'photo',
                                iconAlign: 'top',
                                height: 70,
                                width: 120,
                                padding: 10,
                                margin: 5
                            }
                        ]
                    }

                ]

            },
            {
                title: 'My Photos',
                iconCls: 'gallery',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'My Photos'
                    },
                    {
                        xtype: 'container',
                        id: 'photos',
                        width: '100%',
                        height: '100%',
                        scrollable: {
                            direction: 'vertical',
                            directionLock: true
                        }
                    }                    
                ]
            }
        ]
    }
});
