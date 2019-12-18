import Component from '../react/component'
const ReactDOM = {
  render
}

// 将虚拟dom渲染到页面上
function render(vnode, container) {
  return container.appendChild(_render(vnode))
}

// 由虚拟dom创建真实dom
function _render(vnode) {
  if (typeof vnode == 'null' || typeof vnode === 'boolean') return ''
  if (typeof vnode === 'number') vnode = String(vnode)
  if (typeof vnode == 'string') {
    // 创建文本节点
    const textNode = document.createTextNode(vnode)
    return textNode
  }
  const { tag, attrs } = vnode

  // 如果tag是函数则要渲染组件
  if (typeof tag === 'function') {
    // 1、创建组件
    const comp = createComponent(tag, attrs)
    // 2、设置组件属性
    setComponentProps(comp, attrs)
    // 3、返回节点
    return comp.base
  }


  // 否则就是虚拟dom对象
  const dom = document.createElement(tag)
  // 添加属性attrs
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      const value = attrs[key]
      setAttribute(dom, key, value)
    })
  }
  if (vnode.childrens) {
    vnode.childrens.forEach(child => render(child, dom))//递归渲染子节点
  }
  return dom
}

function setAttribute(dom, key, value) {
  if (key === 'className') key = 'class'
  const eventAttr = 'eventAttr', styleAttr = 'styleAttr', otherAttr = 'otherAttr'
  let type
  (/on\w+/.test(key)) ? type = eventAttr : key === 'style' ? type = styleAttr : type = otherAttr

  const strats = {
    eventAttr: () => {
      key = key.toLowerCase()
      dom[key] = value || ''
    },
    styleAttr: () => {
      if (!value || typeof value === 'string') {
        dom.style.cssText = value || ''
      }
      if (value && typeof value === 'object') {
        for (const k in value) {
          typeof value[k] === 'number' ? dom.style[k] = value[k] + 'px' : dom.style[k] = value[k]
        }
      }
    },
    otherAttr: () => {
      if (key in dom) dom[key] = value
      value ? dom.setAttribute(key, value) : dom.removeAttribute(key)
    }
  }
  strats[type]()
}

function createComponent(comp, props) {
  // 判断comp是类组件还是函数组件
  let instance
  if (comp.prototype && comp.prototype.render) {
    // 类组件，直接创建实例并返回
    instance = new comp(props)
  } else {
    // 函数组件，要扩展成类组件，方便统一管理
    instance = new Component(props)
    instance.constructor = comp
    instance.render = function () {
      return this.constructor(props)
    }
  }
  return instance
}

function setComponentProps(comp, props) {
  // 实现生命周期方法
  if (!comp.base) {
    if (comp.componentWillMount) comp.componentWillMount()
  } else if (comp.componentWillReceiveProps) {
    comp.componentWillReceiveProps()
  }
  comp.props = props
  renderComponent(comp)
}
export function renderComponent(comp) {
  let base
  const renderer = comp.render() //jsx
  base = _render(renderer)
  // 实现生命周期方法
  if (comp.base && comp.componentWillUpdate) comp.componentWillUpdate()
  if (comp.base) {
    if (comp.componentDidUpdate) comp.componentDidUpdate()
  } else if (comp.componentDidMount) {
    comp.componentDidMount()
  }

  // 节点替换
  if (comp.base && comp.base.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base)
  }

  comp.base = base
}

export default ReactDOM


// 思考两个问题：
// 1）为什么ReactDOM.render必须要引入React
// 2）函数组件、类组件返回的js对象一样吗？