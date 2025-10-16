import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { headerBackType } from '@/types/headerBackType'
import { useRouter } from 'expo-router'

const HeaderBack = ({ title, subTitle } : headerBackType ) => {
  const router = useRouter();
  return (
    <View className='flex flex-row justify-start items-center relative top-[30px] w-full h-[100px] px-[30px] py-[0px]'>
      <Pressable onPress={() => {router.replace('/(tabs)/home')}} className='w-[45px] h-[45px] border-[.5px] border-b-[1px] border-purple-600 rounded-xl bg-purple-50 flex justify-center items-center'>
          <Image source={require("../assets/objek/arrow-back.png")} style={{ width: 13, height: 17 }}/>
      </Pressable>
      <Text className='text-[15px] font-bold ml-5 h-[45px] pt-[12px]'>{title}</Text>
      {subTitle && 
        <Text className='ml-3 h-[45px] pt-[14px]'>-  {subTitle}</Text>
      }
    </View>
  )
}

export default HeaderBack