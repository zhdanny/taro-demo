import Taro, { useState} from '@tarojs/taro'
import { View, Image, Camera, Button, CoverView, CoverImage } from '@tarojs/components'
import paishe from '@/assets/icons/paishe.png'
import queren from '@/assets/icons/queren.png'
import chongpai from '@/assets/icons/zhongpaishe.png'
import xiangce from '@/assets/icons/xiangce_1.png'
import idCardImg from '@/assets/images/box.png' 
import './index.scss'


function IDCard(){
  const [ imgShow, setImgShow ] = useState( false )
  const [ src, setSrc ] = useState( '' )
  
  const takePhoto  = ()=> {
    const ctx = Taro.createCameraContext()
    const listener = ctx.onCameraFrame((frame) => {
      console.log(frame)
    })
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        setSrc(res.tempImagePath)
        setImgShow(true)
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
    //TODO 上传照片或者校验OCR

    setImgShow(false)
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

  const saveImg = async (url) => {
    let u = url ? url : src
    await uploadFn(u)
    
  }

  const cancelBtn = () => {
    setImgShow(false)
  }

  // 选择相册打开上传
  const selectPhoto = ()=>{
    Taro.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: async (res)=>{
        console.log('res', res)
        await setSrc(res.tempFilePaths[0])
        setImgShow(true)
      },
      fail: ()=>{
        console.log('取消打开')
      }
    })
  }

  return (
    <View className='camera_box'>
      {/* 拍摄的框 */}
      {!imgShow  && 
      <View className='camrea-back'>
        <Camera className='camera' device-position='back' flash='off' binderror='error'>
          {/* 相机上面的身份证框 */}
          <CoverView className='id_m'>
            <CoverImage className='img' src={idCardImg} />
          </CoverView>
        </Camera>
      </View>
      }
      {/* 拍摄好的图片 */}
      { imgShow && 
      <View className='camrea-back'>
        <Image className='camera_img' src={src} mode='widthFix' />
      </View>
      }
      <View className='action'>
        { !imgShow && 
          <View className='selectPhoto' onClick={()=>selectPhoto()}>
            <Image src={xiangce} className='xiangce' />
          </View>
        }
        {/* 点击拍摄 */}
        { !imgShow && 
          <View className='takeBtn' onClick={()=>takePhoto()}>
            <Image src={paishe} className='paishe-img' />
          </View>}
        {/* 确认图片 */}
        { imgShow && 
          <View className='saveImg' onClick={()=>saveImg()} >
            <Image src={queren} className='queren-img' />
          </View>}
        {/* 重新拍摄 */}
        { imgShow && 
          <View className='cancelBtn' onClick={()=>cancelBtn()}>
            <Image src={chongpai} className='chongpai-img' />
          </View>}
      </View>
    </View>
  )
}

export default IDCard