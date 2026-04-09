import { setImage, uploadImage } from '@/tv-api'

const dist = `${import.meta.dir}/../dist/`
const name = `image-alpha.jpeg`
const path = dist + name

await uploadImage(path)
await setImage(name)