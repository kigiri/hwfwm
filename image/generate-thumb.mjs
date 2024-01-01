import sharp from 'sharp'
import { readdir } from 'node:fs/promises'

const sizes = [48, 96 /*, 192, 384*/]

console.log(sizes)

// const inputFolder = 'images'

const formats = [/*'avif',*/ 'webp']
for (const filename of await readdir('.')) {
  if (!filename.endsWith('.png')) continue
  console.log({ filename })
  const name = filename.slice(0, filename.lastIndexOf('.'))
  const inputPath = `./${filename}`
  if (/_[0-9+]$/.test(name) || name === 'unk') {
    for (const format of formats) {
      await Promise.all(
        sizes.map(size =>
          sharp(inputPath)
            .resize(size)
            .toFormat(format, { quality: 75 })
            .toFile(`./${name}_${size}.${format}`),
        ),
      )
    }
  } else {
    await Promise.all(
      formats.map(format =>
        sharp(inputPath)
          .toFormat(format, { quality: 75 })
          .toFile(`./${name}.${format}`),
      ),
    )
  }
}
