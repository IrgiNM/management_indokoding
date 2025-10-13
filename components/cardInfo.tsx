import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { cardInfoType } from '@/types/cardInfoType'

const CardInfo = ({id, amount, date, description, icon, title, link=()=>{}, status, w}: cardInfoType) => {
  return (
    <View className={`${w} h-[60px] bg-white rounded-lg flex flex-row justify-between items-center shadow-md`}>
      <View className='flex flex-row justify-start items-center'>
        <View className='w-[40px] h-[40px] rounded-lg bg-blue-50 ml-3 flex justify-center items-center overflow-hidden border border-black'>
            <Image source={icon} style={{ width: 15, height: 15 }}/>
        </View>
        <View className='flex flex-col justify-start items-start ml-3'>
            <Text className='text-[10px] font-bold'>
                {title}
            </Text>
            <Text className='text-[10px]'>
                {description}
            </Text>
        </View>
      </View>
      <View className='flex flex-row justify-end items-center pr-[20px]'>
        <View className='flex flex-col justify-start items-end relative right-[5px] mr-3'>
            <Text className='text-[12px] font-bold'>
                {amount}
            </Text>
            <Text className='text-[10px]'>
                {date}
            </Text>
        </View>
        <Image
          source={require('../assets/objek/arrow-more.png')}
          style={{ width: 7, height: 10, opacity: 0.3 }}
          className='relative right-[0px]'
        />
      </View>
    </View>
  )
}

export default CardInfo