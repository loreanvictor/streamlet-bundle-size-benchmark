import { pipe, interval, map, filter, subscribe } from 'callbag-common'

pipe(
  interval(1000),
  map(x => x + 1),
  filter(x => x % 2 === 0),
  subscribe(x => console.log(x)),
)
