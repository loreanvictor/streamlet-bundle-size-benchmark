import chalk from 'chalk'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

export async function listVersions(packages) {
  const lock = require('../../package-lock.json')

  console.log(chalk`{gray installed packages:}`)
  packages.forEach((pkg, index) => {
    const last = index === packages.length - 1
    const version = lock.dependencies[pkg].version
    console.log(chalk.gray('│'))
    console.log(
      chalk.gray(last ? '└─' : '├─')
      + chalk` {bgRgb(42, 42, 42).yellow ${pkg}@${version}}`
    )
  })

  console.log('')
}
