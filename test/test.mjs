import { alphabetify } from '../lib/index.mjs'
import { strict as assert } from 'assert'

const notext = ''
alphabetify(notext, 'grek-grc', 'en')
  .then(result => assert.equal(result, ''))
  .catch(e => console.log(e))

const text =
  'Tell me, O muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home. Tell me, too, about all these things, O daughter of Jove, from whatsoever source you may know them.'

alphabetify(text, 'grek-grc', 'en', 0.5, 0.5)
  .then(result => assert.equal(result,
    'Tell me, O muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but δο ὀυχατ ἑ μιχτ hε κοουλδ νοτ σαουε hις μεν, φωρ θει περισhεδ θροουχ θειρ ὀουν σhεερ φολλι ἰν ἐατιγγ θε καττλε ὀφ θε Σουν-γοδ Hιπεριον; σο θε γοδ πρεουεντεδ θεμ φρομ εουερ ῥεατχιγγ ὁμε. Τελλ με, τοο, ἀβοουτ ἀλλ θεσε θιγγς, O δαυχτερ οφ Dιοουε, φρομ ὀυχατσοεουερ σοουρσε ἰοου μει κνοου θεμ.'))
  .catch(e => console.log(e))

alphabetify(text, 'grek-grc', 'en')
  .then(result => assert.equal(result,
    'Tell me, O muse, of thαt ingenious hero who trαvelled fαr ἀnd wide ἀfter he ἁd sαckeδ the fαmous town of Troy. Mαny citiεs δiδ ἑ visit, ἀnδ mαny wεrε thε nαtions wiθ whosε mαnnεrs ἀnδ customs ἑ wαs ἀcquαιntεδ; morεovεr ἑ suffεrεδ much βι sεα whιλε trιιγγ to sαvε ἱs own λιfε ἀnδ βrιγγ ἱs μεn sαfελι ὁμε; βut δο whαt ἑ μιγht hε κοuλδ nοt σαvε hις μεn, fορ θει περισhεδ θροουγh θειρ ὀουn σhεερ φολλι ἰn ἐατιγγ θε καττλε ὀφ θε Σουn-γοδ Hιπεριοn; σο θε γοδ πρεουεnτεδ θεμ φρομ εουερ ῥεατχιγγ ὁμε. Τελλ με, τοο, ἀβοουτ ἀλλ θεσε θιγγς, O δαυχτερ οφ Dιοουε, φρομ ὀυχατσοεουερ σοουρσε ἰοου μει κνοου θεμ.'))
  .catch(e => console.log(e))

alphabetify(text, 'grek-el', 'en')
  .then(result => assert.equal(result,
    'Tell me, O muse, of thαt ingenious hero who trαβelled fαr αnd wide αfter he hαd sαckeδ the fαmous town of Troy. Mαny citiεs δiδ hε βisit, αnδ mαny wεrε thε nαtions wiθ whosε mαnnεrs αnδ customs hε wαs αcquαιntεδ; morεoβεr hε suffεrεδ mutζ mπι sεα whιλε trιιγγ to sαβε hιs own ληfε αnδ μπrιγγ hιs μεn sαfελι hομε; μπut δο whαt hε μιγt hε κοuλδ nοt σαβε hις μεn, fορ θει περισhεδ θροουγ θειρ οουn σhεερ φολλι ιn εατιγγ θε καττλε οφ θε Σουn-γοδ Χιπεριοn; σο θε γοδ πρεβεnτεδ θεμ φρομ εβερ ρεατζιγγ χομε. Τελλ με, τοο, αμποουτ αλλ θεσε θιγγς, O δαουγτερ οφ Δζοβε, φρομ ουχατσοεβερ σοουρσε ιοου μει κνοου θεμ.'))
  .catch(e => console.log(e))

alphabetify(text, 'hira', 'en')
  .then(result => assert.equal(result,
    'Tell me, O mうsえ, おf thあt いngえnいおうs hえrお whお trあvえllえd fあr あnd wいdえ あftえr hえ hあd さcけd thえ fあmおうす tおwn おf Trおい. Mあnい cいtいえす じd hえ vいしt, あnd mあnい wえrえ せ nあちおnす wいとh whおせ mあnnえrす あnど cうすとmす hえ wあす あcくあいnてど; mおrえおvえr hえ すっふえrえど mうち bい せあ wひlえ とrいいnぐ と さべ ひす おwn lいふえ あnど ぶrいnぐ ひす むえn さふえlい ほめ; ぶと ど wはと へ みぐhと へ cおうるど のと さべ ひす めん, ふおる とーえい ぺりしえど とーろうぐー せいる おwん しいーる ふおるるい いん えあちんぐ せ cあっとれ おふ せ すん-ごど ーいぺりおん; そ せ ごど ぷれべんてど せむ ふろむ えべる れあちんぐ ほめ. てるる め, とお, あぼうと あるる せせ ふぃんぐす, O だうぐーてる おふ じょべ, ふろむ wはとそえべる そうるcえ よう まい くのw せむ.'))
  .catch(e => console.log(e))

