module.exports = {
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [require('daisyui'), require('@tailwindcss/typography')],
    purge: {
        // Filenames to scan for classes
        content: [
            './src/**/*.html',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.ts',
            './src/**/*.tsx',
            './public/index.html',
        ],
        // Options passed to PurgeCSS
        options: {
            safelist: [/data-theme$/],
        },
    },
    daisyui: {
        styled: true,
        themes: true,
        rtl: false,
    },
    theme: {
        extend: {
            colors: require('daisyui/colors'),
        },
    },
}
