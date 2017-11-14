const combine = (combiner, ...observables) => next => {
  let state = Array(observables.length)

  observables.forEach((base, index) =>
    base(value => {
      state[index] = value

      if (Object.keys(state).length === state.length) next(combiner(...state))
    })
  )
}

const constant = (base, value) => map(base, () => value)

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

const delay = (base, interval) => next =>
  base(value => setTimeout(() => next(value), interval))

const endWhen = (base, limiter) => next => {
  let emit = true

  limiter(() => (emit = false))
  base(value => emit && next(value))
}

const filter = (base, predicate) => next =>
  base(value => predicate(value) && next(value))

const flatMap = (base, mapper) => next => base(value => mapper(value)(next))

const from = values => next => values.forEach(next)

const just = value => next => next(value)

const map = (base, mapper) => next => base(value => next(mapper(value)))

const merge = (...observables) => next =>
  observables.forEach(base => base(next))

const periodic = interval => next => setInterval(next, interval)

const sample = (base, trigger) => next => {
  let lastValue
  base(value => (lastValue = value))
  trigger(() => next(lastValue))
}

const scan = (base, reducer, initial) => next => {
  let state = initial
  next(state)
  base(value => {
    state = reducer(state, value)
    next(state)
  })
}

const take = (base, ammount) => next =>
  base(value => ammount-- > 0 && next(value))

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
