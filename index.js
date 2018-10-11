function Just (a) {
  function toString () {
    return `Just(${a})`
  }
  return {
    map (trasnform) {
      return Just(trasnform(a))
    },
    chain (trasnform) {
      return trasnform(a)
    },
    fold (transformNothing, transformJust) {
      return transformJust(a)
    },
    inspect: toString,
    toString
  }
}

function Nothing () {
  function toString () {
    return `Nothing()`
  }
  return {
    map (trasnform) {
      return Maybe.Nothing()
    },
    chain (trasnform) {
      return Maybe.Nothing()
    },
    fold (transformNothing, transformJust) {
      return transformNothing()
    },
    inspect: toString,
    toString
  }
}
const _Nothing = Nothing()
Object.freeze(_Nothing)

module.exposts = {
  of(x) {
    return Maybe.Just(x)
  },
  Nothing: () => _Nothing,
  Just
}