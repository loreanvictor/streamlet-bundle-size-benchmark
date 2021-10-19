import { readdir } from 'fs/promises'
import { join } from 'path'

import { benchmark } from './util/benchmark.mjs'
import { cleanup } from './util/cleanup.mjs'


const run = async () => {
  await cleanup()

  for (let bench of await readdir('benchmarks')) {
    const suites = {}
    for (let lib of await readdir(join('benchmarks', bench))) {
      const name = lib.replace(/\.js$/, '')
      suites[name] = join('benchmarks', bench, lib)
    }

    await benchmark(bench, suites)
  }

  await benchmark('map()', {
    rxjs: ['map'],
    streamlets: ['map'],
    'callbag-common': ['map'],
  })

  await benchmark('interval()', {
    rxjs: ['interval'],
    streamlets: ['interval'],
    'callbag-common': ['interval'],
  })

  await benchmark('flatten() + map()', {
    rxjs: ['switchMap'],
    streamlets: ['map', 'flatten'],
    'callbag-common': ['map', 'flatten'],
  })

  await cleanup()
}

run()