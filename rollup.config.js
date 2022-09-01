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
        {
            file: "dist/fun-stats.min.js",
            format: "iife",
            name: "window",
            extend: true,
            globals: {
                'chart.js': 'Chart'
            },
            intro
        },
        {
            file: "npm/fun-stats.js",
            format: "cjs",
            name: "fnst",
            globals: {
                'chart.js': 'Chart',
            },
            intro
        }
    ]   
}