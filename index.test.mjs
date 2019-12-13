import { alphabetify } from './index.mjs'
import { strict as assert } from 'assert'

const text =
'Tell me, O muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home. Tell me, too, about all these things, O daughter of Jove, from whatsoever source you may know them.'

alphabetify(text, 'grek-grc', 'en')
  .then(result => assert.equal(result,
    'Tell me, O muse, of thαt ingenious hero who trαvelled fαr ἀnd wiδe ἀfter he ἁδ sαckεδ thε fαmous town of Troy. Mαny citiεs δiδ ἑ visit, ἀnδ mαny wεrε θε nαtions wιθ whosε mαnnεrs ἀnδ κustoms ἑ wαs ἀκquαιntεδ; morεovεr ἑ suffεrεδ muκh βι sεα whιλε trιιγγ to sαvε ἱs owν λιfε ἀνδ βrιγγ ἱs μεν sαfελι ὁμε; βut δο whαt ἑ μιγht hε κοuλδ νοt sαvε hις μεν, fορ θει περισhεδ θροuγh θειρ ὀwν σhεερ fολλι ἰν ἐατιγγ θε καττλε ὀφ θε Σουν-γοδ Hιπεριον; σο θε γοδ πρεουεντεδ θεμ φρομ εουερ ῥεαχιγγ ὁμε. Τελλ με, τοο, ἀβοουτ ἀλλ θεσε θιγγς, O δαυχτερ οφ Dιοουε, φρομ ὀυχατσοεουερ σοουρκε ἰοου μει κνοου θεμ.'))

alphabetify(text, 'grek-el', 'en')
  .then(result => assert.equal(result,
    'Tell me, O muse, of thαt ingenious hero who trαβelled fαr αnd wiδe αfter he hαδ sαckεδ thε fαmous town of Troy. Mαny citiεs δiδ hε βisit, αnδ mαny wεrε θε nαtions wιθ whosε mαnnεrs αnδ κustoms hε wαs ακquαιntεδ; morεoβεr hε suffεrεδ muκh bι sεα whιλε trιιγγ to sαβε hιs owν ληfε ανδ brιγγ hιs μεν sαfελι hομε; but δο whαt hε μιγt hε κοuλδ νοt sαβε hις μεν, fορ θει περισhεδ θροuγ θειρ οwν σhεερ fολλι ιν εατιγγ θε καττλε οφ θε Σουν-γοδ Χιπεριον; σο θε γοδ πρεβεντεδ θεμ φρομ εβερ ρεαχιγγ χομε. Τελλ με, τοο, αμποουτ αλλ θεσε θιγγς, O δαουγτερ οφ Δζοβε, φρομ ουχατσοεβερ σοουρκε ιοου μει κνοου θεμ.'))

alphabetify(text, 'hira', 'en')
  .then(result => assert.equal(result,
    'Tell me, O mうsえ, おf thあt いngえnいおうs hえrお whお trあvえllえd fあr あnd wいdえ あftえr hえ hあd さcけd thえ fあmおうす tおwn おf Trおい. Mあnい cいtいえす じd hえ vいしt, あnd mあnい wえrえ せ nあといおnす wいとh whおせ mあnnえrす あnど cうすとmす hえ wあす あcqうあいnてど; mおrえおvえr hえ すっふえrえど mうし bい せあ wひlえ とrいいnぐ と さべ ひす おwn lいふえ あnど ぶrいnぐ ひす むえn さふえlい ほめ; ぶと ど wはと へ みぐhと へ cおうるど のと さべ ひす めん, ふおる せぃ ぺりしえど と一ろうぐ一 せいる おwん しえぃる ふおるるい いん えあといんぐ せ cあっとれ おふ せ すん-ごど 一いぺりおん; そ せ ごど ぷれべんてど せむ ふろむ えべる れあしんぐ ほめ. てるる め, とお, あぼうと あるる せせ ふぃんぐす, O だうぐ一てる おふ じょべ, ふろむ wはとそえべる そうるcえ よう まい くのw せむ.'))

alphabetify(text, 'kana', 'en')
  .then(result => assert.equal(result,
    'Tell me, O mウsエ, オf thアt イngエnイオウs hエrオ whオ trアvエllエd fアr アnd wイdエ アftエr hエ hアd サcケd thエ fアmオウス tオwn オf Trオイ. Mアnイ cイtイエス ジd hエ vイシt, アnd mアnイ wエrエ セ nアトイオnス wイトh whオセ mアnnエrス アnド cウストmス hエ wアス アcqウアイnテド; mオrエオvエr hエ スッフエrエド mウシ bイ セア wヒlエ トrイイnグ ト サベ ヒス オwn lイフエ アnド ブrイnグ ヒス ムエn サフエlイ ホメ; ブト ド wハト ヘ ミグhト ヘ cオウルド ノト サベ ヒス メン, フオル セィ ペリシエド ト一ロウグ一 セイル オwン シエィル フオルルイ イン エアトイング セ cアットレ オフ セ スン-ゴド 一イペリオン; ソ セ ゴド プレベンテド セム フロム エベル レアシング ホメ. テルル メ, トオ, アボウト アルル セセ フィングス, O ダウグ一テル オフ ジョベ, フロム wハトソエベル ソウルcエ ヨウ マイ クノw セム.'))

alphabetify(text, 'cyrl-ru', 'en')
  .then(result => assert.equal(result,
    'Tell me, O muse, of thаt ingenious hero вo trавelled fаr аnd вiдe аfter he hад sаckeд the fаmous toвn of Troy. Mаny cities дiд he вisit, аnд mаny вere зe nаtions вiз вose mаnners аnд кustoms he ваs акquайnteд; мoreoвer he suffereд мuкh бy seа вiлe tryйнг to sавe his oвн лife анд брiнг hiс мeн саfeлy hoмe; бuт дo ват he мiгhт he кoулд нoт савe hiс мeн, фнр зeй пeрiсheд зрoугh зeйр oвн шир фoллy iн eатiнг зe каттлe oф зe Сун-гoд Hyпэрыoн; сo зэ гoд прэвэнтэд зэм фрoм эвэр рэачынг hoмэ. Тэлл мэ, ту, абoут алл зэсэ зынгс, O даугhтэр oф Ёвэ, фрoм вацoэвэр сoуркэ ёу май кнoв зэм.'))
