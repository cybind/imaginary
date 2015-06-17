Ext.define('Imaginary.LoadMask', {
    extend: 'Ext.LoadMask',
    xtype: 'loadmask',

    config: {
        message: '',
    	html: '<div class="loader"><div class="item-1"><span></span></div><div class="item-2"><span></span></div><div class="item-3"><span></span></div><div class="item-4"><span></span></div><div class="item-5"><span></span></div><div class="item-6"><span></span></div></div>',
        indicator: false,
        zIndex: 3000
    }
});