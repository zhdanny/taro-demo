import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import moment from 'dayjs'
import './index.scss'

/**
 * description
 * @params {}
 * @time {Date} // 默认当前时间
 * @confirmText {String} "确定" // 确定按钮的文字，默认为”确定“
 * @cancelText {String} '取消' // 取消按钮的文字，默认为‘取消’
 * @cancelBtn {Boolean} true | false // 是否有取消按钮，默认为true存在
 * @confirmBtn {Boolean} true | false // 是否有确定按钮，默认为true存在
 * @disabledFeature {Boolean} true | false // 未来周期是否不可用，默认为true不可用
 * 
 * @function{}
 * onConfirm(week)=>{ // 点击确认按钮的回调事件
 * @week {Object} {start: '2020-10-19', end: '2020-10-25'}
 * } 
 * onCancel()=>{} // 点击取消按钮事件
 * 
*/
function WeekCalendar(props){
  let {time, cancelText, confirmText, cancelBtn, confirmBtn, disabledFeature, onConfirm, onCancel} = props
  const [weekName] = useState(['一', '二', '三', '四', '五', '六', '日'])
  const [month, setMonth] = useState([])
  const [day, setDay] = useState([])
  const [week, setWeek] = useState({})
  
  useEffect(()=>{
    init(time)
  }, [])

  const init = (timeDate) => {
    let m = yearMonth(timeDate)
    let d = monthWeek(timeDate)
    setDay(d)
    setMonth(m)
  }
  const monthWeek = (timeDate) => {
    //求出当月所有的周期
    // 默认选中的周期
    let weekArr = []
    //当月的第一天
    let monthDayFirst = moment(timeDate).startOf('month').format('YYYY-MM-DD')
    // 当月的最后一天
    let monthDayLast = moment(timeDate).endOf('month').format('YYYY-MM-DD')
    // 当月的最后一个周期
    let lastWeek = weekData(monthDayLast)
    for(let i=0;i<8;i++){
      let d = moment(monthDayFirst).add(7*(i), 'day').format('YYYY-MM-DD')
      let w = weekData(d)
      let isCurrentWeek = CurrentWeek(timeDate, w.start, w.end);
      if(isCurrentWeek){
        setWeek({start: w.start, end: w.end})
      }
      
      let dw = false
      // 是否可选未来的时间周期
      if(disabledFeature){
        // 判断是否是未来时间
        dw = disabledWeek(w.start)
      }
      let ws = {isCurrentWeek, disabledWeek: dw, ...w}
      weekArr.push(ws)
      if(moment(ws.end).isSame(moment(lastWeek.end))){
        break;
      }
    }
    return weekArr
  }
  
  const CurrentWeek = (timeDate, start, end) => {
    // 判断传入的日期，是否在这个周期内
    const bewteen = moment(timeDate).format('YYYY-MM-DD') == start || moment(timeDate).format('YYYY-MM-DD') == end
    let isCurrentWeek = moment(timeDate).isBefore(moment(end)) && moment(timeDate).isAfter(moment(start)) || bewteen
    return isCurrentWeek
  }
  const disabledWeek = (start) => {
    // 判断选中周期是未来时间
    //当前时间所在周期
    let curtWeek = weekData()

    let dw = moment(start).isAfter(moment(curtWeek.end)) || moment(start).isSame(moment())
    return dw

  }
  const disabledMonth = (start) => {
    // 获取当前月份
    let mon = moment().month()
    // 获取当前年份
    let year = moment().year()
    if(moment(start).year()<year){
      return false
    }else if(moment(start).year() === year){
      if(moment(start).month()>mon){
        return true
      }else{
        return false
      }
    }else{
      return true
    }
  }
  const weekData = (timeDate) => {
    let start = moment(timeDate).day(1).format('YYYY-MM-DD')
    let end = moment(timeDate).day(7).format('YYYY-MM-DD')
    const ti = moment(timeDate) // 今天
    const n = ti.day()  // 当前天周几
    if(n == 0) {
      start = ti.subtract(6, 'day').format('YYYY-MM-DD')
      end = ti.format('YYYY-MM-DD')
    }
    let arr = []
    for(let i = 0; i < 7; i++){
      arr.push(moment(start).add(i, 'day').format('YYYY-MM-DD'))
    }
    return {
      start, 
      end,
      value: arr
    }
  }
  const yearMonth = (timeDate) => {
    // 求出当月前后两月的月份
    let arrMonth = []
    // 默认选中的月份
    let selectedMonth = {label: moment(timeDate).format('YY年MM月'), value:  moment(timeDate).format('YYYY-MM-DD'), currentMonth: true}
    // 判断是否可以选择未来时间
    let dmonth = false
    if(disabledFeature){
      dmonth = disabledMonth(selectedMonth.value)// 判断是否是未来时间
    }
    selectedMonth = {disabledMonth: dmonth, ...selectedMonth}
    let arrRight = []
    let arrLeft = []
    for(let i = 0; i < 2; i++){
      let right = {label: moment(timeDate).add(i+1, 'month').format('YY年MM月'), value: moment(timeDate).add(i+1, 'month').format('YYYY-MM-DD'), currentMonth: false}
      
      let dmr = false;
      if(disabledFeature){
        dmr = disabledMonth(right.value)
      }
      right = {disabledMonth: dmr, ...right}
      arrRight.push(right)

      let left = {label: moment(timeDate).subtract(i+1, 'month').format('YY年MM月'), value: moment(timeDate).subtract(i+1, 'month').format('YYYY-MM-DD'), currentMonth: false}
      let dml = false
      if(disabledFeature){
        dml = disabledMonth(left.value)
      }
      
      left = {disabledMonth: dml, ...left}
      arrLeft.push(left)
    }
    arrLeft = arrLeft.reverse()
    arrMonth = [...arrLeft, selectedMonth,  ...arrRight]
    console.log('arrMonth', arrMonth)
    return arrMonth
  }
  const cancelFn = () => {
    onCancel()
  }
  const confirmFn = () => {
    console.log('week', week);
    onConfirm(week)
  }
  
  const changeCalendar = (timeDate, disabled) => {
    if(!disabled){
      init(timeDate)
    }
  }
  const changeMonth = (timeDate, disabled) => {
    if(!disabled){
      let monthDayFirst = moment(timeDate).startOf('month').format('YYYY-MM-DD')
      init(monthDayFirst)
    }
  }

  return (
    <View className='calendar-wrap'>
      <View className='month-wrap'>
        {
          month.map(item=>{
            return (
            <View 
              className={item.disabledMonth ? 'month-disabled month' : item.currentMonth ? 'month-active month' : 'month'}
              onClick={()=>changeMonth(item.value, item.disabledMonth)} 
              key={item}
            >
              {item.label}
            </View>)
          })
        }
      </View>
      <View className='week-name-wrap'>
        {weekName.map(item=>{
          return (
            <View key={item} className='week-name'>{item}</View>
          )
        })}
      </View>
      <View className='day-wrap'>
        {
          day.map(item=>{
            return (<View key={item} 
              className={item.disabledWeek ? 'week-disabled week' : item.isCurrentWeek ? 'week-active week' : 'week'} 
              onClick={()=>changeCalendar(item.end, item.disabledWeek)}
            >
              {/* {item.disabledWeek} */}
              {item.value.map(im=>{
                return (
                <View key={im} className='day'>{moment(im).format('D')}</View>
                )
              })}
            </View>)
          })
        }
      </View>
      <View className='btn-wrap'>
        {cancelBtn && <View onClick={()=>cancelFn()} className='btn cancel-btn'>{cancelText}</View>}
        {confirmBtn && <View onClick={()=>confirmFn()} className='btn confirm-btn'>{confirmText}</View>}
      </View>
    </View>
  )
}

WeekCalendar.defaultProps = {
  cancelText: '取消',
  confirmText: '确定',
  cancelBtn: true,
  confirmBtn: true,
  disabledFeature: true
}

export default WeekCalendar