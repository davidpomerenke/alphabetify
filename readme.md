# Alphabetify

[![Gitter](https://badges.gitter.im/aima-js/community.svg)](https://gitter.im/alphabetify/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Alphabetify makes learning new alphabets easy.
Copypaste any text –
the breaking news,
your favourite book,
or a piece of homework.
Alphabetify will transform the text for you.
It starts with all symbols in your native alphabet,
then slowly introduces more and more foreign characters.
You will get used to them and learn the alphabet without any effort.
[Try it here!](https://davidpomerenke.github.io/alphabetify)

## Example

```javascript
import { alphabetify } from '@davidpomerenke/alphabetify'

const text =
'Tell me, O muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home. Tell me, too, about all these things, O daughter of Jove, from whatsoever source you may know them.'

alphabetify(text, 'grek-grc', 'en')
  .then(result => console.log(result))

// Tell me, O muse, of thαt ingenious hero who trαvelled fαr αnd wiδe αfter he hαδ sακkεδ thε fαmous town oφ Troy. Mαny κitiεs δiδ hε visit, αnδ mαny wεrε thε nαtions with whosε mαnnεrs ἀnδ κustoms ἑ wαs ἀκquαιntεδ; morεovεr ἑ suφφεrεδ muχ βι sεα whιλε trιιγγ to sαvε ἱs own λιφε ἀνδ βrιγγ ἱs μεν sαφελι ὁμε; βut δο whαt ἑ μιχt hε κοuλδ νοt sαvε hιs μεν, φωρ thει περιχεδ thροuχ thειρ ὀwν χεερ φολλι ἰν ἐατιγγ τhε καττλε ὀφ τhε Σουν-γοδ Hιπεριον; σο τhε γοδ πρεουεντεδ τhεμ φρομ εουερ ῥεαχιγγ ὁμε. Τελλ με, τοο, ἀβοουτ ἀλλ θεσε θιγγς, O δαυχτερ οφ Dιοουε, φρομ ὀυατσοεουερ σοουρκε ἰοου μει κνοου θεμ.
```

## Syntax

`alphabetify(text, alphabet, [lang, [end, [random]]])`

### Parameters

**`text`**

The string of the original text which should be transliterated, in the source alphabet. It may be very long.

**`alphabet`**

The code string specifying the target alphabet: 

| Code       | Alphabet          |
|------------|-------------------|
| `grek-el`  | Modern Greek      |
| `grek-grc` | Ancient Greek     |
| `hira`     | Japanese Hiragana |
| `kana`     | Japanese Katakana |

**`lang`** *optional*

The code string specifying the original *language*. (Eurocentrically, the original *alphabet* is always Latin.) 

Specifying the original language adds some minor language-specific rules. For example, in English the letter *v* will be processed in a similar way to the letter *w*, while in German *v* will be processed in a similar way to *f*.

If the original language is unspecified, English will be assumed.

| Code   | Language    |
|--------|-------------|
| de     | German      |
| **en** | **English** |

**`pre`** *optional*

The integer specifying the proportion of text at the beginning of the `text` string which should not be transliterated at all. 0 by default.

**`post`** *optional*

The integer specifying the proportion of text at the end of the `text` string which should not be transliterated at all. 0 by default.

### Return value

A promise, which on resolution returns the string with the increasingly transliterated text. You can process it by appending something like `.then(output => process(output)).catch(error => throw error)` to the function call. 

## Development

Transliteration rules are converted from a short form (e. g., only involving lowercase letters) in `alphabets/src/` to a long form in `alphabets/build`. This is done with the `alphabets/preprocess` module, which is run by `npm run preprocess`. The code, including the resulting long form rules, is bundled for web use by running `npm run bundle`. 

### Transliteration rules

This may be a bit abstract. Have a look into some of the JSON files in the `alphabets` folder to get a better understanding of the notation. 

#### Short form

The short form consists of tuples `[a, b, lang]`: 

- `a` is a regular expression string, `b` is a regular expression replacement string. 

- `lang` is an optional specifier of the language to which the rule is restricted, such as `en` or `de`. 

- Only lowercase letters are used in `a` and `b`. Uppercase and mixed-case will be handled automatically.

- The rules will be applied in the order of their length (excluding bracketed parts), starting with the longest rule. It may sometimes be appropriate to give higher priority to certain rules. In this case, underscores `_` can be inserted at one's convenience. They will increase the length for the priority sorting and will be ignored afterwards.

- The tuples are grouped into array fields. All tuples of one field will always be applied together. That means: Either none of them will be applied or all of them will be applied. 

#### Long form

If you just want to develop new rules, you need not care about the long form. Just write it in short form and it will be automatically preprocessed to long from by running `npm run preprocess`.

The long form consists of pairs `[a, b]` where `text.replace(new RegExp(a, 'g'), b)` will be applied on each pair, in the order of their appearance:

- The pairs are organized in lists, where each element contains all the rules that apply at a transliteration level. 

  **E. g.:** *There is a text of 100 words. There are 5 (short-form) transliteration rule groups.*
  
  - For the first 20 words, the first element of the (long-form) list will be applied. It contains simply the rules from the first (short-form) rule group. 
  
  - For the next 20 words, the second element of the (long-form) list will be applied. It contains both the rules from the first and the second rule group, in the correct order of their priority. 
  
  - For words 41-60, the third element of the (long-form) list will be applied. It contains rules from the first, second, and third (short-form) rule group. 
  
  - Etc. pp. The crucial point is that at each step where an additional rule group is used, the rules have to be sorted again. 

- There is a separate folder for each source language in the `alphabets/build` folder.
