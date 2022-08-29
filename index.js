// calculate the expected value of a discrete random variable
function E(X, P) {
    // check array
    if (!Array.isArray(X) | !Array.isArray(P)) {
        console.error("Arguments X and P must be arrays")
        return
    }

    // check length
    if (X.length != P.length) {
        console.error("Array X and P must be equal lengths")
        return
    }

    // check P sums to 1
    let sumP
    for (let p of P) {
        sumP += p
    }
    if (Math.abs(1 - sumP) > 0.0004) {
        console.error("Array P must sum to 1")
        return
    }

    let sumPx = 0
    for (let i = 0; i < X.length; i++) {
        sumPx += X[i]*P[i]
    }
    
    return sumPx
}

// calculate the variance of a discrete random variable
function Var(X, P) {
    const exp = E(X, P)
    let Var = 0
    for (let i = 0; i < X.length; i++) {
        Var += (X[i] - exp)*(X[i] - exp)*P[i]
    }
    return Var
}

// calculate the standard deviation of a discrete random variable
function stDev(X, P) {
    return Math.sqrt(Var(X, P))
}

// calculate the probability of a single value on a Poisson distribution
function poisson(x, L) {
    const num = (Math.pow(e, -L)*Math.pow(L, x))
    const dom = factorial(x)
    if (num == Infinity & dom == Infinity) return 0
    
    return num/dom
}

// calculate the sum of the probability of all discrete values up to x on a Poisson distribution
function poCD(x, L) {
    let sum = 0
    for (let i = 0; i <= Math.floor(x); i++) {
        sum += Math.pow(L, i)/factorial(i)
    }
    return Math.pow(e, -L)*sum
}

// caluculate the expected value of a poisson distribution
function poE(L) {
    return L
}

// calculate the variance of a poisson distribution
function poVar(L) {
    return L
}

// calculate the probability of observing x "successes" in n trials, given the probablity of a single success
function binomial(x, n, p) {
    const q = 1 - p
    return combinations(n, x)*Math.pow(p, x)*Math.pow(q, n - x)
}

// calculate the porbabilty of observing less than or equal to x successes in n trials
function biCD(x, n, p) {
    if (x > n) {
        console.error("x must be less than or equal to n")
    }

    let sum = 0
    for (let i = 0; i < x + 1; i++) {
        sum += combinations(n, i)*Math.pow(p, i)*Math.pow(1 - p, n - i)
    }

    return sum
}

// calculate the expected value (mean) of a binomial distribution
function biE(n, p) {
    return n*p
}

// calculate the variance of a binomial distribution
function biVar(n, p) {
    return n*p*(1-p)
}

// calculate the probability of "success" on a given trial in a series of independant trials with equal probability of success
function geo(x, p) {
    const q = 1 - p
    return p*Math.pow(q, x - 1)
}

function geoE(p) {
    return 1/p
}

function geoVar(p) {
    return (1 - p)/Math.pow(p, 2)
}

// calculate the cumulative density of a geometric distribution
function geoCD(x, p) {
    return 1 - Math.pow(1 - p, x)
}

// calculate the number of trials needed to get a fixed number of successes
// n = number of trials, r = number of success, p = prob of one success
function negBinomial(n, r, p) {
    return combinations(n - 1, r - 1)*Math.pow(p, r)*Math.pow(1 - p, n - r)
}

// calculate the probability that exactly r successes will result from less than or equal to n trials
function negBiCD(n, r, p) {
    let sum = 0
    for (let i = 2; i < n + 1; i++) {
        sum += negBinomial(i, r, p)
    }
    return sum
}

// calculate the expected value (mean) of a negative binomial distribution
function negBiE(r, p) {
    return r/p
}

// calculate the variance of a negative binomial distribution
function negBiVar(r, p) {
    return (r*(1 - p))/(p*p)
}

// probabilty density of a value on a normal distribution
function norm(x, mu, sd) {
    const a = 1/(sd*Math.sqrt(2*pi))
    const exp = -0.5*Math.pow((x - mu)/sd, 2)

    return a*Math.pow(e, exp)
}

// calculate the cumulative density of a values up to x on a normal distribution
function normCD(x, mu, sd) {

    // approximation adapted from https://stackoverflow.com/a/5263759
    var z = (x-mu)/Math.sqrt(2*sd*sd);
    var t = 1/(1+0.3275911*Math.abs(z));
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var erf = 1 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    var sign = 1;
    if(z < 0) sign = -1;

    return (1/2)*(1 + sign*erf);
}

// UTITILTY DEFINITIONS
const e = 2.718281828
const pi = 3.14159265359

function factorial(x) {
    if (x==0) return 1
    return x * factorial(x-1)
}

function prodRange(a,b) {
    let prd = a, i = a;
   
    while (i++ < b) {
      prd *= i;
    }

    return prd;
}
   
function combinations(n, r) {
    if (n==r || r==0) return 1;

    r=(r < n-r) ? n-r : r;
    return prodRange(r+1, n)/prodRange(1,n-r);
}

if ("module" in window) {
    module.exports = {
        E, Var, stDev, poisson, poCD, 
        poE, poVar, binomial, biCD, 
        biE, biVar, geo, geoE, geoVar, 
        geoCD, negBinomial, negBiE, 
        negBiCD, negBiVar, norm, normCD
    }
}