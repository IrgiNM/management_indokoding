import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import HeaderBack from '@/components/headerBack'
import { cardInfoType } from '@/types/cardInfoType'
import CardInfo from '@/components/cardInfo'
import { useRouter } from 'expo-router'
import { thisMonth } from '@/hooks/todayFunction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataReimburseMain } from '@/hooks/dataReimburseFunction'
import { ReimbursementType } from '@/types/reimburseDataType'
import { formatRupiah } from '@/hooks/formatRupiahFunction'

const index = () => {
  const { dataReimburseUser, dataMonth } = dataReimburseMain();
  const [statusActive, setStatusActive] = useState('All');
  const today = new Date().toISOString().split("T")[0];
  const thisMonth = today.slice(5,7);
  const thisYear = today.slice(0,4);
  const statusList = [
    { 
      id: 1, 
      status: 'All', 
      icon: require('../../assets/icons/s-all.png'),
      link: ()=>{setStatusActive('All')}
    },
    { 
      id: 2, 
      status: 'Pending', 
      icon: require('../../assets/icons/s-pending.png'),
      link: ()=>{setStatusActive('Pending')}
    },
    { 
      id: 3, 
      status: 'Approved', 
      icon: require('../../assets/icons/s-approve.png'),
      link: ()=>{setStatusActive('Approved')}
    },
    {
      id: 4,
      status: 'Rejected',
      icon: require('../../assets/icons/s-decline.png'),
      link: ()=>{setStatusActive('Rejected')}
    },
  ]
  const bulanMap: any = {
    '1': 'Jan',
    '2': 'Feb',
    '3': 'Mar',
    '4': 'Apr',
    '5': 'May',
    '6': 'Jun',
    '7': 'Jul',
    '8': 'Aug',
    '9': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };

  useEffect(()=>{
    console.error('data:' ,dataReimburseUser);
  }, [])

  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='History Reimburse' subTitle='detail' type=''/>
      <View className='w-full px-[20px] py-[10px] bg-white pt-[20px] mt-2'>
        <View className='w-full flex flex-row justify-between items-center bg-green-50 border-[.5px] border-b-[1px] rounded-full border-purple-600 py-[5px] px-[5px]'>
          {statusList.map((item, index)=>{
            return(
              <Pressable key={index} onPress={item.link} className={`flex flex-row justify-center items-center py-[10px] px-[13px] gap-2 rounded-full ${item.status === statusActive ? 'bg-purple-600' : 'bg-green-50 border-[.5px] border-b-[1px] border-purple-200' }`}>
                <Image source={item.icon} style={{ width: 10, height: 10 }} tintColor={item.status === statusActive ? "#FFFFFF" : "#6B21A8"}/>
                <Text className={`text-[10px] ${item.status === statusActive ? 'text-white' : 'text-purple-900' } font-bold`}>{item.status}</Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      {/* HISTORY LIST */}
      <ScrollView className='w-full pb-[50px]'>
        <View className='w-full flex justify-start items-center flex-col gap-3 mt-[20px]'>
          {dataMonth.map((month, index) => {
            const totalR = dataReimburseUser
            .filter(item => item.created_at?.slice(5,7) === month)
            .reduce((acc, item) => acc + Number(item.total_amount || 0), 0);
            if(month === thisMonth){
              const total = dataReimburseUser
              .filter(item => item.created_at?.slice(5,7) === thisMonth)
              .reduce((acc, item) => acc + Number(item.total_amount || 0), 0);
              return (
                <View className='w-full flex flex-col justify-start items-center mb-[30px]' key={index}>
                  <View className='w-full px-[20px] rounded-lg flex flex-row justify-between items-center mb-2'>
                    <Text className='text-[12px] font-bold mb-2'>This Month</Text>
                    <Text className='text-[12px] font-bold mb-2'>{formatRupiah(total)}</Text>
                  </View>
                  <View className='w-full px-[20px] pt-[15px] bg-purple-200 pb-[30px] flex flex-col justify-start items-center gap-2'>
                    {dataReimburseUser.map((item, idx) => {
                      const itemISO = item.created_at??'';
                      const itemMonth = itemISO.slice(5,7);
                      if(itemMonth === thisMonth && (statusActive === "All" ? (item.status !== statusActive) : (item.status === statusActive))){
                        return (
                          <CardInfo
                            amount={Number(item.total_amount)}
                            date={item.created_at??''}
                            description={item.description}
                            title={item.title}
                            key={idx}
                            status={item.status}
                            id={item.id??0}
                            type=''
                            w="w-full"
                          />
                        )
                      }
                    })}
                  </View>
                </View>
              )
            }
            return (
              <View className='w-full flex flex-col justify-start items-center mb-[30px]' key={index}>
                <View className='w-full px-[20px] rounded-lg flex flex-row justify-between items-center mb-2'>
                  <Text className='text-[12px] font-bold mb-2'>{`${bulanMap[month]} ${thisYear}`}</Text>
                  <Text className='text-[12px] font-bold mb-2'>{formatRupiah(totalR)}</Text>
                </View>
                <View className='w-full px-[20px] pt-[15px] bg-purple-50 pb-[30px] flex flex-col justify-start items-center gap-2'>
                  {dataReimburseUser.map((item, idx) => {
                    const itemISO = item.created_at??'';
                    const itemMonth = itemISO.slice(5,7);
                    if(itemMonth === month && (statusActive === "All" ? (item.status !== statusActive) : (item.status === statusActive))){
                      return (
                        <CardInfo
                          amount={Number(item.total_amount)}
                          date={item.created_at??''}
                          description={item.description}
                          title={item.title}
                          status={item.status}
                          key={idx}
                          id={item.id??0}
                          type=''
                          w="w-full"
                        />
                      )
                    }
                  })}
                </View>
              </View>
            )
          })}
          <View className='w-full h-[300px]'/>
        </View>
      </ScrollView>
    </View>
  )
}

export default index