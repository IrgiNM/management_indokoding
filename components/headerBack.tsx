import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { headerBackType } from '@/types/headerBackType'
import { useRouter } from 'expo-router'

const HeaderBack = ({ title, subTitle, type, textColor } : headerBackType ) => {
  const router = useRouter();
  return (
    <View className='flex flex-row justify-start items-center relative top-[30px] w-full h-[100px] px-[30px] py-[0px]'>
      <Pressable onPress={() => {router.replace('/(tabs)/home')}} className={`w-[45px] h-[45px] border-[.5px] border-b-[1px] 
        ${
          type === "js" ? "border-[#9A3412] bg-white" :
          type === "python" ? "border-[#004EBC] bg-yellow-50" :
          "border-[#9333EA] bg-purple-50"
        } rounded-xl flex justify-center items-center`}>
          <Image source={require("../assets/objek/arrow-back.png")} style={{ width: 13, height: 17 }} tintColor={
            type === "js" ? "#9A3412" :
            type === "python" ? "#004EBC" :
            "#9333EA"
          }/>
      </Pressable>
      <Text className={`text-[15px] font-bold ml-5 h-[45px] pt-[12px] ${textColor}`}>{title}</Text>
      {subTitle && 
        <Text className={`ml-3 h-[45px] pt-[14px] ${textColor}`}>-  {subTitle}</Text>
      }
    </View>
  )
}

export default HeaderBack