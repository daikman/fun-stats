// terser for minification
import { terser } from 'rollup-plugin-terser'

// liscence and copyright info
const intro = `
/*!
 * fun-stats v1.0.6
 * https://www.github.com/daikman/fun-stats#readme
 * (c) 2022 David Aikman
 * Released under the MIT License
*/
`

// rollup configuration object
export default {
    input: 'src/fun-stats.js',
    external: ['chart.js'],
    output: [
        // non-minified file for debugging etc.
        {
            file: "dist/fun-stats.js",
            format: "iife",
            name: "window",
            extend: true,
            globals: {
                'chart.js': 'Chart'
            },
            intro
        },
        // minified file for distribution
        {
            file: "dist/fun-stats.min.js",
            format: "iife",
            name: "window",
            extend: true,
            globals: {
                'chart.js': 'Chart'
            },
            intro,
            plugins: [terser()]
        }
    ]   
}