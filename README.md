<p align="center">
  <img src="logo.png" alt="comea logo">
</p>

[![version](https://img.shields.io/npm/v/@uneksija/comea.svg?style=flat)](https://npmjs.com/@uneksija/comea)
[![size](https://img.shields.io/github/size/uneksija/comea/index.js.svg?style=flat)]()
[![license](https://img.shields.io/github/license/uneksija/comea.svg?style=flat)]()

> Utilities for simplified observables

## Usage
Install:
```sh
npm install @uneksija/comea
```
Import:
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
```ts
just: (value: any) => Observable
```
Takes a value and returns an observable that emits just that value.

### from
```ts
from: (values: any[]) => Observable
```
Takes a list of values and returns an observable that emits each value at a time.

### periodic
```ts
periodic: (interval: number) => Observable
```
Takes an interval in milliseconds and returns an observable that emits `undefined` at that interval.

### map
```ts
map: (base: Observable, mapper: (value: any) => any) => Observable
```
Takes an observable and a function, returns an observable that applies the function to the values of the base observable and emits the results.

### flatMap
```ts
flatMap: (base: Observable, mapper: (value: any) => Observable) => Observable
```
Like map, applies a function to the values emitted by the base observable but expecting that function to return observables, then returns an observable that flattens the emissions of the generated observables.

### constant
```ts
constant: (base: Observable, value: any) => Observable
```
Takes an observable and a constant, returns an observable that emits the constant each time the base observable emits a value.

### take
```ts
take: (base: Observable, ammount: number) => Observable
```
Takes an observable and an ammount, returns an observable that emits that many events from the base observable.

### filter
```ts
filter: (base: Observable, predicate: (value: any) => boolean) => Observable
```
Takes an observable and a predicate, returns an observable that emits only the values from the base observable for which the predicate evaluates to true.

### scan
```ts
scan: (base: Observable, reducer: (state: any, value: any) => any, initial: any) => Observable
```
Takes an observable, a reducer and an initial value, returns an observable that emits the partial applications of the reducer on the values from the base observable. Where the reducer is a function that takes the current state and a value, then returns the next state.

### merge
```ts
merge: (...observables: Observable[]) => Observable
```
Takes some observables and returns an observable that emits events from all the base observables.

### combine
```ts
combine: (combiner: (...values: any) => any, ...observables: Observable[]) => Observable
```
Takes a combiner and some observables, returns an observable that emits the application of the combiner to the values of the base observables. Where the combiner is a function that receives the values in the same order as the observables were passed.

### zip
```ts
zip: (merger: (...values: any) => any, ...observables: Observable[]) => Observable
```
Takes a merger and some observables and returns an observable that emits the application of the merger to the values of the base observables. Where the merger is a function that receives the values in the same order as the observables were passed. The first emission will have the first events from all observables, and so on.

### debounce
```ts
debounce: (base: Observable, interval: number) => Observable
```
Takes an observable and an interval in milliseconds and returns an observable that emits events from the base observable with at least that much interval between emissions, ignoring events emitted during this interval.

### delay
```ts
delay: (base: Observable, interval: number) => Observable
```
Takes an observable and an interval in milliseconds and returns an observable that emits events from the base observable delayed by that much time.

### endWhen
```ts
endWhen: (base: Observable, limiter: Observable) => Observable
```
Takes two observables, a base and a limiter, and returns an observable that emits events from the base observable until the limiter observable emits an event.

## Motivation

## License

MIT
