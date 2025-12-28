import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const main = () => {
  const dir = `${__dirname}/build`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.readdir(`${__dirname}/src`, (e, files) => {
    console.log(e || `successfully opened ${__dirname}/build`)
    fs.writeFile(`${dir}/alphabets.json`, JSON.stringify(files, null, 2), 'utf8',
      (e, _) => console.log(e || `successfully written alphabet list`))
    for (const file of files) {
      fs.readFile(`${__dirname}/src/${file}`, 'utf8', (e, data) => {
        console.log(e || `successfully read src/${file}`)
        if (!e) {
          const alphabet = JSON.parse(data)
          for (const lang of alphabet.languages) {
            const dir = `${__dirname}/build/${lang}`
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }
            fs.writeFile(
              `${dir}/${file}`,
              JSON.stringify(preprocess(alphabet, lang), null, 2),
              'utf8',
              (e, _) => console.log(e || `successfully written build/${lang}/${file}`))
          }
        }
      })
    }
  })
}

const preprocess = (alphabet, lang) => ({
  alphabet: alphabet.alphabet,
  ...(alphabet.compose && { compose: alphabet.compose }),
  rules: alphabet.rules
    .map((ruleBlock, i, rules) =>
      rules
        .slice(0, i + 1)
        .flat(1)
        .filter(rule => '2' in rule ? rule[2] === lang : true)
        .sort((a, b) => removeSpecial(b[0]).length - removeSpecial(a[0]).length)
        .flatMap(rule =>
          [['', '_'], ...alphabet.macros]
            .filter(macro => '2' in macro ? macro[2] === lang : true)
            .filter(macro => macro[1] === '_' || rule[0].match(new RegExp(macro[1], 'g')))
            .map(macro => [rule[0].replace(new RegExp(macro[1], 'g'), macro[0]), rule[1]]))
        .flatMap(rule =>
          [
            rule, // us -> ουs
            [ // Us -> Ουs
              capitalize(rule[0].split('')).join('') + `(?=[a-z${alphabet.alphabet}])`,
              capitalize(rule[1].split('')).join('')
            ],
            [ // US -> ΟΥS
              upperCase(rule[0].split('')).join('') + `(?=[A-Z${alphabet.alphabet.toUpperCase()}])`,
              upperCase(rule[1].split('')).join('')
            ]
          ])
    )
})

const capitalize = arr =>
  [
    ...upperCase(arr.slice(0, firstChar(arr) + 1)),
    ...arr.slice(firstChar(arr) + 1)
  ]

const upperCase = arr =>
  arr
    .map((char, i, arr) =>
      (arr[i - 1] !== '\\')
        ? char.toUpperCase()
        : char)

const firstChar = arr =>
  arr
    .findIndex((char, i) =>
      bracketDepth(arr)[i] === 0)

export const removeSpecial = exp =>
  exp
    .split('')
    .filter((char, i, arr) => bracketDepth(arr)[i] === 0)
    .join()

export const bracketDepth = arr =>
  arr
    .map((char, i, arr) =>
      arr
        .slice(0, i + 1)
        .reduce((prev, curr) =>
          prev +
          (curr === '(') * +1 +
          (curr === ')') * -1, 0) +
      (char === ')') * 1)

main()
