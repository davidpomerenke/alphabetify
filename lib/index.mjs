import { transform } from './transform.mjs'
import fs from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const relativePath = a => join(dirname(fileURLToPath(import.meta.url)), a)

export const alphabetify = (text, alphabet, lang = 'en', pre, post) =>
  fs.promises.readFile(relativePath(`../alphabets/build/${lang}/${alphabet}.json`), 'utf8')
    .then(data => {
      return transform(text, JSON.parse(data), pre, post)
    })
    .catch(e => {
      console.log(e)
      throw new Error(`The specified language ${lang} does not support alphabet ${alphabet}.`)
    })
