# Comea
> Utilities for simplified observables :eyes:

## Usage
```js
import { /* functions */ } from 'comea'
```

## Definitions
**Observer:** A function that receives some data over time and do something with it.
```js
const observer = data => doSomething(data)
```

**Observable:** A function that receives a observer and call it with data.
```js
const observable = next => next(130)
const number$ = next => [1, 2, 3].forEach(next)
```

The next example will build a timer observable and a logger observer with these concepts:
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

To bind the two we call the observable passing the observer as a parameter:
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
Takes a value and returns a observable that emits just that value.

### from
```hs
from :: [a] -> Observable
```
Takes a list of values and returns a observable that emits each value at a time.

### periodic
```hs
periodic :: a -> Observable
```
Takes a interval in milliseconds and returns a observable that emits `undefined` at that interval.

### map
```hs
map :: Observable -> (a -> b) -> Observable
```
Takes a observable and a function, returns a observable that apply the function to the values of the base observable and emits the results.

### constant
```hs
constant :: Observable -> a -> Observable
```
Takes a observable and a constant, returns a observable that emits the constant each time the base observable emits a value.

### filter
```hs
filter :: Observable -> (a -> Bool) -> Observable
```
Takes a observable and a predicate, returns a observable that emits only the values from the base observable for wich the predicate evaluates to true.

### scan
```hs
scan :: Observable -> (a -> b -> a) -> a -> Observable
```

### merge
```hs
merge :: ...Observable -> Observable
```

### combine
```hs
combine :: (a -> b) -> ...Observable -> Observable
```

## Motivation

## License
MIT
