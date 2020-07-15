import Taro, {} from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import arrowRight from '@/assets/images/arrow-right.png'
import './index.scss'

function RowItem({item, onJumpDetail}){
  return (
    <View className='t-row' onClick={()=>onJumpDetail(item.path)}>
      <View className='t-row-item'>
        <View className='t-row-item_left'>
          <View className='t-row-item_title'>{item.title}</View>
          {item.desc && <View className='t-row-item_desc'>{item.desc || ''}</View>}
        </View>
        <View className='t-row-item_right'>
          <Image src={arrowRight} className='t-row-item_icon' />
        </View>
      </View>
    </View>
  )
}

export default RowItem