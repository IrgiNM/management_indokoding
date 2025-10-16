import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import HeaderBack from '@/components/headerBack'
import { cardInfoType } from '@/types/cardInfoType';
import CardInfo from '@/components/cardInfo';

const dataKaryawanDetail = () => {

  const dataReimburse: cardInfoType[] = [
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-10-13",
          icon: require("../../assets/icons/profile.png"),
          status: "pending",
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-10-14",
          icon: require("../../assets/icons/profile.png"),
          status: "pending"
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-09-13",
          icon: require("../../assets/icons/profile.png"),
          status: "pending"
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-09-13",
          icon: require("../../assets/icons/profile.png"),
          status: "pending"
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-09-13",
          icon: require("../../assets/icons/profile.png"),
          status: "pending"
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-08-13",
          icon: require("../../assets/icons/profile.png"),
          status: "pending"
      },
    ];

  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='Data Karyawan' subTitle='detail'/>
      
      <View className='w-full  flex  items-center mt-10'>
        <View className='bg-gray-300  rounded-full w-[100px] h-[100px]'> </View>
      </View>

      <View className='mt-5 flex items-center'>
        <Text className='font-bold'>Tantri Cantik</Text>
        <Text className=''>tantricantik@gmail.com</Text>
      </View>

      <View className='bg-gray-300  flex flex-row p-[5px] pl-5  rounded-lg w-[350px] mt-5 gap-5'>
        <Pressable>
          <Text className='font-bold p-[5px] px-[20px] rounded-lg bg-gray-500'>Reimburse</Text>
        </Pressable>
        <Pressable>
          <Text className='font-bold p-[5px] px-[20px] rounded-lg '>Soon</Text>
        </Pressable>
        <Pressable>
          <Text className='font-bold p-[5px] px-[20px] rounded-lg '>Soon</Text>
        </Pressable>
      </View>
      
    <ScrollView className='w-full  mt-5 mb-5'>
      <View className='w-full flex flex-col items-center gap-2 px-[30px]'>
        {dataReimburse.map((item,index)=>{
          return (
          <CardInfo amount={item.amount} date={item.date} description={item.description} icon={item.icon} id={item.id} title={item.title} key={index} w="w-full" />
          )
        })}
      </View>
    </ScrollView>

      <Pressable  
        className=' w-[320px] h-[50px] mb-10 flex flex-row justify-center items-center bg-gray-500 rounded-lg '>
        <Text className=' font-bold text-[15px] text-white'>
          Edit Karyawan
        </Text>
        </Pressable>

    </View>
  )
}

export default dataKaryawanDetail