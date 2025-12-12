import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { cardKaryawanType } from '@/types/cardKaryawanType'
import { formatRupiah } from '@/hooks/formatRupiahFunction'

const CardKaryawan = ({email, reimburse, username, image, link, w}: cardKaryawanType) => {
  return (
    <Pressable android_ripple={{ color: 'rgba(0,0,0,0.1)' }} onPress={link} className={`${w} h-[60px] bg-white border-[.5px] border-b-[1px] border-blue-800 rounded-lg flex flex-row justify-between items-center shadow-md`}>
      <View className='flex flex-row justify-start items-center'>
        <View className='w-[40px] h-[40px] rounded-full bg-blue-300 ml-3 flex justify-center items-center overflow-hidden border border-blue-800'>
            {image ? <Image source={image} style={{ width: 40, height: 40 }} className='rounded-full'/> :
            <Text className='text-white font-bold'>
                {username.charAt(0).toUpperCase()}
            </Text>
            }
        </View>
        <View className='flex flex-col justify-start items-start ml-3'>
            <Text className='text-[10px] font-bold text-blue-900'>
                {username}
            </Text>
            <Text className='text-[10px] text-blue-900'>
                {email}
            </Text>
        </View>
      </View>
      <View className='flex flex-row justify-end items-center pr-[20px]'>
        <View className='flex flex-col justify-start items-end relative right-[5px] mr-3'>
            <Text className='text-[12px] font-extrabold text-blue-600'>
                {formatRupiah(reimburse)}
            </Text>
            <Text className='text-[10px] text-blue-900'>
                in this month
            </Text>
        </View>
        <Image
          source={require('../assets/objek/arrow-more.png')}
          style={{ width: 7, height: 10, opacity: 0.3 }}
          className='relative right-[0px]'
          tintColor={"#C56900"}
        />
      </View>
    </Pressable>
  )
}

export default CardKaryawan