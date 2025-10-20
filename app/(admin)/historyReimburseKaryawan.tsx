import { View, Text, ScrollView, Pressable, Animated, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Image } from 'expo-image'
import HeaderBack from '@/components/headerBack'
import { cardInfoType } from '@/types/cardInfoType'
import CardInfo from '@/components/cardInfo'
const { width } = Dimensions.get('window');

const historyReimburseKaryawan = () => {

  const [isActive, setIsActive] = useState("All");
  const [checkActive, setCheckActive] = useState(false);
  const [statusActive, setStatusActive] = useState('All');
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const [dataMonth, setDataMonth] = useState<string[]>([]);
  const today = new Date().toISOString().split("T")[0];
  const thisMonth = today.slice(0,7);

  const dataReimburse: cardInfoType[] = [
    {
        id: 1,
        user: "tantri",
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-10-13",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Approved",
    },
    {
        id: 2,
        user: "irgi",
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-10-14",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Pending"
    },
    {
        id: 3,
        user: "irgi",
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-09-13",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Pending"
    },
    {
        id: 4,
        user: "zahra",
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-09-13",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Approved"
    },
    {
        id: 5,
        user: "zahra",
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-09-13",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Rejected"
    },
    {
        id: 6,
        user: "dinar",
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "2025-08-13",
        icon: require("../../assets/icons/pending-time.png"),
        status: "Pending"
    },
  ];
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
  ];
  const users = [
    {
      username: "tantri"
    },
    {
      username: "zahra"
    },
    {
      username: "irgi"
    },
    {
      username: "dinar"
    },
  ];

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

  const toggleSelect = (id: string) => {
    setSelectedId(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id) // hapus jika sudah ada
        : [...prev, id] // tambah jika belum ada
    );
  };

  

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
                      if(itemMonth === thisMonth && (statusActive === "All" ? (item.status !== statusActive) : (item.status === statusActive)) && (isActive === "All" ? (item.user !== isActive) : (item.user === isActive))){
                        return (
                          <View className='w-full flex flex-row justify-start items-center' key={idx}>
                            {checkActive && (
                              <Pressable key={index} onPress={()=>{toggleSelect(item.id.toString())}} className={`flex flex-row justify-center items-center mx-5 w-[22px] h-[22px] border rounded-lg border-purple-600`}>
                                {
                                  selectedId.includes(item.id.toString()) && (
                                    <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 10, height: 10 }} tintColor={"#9333EA"}/>
                                  )
                                }
                              </Pressable>
                            )}
                            <CardInfo 
                              amount={item.amount} 
                              date={item.date}
                              description={item.description}
                              icon={item.icon}
                              title={isActive==="All" ? item.user??'tidak ada username' : item.title}
                              key={idx}
                              id={item.id}
                              w="w-full"
                              longPress={() => setCheckActive(true)}
                            />
                          </View>
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
                    if(itemMonth === month && (statusActive === "All" ? (item.status !== statusActive) : (item.status === statusActive)) && (isActive === "All" ? (item.user !== isActive) : (item.user === isActive))){
                      return (
                        <View className='w-full flex flex-row justify-start items-center' key={idx}>
                          {checkActive && (
                            <Pressable key={index} onPress={()=>{toggleSelect(item.id.toString())}} className={`flex flex-row justify-center items-center mx-5 w-[22px] h-[22px] border rounded-lg border-purple-600`}>
                              {
                                selectedId.includes(item.id.toString()) && (
                                  <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 10, height: 10 }} tintColor={"#9333EA"}/>
                                )
                              }
                            </Pressable>
                          )}
                          <CardInfo 
                            amount={item.amount} 
                            date={item.date}
                            description={item.description}
                            icon={item.icon}
                            title={isActive==="All" ? item.user??'tidak ada username' : item.title}
                            id={item.id}
                            w="w-full"
                            longPress={() => setCheckActive(true)}
                          />
                        </View>
                      )
                    }
                  })}
                </View>
              </View>
            )
          })}
          <View className='w-full h-[30px]'/>
        </View>
        <View className='w-full h-[200px]'/>
      </ScrollView>

      <View className='bg-white w-full h-[150px] flex-row items-start px-[30px] pt-[20px] rounded-t-3xl absolute bottom-0 gap-[10px] border border-purple-600'>
        <Pressable onPress={() => setIsActive("All")}
        className={`w-[45px] h-[45px] flex  justify-center items-center mt-2 border-[1px] ${isActive==="All"?"border-purple-600 border-b-[2px]":"border-purple-200"} rounded-lg`}>
          <Text className={`text-[12px] ${isActive==="All"?"text-purple-600":"text-purple-200"}`}>All</Text>
        </Pressable >

      {/*  Scroll horizontal dengan animasi scale */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View className='w-full h-[60px] flex flex-row items-center gap-2'>
          {users.map((item, index) => {
            return (
                <Pressable 
                  key={index}
                  onPress={() => setIsActive(item.username)} // ✨ tambahan
                  className={`bg-purple-300 w-[50px] h-[50px] flex justify-center items-center rounded-full ${isActive===item.username&&"border border-b-[2px] border-purple-600"}`}
                >
                  <Text className='text-white text-lg font-bold'>{item.username.charAt(0).toUpperCase()}</Text>
                </Pressable>
            );
          })}
        </View>
      </ScrollView>
              
      </View>
    </View>
  )
}

export default historyReimburseKaryawan
