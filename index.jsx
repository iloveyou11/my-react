import React from './react/index.jsx'
import ReactDOM from './react-dom/index.jsx'

// 挂载函数组件
// function Home() {
//   return (
//     <div title='title' className='container' style={style}> hello, <span style='color:green'>hoho</span></div >
//   )
// }

// 挂载类组件
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  handleClick() {
    this.setState({
      count: this.state.count + 1
    })
  }

  componentWillMount() {
    console.log('componentWillMount');
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  render() {
    return (
      <div title='title' className='container' style={style}> hello, <span style='color:green'>{this.state.count}</span>
        <button onClick={this.handleClick.bind(this)}>点我+1</button>
      </div >
    )
  }
}


const style = {
  color: 'pink',
  fontSize: '30px',
  border: '1px #666 solid',
};

const ele = (
  <div title='title' className='container' style={style}> hello, <span style='color:green'>hoho</span></div >
)
// ReactDOM.render(ele, document.querySelector('#root'))
ReactDOM.render(<Home />, document.querySelector('#root'))
