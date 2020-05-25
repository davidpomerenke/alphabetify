const buildDir =
  'https://raw.githubusercontent.com/davidpomerenke/alphabetify/master/alphabets/build'
const select = document.getElementById('alphabet')
const source = window.document.getElementById('source')
const target = document.getElementById('target')
select.selectedIndex = 0
const load = () => {
  const alphabetCode = select.options[select.selectedIndex].value
  // do nothing if no alphabet is selected
  if (!alphabetCode.match(/\s/)) {
    target.value = 'Loading ...\nIf this takes too long, try a shorter text.'
    fetch(`${buildDir}/${document.documentElement.lang}/${alphabetCode}.json`)
      .then(response =>
        response
          .json()
          .then(
            result => (target.value = transform(source.value, result, 0, 0.2))
          )
      )
      .catch(e => console.log(e))
  }
}
select.onchange = load
source.oninput = load
