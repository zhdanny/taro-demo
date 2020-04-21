import Taro, {useContext} from '@tarojs/taro'
import { View } from '@tarojs/components'
import ITitle from '@/components/ITitle'
import RowItem from '@/components/RowItem'
import store from '@/store'

function Home(){
  const title = '下面是专用demo'
  const { demoData } = useContext(store.homeStore)
  const routerLnk = async (url)=>{
    Taro.navigateTo({
      url
    })
  }
  return (
    <View className='t-home'>
      <ITitle title={title} />
      <View>
        {demoData.map(item=>{
          return (
            <RowItem item={item} key={item.key} onJumpDetail={(url)=>routerLnk(url)} />
          )
        })}
      </View>
    </View>
  )
}

Home.config = {
  navigationBarTitleText: '首页'
}
export default Home