import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import {moment} from '../../utils'

export default class WeekCalendar extends Component {
  static defaultProps = {
    cancelText: '取消',
    confirmText: '确定',
    cancelBtn: true,
    confirmBtn: true,
  }
  constructor() {
    // super(props)
    this.state = {
      weekName: ['一', '二', '三', '四', '五', '六', '日'],
      month: [],
      day: [],
      week: {}
    }
  }
  componentWillMount(){
    this.init(this.props.time)
  }
  componentDidShow(){
    
  }
  init(time){
    let month = this.yearMonth(time)
    let day = this.monthWeek(time)
    this.setState((preState)=>{
      preState.month = month
      preState.day = day
    })
  }
  monthWeek(time){
    //求出当月所有的周期
    // 默认选中的周期
    let weekArr = []
    //当月的第一天
    let monthDayFirst = moment(time).startOf('month').format('YYYY-MM-DD')
    // 当月的最后一天
    let monthDayLast = moment(time).endOf('month').format('YYYY-MM-DD')
    // 当月的最后一个周期
    let lastWeek = this.weekData(monthDayLast)
    for(let i=0;i<8;i++){
      let day = moment(monthDayFirst).add(7*(i), 'day').format('YYYY-MM-DD')
      let week = this.weekData(day)
      let isCurrentWeek = this.CurrentWeek(time, week.start, week.end);
      if(isCurrentWeek){
        this.setState((preState)=>{
          preState.week = {
            start: week.start,
            end: week.end
          }
        })
      }
      let dw = this.disabledWeek(week.start)
      let w = {isCurrentWeek, disabledWeek: dw, ...week}
      weekArr.push(w)
      if(moment(week.end).isSame(moment(lastWeek.end))){
        break;
      }
    }
    return weekArr
  }
  
  CurrentWeek(time, start, end){
    // 判断传入的日期，是否在这个周期内
    const bewteen = moment(time).format('YYYY-MM-DD') == start || moment(time).format('YYYY-MM-DD') == end
    let isCurrentWeek = moment(time).isBefore(moment(end)) && moment(time).isAfter(moment(start)) || bewteen
    return isCurrentWeek
  }
  disabledWeek(start){
    // 判断选中周期是未来时间
    //当前时间所在周期
    let curtWeek = this.weekData()

    let disabledWeek = moment(start).isAfter(moment(curtWeek.end)) || moment(start).isSame(moment())
    return disabledWeek

  }
  disabledMonth(start){
    // 获取当前月份
    let month = moment().month()
    // 获取当前年份
    let year = moment().year()
    if(moment(start).year()<year){
      return false
    }else if(moment(start).year() === year){
      if(moment(start).month()>month){
        return true
      }else{
        return false
      }
    }else{
      return true
    }
  }
  weekData(time){
    let start = moment(time).day(1).format('YYYY-MM-DD')
    let end = moment(time).day(7).format('YYYY-MM-DD')
    const ti = moment(time) // 今天
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
  yearMonth(time){
    // 求出当月前后两月的月份
    let arrMonth = []
    // 默认选中的月份
    let selectedMonth = {label: moment(time).format('YY年MM月'), value:  moment(time).format('YYYY-MM-DD'), currentMonth: true}
    let disabledMonth= this.disabledMonth(selectedMonth.value)
    selectedMonth = {disabledMonth, ...selectedMonth}
    let arrRight = []
    let arrLeft = []
    for(let i = 0; i < 2; i++){
      let right = {label: moment(time).add(i+1, 'month').format('YY年MM月'), value: moment(time).add(i+1, 'month').format('YYYY-MM-DD'), currentMonth: false}
      let dmr= this.disabledMonth(right.value)
      right = {disabledMonth: dmr, ...right}
      arrRight.push(right)

      let left = {label: moment(time).subtract(i+1, 'month').format('YY年MM月'), value: moment(time).subtract(i+1, 'month').format('YYYY-MM-DD'), currentMonth: false}
      let dml= this.disabledMonth(left.value)
      left = {disabledMonth: dml, ...left}
      arrLeft.push(left)
    }
    arrLeft = arrLeft.reverse()
    arrMonth = [...arrLeft, selectedMonth,  ...arrRight]
    // console.log('arrMonth', arrMonth)
    return arrMonth
  }
  cancelFn(){
    this.props.onCancel()
  }
  confirmFn(){
    // console.log('this.state.wek', this.state.week)
    this.props.onConfirm(this.state.week)
  }
  
  changeCalendar(time, disabled){
    if(!disabled){
      this.init(time)
    }
  }
  changeMonth(time, disabled){
    if(!disabled){
      let monthDayFirst = moment(time).startOf('month').format('YYYY-MM-DD')
      this.init(monthDayFirst)
    }
  }
  render () {
    let {
      month, day, weekName
    } = this.state
    const {
      cancelText,
      confirmText,
      cancelBtn,
      confirmBtn,
    } = this.props
    return (
      <View className='calendar-wrap'>
        <View className='month-wrap'>
          {
            month.map(item=>{
              return (
              <View 
                className={item.disabledMonth ? 'month-disabled month' : item.currentMonth ? 'month-active month' : 'month'}
                onClick={this.changeMonth.bind(this, item.value, item.disabledMonth)} 
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
                onClick={this.changeCalendar.bind(this, item.end, item.disabledWeek)}
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
          {cancelBtn && <View onClick={this.cancelFn.bind(this)} className='btn cancel-btn'>{cancelText}</View>}
          {confirmBtn && <View onClick={this.confirmFn.bind(this)} className='btn confirm-btn'>{confirmText}</View>}
        </View>
      </View>
    )
  }
}
