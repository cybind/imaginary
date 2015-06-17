Ext.define('Imaginary.model.Picture', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'url', type: 'string' }
        ]
    }
});
