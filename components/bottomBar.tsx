import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const BottomBar = () => {
  const router = useRouter();
  const iconHomeBar = [
    {
        id: 1,
        title: "Home",
        color: "#F3D1FF",
        icon: require("../assets/icons/home-active.png"),
        link: () => {router.replace('/home')},
    },
    {
        id: 1,
        title: "History",
        color: "#F3D1FF",
        icon: require("../assets/icons/history-active.png"),
        link: () => {router.replace('/history')},
    },
    {
        id: 1,
        title: "Reimburse",
        color: "#D1D6FF",
        icon: require("../assets/icons/reimburse-active.png"),
        link: () => {router.replace('/reimburse')},
    },
    {
        id: 1,
        title: "Profile",
        color: "#D1D6FF",
        icon: require("../assets/icons/profile-active.png"),
        link: () => {router.replace('/profile')},
    },
  ]
  return (
    <View className='w-full h-[200px] flex flex-col justify-end absolute bottom-0 z-[999]' style={{ position: 'absolute', bottom: 0 }}>
      <View className='bg-white w-full h-[140px] flex-row justify-evenly items-start px-[30px] pt-[20px] rounded-t-3xl gap-[10px] border-[.5px] border-blue-600'>
      {iconHomeBar.map((item, index) => {
        return (
            <Pressable key={index} onPress={item.link} className='flex flex-col justify-center items-center'>
                <Image source={item.icon} style={{ width: 35, height: 35 }}/>
                <Text className='text-[10px] text-center w-[50px] mt-2'>
                    {item.title}
                </Text>
            </Pressable>
        )
      })}
      </View>
    </View>
  )
}

export default BottomBar