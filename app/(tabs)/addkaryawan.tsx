import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React from 'react'
import HeaderBack from '@/components/headerBack'

const reimburse = () => {
  return (
    <View className='bg-white flex-1 justify-start items-center'>
      {/* HEADER */}<View>

      </View>
      <HeaderBack title='Pengajuan Reimburse'/>

      <ScrollView className='w-full pb-[50px]'>
        <View className='w-full px-[20px] flex justify-start items-center  flex-col gap-3 mt-[20px]'>
          <View className='bg-gray-500 justify-center  rounded-t-lg w-[300px] h-[35px] items-center '>
            <Text className='text-white font-bold '>
              Pending
            </Text>
          </View>
         
          <View className='w-[250px] flex-row bg-gray-500 right-7 h-40  '>
            <Text></Text>
            <View className='w-[250px] flex-row bg-gray-500 right-7 h-40 left-[280px]  '></View>
          </View>

          <View className='flex flex-row'>
            <View className='flex flex-col'>
              <Text className='font-bold'>Date</Text>
              <Text className='px-[10px] bg-gray-300'>Date</Text>
            </View>
            <View className='flex flex-col '>
              <Text className='font-bold'>Total Price</Text>
              <Text className='px-[10px] bg-gray-300'>Date</Text>
            </View>
          </View>

          </View>
          <View className='w-[130px] border-lg right-7 h-10 rounded-lg '>
            <Text></Text>
          </View>

      </ScrollView>
    </View>
  )
}
