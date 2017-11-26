const root = document.getElementById('root')

const create = el => document.createElement(el) || el
const add = (el, to) => (to || root).appendChild(el) || el

const addAll = (el, to) => {
  el.forEach(e => (to || root).appendChild(e))
  return el
}

const apply = (el, styles) => {
  if (!styles) {
    return el
  }
  Object.keys(styles).reduce((el, key) => {
    if (key in el.style) {
      el.style[key] = styles[key]
    }
    if (key in el) {
      el[key] = styles[key]
    }
    return el
  }, el)
}

const textElement = tag => (text, styles) => {
  const el = create(tag)
  el.innerHTML = text
  styles && apply(el, styles)
  return el
}

const element = tag => (children, styles) => {
  const el = create(tag)
  children && addAll(children, el)
  styles && apply(el, styles)
  return el
}

const table = t => {
  const tab = create('table')
  const tbody = create('tbody')
  add(tbody, tab)

  t.forEach(row => {
    const tr = create('tr')
    const rows = row.map(
      cell =>
        ['string', 'number', 'undefined'].includes(typeof cell)
          ? textElement('td')(cell)
          : element('td')([cell])
    )
    add(tr, tbody)
    addAll(rows, tr)
  })

  return tab
}

const div = element('div')
const h1 = textElement('h1')
const h2 = textElement('h2')
const h3 = textElement('h3')
const h4 = textElement('h4')
const h5 = textElement('h5')
const h6 = textElement('h6')
const p = textElement('p')

const button = (text, props) => {
  const b = create('button')
  b.innerHTML = text
  props.onClick && b.addEventListener('click', props.onClick)
  return b
}

const clearAll = () => (root.innerHTML = '')

module.exports = {
  create,
  add,
  apply,
  button,
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
  clearAll,
}
