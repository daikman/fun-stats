import Handlebars from "../../node_modules/handlebars/lib/handlebars"

export function fullDocs() {
    fetch('./README.md')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = marked.parse(data)
        })
}

export function demo() {
    fetch('./src/demo.handlebars')
        .then(response => response.text())
        .then(t => {
            const demoTemplate = Handlebars.compile(t, null)
            document.getElementById('content').innerHTML = demoTemplate()
            renderPlot()
        })
}

export function getDownloads() {
    fetch('https://api.npmjs.org/downloads/point/last-week/fun-stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('downloads').innerHTML = marked.parse(
                "**" + data.downloads + ` downloads** 
                \nin the last 7 days`
            )
        })
}

export function getVersion() {
    fetch('https://registry.npmjs.org/fun-stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('version').textContent = "v" + data["dist-tags"].latest
        })
}

export function args(f) {
    // adapted from https://stackoverflow.com/a/9924463
    const comments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const names = /([^\s,]+)/g;
    const fnStr = f.toString().replace(comments, '');
    let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(names);
    if(result === null) return []
    return result;
}

export function renderPlot() {
    const n = document.getElementById('n-slider').value
    const p = document.getElementById('p-slider').value/100

    plot(binomial, {x: [ ...Array(20).keys() ], n, p}, "plot")

    // update slider text
    document.getElementById('n-label').textContent = "n = " + n
    document.getElementById('p-label').textContent = "p = " + p

}

// getDownloads()
getVersion()
// demo()
fullDocs()