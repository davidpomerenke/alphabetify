export const alphabetify = (text, alphabet, lang = 'en', pre = 0, post = 0) =>
  import(`./alphabets/build/${lang}/${alphabet}.json`)
    .then(({ default: alphabet }) => {
      const wordGroupLength =
        Math.max(
          2,
          2 * Math.floor(
            (text.match(/\s/g) || []).length /
            alphabet.rules.length))
      const chunks =
        text
          .split(/(\s)/g)
          .flatMap((token, i, arr) =>
            [
              ...i % (wordGroupLength) === 0
                ? [arr.slice(i, i + wordGroupLength).join('')]
                : []
            ])
      const start = chunks.slice(
        0,
        Math.round(chunks.length * pre))
      const main = chunks.slice(
        Math.round(chunks.length * pre),
        Math.round(chunks.length * (1 - post)))
        .map((chunk, i) =>
          alphabet
            .rules[Math.min(i, alphabet.rules.length - 1)]
            .reduce(
              (prev, [original, replacement]) =>
                prev.replace(new RegExp(original, 'g'), replacement),
              chunk))
      const end = chunks.slice(
        Math.round(chunks.length * (1 - post)),
        chunks.length)
        .map((chunk, i) =>
          alphabet
            .rules[alphabet.rules.length - 1]
            .reduce(
              (prev, [original, replacement]) =>
                prev.replace(new RegExp(original, 'g'), replacement),
              chunk))
      return [...start, ...main, ...end].join('')
    })
    .catch(e => { throw new Error(`The specified language ${lang} is not supported.`) })
