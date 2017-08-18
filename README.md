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
```hs
just :: a -> Observable
```

```hs
from :: [a] -> Observable
```

```hs
periodic :: a -> Observable
```

```hs
map :: Observable -> (a -> b) -> Observable
```

```hs
constant :: Observable -> a -> Observable
```

```hs
filter :: Observable -> (a -> Bool) -> Observable
```

```hs
scan :: Observable -> (a -> b -> a) -> a -> Observable
```

```hs
merge :: ...Observable -> Observable
```

```hs
combine :: (a -> b) -> ...Observable -> Observable
```

## Motivation

## License
MIT
