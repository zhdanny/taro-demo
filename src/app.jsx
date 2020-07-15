import Taro, { Component } from '@tarojs/taro'

import { Provider } from '@tarojs/redux'

// import Index from './pages/index'

import store from './store'

import './app.scss'

console.log('1');

class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  config = {
    pages: [
      'pages/Home/index',
      'pages/UserCenter/index',
      'pages/ExampleHook/index',
      'pages/MapDemo/index',
      'pages/EchartDemo/index',
      'pages/F2Demo/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      borderStyle: "white",
      selectedColor: "#1296db",
      backgroundColor: "#ffffff",
      color: "#8a8a8a",
      list: [
        {
          pagePath: "pages/Home/index",
          selectedIconPath: "./assets/icons/gongnengliebiao1.png",
          iconPath: "./assets/icons/gongnengliebiao2.png",
          text: "功能列表"
        },
        {
          pagePath: "pages/UserCenter/index",
          selectedIconPath: "./assets/icons/gerenxinxi1.png",
          iconPath: "./assets/icons/gerenxinxi2.png",
          text: "个人中心"
        }
      ]
    },
  }

  render () {
    return (
      <Provider store={store}>
        {/* <Index /> */}
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
