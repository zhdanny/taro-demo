import Taro, {} from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

function UserCenter(){
  return (
    <View className='t-center'>个人中心</View>
  )
}

UserCenter.config = {
  navigationBarTitleText: '个人中心'
}
export default UserCenter