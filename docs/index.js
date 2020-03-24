var select = document.getElementById('alphabet')
var source = window.document.getElementById('source')
var target = document.getElementById('target')
select.onclick = () => (select.selectedIndex = 0)
select.onchange = () => {
  target.value = ''
  const alphabetCode = select.options[select.selectedIndex].value
  let text = source.value
  const match = text.match(/^lang=([a-z]+)/)
  const lang = match && ['en', 'de'].includes(match[1]) ? match[1] : 'en'
  if (match) text = text.slice(match[0].length + 1)
  fetch(`https://raw.githubusercontent.com/davidpomerenke/alphabetify/master/alphabets/build/${lang}/${alphabetCode}.json`)
    .then(response =>
      response.json()
        .then(result =>
          target.value += transform(text, result, 0, 0.2)))
    .catch(e => console.log(e))
}
