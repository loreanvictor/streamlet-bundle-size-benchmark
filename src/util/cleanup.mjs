import { readdir, rm, unlink } from 'fs/promises'
import { join } from 'path'


export async function cleanup() {
  try {
    await rm('.parcel-cache', { recursive: true })
    for (let file of await readdir('dist')) {
      if (file !== 'PLACEHOLDER') {
        await unlink(join('dist', file))
      }
    }
  } catch {}
}
