# Fundamental statistics
This package contains functions for calculating probability denisities, cumulative densities, expected values and variances of a few fundamental distribution functions.

To use this package, you can use this script tag in an HTML page:

```
<script src="https://unpkg.com/fun-stats@latest/index.js"></script>
```

Or you can use npm.

```
npm i fun-stats
```

Note that if you use npm, the function calls in the examples below might need to be implemented differently. For example:

```
// using script tag
binomial(3, 10, 0.5)

// using npm
const fnst = require("fun-stats")

fnst.binomial(3, 10, 0.5)
```

## Binomial distribution
Functions `binomial`, `biCD`, `biE`, `biVar` all relate to the binomial distribution. 
This distribution describes a situation with a binary outcome. Conventionally, one of the two outcomes is labelled as a "success". However, there doesn't have to be anything especially successful about that particular outcome.

A good example of when you would want to use a binomial distribution is modelling a series of coin flips.

### Probability mass function
`binomial(x, n, p)` calculates the probability of observing `x` successes in `n` trials, given the probablity of a single success (`p`)

Example: calculate the probability of observing 3 heads in a series of 10 flips
```
// you observe three heads
const x = 3

// you flipped the coin 10 times
const n = 10

// there is a 50% chance of observing heads on each flip
const p = 0.5

const answer = binomial(x, n, p)
// 0.1171875, or ~12% probability of seeing exacty 
// 3 heads in 10 coin flips
```

### Cumulative probability function
`biCD(x, n, p)` calculates the porbabilty of observing **less than or equal to `x` successes** in `n` trials, given the probablity of a single success (`p`).

Example: calculate the probabilty of observing 5 or fewer heads in a series of 10 coin flips
```
// five or fewer heads
const x = 5

// the coin was flipped 10 times
const n = 10

// there is a 50% chance of observing a heads on each flip
const p = 0.5

const answer = biCD(x, n, p)
// 0.623046875, or ~62% probability of seeing 5 or 
// fewer heads in 10 coin flips
```

### Expected value and variance
The expected value of a binomial distribution refers to the number of successes you would expect to observe in a given number of trials.
The variance of a binomial distribution tells us how far the outcomes are expected to deviate from the expected value.

```
// n = 10, number of coin flips
// p = 0.5, probability of heads each flip

const expected = biE(10, 0.5)
const variance = biVar(10, 0.5)
```
