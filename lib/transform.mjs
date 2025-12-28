// Korean Jamo Unicode ranges
const INITIALS = 'ᄀᄁᄂᄃᄄᄅᄆᄇᄈᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ' // U+1100-U+1112
const MEDIALS = 'ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ' // U+1161-U+1175
const FINALS = 'ᆨᆩᆪᆫᆬᆭᆮᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸᆹᆺᆻᆼᆽᆾᆿᇀᇁᇂ' // U+11A8-U+11C2

// Map initial jamo to final jamo equivalents
const INITIAL_TO_FINAL = {
  'ᄀ': 'ᆨ', 'ᄁ': 'ᆩ', 'ᄂ': 'ᆫ', 'ᄃ': 'ᆮ', 'ᄅ': 'ᆯ',
  'ᄆ': 'ᆷ', 'ᄇ': 'ᆸ', 'ᄉ': 'ᆺ', 'ᄊ': 'ᆻ', 'ᄋ': 'ᆼ',
  'ᄌ': 'ᆽ', 'ᄎ': 'ᆾ', 'ᄏ': 'ᆿ', 'ᄐ': 'ᇀ', 'ᄑ': 'ᇁ', 'ᄒ': 'ᇂ'
}

// Check if char is an initial consonant jamo
const isInitial = (char) => INITIALS.includes(char)

// Check if char is a medial vowel jamo
const isMedial = (char) => MEDIALS.includes(char)

// Check if char is a final consonant jamo
const isFinal = (char) => FINALS.includes(char)

// Get final consonant index from initial or final jamo
const getFinalIdx = (char) => {
  let idx = FINALS.indexOf(char)
  if (idx === -1 && INITIAL_TO_FINAL[char]) {
    idx = FINALS.indexOf(INITIAL_TO_FINAL[char])
  }
  return idx
}

// Compose Korean jamo into syllable blocks
const composeKorean = (text) => {
  let result = ''
  let i = 0

  while (i < text.length) {
    const char = text[i]
    const next = text[i + 1]
    const afterNext = text[i + 2]
    const afterAfterNext = text[i + 3]

    // Case 1: Initial + Medial (+ optional Final)
    if (isInitial(char) && next && isMedial(next)) {
      const initialIdx = INITIALS.indexOf(char)
      const medialIdx = MEDIALS.indexOf(next)
      let finalIdx = 0
      let consumed = 2

      // Check for final consonant
      if (afterNext && (isInitial(afterNext) || isFinal(afterNext))) {
        const potentialFinalIdx = getFinalIdx(afterNext)
        if (potentialFinalIdx !== -1) {
          // This consonant is a final if:
          // - Nothing follows it, OR
          // - It's followed by another consonant, OR  
          // - It's followed by a non-jamo character
          const nextIsVowel = afterAfterNext && isMedial(afterAfterNext)
          if (!nextIsVowel) {
            finalIdx = potentialFinalIdx + 1
            consumed = 3
          }
        }
      }

      const syllable = String.fromCharCode(0xAC00 + (initialIdx * 588) + (medialIdx * 28) + finalIdx)
      result += syllable
      i += consumed
    }
    // Case 2: Standalone vowel - add silent initial ᄋ (ieung)
    else if (isMedial(char)) {
      const medialIdx = MEDIALS.indexOf(char)
      let finalIdx = 0
      let consumed = 1

      // Check for final consonant after standalone vowel
      if (next && (isInitial(next) || isFinal(next))) {
        const potentialFinalIdx = getFinalIdx(next)
        if (potentialFinalIdx !== -1) {
          const nextIsVowel = afterNext && isMedial(afterNext)
          if (!nextIsVowel) {
            finalIdx = potentialFinalIdx + 1
            consumed = 2
          }
        }
      }

      const syllable = String.fromCharCode(0xAC00 + (11 * 588) + (medialIdx * 28) + finalIdx) // 11 = ᄋ index
      result += syllable
      i += consumed
    }
    // Case 3: Orphan consonant - try to attach to previous syllable or create new syllable with 으
    else if (isInitial(char) || isFinal(char)) {
      const lastCharCode = result.length > 0 ? result.charCodeAt(result.length - 1) : 0
      const isLastHangul = lastCharCode >= 0xAC00 && lastCharCode <= 0xD7A3
      
      // First, try to attach as final to previous syllable
      if (isLastHangul) {
        const syllableOffset = lastCharCode - 0xAC00
        const currentFinal = syllableOffset % 28
        if (currentFinal === 0) {
          // No final consonant yet, we can add one
          const potentialFinalIdx = getFinalIdx(char)
          if (potentialFinalIdx !== -1) {
            // Only attach if next char is NOT a vowel
            if (!(next && isMedial(next))) {
              const newSyllable = String.fromCharCode(lastCharCode + potentialFinalIdx + 1)
              result = result.slice(0, -1) + newSyllable
              i++
              continue
            }
          }
        }
      }
      
      // Can't attach as final - create a new syllable with 으 (eu) vowel
      const initialIdx = INITIALS.indexOf(char)
      if (initialIdx !== -1) {
        // Check if next char could be a final for this new syllable
        let finalIdx = 0
        let consumed = 1
        
        if (next && (isInitial(next) || isFinal(next)) && !(afterNext && isMedial(afterNext))) {
          const potentialFinalIdx = getFinalIdx(next)
          if (potentialFinalIdx !== -1) {
            finalIdx = potentialFinalIdx + 1
            consumed = 2
          }
        }
        
        // 18 is the index of ᅳ (eu) in MEDIALS
        const syllable = String.fromCharCode(0xAC00 + (initialIdx * 588) + (18 * 28) + finalIdx)
        result += syllable
        i += consumed
      } else {
        // It's a final jamo without a matching initial, pass through
        result += char
        i++
      }
    }
    // Case 4: Pass through other characters
    else {
      result += char
      i++
    }
  }

  return result
}

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

  const result = [...start, ...main, ...end].join('')

  // Apply Korean composition if needed
  if (alphabetData.compose === 'korean') {
    return composeKorean(result)
  }

  return result
}
