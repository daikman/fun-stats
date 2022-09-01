// terser for minification
import { terser } from 'rollup-plugin-terser'

// rollup configuration object
export default {
    input: 'src/render.js',
    external: ['handlebars'],
    output: [
        // non-minified file for debugging etc.
        {
            file: "js/render.js",
            format: "iife",
            name: "window",
            extend: true,
            globals: {
                'handlebars': 'Handlebars'
            }
        },
        // minified file for distribution
        {
            file: "js/render.min.js",
            format: "iife",
            name: "window",
            extend: true,
            globals: {
                'handlebars': 'Handlebars'
            },
            plugins: [
                terser({
                    arguments: true
                })
            ]
        }
    ]   
}