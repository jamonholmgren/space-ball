const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a

const keyForValue = (object, value) => Object.keys(object).find(key => object[key] === value)

module.exports = { rand, keyForValue }
