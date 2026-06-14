import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import sharp from 'sharp'
import ffmpeg from '@ffmpeg-installer/ffmpeg'

const run = promisify(execFile)
const root = process.cwd()

const images = [
  ['public/assets/drift-camp.png', 'public/assets/drift-camp.webp', { width: 1600, quality: 76 }],
  ['public/assets/reca.png', 'public/assets/reca.webp', { width: 1600, quality: 76 }],
  ['public/assets/cad-editor.png', 'public/assets/cad-editor.webp', { width: 1600, quality: 78 }],
  ['public/works/mirage-poster.png', 'public/works/mirage-poster.webp', { width: 585, quality: 72 }],
  ['public/assets/avatar.jpg', 'public/assets/avatar.webp', { width: 215, quality: 82 }],
]

async function optimizeImage([input, output, options]) {
  const inputPath = path.join(root, input)
  const outputPath = path.join(root, output)
  await sharp(inputPath)
    .resize({ width: options.width, withoutEnlargement: true })
    .webp({ quality: options.quality, effort: 6 })
    .toFile(outputPath)
}

async function optimizeVideo() {
  const input = path.join(root, 'public/assets/mirage-wake-full.mp4')
  const fallbackInput = input
  const source = path.join(root, '.media-source/mirage-wake.source.mp4')
  const temp = `${input}.tmp.mp4`

  await fs.mkdir(path.dirname(source), { recursive: true })
  try {
    await fs.copyFile(fallbackInput, source, fs.constants.COPYFILE_EXCL)
  } catch (error) {
    if (error.code !== 'EEXIST') throw error
  }

  await run(ffmpeg.path, [
    '-y',
    '-i', source,
    '-vf', 'scale=480:-2',
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '31',
    '-pix_fmt', 'yuv420p',
    '-r', '30',
    '-c:a', 'aac',
    '-b:a', '72k',
    '-movflags', '+faststart',
    temp,
  ])

  await fs.rename(temp, input)
}

await Promise.all(images.map(optimizeImage))
await optimizeVideo()
