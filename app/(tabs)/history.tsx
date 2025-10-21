import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import HeaderBack from '@/components/headerBack'
import { cardInfoType } from '@/types/cardInfoType'
import CardInfo from '@/components/cardInfo'
import { useRouter } from 'expo-router'
import { reimburseData } from '@/data/reimburseData'

const index = () => {
  const router = useRouter();
  const dataReimburse: cardInfoType[] = reimburseData;

  const [statusActive, setStatusActive] = useState('All');
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

  const [dataMonth, setDataMonth] = useState<string[]>([]);

  const today = new Date().toISOString().split("T")[0];
  const thisMonth = today.slice(0,7);

  useEffect(() => {
    const months: string[] = [];
    dataReimburse.map((item) => {
      const itemISO = new Date(item.date).toISOString();
      const itemMonth = itemISO.slice(0,7);
      months.push(itemMonth);
    });

    const uniqueMonths = [...new Set(months)];
    setDataMonth(uniqueMonths);
  }, []);

  useEffect(() => {
    console.log("data:",dataMonth);
  }, [dataMonth]);

  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='History Reimburse' subTitle='detail' type='python'/>
      <View className='w-full px-[20px] py-[10px] bg-white pt-[20px] mt-2'>
        <View className='w-full flex flex-row justify-between items-center bg-yellow-50 border-[.5px] border-b-[1px] rounded-full border-blue-600 py-[5px] px-[5px]'>
          {statusList.map((item, index)=>{
            return(
              <Pressable key={index} onPress={item.link} className={`flex flex-row justify-center items-center py-[10px] px-[13px] gap-2 rounded-full ${item.status === statusActive ? 'bg-[#1893FF]' : 'bg-yellow-50 border-[.5px] border-b-[1px] border-blue-200' }`}>
                <Image source={item.icon} style={{ width: 10, height: 10 }} tintColor={item.status === statusActive ? "#FFE364" : "#004EBC"}/>
                <Text className={`text-[10px] ${item.status === statusActive ? 'text-white' : 'text-[#004EBC]' } font-bold`}>{item.status}</Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      {/* HISTORY LIST */}
      <ScrollView className='w-full pb-[50px]'>
        <View className='w-full flex justify-start items-center flex-col gap-3 mt-[20px]'>
          {dataMonth.map((month, index) => {
            if(month === thisMonth){
              return (
                <View className='w-full flex flex-col justify-start items-center mb-[30px]' key={index}>
                  <View className='w-full px-[20px] rounded-lg flex flex-row justify-between items-center mb-2'>
                    <Text className='text-[12px] font-bold mb-2'>This Month</Text>
                    <Text className='text-[12px] font-bold mb-2'>Rp. 5.000.000</Text>
                  </View>
                  <View className='w-full px-[20px] pt-[15px] bg-blue-200 pb-[30px] flex flex-col justify-start items-center gap-2'>
                    {dataReimburse.map((item, idx) => {
                      const itemISO = new Date(item.date).toISOString();
                      const itemMonth = itemISO.slice(0,7);
                      if(itemMonth === thisMonth && (statusActive === "All" ? (item.status !== statusActive) : (item.status === statusActive))){
                        return (
                          <CardInfo 
                            amount={item.amount} 
                            date={item.date}
                            description={item.description}
                            title={item.title}
                            key={idx}
                            status={item.status}
                            id={item.id}
                            type='python'
                            w="w-full"
                            link= {() => {router.replace('../(detail)/detailReimburse')}}
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
                  <Text className='text-[12px] font-bold mb-2'>{month}</Text>
                  <Text className='text-[12px] font-bold mb-2'>Rp. 5.000.000</Text>
                </View>
                <View className='w-full px-[20px] pt-[15px] bg-blue-100 pb-[30px] flex flex-col justify-start items-center gap-2'>
                  {dataReimburse.map((item, idx) => {
                    const itemISO = new Date(item.date).toISOString();
                    const itemMonth = itemISO.slice(0,7);
                    if(itemMonth === month && (statusActive === "All" ? (item.status !== statusActive) : (item.status === statusActive))){
                      return (
                        <CardInfo 
                          amount={item.amount} 
                          date={item.date}
                          description={item.description}
                          title={item.title}
                          status={item.status}
                          key={idx}
                          id={item.id}
                          type='python'
                          w="w-full"
                          link= {() => {router.replace('../(detail)/detailReimburse')}}
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