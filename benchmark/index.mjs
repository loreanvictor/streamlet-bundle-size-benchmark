import { sampleFn } from './util/sample.mjs'
import { format } from './util/format.mjs'
import { cleanup } from './util/cleanup.mjs'


sampleFn('callbag-common', 'map')
  .then(res => {
    console.log(format(res.size))
    console.log(format(res.gzipped))
  })
  .then(cleanup)
