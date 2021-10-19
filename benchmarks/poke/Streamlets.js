import {
  pipe,
  fetch,
  event,
  map,
  flatten,
  observe,
  tap,
  debounce,
  filter,
  promise,
  retry,
  finalize
} from 'streamlets'

const input = document.querySelector('input')
const pre = document.querySelector('pre')

pipe(
  event(input, 'input'),
  map(() => input.value.toLowerCase()),
  tap((i) => (pre.textContent = !!i ? 'LOADING ...' : '')),
  debounce(500),
  filter((i) => !!i),
  map((i) => fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)),
  flatten,
  map((r) => promise(r.json())),
  flatten,
  map((v) => JSON.stringify(v, null, 2)),
  tap((v) => (pre.textContent = v)),
  finalize(() => (pre.textContent = 'COULD NOT LOAD')),
  retry,
  observe
)
