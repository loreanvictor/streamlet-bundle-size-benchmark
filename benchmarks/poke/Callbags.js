import {
  pipe,
  fromEvent,
  map,
  flatten,
  subscribe,
  tap,
  debounce,
  filter,
  fromPromise
} from 'callbag-common'
import catchError from 'callbag-catch-error'
import retry from 'callbag-retry'

const input = document.querySelector('input')
const pre = document.querySelector('pre')

pipe(
  fromEvent(input, 'input'),
  map(() => input.value.toLowerCase()),
  tap((i) => (pre.textContent = !!i ? 'LOADING ...' : '')),
  debounce(500),
  filter((i) => !!i),
  map((i) => fromPromise(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`))),
  flatten,
  map((r) => fromPromise(r.json())),
  flatten,
  map((v) => JSON.stringify(v, null, 2)),
  tap((v) => (pre.textContent = v)),
  catchError(() => (pre.textContent = 'COULD NOT LOAD')),
  retry(),
  subscribe(() => {})
)
