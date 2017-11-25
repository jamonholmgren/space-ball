const body = document.body

const create = el => document.createElement(el)
const add = (el, to) => (to || body).appendChild(el) || el

const addAll = (el, to) => {
  el.forEach(e => (to || body).appendChild(e))
  return el
}

const apply = (el, styles) => {
  if (!styles) {
    return el
  }
  Object.keys(styles).reduce((el, key) => {
    el.style[key] = styles[key]
    return el
  }, el)
}

const textElement = tag => (text, styles) => {
  const el = create(tag)
  el.innerHTML = text
  el.style.fontFamily = 'Open Sans, sans-serif'
  el.style.fontWeight = 'normal'
  if (styles) {
    apply(el, styles)
  }
  return el
}

const table = t => {
  const tab = create('table')
  const tbody = create('tbody')
  add(tbody, tab)

  t.forEach(row => {
    const tr = create('tr')
    add(tr, tbody)
    addAll(row.map(cell => textElement('th')(cell)), tr)
  })

  return tab
}

const div = () => create('div')
const h1 = textElement('h1')
const h2 = textElement('h2')
const h3 = textElement('h3')
const h4 = textElement('h4')
const h5 = textElement('h5')
const h6 = textElement('h6')
const p = textElement('p')

module.exports = {
  body,
  create,
  add,
  apply,
  textElement,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  table,
}
