import Taro, {useState, useEffect} from '@tarojs/taro'
import {View, Button} from '@tarojs/components'

function ExampleHook(){
  const [count, setCount] = useState(0)
  const [list, setList] = useState([])

  useEffect(()=>{
    init()
  }, [])

  const init = ()=>{
    console.log('23232')
    let arr = [{
      key: 1,
      value: 'mini'
    },{
      key: 2,
      value: 'large'
    }]
    let li = [...list, ...arr]
    setList(li)
  }
  return (
    <View>
      Count: {count}
      <Button onClick={()=>setCount(preState=>preState+1)}>点击+1</Button>
      <View>
        {list.map(item=>{
          return (
            <View key={item.key}>{item.value}</View>
          )
        })}
      </View>
    </View>
  )
}

export default ExampleHook