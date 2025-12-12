import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import HeaderBack from '@/components/headerBack'
import { Image } from 'expo-image'
import { router, useRouter } from 'expo-router'

const editProfil = () => {

  return (
    <View className='bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      
      <View className='relative bg-blue-800 w-full h-[200px] rounded-3xl flex justify-start items-center'>
        <HeaderBack textColor='text-white' title='My Profile'/>
          <View className='absolute bottom-[-50px]  w-[120px] h-[120px] bg-gray-300 rounded-full  '></View>
      </View>

      <View className='w-full px-[30px] gap-5 mt-[70px]'>
        <Pressable className='font-bold text-center text-2xl flex-row items-center justify-center'>
            <Text className='font-bold  mr-2'>
            Edit Gambar
            </Text>
            <Image source={require("../../assets/objek/edit.png")} style={{ width: 13, height: 13, }} tintColor={"#0000000000"}/>
        </Pressable>

        <View className=' mt-[50px]'>
          <Text className='font-bold'>
            Username :
          </Text>
          <TextInput placeholder='Edit Username' className='text-black py-[15px] px-[15px] w-full  bg-gray-100 rounded-lg border-[1px] border-blue-800 mt-[10px]  '/>
        </View>

        <View className=''>
          <Text className='font-bold'>
            Email :
          </Text>
          <TextInput placeholder='Edit Email' className='text-black py-[15px] px-[15px] w-full  bg-gray-100 rounded-lg border-[1px] border-blue-800 mt-[10px]  '/>
        </View>
      </View> 

      <View className='absolute z-20 bottom-[0px] w-full h-[150px] border border-blue-800 bg-white flex justify-start gap-3 items-center px-[30px] pt-[20px] rounded-t-3xl'>
        <Pressable onPress={() => {router.replace('/(tabs)/profile')}} className='p-[15px] w-full flex flex-row justify-center items-center   rounded-lg bg-blue-800'>
          <Text className='mr-2 text-white font-bold'>
            Save
          </Text>
          <Image source={require('../../assets/objek/edit.png')} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
        </Pressable>
      </View> 
    </View>
  )
}

export default editProfil