// root of the app
const root = document.getElementById('root')

// adds an HTML element to another element (or root, by default)
const add = (el, to = root) => {
  if (!el) return // blank, no-op

  return el instanceof HTMLElement
    ? to.appendChild(el) // normal html element
    : to.appendChild(document.createTextNode(`${el}`)) // text node
}

// adds a list of HTML elements to another element
const addAll = (el, to) => (Array.isArray(el) ? el.map(e => add(e, to)) : add(el, to))

// applies properties to an HTML element
// if provided `style` property, applies those as well
const apply = (el, props) => {
  if (!props) return el

  Object.keys(props).reduce((el, key) => {
    if (key in el) {
      // treat `style` differently
      if (key === 'style') {
        Object.keys(props[key]).forEach(k => (el.style[k] = props[key][k]))
      } else {
        el[key] = props[key]
      }
    }
    return el
  }, el)
}

// creates an element of type with children and properties
// e.g.
//   element('h1')('Hello there', { style: { backgroundColor: 'red' } })
const create = tag => (children, props) => {
  const el = document.createElement(tag)
  if (typeof children === 'string') {
    el.innerHTML = children
  } else {
    children && addAll(children, el)
  }
  props && apply(el, props)
  return el
}

// creates a table from a provided 2 dimensional array of
// text or html element nodes
// first row is always the header -- make it null if you don't want a header
// e.g.
//   table([[ 'hey', 'there' ], [ 1, element ]])
const table = t =>
  create('table')([
    t[0] && create('thead')(create('tr')(t[0].map(cell => create('th')(cell)))),
    create('tbody')(t.slice(1).map(row => create('tr')(row.map(cell => create('td')(cell))))),
  ])

// just some sugar for `create`
const div = create('div')
const h1 = create('h1')
const h2 = create('h2')
const h3 = create('h3')
const h4 = create('h4')
const h5 = create('h5')
const h6 = create('h6')
const p = create('p')
const span = create('span')

// creates a button with an onClick
const button = (text, props) => {
  const b = create('button')(text, props)
  props.onClick && b.addEventListener('click', props.onClick)
  return b
}

// creates an image with a src
const img = (src, props) => {
  const i = create('img')(null, props)
  i.src = src
  return i
}

// clears everything from root (or any other node)
const clearAll = (el = root) => (el.innerHTML = '')

module.exports = {
  create,
  add,
  apply,
  button,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  table,
  img,
  clearAll,
}
