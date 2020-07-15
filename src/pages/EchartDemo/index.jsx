import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as echarts from '../../components/ec-canvas/echarts'
import './index.scss'

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })
  canvas.setChart(chart)
  const model = {
    yCates: ['Saturday', 'Friday', 'Thursday',
      'Wednesday', 'Tuesday', 'Monday',
      'Sunday'],
    xCates: ['1', '2', '3', '4', '5'],
    data: [
      // [yCateIndex, xCateIndex, value]
      [0, 0, 5], [0, 1, 7], [0, 2, 3], [0, 3, 5], [0, 4, 2],
      [1, 0, 1], [1, 1, 2], [1, 2, 4], [1, 3, 8], [1, 4, 2],
      [2, 0, 2], [2, 1, 3], [2, 2, 8], [2, 3, 6], [2, 4, 7],
      [3, 0, 3], [3, 1, 7], [3, 2, 5], [3, 3, 1], [3, 4, 6],
      [4, 0, 3], [4, 1, 2], [4, 2, 7], [4, 3, 8], [4, 4, 9],
      [5, 0, 2], [5, 1, 2], [5, 2, 3], [5, 3, 4], [5, 4, 7],
      [6, 0, 6], [6, 1, 5], [6, 2, 3], [6, 3, 1], [6, 4, 2]
    ]
  }

  const data = model.data.map(function (item) {
    return [item[1], item[0], item[2] || '-']
  })

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      top: '0',
      left: '0',
      data: ['直接访问', '邮件营销', '联盟广告']
    },
    // visualMap: {
    //   // min: 1,
    //   // max: 10,
    //   show: false,
    //   calculable: true,
    //   orient: 'horizontal',
    //   left: 'center',
    //   bottom: 10,
    //   // inRange: {
    //   //   color: ['#37A2DA', '#32C5E9', '#67E0E3'],
    //   // }
    // },
    color: ['#FFB74A', '#71CA4A', '#7964E7', '#2AE1B1', '#18A4FB', '#F2682C'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  const option2 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    color: ['#FFB74A', '#71CA4A', '#7964E7', '#2AE1B1', '#18A4FB', '#F2682C'],
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  }
  if(canvas.canvasId === 'mychart-bar'){
    chart.setOption(option)
  }else{
    chart.setOption(option2)
  }
  
  return chart
}
export default class EchartDemo extends Component {

  state = {
    ec: {
      onInit: initChart
    }
  }

  config = {
    navigationBarTitleText: 'echarts-for-weixin 示例项目',
    usingComponents: {
      'ec-canvas': '../../components/ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }

  

  render () {
    return (
      <View className='echarts'>
        <View className='echarts-content'>
          <ec-canvas id='mychart-bar-area' canvas-id='mychart-bar' ec={this.state.ec}></ec-canvas>
        </View>
        <View className='echarts-content'>
          <ec-canvas id='mychart-line-area' canvas-id='mychart-line' ec={this.state.ec}></ec-canvas>
        </View>
        

      </View>
    )
  }
}