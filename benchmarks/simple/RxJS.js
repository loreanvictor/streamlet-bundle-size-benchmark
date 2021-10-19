import { interval, map, filter } from 'rxjs'

interval(1000).pipe(
  map(x => x + 1),
  filter(x => x % 2 === 0)
).subscribe(x => console.log(x))
