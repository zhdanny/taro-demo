import Taro, { createContext } from '@tarojs/taro'
import { observable, action } from 'mobx'

class HomeStore {
  @observable demoData = [
    {
      title: 'Map组件相关功能',
      path: '/pages/MapDemo/index',
      key: 1
    }, 
    {
      title: 'Hook功能试用',
      path: '/pages/ExampleHook/index',
      key: 2
    }, 
    {
      title: 'Echart图表demo',
      path: '/pages/EchartDemo/index',
      key: 3
    }, 
    {
      title: 'F2图表demo',
      path: '/pages/F2Demo/index',
      key: 4
    },
    {
      title: '周期选择组件',
      path: '/pages/F2Demo/index',
      key: 5
    },
    {
      title: '身份证拍摄取景框',
      path: '/pages/IDCard/index',
      key: 5
    },
  ]

  @action.bound
  async test() {
    await setTimeout(() => {
      console.log('1212')
    }, 200)
  }
}

export default createContext(new HomeStore())
