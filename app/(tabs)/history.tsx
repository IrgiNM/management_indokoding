import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import HeaderBack from '@/components/headerBack'

const index = () => {

  const dataReimburse = [
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "12 Okt 2025",
        icon: require("../../assets/icons/profile.png"),
        status: "pending"
    },
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "12 Okt 2025",
        icon: require("../../assets/icons/profile.png"),
        status: "Pending"
    },
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "12 Okt 2025",
        icon: require("../../assets/icons/profile.png"),
        status: "Pending"
    },
  ];
  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='History Reimburse' subTitle='detail'/>

      {/* HISTORY LIST */}
      <ScrollView className='w-full pb-[50px]'>
        <View className='w-full px-[20px] flex justify-start items-center flex-col gap-3 mt-[20px]'>
          {dataReimburse.map((item) => (
              <View className='w-full h-[60px] bg-white rounded-lg flex flex-row justify-between items-center shadow-md'>
                <View className='flex flex-row justify-start items-center'>
                  <View className='w-[40px] h-[40px] rounded-lg bg-blue-50 ml-3 flex justify-center items-center overflow-hidden border border-black'>
                      <Image source={item.icon} style={{ width: 15, height: 15 }}/>
                  </View>
                  <View className='flex flex-col justify-start items-start ml-3'>
                      <Text className='text-[10px] font-bold'>
                          {item.title}
                      </Text>
                      <Text className='text-[10px]'>
                          {item.description}
                      </Text>
                  </View>
                </View>
                <View className='flex flex-row justify-end items-center pr-[20px]'>
                  <View className='flex flex-col justify-start items-end relative right-[5px] mr-3'>
                      <Text className='text-[12px] font-bold'>
                          {item.amount}
                      </Text>
                      <Text className='text-[10px]'>
                          {item.date}
                      </Text>
                  </View>
                  <Image
                    source={require('../../assets/objek/arrow-more.png')}
                    style={{ width: 7, height: 10, opacity: 0.3 }}
                    className='relative right-[0px]'
                  />
                </View>
              </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default index