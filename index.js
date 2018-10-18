/**
 * @file Maybe is a simple monadic-like interface for handling
 * null-checking
 * @module Maybe
 */

/**
 * @interface MaybeInterface
 * @memberof Maybe
 * @template T
 */

/**
 * @function
 * @name map
 * @memberof MaybeInterface
 * @param { function ( T ) : U } transform a morphism from T to U
 * @return { MaybeInterface.<U> }
 * @template T, U 
 */

/**
 * @function fold
 * @name fold
 * @memberof MaybeInterface
 * @param { function () : U } transformNothing callback to be invoked by Nothing instances
 * @param { function ( T ) : U } transformJust callback to be invoked by Just instances
 * @return { U }
 * 
 * @template T, U
 */

/**
 * @exports Maybe
 */
const Maybe = module.exports = (function (){
  const _Maybe = function Maybe () {
    this[Symbol.species] = _Maybe
  }
  /**
   * @implements { MaybeInterface }
   * @param { T } a
   * @constructs Maybe.Just
   * @memberof Maybe
   * @template T
   */
  function Just (a) {
    function toString () {
      return `Just(${a})`
    }
    return Object.assign(new _Maybe(), {
      map (transform) {
        return Maybe.of(transform(a))
      },
      fold (transformNothing, transformJust) {
        return transformJust(a)
      },
      inspect: toString,
      toString
    })
  }

  /**
   * @implements { MaybeInterface }
   * @constructs Maybe.Nothing
   * @memberof Maybe
   */
  function Nothing () {
    function toString () {
      return `Nothing()`
    }
    return Object.assign(new _Maybe(), {
      map (transform) {
        return Maybe.Nothing()
      },
      fold (transformNothing, transformJust) {
        return transformNothing()
      },
      inspect: toString,
      toString
    })
  }
  const _Nothing = Nothing()
  Object.freeze(_Nothing)

  return {
    of(x) {
      return (x === null || x === undefined)
        ? _Nothing
        : x instanceof _Maybe
          ? x.map(Maybe.of)
          : Maybe.Just(x)
    },
    Nothing: () => _Nothing,
    Just
  }
}())
