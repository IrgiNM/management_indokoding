import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import HeaderBack from '@/components/headerBack'
import { Image } from 'expo-image'
import { categoryData, reimburseData, reimburseItems } from '@/data/reimburseData'
import { useLocalSearchParams } from 'expo-router'
import { formatRupiah } from '@/hooks/formatRupiahFunction'

const detailReimburse = () => {
  const [popUpActive, setPopUpActive] = useState(false);
  const { id } = useLocalSearchParams();
  const firstData = reimburseData.find(item => item.id === Number(id))!;
  const dataReimburseDetail = reimburseItems.filter(item => item.id_reimburse === Number(id));
  const totalAmount = dataReimburseDetail.reduce((sum, item) => sum + item.amount, 0);

  const dataCategory = categoryData;



  return (
    <View className='bg-white flex-1 justify-center items-center'>
      {/* HEADER */}
      <HeaderBack title='Reimbursement History' subTitle='Detail'/>

      {/* STATUS */}
      <View className='w-full bg-white flex justify-center items-center mt-1 pt-7 px-[30px]'>
        <View className={`border border-b-[0px] flex flex-row justify-center gap-2 rounded-t-lg w-full h-[35px] items-center ${
          firstData.status === "Approved" ? "bg-[#e8fff2] border-[#00883D]" :
          firstData.status === "Pending" ? "bg-[#fffde9] border-[#885600]" :
          firstData.status === "Rejected" ? "bg-[#ffeaf2] border-[#88003B]" :
          "bg-[#f5ebff]" 
        }`}>
          <Image source={
            firstData.status === "Approved" ? require('../../assets/icons/approve-icon.png') :
            firstData.status === "Pending" ? require('../../assets/icons/pending-time.png') :
            firstData.status === "Rejected" ? require('../../assets/icons/decline-icon.png') :
            require('../../assets/icons/home-active.png')
          } style={{ width: 12, height: 12 }} tintColor=
          {
            firstData.status === "Approved" ? "#00883D" :
            firstData.status === "Pending" ? "#885600" :
            firstData.status === "Rejected" ? "#88003B" :
            "border-[#9333EA] bg-purple-50" 
          }/>
          <Text className={`font-bold text-[10px] ${
            firstData.status === "Approved" ? "text-[#00883D]" :
            firstData.status === "Pending" ? "text-[#885600]" :
            firstData.status === "Rejected" ? "text-[#88003B]" :
            "" 
          }`}>
            {firstData.status}
          </Text>
        </View>
      </View>

      {/* ISI REIMBURSE */}
      <ScrollView className='w-full'>
        <View className='w-full px-[30px] flex justify-start items-center  flex-col gap-3 mt-[20px]'>

          {/* TITLE */}
          <View className='mt-2 w-full'>
            <Text className=' rounded-lg w-full text-[12px] border border-b-2 border-purple-800 h-[40px] text-center pt-[10px] text-purple-900 bg-purple-100 mt-2 font-bold'>{firstData.title}</Text>
          </View>

          {/* IMAGE */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className='w-full flex-row gap-5 mt-3'>
              <View className='w-[250px] rounded-lg bg-gray-500  h-40  '></View>
              <View className='w-[250px] rounded-lg bg-gray-500  h-40  '></View>
              <View className='w-[250px] rounded-lg bg-gray-500  h-40  '></View>
            </View>
          </ScrollView>

          {/* LIST REIMBURSE */}
          <View className='flex-col gap-2 p-[20px] w-full border-[.5px] border-purple-600 mt-5 rounded-lg'>
            {dataReimburseDetail.map((item, index)=>{
              const category = dataCategory.find(category => category.id === item.id_category);
              return (
                <View key={index} className='flex-row justify-between'>
                  <Text className='text-[12px] text-purple-900'>{category?.namaCategory}</Text>
                  <Text className='font-bold text-[12px] text-purple-900'>{formatRupiah(item.amount)}</Text>
                </View>
              )
            })}
          </View>

          {/* REIMBURSE DATA */}
          <View className='flex flex-row gap-5 justify-between w-full mt-2'>
            <View className='w-[47%] flex flex-col'>
              <Text className='font-bold text-[12px] text-purple-900'>Date</Text>
              <Text className=' rounded-lg w-full text-[12px] h-[40px] text-center pt-[10px] text-purple-900 bg-purple-100 mt-2'>{firstData.date}</Text>
            </View>
            <View className='w-[47%] flex flex-col'>
              <Text className='font-bold text-[12px] text-purple-900'>Total Price</Text>
              <Text className=' rounded-lg w-full text-[12px] h-[40px] font-bold text-center pt-[10px] text-purple-900 bg-purple-100 mt-2'>{formatRupiah(totalAmount)}</Text>
            </View>
          </View>
          <View className='mt-2 w-full'>
            <Text className='font-bold text-[12px] text-purple-900'>Description:</Text>
            <Text className=' rounded-lg w-full text-[12px] h-[40px] text-justify px-[20px] pt-[10px] text-purple-900 bg-purple-100 mt-2'>{firstData.description}</Text>
          </View>

          {/* IMBUHAN */}
          <View className='w-full h-[200px]'/>
        </View>
      </ScrollView>

      {/* BUTTON CANCEL */}
      <View className='absolute z-20 bottom-[0px] w-full h-[110px] border border-purple-800 bg-white flex flex-row justify-start gap-3 items-start px-[30px] pt-[20px] rounded-t-3xl'>
        <Pressable onPress={() => {setPopUpActive(true)}} className='p-[15px] w-full flex-1 flex-row justify-center items-center border border-b-2 border-purple-800 rounded-lg bg-[#FF0066]'
        >
          <Image source={require('../../assets/icons/s-decline.png')} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
          <Text className='ml-2 text-white font-bold'>
              decline
          </Text>
        </Pressable>
        <Pressable onPress={() => {setPopUpActive(true)}} className='p-[15px] w-full flex-1 flex-row justify-center items-center border border-b-2 border-purple-800 rounded-lg bg-[#05c11e]'
        >
          <Image source={require('../../assets/icons/s-approve.png')} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
          <Text className='ml-2 text-white font-bold'>
              approve
          </Text>
        </Pressable>
      </View>

      {/* POPUP */}
      {popUpActive && (
        <>
          <View className='absolute w-full z-30 h-full opacity-70 bg-black'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-40'>
            <View className='w-full bg-white p-[20px] pt-[70px] rounded-lg flex flex-col justify-start items-center'>
              <Text className='text-[12px] w-full text-center'>
                Are you sure want to cancel this reimbursement?
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpActive(false)}} className='w-[50%] border border-b-[2px] border-purple-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {}} className='w-[50%] border border-b-[2px] border-purple-800 bg-[#FF0066] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-white'>
                    Yes, Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

    </View>
  )
}

export default detailReimburse