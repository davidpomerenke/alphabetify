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
  
  // Language navigation
  const nav = document.getElementById('lang-nav')
  if (lang === 'de') {
    nav.innerHTML = '<a href="/">EN</a><span>DE</span>'
  } else {
    nav.innerHTML = '<span>EN</span><a href="/de">DE</a>'
  }
  
  // Alphabet transform logic
  const buildDir = 'https://raw.githubusercontent.com/davidpomerenke/alphabetify/master/alphabets/build'
  const source = document.getElementById('source')
  const target = document.getElementById('target')
  const pillsContainer = document.getElementById('alphabet-pills')
  
  let selectedAlphabet = null
  
  const load = (alphabetCode) => {
    if (!alphabetCode) return
    target.value = 'Loading...'
    fetch(`${buildDir}/${lang}/${alphabetCode}.json`)
      .then(response => response.json())
      .then(result => {
        target.value = transform(source.value, result, 0, 0.2)
      })
      .catch(e => console.log(e))
  }
  
  // Create alphabet pills
  for (const [code, name] of Object.entries(t.alphabets)) {
    const pill = document.createElement('button')
    pill.type = 'button'
    pill.className = 'alphabet-pill'
    pill.dataset.code = code
    pill.textContent = name
    pill.setAttribute('role', 'radio')
    pill.setAttribute('aria-checked', 'false')
    
    pill.onclick = () => {
      // Update selection
      pillsContainer.querySelectorAll('.alphabet-pill').forEach(p => {
        p.classList.remove('selected')
        p.setAttribute('aria-checked', 'false')
      })
      pill.classList.add('selected')
      pill.setAttribute('aria-checked', 'true')
      selectedAlphabet = code
      load(code)
    }
    
    pillsContainer.appendChild(pill)
  }
  
  // Reload on input change
  source.oninput = () => {
    if (selectedAlphabet) {
      load(selectedAlphabet)
    }
  }
  
  // Select Ancient Greek by default
  const firstPill = pillsContainer.querySelector('.alphabet-pill')
  if (firstPill) {
    firstPill.click()
  }
}

init()
