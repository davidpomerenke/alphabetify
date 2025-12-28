import { transform } from '../lib/transform.mjs'

// Determine language from URL path
const path = window.location.pathname
const lang = path.includes('/de') ? 'de' : 'en'

// Load translations and initialize
async function init() {
  const t = await fetch(`./i18n/${lang}.json`).then(r => r.json())
  
  // Set document language
  document.documentElement.lang = lang
  
  // Update meta tags
  document.getElementById('meta-description').content = t.description
  document.getElementById('twitter-description').content = t.description
  document.getElementById('og-description').content = t.description
  document.getElementById('og-url').content = `https://alphabetify.js.org/${lang === 'en' ? '' : lang}`
  
  // Update content
  document.getElementById('slogan').textContent = t.slogan
  document.getElementById('teaser').innerHTML = t.teaser
  document.getElementById('source').value = t.sample
  document.getElementById('note').textContent = t.note
  document.getElementById('contributing').innerHTML = t.contributing
  document.getElementById('tags').textContent = t.tags
  document.getElementById('donate-img').alt = t.donate
  
  // Language navigation
  const nav = document.getElementById('lang-nav')
  if (lang === 'de') {
    nav.innerHTML = '<a href="/">[en]</a> [de]'
  } else {
    nav.innerHTML = '[en] <a href="/de">[de]</a>'
  }
  
  // Populate alphabet select
  const select = document.getElementById('alphabet')
  document.getElementById('select-placeholder').textContent = t.select
  document.getElementById('select-disabled').textContent = t.select
  
  for (const [code, name] of Object.entries(t.alphabets)) {
    const option = document.createElement('option')
    option.value = code
    option.textContent = name
    select.appendChild(option)
  }
  
  // Alphabet transform logic
  const buildDir = 'https://raw.githubusercontent.com/davidpomerenke/alphabetify/master/alphabets/build'
  const source = document.getElementById('source')
  const target = document.getElementById('target')
  
  const load = () => {
    const alphabetCode = select.options[select.selectedIndex].value
    if (!alphabetCode.match(/\s/)) {
      target.value = 'Loading ...\nIf this takes too long, try a shorter text.'
      fetch(`${buildDir}/${lang}/${alphabetCode}.json`)
        .then(response => response.json())
        .then(result => {
          target.value = transform(source.value, result, 0, 0.2)
        })
        .catch(e => console.log(e))
    }
  }
  
  select.onchange = load
  source.oninput = load
}

init()

