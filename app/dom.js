// cache of dom objects so we don't recreate from scratch every time
// this might be a bad idea, but i'm going to go with it as long as
// i can. this will also allow for animation and whatnot
const cache = {}

// root of the app
const root = document.getElementById('root')

// clears everything from root (or any other node)
const clearAll = (el = root) => (el.innerHTML = '')

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
        Object.keys(props[key]).forEach(k => {
          // for animation, we set this attribute slightly afterward
          // don't ask, this is hacky and horrible
          const set = () => (el.style[k] = props[key][k])

          // okay, you asked. so the reason is because we add the element
          // back into the dom, and then when we (slightly later) update
          // the left/right/top/bottom/etc, CSS transition kicks in.
          // if we change the attribute before we add it back into the dom,
          // the CSS transition won't fire.
          // yuck, and there's almost certainly a better way.
          // this is what you get for having a back end dev write front end code
          // but this DOES work!
          ;(props.animate || []).includes(k) ? setTimeout(set, 1) : set()
        })
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
const create = tag => (children, props = {}) => {
  // load from cache if provided in props
  let el = props.cache ? cache[props.cache] : null
  el = el || document.createElement(tag)

  if (props.cache) {
    clearAll(el)
    cache[props.cache] = el
  }

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
const table = (t, props) =>
  create('table')(
    [
      t[0] && create('thead')(create('tr')(t[0].map(cell => create('th')(cell)))),
      create('tbody')(t.slice(1).map(row => create('tr')(row.map(cell => create('td')(cell))))),
    ],
    props
  )

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
