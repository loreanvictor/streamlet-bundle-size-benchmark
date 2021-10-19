import { join } from 'path';


export function normalize(path) {
  return join(...path.split('/').map(_ => _.split('\\')).flat())
}