alphabetify(text, 'kana', 'en')
  .then(result => assert.equal(result,
    'Tell me, O mウsエ, オf thアt イngエnイオウs hエrオ whオ trアvエllエd fアr アnd wイdエ アftエr hエ hアd サcケd thエ fアmオウス tオwn オf Trオイ. Mアnイ cイtイエス ジd hエ vイシt, アnd mアnイ wエrエ セ nアチオnス wイトh whオセ mアnnエrス アnド cウストmス hエ wアス アcクアイnテド; mオrエオvエr hエ スッフエrエド mウチ bイ セア wヒlエ トrイイnグ ト サベ ヒス オwn lイフエ アnド ブrイnグ ヒス ムエn サフエlイ ホメ; ブト ド wハト ヘ ミグhト ヘ cオウルド ノト サベ ヒス メン, フオル トーエイ ペリシエド トーロウグー セイル オwン シイール フオルルイ イン エアチング セ cアットレ オフ セ スン-ゴド ーイペリオン; ソ セ ゴド プレベンテド セム フロム エベル レアチング ホメ. テルル メ, トオ, アボウト アルル セセ フィングス, O ダウグーテル オフ ジョベ, フロム wハトソエベル ソウルcエ ヨウ マイ クノw セム.'))
  .catch(e => console.log(e))

alphabetify(text, 'cyrl-ru', 'en')
  .then(result => assert.equal(result,
    'Tell me, O muse, of thаt ingenious hero вo trавelled fаr аnd вiдe аfter he hад sаckeд the fаmous toвn of Troy. Mаny cities дiд he вisit, аnд mаny вere зe nаtions вiз вose mаnners аnд кustoms he ваs акquайnteд; мoreoвer he suffereд мuкh бy seа вiлe tryйнг to sавe his oвн лife анд брiнг hiс мeн саfeлy hoмe; бут дo ват he мiгhт he кoулд нoт савe hiс мeн, фoр зeй пeрiшeд зрoугh зeйр oвн шир фoллy ын eатынг зe каттлэ oф зэ Сун-гoд Hyпэрыoн; сo зэ гoд прэвэнтэд зэм фрoм эвэр рэачынг hoмэ. Тэлл мэ, ту, абoут алл зэсэ зынгс, O даугhтэр oф Ёвэ, фрoм вацoэвэр сoуркэ ёу май кнoв зэм.'))
  .catch(e => console.log(e))


alphabetify('bequem', 'kana', 'de', 0, 1)
  .then(result => assert.equal(result, 'ベクエム'))
  .catch(e => console.log(e))


// Test 2: German "ie" should produce long vowel ー
alphabetify('die Liebe', 'hira', 'de', 0, 1)
  .then(result => assert.equal(result, 'どいー るいーべ'))
  .catch(e => console.log(e))

// Test 3: "x" should map to "кс" in Russian
alphabetify('taxi', 'cyrl-ru', 'en', 0, 1)
  .then(result => assert.equal(result, 'таксы'))
  .catch(e => console.log(e))

// Test 4: "ti" should map to ち (chi) in Japanese
alphabetify('tip', 'hira', 'en', 0, 1)
  .then(result => assert.equal(result, 'ちぷ'))
  .catch(e => console.log(e))

alphabetify('tip', 'kana', 'en', 0, 1)
  .then(result => assert.equal(result, 'チプ'))
  .catch(e => console.log(e))

// Test 5: "tu" should map to つ (tsu) in Japanese
alphabetify('tuna', 'hira', 'en', 0, 1)
  .then(result => assert.equal(result, 'つな'))
  .catch(e => console.log(e))

alphabetify('tuna', 'kana', 'en', 0, 1)
  .then(result => assert.equal(result, 'ツナ'))
  .catch(e => console.log(e))

// ============================================
// Long vowel tests
// ============================================

// Test 6: English "ee" should produce long i (いー)
alphabetify('see bee', 'hira', 'en', 0, 1)
  .then(result => assert.equal(result, 'すいー ぶいー'))
  .catch(e => console.log(e))

alphabetify('see bee', 'kana', 'en', 0, 1)
  .then(result => assert.equal(result, 'スイー ブイー'))
  .catch(e => console.log(e))

// Test 7: English "ey" should produce えい (ei diphthong)
alphabetify('hey they', 'hira', 'en', 0, 1)
  .then(result => assert.equal(result, 'ーえい とーえい'))
  .catch(e => console.log(e))

alphabetify('hey they', 'kana', 'en', 0, 1)
  .then(result => assert.equal(result, 'ーエイ トーエイ'))
  .catch(e => console.log(e))

// Test 8: German "eh" should produce long e (えー)
alphabetify('gehen sehen', 'hira', 'de', 0, 1)
  .then(result => assert.equal(result, 'ぐえーえん すえーえん'))
  .catch(e => console.log(e))

alphabetify('gehen sehen', 'kana', 'de', 0, 1)
  .then(result => assert.equal(result, 'グエーエン スエーエン'))
  .catch(e => console.log(e))

// ============================================
// Korean (Hangul) tests
// ============================================

// Test 9: Basic Korean syllable composition
alphabetify('hello', 'hang-ko', 'en', 0, 1)
  .then(result => assert.equal(result, '헬로'))
  .catch(e => console.log(e))

// Test 10: Korean with simple CV syllables
alphabetify('banana', 'hang-ko', 'en', 0, 1)
  .then(result => assert.equal(result, '바나나'))
  .catch(e => console.log(e))

// Test 11: Korean with final consonants
alphabetify('king song', 'hang-ko', 'en', 0, 1)
  .then(result => assert.equal(result, '킹 송'))
  .catch(e => console.log(e))

// Test 12: Korean with standalone vowels (should get silent ᄋ)
alphabetify('Korea', 'hang-ko', 'en', 0, 1)
  .then(result => assert.equal(result, '코레아'))
  .catch(e => console.log(e))

// Test 13: Korean with consonant clusters (should insert 으)
alphabetify('milk', 'hang-ko', 'en', 0, 1)
  .then(result => assert.equal(result, '밀크'))
  .catch(e => console.log(e))

// Test 14: Korean with digraphs (sh, ng)
alphabetify('thing shop', 'hang-ko', 'en', 0, 1)
  .then(result => assert.equal(result, '싱 솦'))
  .catch(e => console.log(e))
