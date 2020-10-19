import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import WeekCalendar from '@/components/WeekCalendar'

function WeekSelectDemo(){
  const disabledFeature1 = false
  const disabledFeature2 = true
  const onCancel = () => {

  }
  const onConfirm = (week) => {
    console.log('week', week);
  }

  return (
    <View>
      <View>
        未来时间周期可选
      </View>
      <WeekCalendar
        onCancel={()=>onCancel} 
        onConfirm={()=>onConfirm} 
        disabledFeature={disabledFeature1}
        cancelText='重置'
        confirmText='确认'
      />
      <View>
        未来时间周期不可选
      </View>
      <WeekCalendar
        onCancel={()=>onCancel} 
        onConfirm={()=>onConfirm} 
        disabledFeature={disabledFeature2}
        cancelBtn={false}
        confirmBtn={false}
      />
    </View>
  )
}

WeekSelectDemo.config = {
  navigationBarTitleText: '周期选择示例'
}
export default WeekSelectDemo