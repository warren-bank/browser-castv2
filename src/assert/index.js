const assert = (is_true) => {
  if (!is_true) throw new Error('assertion not true')
}

module.exports = assert
