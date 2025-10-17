import { View, Text, ScrollView, Pressable, Animated, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Image } from 'expo-image'
import HeaderBack from '@/components/headerBack'
import { cardInfoType } from '@/types/cardInfoType'
import CardInfo from '@/components/cardInfo'

const { width } = Dimensions.get('window');

const historyReimburseKaryawan = () => {

  const dataReimburse: cardInfoType[] = [
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-10-13",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Approved",
    },
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-10-14",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Pending"
    },
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-09-13",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Pending"
    },
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-09-13",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Approved"
    },
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-09-13",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Rejected"
    },
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-08-13",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Pending"
    },
  ];

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

  // ✨ Tambahan: animasi scroll horizontal username
  const scrollX = useRef(new Animated.Value(0)).current;
  const users = ['C', 'D', 'A', 'E', 'B'];
  const sortedUsers = [...users].sort();

  // ✅ Tambahan state buat handle klik username
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='Data Reimburse Karyawan'/>
      <View className='w-full px-[20px] py-[10px] bg-white pt-[20px] mt-2'>
        <View className='w-full flex flex-row justify-between items-center bg-purple-50 border-[.5px] border-b-[1px] rounded-full border-purple-600 py-[5px] px-[5px]'>
          {statusList.map((item, index)=>{
            return(
              <Pressable key={index} onPress={item.link} className={`flex flex-row justify-center items-center py-[10px] px-[13px] gap-2 rounded-full ${item.status === statusActive ? 'bg-purple-700' : 'bg-purple-50 border-[.5px] border-b-[1px] border-purple-200' }`}>
                <Image source={item.icon} style={{ width: 10, height: 10 }} tintColor={item.status === statusActive ? "#FFFFFF" : "#000000"}/>
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
                      if(itemMonth === thisMonth && (statusActive === "All" ? (item.status !== statusActive) : (item.status === statusActive))){
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
                    if(itemMonth === month && (statusActive === "All" ? (item.status !== statusActive) : (item.status === statusActive))){
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
          <View className='w-full h-[30px]'/>
        </View>
      </ScrollView>

      <View className='bg-gray-300  w-full h-[130px]  flex-row items-Start px-[30px]  rounded-t-[20px] gap-[10px]'>
            
              <Pressable 
              className=' w-[50px] h-[50px] flex  justify-center items-center  border-[1px] rounded-lg mt-9'>
                <Text className='text-white'>All</Text>
              </Pressable >

      {/*  Scroll horizontal dengan animasi scale */}
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={80}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        className='w-full'
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {sortedUsers.map((username, index) => {
          const inputRange = [
            (index - 1) * 80,
            index * 80,
            (index + 1) * 80,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1.2, 0.9],
            extrapolate: 'clamp',
          });

          const isActive = selectedUser === username; // ✨ tambahan

          return (
            <Animated.View
              key={index}
              style={{
                transform: [{ scale }],
                marginRight: 15,
              }}
            >
              <Pressable 
                onPress={() => setSelectedUser(username)} // ✨ tambahan
                className={`${isActive ? 'bg-purple-600' : 'bg-gray-400'} w-[60px] h-[60px] flex justify-center items-center rounded-full mt-8`}
              >
                <Text className='text-white text-lg font-bold'>{username}</Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
              
      </View>
    </View>
  )
}

export default historyReimburseKaryawan
