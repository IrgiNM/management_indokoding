import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import HeaderBack from '@/components/headerBack'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { logoutUser } from '@/hooks/tokenFunction'

const profile = () => {
  const router = useRouter();
  return (
    <View className='bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      
      <View className='relative bg-blue-800 w-full h-[200px] rounded-3xl flex justify-start items-center'>
        <HeaderBack textColor='text-white' title='My Profile'/>
          <View className='absolute bottom-[-50px]  w-[120px] h-[120px] bg-gray-300 rounded-full  '></View>
      </View>

      <View className='w-full px-[30px] gap-5 mt-[70px]'>
        <Text className='font-bold text-center text-2xl'>
          IRGI GAMTENK BANGET
        </Text>
        <View className='flex-row justify-between items-center w-full  bg-gray-100 rounded-lg border-[1px] border-blue-800 mt-[50px]'>
          <Text className='  py-[15px] px-[15px]  '>
            Irgigamtenk@gmail.com
          </Text>      
        </View>
        
        <Pressable onPress={() => {router.replace('/(tabs)/history')}} className='flex-row justify-between items-center w-full  bg-gray-100 rounded-lg border-[1px] border-blue-800 py-[15px] px-[15px]'> 
          <Text className='  '>
            History Reimburse
          </Text>
          <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 10, height: 10, }} tintColor={"#40006B"}/>
        </Pressable>

        <Pressable onPress={() => {router.replace('/(detail)/changePassword')}} className='flex-row justify-between items-center w-full  bg-gray-100 rounded-lg border-[1px] border-blue-800 py-[15px] px-[15px]'> 
          <Text className='  '>
            Change Password
          </Text>
          <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 10, height: 10, }} tintColor={"#40006B"}/>
        </Pressable>
        
       
      </View>  
      <View className='absolute z-20 bottom-[0px] w-full h-[200px] border border-blue-800 bg-white flex justify-start gap-3 items-center px-[30px] pt-[20px] rounded-t-3xl'>
        <Pressable onPress={() => {router.replace('/(detail)/editProfile')}} className='p-[15px] w-full flex flex-row justify-center items-center   rounded-lg bg-blue-800'
        >
          <Text className='mr-2 text-white font-bold'>
              Edit Profile
          </Text>
          <Image source={require('../../assets/icons/s-decline.png')} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
        </Pressable>
        <Pressable onPress={() => {logoutUser()}} className='p-[15px] w-full flex flex-row justify-center items-center   rounded-lg bg-red-800'
        >
          <Text className='mr-2 text-white font-bold'>
              Log Out
          </Text>
          {/* <Image source={require('../../assets/icons/s-decline.png')} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/> */}
        </Pressable>
      </View>

    </View>
  )
}

export default profile