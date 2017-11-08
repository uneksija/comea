const combine = (combiner, ...observables) => next => {
  let state = Array(observables.length)

  observables.forEach((base, index) => base(value => {
    state[index] = value

    if(Object.keys(state).length === state.length)
      next(combiner(...state))
  }))
}

const constant = (base, value) => map(base, () => value)

const filter = (base, predicate) => next =>
  base(value => predicate(value) && next(value))

const flatMap = (base, mapper) => next =>
  base(value => mapper(value)(next))

const from = values => next => values.forEach(next)

const just = value => next => next(value)

const map = (base, mapper) => next =>
  base(value => next(mapper(value)))

const merge = (...observables) => next =>
  observables.forEach(base => base(next))

const periodic = interval => next => setInterval(next, interval)

const scan = (base, reducer, initial) => next => {
  let state = initial
  next(state)
  base(value => {
    state = reducer(state, value)
    next(state)
  })
}

export {
  combine,
  constant,
  filter,
  flatMap,
  from,
  just,
  map,
  merge,
  periodic,
  scan,
}
