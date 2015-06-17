Ext.define('Imaginary.store.Pictures',{
    extend:'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage', 'Imaginary.model.Picture'],
    config:{
        model:'Imaginary.model.Picture', 
        storeId: 'Pictures',
        autoLoad: true,
        autoSync: true,
        proxy:{
            type:'localstorage'
        }
    }
});