import Taro, { useState} from '@tarojs/taro'
import { View, Image, Camera, Button, CoverView, CoverImage } from '@tarojs/components'
import paishe from '@/assets/icons/paishe.png'
import queren from '@/assets/icons/queren.png'
import chongpai from '@/assets/icons/zhongpaishe.png'
import idCardImg from '@/assets/images/idcard.png' 
import './index.scss'


function IDCard(){
  const [ show, setShow ] = useState( false )
  const [ src, setSrc ] = useState( '' )
  const takePhoto  = ()=> {
    const ctx = Taro.createCameraContext()
    const listener = ctx.onCameraFrame((frame) => {
      console.log(frame)
    })
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('res', res)
        setSrc(res.tempImagePath)
        setShow(true)
        listener.stop({
          success: (result) => {
            console.log('result', result)
          },
          fail: (err) =>{
            console.log(err)
          }
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }

  const uploadFn = (file) => {
    // 保存接口
    // upload(file).then(result=>{
    //   let r = JSON.parse(result)
      // this.props.onChange(r.url)
      // this.setState((preState)=>{
      //   preState.loading = false
      // })
    // }).catch(()=>{
    //   this.setState((preState)=>{
    //     preState.src= ''
    //     preState.loading = false
    //   })
    //   Taro.showToast({
    //     icon: 'none',
    //     title: '上传失败'
    //   })
    // })
  }

  const saveImg = async () => {
    await uploadFn(src)
    Taro.showModal({
      title: `保存图片地址：${src}`,
      success (){
        Taro.switchTab({
          url: '/pages/Home/index'
        })
      }
    })
  }

  const cancelBtn = () => {
    setShow(false)
  }

  return (
    <View className='camera_box'>
      {/* 拍摄的框 */}
      {!show  && 
      <Camera className='camera' device-position='back' flash='off' binderror='error'>
        {/* 相机上面的身份证框 */}
        <CoverView className='id_m'>
          <CoverImage className='img' src={idCardImg} />
        </CoverView>
      </Camera>}
      {/* 拍摄好的图片 */}
      { show && <Image className='camera_img' src={src} mode='widthFix' />}
      <View className='action'>
        {/* 点击拍摄 */}
        { !show && 
          <View className='takeBtn' onClick={()=>takePhoto()}>
            <Image src={paishe} className='paishe-img' />
          </View>}
        {/* 确认图片 */}
        { show && 
          <View className='saveImg' onClick={()=>saveImg()} >
            <Image src={queren} className='queren-img' />
          </View>}
        {/* 重新拍摄 */}
        { show && 
          <View className='cancelBtn' onClick={()=>cancelBtn()}>
            <Image src={chongpai} className='chongpai-img' />
          </View>}
      </View>
    </View>
  )
}

export default IDCard