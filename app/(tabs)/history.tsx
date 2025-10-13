import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import HeaderBack from '@/components/headerBack'
import { cardInfoType } from '@/types/cardInfoType'
import CardInfo from '@/components/cardInfo'

const index = () => {

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
  // const dataMonth: string[] = [];
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
      <HeaderBack title='History Reimburse' subTitle='detail'/>

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
                  <View className='w-full px-[20px] pt-[15px] bg-blue-50 pb-[30px] flex flex-col justify-start items-center gap-2'>
                    {dataReimburse.map((item, idx) => {
                      const itemISO = new Date(item.date).toISOString();
                      const itemMonth = itemISO.slice(0,7);
                      if(itemMonth === thisMonth){
                        return (
                          <CardInfo 
                            amount={item.amount} 
                            date={item.date}
                            description={item.description}
                            icon={item.icon}
                            title={item.title}
                            key={idx}
                            id={item.id}
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
                  <Text className='text-[12px] font-bold mb-2'>{month}</Text>
                  <Text className='text-[12px] font-bold mb-2'>Rp. 5.000.000</Text>
                </View>
                <View className='w-full px-[20px] pt-[15px] bg-blue-50 pb-[30px] flex flex-col justify-start items-center gap-2'>
                  {dataReimburse.map((item, idx) => {
                    const itemISO = new Date(item.date).toISOString();
                    const itemMonth = itemISO.slice(0,7);
                    if(itemMonth === month){
                      return (
                        <CardInfo 
                          amount={item.amount} 
                          date={item.date}
                          description={item.description}
                          icon={item.icon}
                          title={item.title}
                          key={idx}
                          id={item.id}
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