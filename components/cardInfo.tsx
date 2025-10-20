import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { cardInfoType } from '@/types/cardInfoType'

const CardInfo = ({id, amount, date, description, icon, title, link, type, status, w, longPress}: cardInfoType) => {
  return (
    <Pressable android_ripple={{ color: 'rgba(0,0,0,0.1)' }} onPress={link} onLongPress={longPress} className={`${w} h-[60px] bg-white rounded-lg flex flex-row justify-between items-center shadow-md border-[.5px] border-b-[1px] 
    ${
      type === "js" ? "border-[#9A3412] bg-white" :
      type === "python" ? "border-[#2563EB]" :
      "border-[#9333EA] bg-purple-50"
    }`}>
      <View className='flex flex-row justify-start items-center'>
        <View className={`w-[40px] h-[40px] rounded-lg bg-white ml-3 flex justify-center items-center overflow-hidden border
          ${
            type === "js" ? "border-[#9A3412] bg-white" :
            type === "python" ? "border-[#0034a4] bg-blue-100" :
            "border-[#9333EA] bg-purple-50"
          } border-purple-300`}>
            <Image source={icon} style={{ width: 20, height: 20 }} tintColor=
            {
              type === "js" ? "#9A3412" :
              type === "python" ? "#002F9D" :
              "border-[#9333EA] bg-purple-50" 
            }/>
        </View>
        <View className='flex flex-col justify-start items-start ml-3'>
            <Text className='text-[10px] font-bold'>
                {title}
            </Text>
            <Text className='text-[10px] '>
                {description}
            </Text>
        </View>
      </View>
      <View className='flex flex-row justify-end items-center pr-[20px]'>
        <View className='flex flex-col justify-start items-end relative right-[5px] mr-3'>
            <Text className={`text-[12px] font-extrabold 
              ${
                type === "js" ? "text-[#9A3412]" :
                type === "python" ? "text-[#2563EB]" :
                "text-[#9333EA]"
              }`}>
                {amount}
            </Text>
            <Text className='text-[10px] '>
                {date}
            </Text>
        </View>
        <Image
          source={require('../assets/objek/arrow-more.png')}
          style={{ width: 7, height: 10, opacity: 0.3 }}
          className='relative right-[0px]'
          tintColor={
            type === "js" ? "#9A3412" :
            type === "python" ? "#2563EB" :
            "border-[#9333EA] bg-purple-50" 
          }
        />
      </View>
    </Pressable>
  )
}

export default CardInfo