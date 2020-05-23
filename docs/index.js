const buildDir = 'https://raw.githubusercontent.com/davidpomerenke/alphabetify/master/alphabets/build'
const select = document.getElementById('alphabet')
const source = window.document.getElementById('source')
const target = document.getElementById('target')
select.onchange = () => {
  target.value = ''
  const alphabetCode = select.options[select.selectedIndex].value
  fetch(`${buildDir}/${document.documentElement.lang}/${alphabetCode}.json`)
    .then(response =>
      response.json()
        .then(result =>
          target.value += transform(source.value, result, 0, 0.2)))
    .catch(e => console.log(e))
}
