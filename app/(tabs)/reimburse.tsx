import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React from 'react'
import HeaderBack from '@/components/headerBack'

const reimburse = () => {
  return (
    <View className='bg-white flex-1 justify-start items-center'>
      {/* HEADER */}<View>

      </View>
      <HeaderBack title='Pengajuan Reimburse'/>

      <ScrollView className='w-full ml-[75px] pb-[50px] mt-5'>
        <View className='px-30 flex-col justify-start '>
        <View className=' '>
          <Text className='font-bold'>Title:</Text>
          <TextInput
                className='p-[10px]  pl-[20px] w-[320px] flex flex-row justify-center items-center border-[1px] border-blue-800  rounded-lg mt-2'
                placeholder='Add New Title'
                />
        </View>

        <View className=' mt-5'>
          <Text className='font-bold'>List Reimburse:</Text>
          
            <View className='flex-row justify-between  p-[20px] w-[320px] border-[1px] border-blue-800 mt-2 rounded-lg'>
              <Text className='text-blue-800 font-semibold'>Je Jamuran</Text>
              <Text className='font-bold text-blue-800'>Rp.1000.000</Text>
            </View>
          
        </View>
        <View className='flex-row gap-2 w-full  mt-2'>
          <TextInput
                className='p-[10px]  pl-[20px] w-[180px] flex flex-row justify-center items-center border-[1px] border-blue-800 rounded-lg mt-2'
                placeholder='Add New Category'
                />
          <TextInput
                className='p-[10px]  pl-[20px] w-[130px] flex flex-row justify-center items-center border-[1px] border-blue-800 rounded-lg mt-2'
                placeholder='Add Price'
                />
        </View>
          <View className='flex-row gap-1'>
            <Text className='bg-orange-100 rounded-lg w-[60px] p-[2px] mt-2 text-center text-[12px]'>Bensin</Text>
            <Text className='bg-orange-100 rounded-lg w-[60px] p-[2px] mt-2 text-center text-[12px]'>Listrik</Text>
            <Text className='bg-orange-100 rounded-lg w-[60px] p-[2px] mt-2 text-center text-[12px]'>Hotel</Text>
        </View>

        <Pressable  className='p-[10px] w-[320px] flex flex-row justify-center items-center bg-orange-400 rounded-b-lg rounded-t-sm mt-3'
              >
                <Text className=' font-bold text-[20px] text-orange-100'>
                    +
                </Text>
        </Pressable>

        <View className=' mt-5 '>
          <Text className='font-bold'>Description:</Text>
          <TextInput
            className=' p-[10px] pl-[20px] pb-[50px] w-[320px] flex flex-row justify-center items-center border-[1px] border-blue-800 rounded-lg mt-2'
            placeholder='Add New Description'
            multiline={true}            // biar bisa banyak baris
            numberOfLines={4}           // tinggi awal
            textAlignVertical='top'     // teks mulai dari atas
          />
        </View>

        <View className=' mt-5 '>
          <Text className='font-bold'>Image:</Text>
          <View className='flex-row gap-5'>
            <Text className=' pb-[50px] pl-5  bg-blue-800 w-[130px] mt-2 rounded-lg '></Text>
            <Text className=' pb-[50px] pl-5  bg-blue-800 w-[130px] mt-2 rounded-lg '></Text>
          </View>
        </View>


        <View className='w-full h-[100px]'>

        </View>
      </View>
      </ScrollView>

      <View className='bg-blue-800  w-full h-[150px] px-[40px] pt-[30px] flex-col items-center  rounded-t-[30px]'>
        <View className='w-full flex-row  justify-between '>
            <Text className='text-white font-semibold'>Total Price</Text>
            <Text className='text-white font-bold'>Rp.350.000</Text>
        </View>
        <View className='w-full h-[1px] bg-white mt-2 '></View>
        <Pressable 
        className=' w-[320px] h-[40px] flex flex-row justify-center items-center bg-orange-400 rounded-lg mt-5'>
          <Text className='text-white'>Buat Pengajuan</Text>
        </Pressable >
      </View>


      
  
    </View>
  )
}

export default reimburse