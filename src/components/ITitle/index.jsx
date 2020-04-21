import Taro, { usState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

function ITitle({title='标题'}){
  return (
    <View className='i-title-content'>
      <View className='i-title'>{title}</View>
    </View>
  )
}

export default ITitle