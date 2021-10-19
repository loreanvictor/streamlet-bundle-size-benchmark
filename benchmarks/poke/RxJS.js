import {
  from,
  fromEvent,
  map,
  switchMap,
  tap,
  debounceTime,
  filter,
  retry
} from 'rxjs'

const input = document.querySelector('input')
const pre = document.querySelector('pre')

fromEvent(input, 'input')
  .pipe(
    map(() => input.value.toLowerCase()),
    tap((i) => (pre.textContent = !!i ? 'LOADING ...' : '')),
    debounceTime(500),
    filter((i) => !!i),
    switchMap((i) => from(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`))),
    switchMap((r) => from(r.json())),
    map((v) => JSON.stringify(v, null, 2)),
    tap({
      next: (v) => (pre.textContent = v),
      error: () => (pre.textContent = 'COULD NOT LOAD')
    }),
    retry()
  )
  .subscribe()
