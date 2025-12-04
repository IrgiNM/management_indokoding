import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { headerBackType } from '@/types/headerBackType'
import { useRouter } from 'expo-router'

const HeaderBack = ({ title, subTitle, type, textColor } : headerBackType ) => {
  const router = useRouter();
  return (
    <View style={{ width: '100%' }} className='flex flex-row justify-start items-center relative z-[998] top-[0px] w-full h-[120px] px-[30px] pb-[20px] pt-[50px] '>
      {type!=='django'&&(
        <Image
          source={
            type === 'python'
              ? require('../assets/images/python-bg.png') :
            type === 'setting'
              ? require('../assets/images/golang-setting-page.png') :
            require('../assets/images/total-reimburse-bg.png')
            } 
          style={{ width: 420, height: 120, position: 'absolute', top: 0, left: 0, right: 0, }} contentFit="cover" className='absolute -z-1 w-full'
        />
      )}
      <Pressable onPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.push('/home');
        }
      }} className={`w-[45px] h-[45px] border border-b-[2px] 
        ${
          type === "django" ? "border-[#004344] bg-[#00b1c8]" :
          type === "setting" ? "border-[#004344] bg-[#00b1c8]" :
          type === "python" ? "border-[#ffffff] bg-[#758eff]" :
          "border-[#9333EA] bg-purple-50"
        } rounded-xl flex justify-center items-center`}>
          <Image source={require("../assets/objek/arrow-back.png")} style={{ width: 13, height: 17, }} tintColor={
            type === "django" ? "#FFFFFF" :
            type === "setting" ? "#FFFFFF" :
            type === "python" ? "#FFFFFF" :
            "#9333EA"
          }/>
      </Pressable>
      <Text className={`text-[15px] font-bold ml-5 h-[45px] pt-[12px] text-white`}>{title}</Text>
      {subTitle && 
        <Text className={`ml-3 h-[45px] pt-[14px] text-white`}>-  {subTitle}</Text>
      }
    </View>
  )
}

export default HeaderBack