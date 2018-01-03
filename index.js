/**
 * Takes a combiner and some observables, returns an observable that emits the
 * application of the combiner to the values of the base observables. Where the
 * combiner is a function that receives the values in the same order as the
 * observables were passed
 */
const combine = (combiner, ...observables) => next => {
  let state = Array(observables.length)

  observables.forEach((base, index) =>
    base(value => {
      state[index] = value

      if (Object.keys(state).length === state.length) next(combiner(...state))
    })
  )
}

/**
 * Takes an observable and a constant, returns an observable that emits the
 * constant each time the base observable emits a value
 */
const constant = (base, value) => map(base, () => value)

/**
 * Takes an observable and an interval in milliseconds and returns an observable
 * that emits events from the base observable with at least that much interval
 * between emissions, ignoring events emitted during this interval
 */
const debounce = (base, interval) => next => {
  let stamp = Date.now() - interval
  base(value => {
    const now = Date.now()
    if (now >= stamp + interval) {
      next(value)
      stamp = now
    }
  })
}

/**
 * Takes an observable and an interval in milliseconds and returns an observable
 * that emits events from the base observable delayed by that much time
 */
const delay = (base, interval) => next =>
  base(value => setTimeout(() => next(value), interval))

/**
 * Takes two observables, a base and a limiter, and returns an observable that
 * emits events from the base observable until the limiter observable emits an
 * event
 */
const endWhen = (base, limiter) => next => {
  let emit = true

  limiter(() => (emit = false))
  base(value => emit && next(value))
}

/**
 * Takes an observable and a predicate, returns an observable that emits only
 * the values from the base observable for which the predicate evaluates to true
 */
const filter = (base, predicate) => next =>
  base(value => predicate(value) && next(value))

/**
 * Like map, applies a function to the values emitted by the base observable but
 * expecting that function to return observables, then returns an observable
 * that flattens the emissions of the generated observables
 */
const flatMap = (base, mapper) => next => base(value => mapper(value)(next))

/**
 * Takes a list of values and returns an observable that emits each value at a
 * time
 */
const from = values => next => values.forEach(next)

/**
 * Takes a value and returns an observable that emits just that value
 */
const just = value => next => next(value)

/**
 * Takes an observable and a function, returns an observable that applies the
 * function to the values of the base observable and emits the results
 */
const map = (base, mapper) => next => base(value => next(mapper(value)))

/**
 * Takes some observables and returns an observable that emits events from all
 * the base observables
 */
const merge = (...observables) => next =>
  observables.forEach(base => base(next))

/**
 * Takes an interval in milliseconds and returns an observable that emits
 * `undefined` at that interval
 */
const periodic = interval => next => setInterval(next, interval)

/**
 * Takes two observables, a base and a trigger, the resulting observable will
 * emit the last event from the base each time it receives an event from the
 * trigger
 */
const sample = (base, trigger) => next => {
  let lastValue
  base(value => (lastValue = value))
  trigger(() => next(lastValue))
}

/**
 * Takes an observable, a reducer and an initial value, returns an observable
 * that emits the partial applications of the reducer on the values from the
 * base observable. Where the reducer is a function that takes the current
 * state and a value, then returns the next state
 */
const scan = (base, reducer, initial) => next => {
  let state = initial
  next(state)
  base(value => {
    state = reducer(state, value)
    next(state)
  })
}

/**
 * Takes an observable and an ammount, returns an observable that emits that
 * many events from the base observable
 */
const take = (base, ammount) => next =>
  base(value => ammount-- > 0 && next(value))

/**
 * Takes a merger and some observables and returns an observable that emits the
 * application of the merger to the values of the base observables. Where the
 * merger is a function that receives the values in the same order as the
 * observables were passed. The first emission will have the first events from
 * all observables, and so on
 */
const zip = (merger, ...observables) => next => {
  const stock = Array.from(({ length } = observables), () => []),
    checkStock = () => stock.every(list => list.length),
    emit = () => next(merger(...stock.map(list => list.shift())))

  observables.forEach((base, index) =>
    base(value => {
      stock[index].push(value)

      checkStock() && emit()
    })
  )
}

export {
  combine,
  constant,
  debounce,
  delay,
  endWhen,
  filter,
  flatMap,
  from,
  just,
  map,
  merge,
  periodic,
  sample,
  scan,
  take,
  zip
}
