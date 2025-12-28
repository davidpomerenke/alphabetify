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
  const buildDir = './alphabets-build'
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
  
  // Copy to clipboard
  const copyBtn = document.getElementById('copy-btn')
  const copyIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
  const checkIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
  copyBtn.onclick = async () => {
    const text = target.value
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      copyBtn.innerHTML = checkIcon
      copyBtn.style.color = 'var(--accent)'
      setTimeout(() => {
        copyBtn.innerHTML = copyIcon
        copyBtn.style.color = ''
      }, 1500)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }
  
  // Download as text file
  const downloadBtn = document.getElementById('download-btn')
  downloadBtn.onclick = () => {
    const text = target.value
    if (!text) return
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `alphabetify-${selectedAlphabet || 'text'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  // Expand modal
  const expandBtn = document.getElementById('expand-btn')
  const modalOverlay = document.getElementById('modal-overlay')
  const modalContent = document.getElementById('modal-content')
  const modalClose = document.getElementById('modal-close')
  
  expandBtn.onclick = () => {
    const text = target.value
    if (!text) return
    modalContent.textContent = text
    modalOverlay.classList.add('active')
    document.body.style.overflow = 'hidden'
  }
  
  const closeModal = () => {
    modalOverlay.classList.remove('active')
    document.body.style.overflow = ''
  }
  
  modalClose.onclick = closeModal
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeModal()
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal()
    }
  })
}

init()
