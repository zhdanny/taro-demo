import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import WeekCalendar2 from '@/components/WeekCalendar2'

function WeekSelectDemo(){
  const onCancel = () => {

  }
  const onConfirm = (week) => {
    console.log('week', week);
  }

  return (
    <View>
      <WeekCalendar2
        onCancel={()=>onCancel} 
        onConfirm={()=>onConfirm} 
      />
    </View>
  )
}

WeekSelectDemo.config = {
  navigationBarTitleText: '周期选择示例'
}
export default WeekSelectDemo