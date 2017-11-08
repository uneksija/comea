<p align="center">
  <img src="logo.png" alt="comea logo">
</p>

> Utilities for simplified observables

## Usage
```js
import { /* functions */ } from 'comea'
```

## Definitions
**Observer:** A function that receives some data over time and does something with it.
```js
const observer = data => doSomething(data)
```

**Observable:** A function that receives an observer and calls it with data.
```js
const observable = next => next(130)
const number$ = next => [1, 2, 3].forEach(next)
```

The next example will build a timer observable and a logger observer within these concepts:

```js
const timer = next => {
  let i = 0
  next(i)
  setInterval(_ => {
    i++
    next(i)
  }, 1000)
}
const logger = data => console.log('data:', data)
```

To bind them we call the observable passing the observer as a parameter:
```js
timer(logger)

// data: 0
// data: 1
// data: 2
```

## API

### just
```hs
just :: a -> Observable
```
Takes a value and returns an observable that emits just that value.

### from
```hs
from :: [a] -> Observable
```
Takes a list of values and returns an observable that emits each value at a time.

### periodic
```hs
periodic :: a -> Observable
```
Takes an interval in milliseconds and returns an observable that emits `undefined` at that interval.

### map
```hs
map :: Observable -> (a -> b) -> Observable
```
Takes an observable and a function, returns an observable that applies the function to the values of the base observable and emits the results.

### flatMap
```hs
flatMap :: Observable -> (a -> Observable) -> Observable
```
Like map, applies a function to the values emitted by the base observable but expecting that function to return observables, then returns an observable that flattens the emissions of the generated observables.

### constant
```hs
constant :: Observable -> a -> Observable
```
Takes an observable and a constant, returns an observable that emits the constant each time the base observable emits a value.

### filter
```hs
filter :: Observable -> (a -> Bool) -> Observable
```
Takes an observable and a predicate, returns an observable that emits only the values from the base observable for which the predicate evaluates to true.

### scan
```hs
scan :: Observable -> (a -> b -> a) -> a -> Observable
```
Takes an observable, a reducer and an initial value, returns an observable that emits the partial applications of the reducer on the values from the base observable. Where the reducer is a function that takes the current state and a value, then returns the next state.

### merge
```hs
merge :: ...Observable -> Observable
```
Takes some observables and returns an observable that emits events from all the base observables.

### combine
```hs
combine :: (...a -> b) -> ...Observable -> Observable
```
Takes a combiner and some observables, returns an observable that emits the application of the combiner to the values of the base observables. Where the combiner is a function that receives the values in the same order as the observables were passed.

### debounce
```hs
debounce :: Observable -> a -> Observable
```
Takes an observable and an interval in milliseconds and returns an observable that emits events from the base observable with at least that much interval between emissions, ignoring events emitted during this interval.

### endWhen
```hs
endWhen :: Observable -> Observable -> Observable
```
Takes two observables, a base and a limiter, and returns an observable that emits events from the base observable until the limiter observable emits an event.

### zip
```hs
zip :: (...a -> b) -> ...Observable -> Observable
```
Takes a merger and some observables and returns an observable that emits the application of the merger to the values of the base observables. Where the merger is a function that receives the values in the same order as the observables were passed. The first emission will have the first events from all observables, and so on.

### take
```hs
take :: Observable -> a -> Observable
```
Takes an observable and an ammount, returns an observable that emits that many events from the base observable.

## Motivation

## License

MIT
