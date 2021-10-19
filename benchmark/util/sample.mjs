import { Parcel } from '@parcel/core'
import { join } from 'path'
import { writeFile, stat} from 'fs/promises'


export async function sample(content) {
  try {
    const app = await writeFile(join('dist', 'app.js'), content)

    const bundler = new Parcel({
      entries: 'index.html',
      mode: 'production'
    })

    const {bundleGraph, changedAssets} = await bundler.run()
    let size = 0
    let gzipped = 0

    for (let bundle of bundleGraph.getBundles()) {
      if (bundle.filePath.endsWith('.js')) {
        size += bundle.stats.size
        gzipped += (await stat(join(bundle.filePath + '.gz'))).size
      }
    }

    return { size, gzipped }
  } catch (err) {
    console.error(err)
  }
}

export async function sampleFn(lib, ...func) {
  return sample(`import { ${func.join(',')} } from "${lib}"; ${func.map(f => `console.log(${f})`).join(';')}`)
}

