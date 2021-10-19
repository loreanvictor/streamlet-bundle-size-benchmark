import chalk from 'chalk'
import { table, getBorderCharacters } from 'table'

import { sampleMod, sampleFn } from './sample.mjs'
import { format } from './format.mjs'
import { cleanup } from './cleanup.mjs'


export async function benchmark(name, libs) {
  console.log(chalk`{magenta bundle}: {bold ${name}}`)

  const suites = Object.entries(libs).sort(() => Math.random() > .5 ? 1 : -1)
  const results = []

  for (const [lib, mod] of suites) {
    const res = await (typeof mod === 'string' ? sampleMod(mod) : sampleFn(lib, ...mod))
    results.push([lib, res.size, res.gzipped])

    console.log(chalk`  {green ✔} ${lib}`
      + chalk` {gray ${Array(32 - lib.length).join('.')} ${res.time}ms}`
    )
  }

  console.log()
  console.log(table(
    results
      .sort((a, b) => a[1] - b[1])
      .map(([lib, size, gzipped]) => ([
        chalk`{bold ${lib}}`,
        chalk`{green ${format(size)}}`,
        chalk`{green.bold ${format(gzipped)}}`,
      ])),
    {
      columns: {
        0: { width: 20 },
        1: { width: 30 },
        2: { width: 10 }
      },
      border: getBorderCharacters('norc')
    }
  ))
}
