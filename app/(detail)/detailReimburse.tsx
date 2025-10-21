import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React from 'react'
import HeaderBack from '@/components/headerBack'
import { Image } from 'expo-image'

const detailReimburse = () => {
  return (
    <View className='bg-white flex-1 justify-center items-center'>
      {/* HEADER */}
      <HeaderBack title='Reimbursement History' subTitle='Detail'/>

      {/* STATUS */}
      <View className='w-full bg-white flex justify-center items-center mt-1 pt-7'>
        <View className='bg-gray-500 flex flex-row justify-center gap-2 rounded-t-lg w-[320px] h-[35px] items-center '>
          <Image source={require('../../assets/icons/s-pending.png')} style={{ width: 10, height: 10 }} tintColor={"#FFFFFF"}/>
          <Text className='text-white font-bold text-[10px]'>
            Pending
          </Text>
        </View>
      </View>

      {/* ISI REIMBURSE */}
      <ScrollView className='w-full'>
        <View className='w-full px-[20px] flex justify-start items-center  flex-col gap-3 mt-[20px]'>
         
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className='w-full flex-row gap-5  mt-5 pl-[17px]'>
              <View className='w-[250px] rounded-lg bg-gray-500  h-40  '></View>
              <View className='w-[250px] rounded-lg bg-gray-500  h-40  '></View>
              <View className='w-[250px] rounded-lg bg-gray-500  h-40  '></View>
            </View>
          </ScrollView>

          <View className='flex flex-row gap-5 justify-between w-[320px]  mt-3'>
            <View className='flex flex-col  '>
              <Text className='font-bold'>Date</Text>
              <Text className=' rounded-lg w-[150px] h-[40px] text-center pt-[10px] bg-gray-300 mt-2'>03/10/2005</Text>
            </View>
            <View className='flex flex-col '>
              <Text className='font-bold'>Total Price</Text>
              <Text className=' rounded-lg w-[150px] h-[40px] text-center pt-[10px] bg-gray-300 mt-2'>Rp.50.000.000</Text>
            </View>
          </View>
          <View className='flex-col  p-[20px] w-[320px] border-[1px] mt-2 rounded-lg'>
            <View className='flex-row justify-between'>
              <Text className=''>Je Jamuran</Text>
              <Text className='font-bold'>Rp.1000.000</Text>
            </View>
            <View className='flex-row justify-between mt-2 '>
              <Text className=''>Je Jamuran</Text>
              <Text className='font-bold'>Rp.1000.000</Text>
            </View>
            <View className='flex-row justify-between mt-2 '>
              <Text className=''>Je Jamuran</Text>
              <Text className='font-bold'>Rp.1000.000</Text>
            </View>
          </View>
          <View className=' mt-3 '>
            <Text className='font-bold'>Description:</Text>
            <Text
            className=' pl-[20px] pb-[50px] w-[320px] flex flex-row justify-center items-center border-[1px] rounded-lg mt-2'
            />
          </View>
          <View className='w-full h-[200px]'/>
        </View>
      </ScrollView>

      <View className='absolute z-20 bottom-[0px] w-full h-[150px] border bg-white flex justify-start gap-3 items-center px-[30px] pt-[20px] rounded-t-3xl'>
        <Pressable onPress={() => {}} className='p-[15px] w-full flex flex-row justify-center items-center border border-b-2 rounded-lg'
        >
          <Image source={require('../../assets/icons/s-decline.png')} style={{ width: 10, height: 10 }} tintColor={"#000000"}/>
          <Text className='ml-2 font-bold'>
              canceled
          </Text>
        </Pressable>
      </View>

    </View>
  )
}

export default detailReimburse