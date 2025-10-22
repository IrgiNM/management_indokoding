import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React from 'react'
import HeaderBack from '@/components/headerBack'

const reimburse = () => {
  return (
    <View className='bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='Pengajuan Reimburse'/>

      <ScrollView className='w-full pb-[50px] mt-5'>
        <View className='w-full flex flex-col justify-start items-center px-[30px]'>

          <View className='w-full flex-col justify-start'>
            <View className=' w-full flex justify-start'>
              <Text className='font-bold text-[12px]'>Title:</Text>
              <TextInput className='p-[10px] text-[12px] pl-[20px] w-full flex flex-row justify-center items-center border-[1px] border-blue-800  rounded-lg mt-2' placeholder='Add New Title'/>
            </View>

            <View className='w-full mt-5'>
              <Text className='font-bold text-[12px]'>List Reimburse:</Text>
              <View className='flex-row justify-between p-[20px] w-full border-[1px] border-blue-800 mt-2 rounded-lg'>
                <Text className='text-blue-800 font-semibold text-[12px]'>Je Jamuran</Text>
                <Text className='font-bold text-blue-800 text-[12px]'>Rp.1000.000</Text>
              </View>
              
            </View>
            <View className='flex-row justify-between gap-3 w-full mt-2'>
              <TextInput
                    className='flex-1 p-[10px] text-[12px] flex-row justify-center items-center border-[1px] border-blue-800 rounded-lg mt-2'
                    placeholder='Add New Category'
                    />
              <TextInput
                    className='flex-3 p-[10px] text-[12px] flex-row justify-center items-center border-[1px] border-blue-800 rounded-lg mt-2'
                    placeholder='Add Price'
                    />
            </View>

            <View className='w-full flex-row gap-3 mt-2 mb-2'>
              <Text className='bg-orange-100 rounded-lg py-[5px] px-[10px] mt-2 text-center text-[10px]'>Bensin</Text>
              <Text className='bg-orange-100 rounded-lg py-[5px] px-[10px] mt-2 text-center text-[10px]'>Listrik</Text>
              <Text className='bg-orange-100 rounded-lg py-[5px] px-[10px] mt-2 text-center text-[10px]'>Hotel</Text>
            </View>

            <Pressable  className='p-[10px] w-full flex flex-row justify-center items-center bg-orange-400 rounded-b-lg rounded-t-sm mt-3'>
                    <Text className=' font-bold text-[20px] text-orange-100'>
                        +
                    </Text>
            </Pressable>

            <View className=' mt-5 '>
              <Text className='font-bold text-[12px]'>Description:</Text>
              <TextInput
                className='text-[12px] p-[10px] pl-[20px] pb-[50px] w-full flex flex-row justify-center items-center border-[1px] border-blue-800 rounded-lg mt-2'
                placeholder='Add New Description'
                multiline={true}            // biar bisa banyak baris
                numberOfLines={4}           // tinggi awal
                textAlignVertical='top'     // teks mulai dari atas
              />
            </View>

            <View className=' mt-5 '>
              <Text className='font-bold text-[12px]'>Image:</Text>
              <View className='flex-row gap-5'>
                <Text className=' pb-[50px] pl-5  bg-blue-800 w-[130px] mt-2 rounded-lg '></Text>
                <Text className=' pb-[50px] pl-5  bg-blue-800 w-[130px] mt-2 rounded-lg '></Text>
              </View>
            </View>


            <View className='w-full h-[100px]'/>
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