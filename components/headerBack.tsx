import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { headerBackType } from '@/types/headerBackType'

const HeaderBack = ({ title, subTitle } : headerBackType ) => {
  return (
    <View className='flex flex-row justify-start items-center relative top-[30px] w-full p-[30px] py-[15px]'>
      <View className='w-[45px] h-[45px] rounded-xl bg-blue-50 flex justify-center items-center'>
          <Image source={require("../assets/objek/arrow-back.png")} style={{ width: 13, height: 17 }}/>
      </View>
      <Text className='text-[15px] font-bold ml-5 h-[45px] pt-[12px]'>{title}</Text>
      {subTitle && 
        <Text className='ml-3 h-[45px] pt-[14px]'>-  {subTitle}</Text>
      }
    </View>
  )
}

export default HeaderBack