import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React from 'react'
import HeaderBack from '@/components/headerBack'

const addkaryawan = () => {
  return (
    <View className='bg-white flex-1 justify-center items-center'>
      <HeaderBack title='Reimbursement History' subTitle='Detail'/>

      <ScrollView className='w-full pb-[50px]'>
              <View className='w-full px-[20px] flex justify-start items-center  flex-col gap-3 mt-[20px]'>
                <View className='bg-gray-500 justify-center  rounded-t-lg w-[320px] h-[35px] items-center '>
                  <Text className='text-white font-bold '>
                    Pending
                  </Text>
                </View>
               
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

      <View className='w-full h-[100px]'>

      </View>

                
      
              </View>
      
      </ScrollView>

            <Pressable  
                className=' w-[320px] h-[50px] flex flex-row justify-center items-center bg-gray-500 rounded-lg '>
                  <Text className=' font-bold text-[15px] text-white'>
                      X Cancel
                  </Text>
            </Pressable>

    </View>
  )
}

export default addkaryawan