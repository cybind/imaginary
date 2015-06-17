Ext.define('Imaginary.store.Effects', {
    extend: 'Ext.data.Store',
    requires: ['Imaginary.model.Effect'],
    config: {
        storeId: 'Effects',
        model: 'Imaginary.model.Effect',
        data: [
            { name: 'posterize', options: { levels: 5 } },
            { name: 'solarize' },
            { name: 'colorfilter', options: { r: 0, g: 194 / 255, b: 177 / 255, luminosity : 0} },
            { name: 'findedges'},
            { name: 'emboss', options: { amount: 0.5, angle: 135 / 180 * Math.PI} },
            { name: 'edgeenhance3x3'},
            { name: 'edgeenhance5x5'},
            { name: 'sharpen3x3', options: { strength: 0.5} },
            { name: 'sharpen5x5', options: { strength: 0.1} },
            { name: 'soften3x3'},
            { name: 'soften5x5'},
            { name: 'laplace3x3'},
            { name: 'laplace5x5'},
            { name: 'crossedges', options: { strength: 0.5} },
            { name: 'coloradjust', options: { r : 0, g : 0.3, b : 0 } },
            { name: 'blur', options: { kernelSize: 5 } },
            { name: 'glow', options: { kernelSize: 5, amount: 1.0 } },
            { name: 'hsl', options: { hue: -0.8, saturation: 0.5, lightness: -0.3 } },
            { name: 'fliph' },
            { name: 'flipv' },
            { name: 'desaturate' },
            { name: 'brightness', options: { brightness: -1.00, contrast: -0.1 } },
            { name: 'sepia' },
            { name: 'invert' },
            { name: 'noise', options: { amount: 0.5, strength: 0.5, mono: true } },
            { name: 'removenoise'},
            { name: 'lighten', options: { amount: 0.5 } },
            { name: 'mosaic', options: { blockSize: 8 } },
            { name: 'equalize'}
        ]
    }
});