export const transform = (text, alphabetData, pre = 0, post = 0) => {
  const wordGroupLength =
    Math.max(
      2,
      2 * Math.floor(
        (text.match(/\s/g) || []).length /
        alphabetData.rules.length))
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
      alphabetData
        .rules[Math.min(i, alphabetData.rules.length - 1)]
        .reduce(
          (prev, [original, replacement]) =>
            prev.replace(new RegExp(original, 'g'), replacement),
          chunk))
  const end = chunks.slice(
    Math.round(chunks.length * (1 - post)),
    chunks.length)
    .map((chunk, i) =>
      alphabetData
        .rules[alphabetData.rules.length - 1]
        .reduce(
          (prev, [original, replacement]) =>
            prev.replace(new RegExp(original, 'g'), replacement),
          chunk))
  return [...start, ...main, ...end].join('')
}
