import Taro, { Component } from '@tarojs/taro'

import { Provider } from '@tarojs/redux'

// import Index from './pages/index'

import store from './store'

import './app.scss'

class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  config = {
    pages: [
      'pages/MapDemo/index',
      'pages/ExampleHook/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      borderStyle: "black",
      selectedColor: "#000000",
      backgroundColor: "#ffffff",
      color: "#c7c7c7",
      list: [
        {
          pagePath: "pages/MapDemo/index",
          selectedIconPath: "./assets/icons/discover@highlight.png",
          iconPath: "./assets/icons/discover.png",
          text: "MapDemo"
        },
        {
          pagePath: "pages/ExampleHook/index",
          selectedIconPath: "./assets/icons/my@highlight.png",
          iconPath: "./assets/icons/my.png",
          text: "ExampleHook"
        }
      ]
    }
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
