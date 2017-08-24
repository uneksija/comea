const constant = (base, value) => map(base, () => value)

const filter = (base, predicate) => next =>
  base(value => predicate(value) && next(value))

const from = values => next => values.forEach(next)

const just = value => next => next(value)

const map = (base, mapper) => next =>
  base(value => next(mapper(value)))

const periodic = interval => next => setInverval(next, interval)

const scan = (base, reducer, initial) => next => {
  let state = initial
  base(value => {
    state = reducer(state, value)
    next(state)
  })
}

export {
  constant,
  filter,
  from,
  just,
  map,
  periodic,
  scan,
}
