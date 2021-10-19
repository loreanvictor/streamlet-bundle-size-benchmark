import { pipe, interval, map, filter, tap, observe } from 'streamlets'

pipe(
  interval(1000),
  map(x => x + 1),
  filter(x => x % 2 === 0),
  tap(x => console.log(x)),
  observe,
)
