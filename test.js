const fnst = require("fun-stats")

let results = []

const norm = fnst.norm(1, 0, 1) == 0.2419707245395666
results.push(norm)

const fails = results.filter(r => !r)

if (fails.length == 0) console.log("All tests passed :)")
