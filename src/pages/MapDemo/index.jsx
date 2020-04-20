import Taro, { Component } from '@tarojs/taro'
import { View, Map } from '@tarojs/components'

import './index.scss'

export default class MapDemo extends Component {

  
  constructor(props) {
    super(props)
    this.state = {
      setting:{
        'show-location':true,
        'show-compass':true,
        'include-points':true,
        subkey: 'AV6BZ-4CI3F-QGOJB-JFNAO-55IME-ZHF6B',
        scale:10
      },
      latitude: 39.5427,
      longitude: 116.2317,
      marker: [],
      polygon: [],
      points: [],
    }
  }
  
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillUnmount() {

  }

  componentDidShow() { }

  componentDidHide() { }
  config = {
    navigationBarTitleText: 'test'
  }
  render() {
    const {longitude, latitude, marker, polygon, setting, points} = this.state
    return (
      <View className='index'>
        <Map
          latitude={latitude}
          longitude={longitude}
          className='map-content'
          markers={marker}
          polygons={polygon}
          showLocation={setting['show-location']}
          showCompass={setting['show-compass']}
          includePoints={points}
          subkey={setting.subkey}
          scale={setting.scale}
        >
        </Map>
      </View >
    )
  }
}
