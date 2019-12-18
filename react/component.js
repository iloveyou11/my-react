import {
    renderComponent
} from '../react-dom/index.jsx'

class Component {
    constructor(props = {}) {
        this.props = props
        this.state = {}
    }
    setState(stateChange) {
        // 更新状态
        Object.assign(this.state, stateChange)
            // 渲染组件
        renderComponent(this)
    }
}
export default Component