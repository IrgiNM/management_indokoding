import { View, Text, ScrollView, FlatList, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

const home = () => {

  const router = useRouter();

  const iconStatus = [
    {
        id: 1,
        title: "All",
        icon: require("../../assets/icons/reimburse-active.png"),
    },
    {
        id: 2,
        title: "Pending",
        icon: require("../../assets/icons/reimburse-active.png"),
    },
    {
        id: 3,
        title: "Approved",
        icon: require("../../assets/icons/reimburse-active.png"),
    },
    {
        id: 4,
        title: "Rejected",
        icon: require("../../assets/icons/reimburse-active.png"),
    },
  ]

  const iconMenu = [
    {
        id: 1,
        title: "All",
        icon: require("../../assets/icons/reimburse-active.png"),
    },
    {
        id: 1,
        title: "Add karyawan",
        icon: require("../../assets/icons/home-active.png"),
    },
  ]

  const dataReimburse = [
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "12 Okt 2025",
        icon: require("../../assets/icons/profile.png"),
    },
    {
        id: 1,
        title: "Reimburse Title",
        description: "description none",
        amount: "+ Rp 100.000.000",
        date: "12 Okt 2025",
        icon: require("../../assets/icons/profile.png"),
    },
  ]

  return (
    <View className='bg-white flex-1 justify-start items-center'>

      {/* HEADER */}
      <View className='flex flex-row justify-between items-center relative top-30 w-full h-[110px] p-[30px] pt-[55px]'>
        <View className='flex flex-row justify-start items-center'>
            <View className='w-[40px] h-[40px] rounded-full bg-blue-300 flex justify-center items-center overflow-hidden'>
                {/* <Image source={require("../../assets/icons/home.png")} style={{ width: 40, height: 40 }}/> */}
                <Text className='text-[20px] font-bold'>
                    I
                </Text>
            </View>
            <View className='flex flex-col justify-start items-start ml-3'>
                <Text className='font-bold'>
                    Hi,
                </Text>
                <Text>
                    Username
                </Text>
            </View>
        </View>
        <View className='w-[45px] h-[45px] rounded-xl bg-blue-50 flex justify-center items-center'>
            <Image source={require("../../assets/icons/history-active.png")} style={{ width: 22, height: 22 }}/>
            <View className='w-[12px] h-[12px] bg-red-500 absolute -top-1 -right-1 rounded-full'>
                
            </View>
        </View>
      </View>


      <ScrollView className='w-full pb-[50px]'>
        <View className='w-full flex justify-start items-center px-[30px] pt-[10px]'>
            {/* TOTAL REIMBURSE */}
            <View className='w-full h-[80px] rounded-xl bg-blue-100 flex flex-row justify-between items-start p-[15px] px-[20px]'>
                <View className='flex flex-col justify-start items-start'>
                    <Text className='text-[10px]'>
                        Total Reimburse
                    </Text>
                    <Text className='text-[20px] font-bold'>
                        Rp 100.000.000
                    </Text>
                </View>
                <View className='w-[100px] rounded-lg bg-blue-300 flex flex-row justify-center items-center '>
                    <Text className='text-[12px] font-bold py-[5px]'>
                        Okt 2025
                    </Text>
                    <Image source={require("../../assets/icons/arrow-dropdown.png")} style={{ width: 7, height: 7, marginLeft: 5 }}/>
                </View>
            </View>

            {/* STATUS REIMBURSE */}
            <View className='w-full mt-2 flex- flex-col justify-start items-center p-[10px] pt-[5px]'>
                {/* HEAD MORE */}
                <View className='flex flex-row justify-between items-center w-full'>
                    <Text className='text-[10px] font-bold'>
                        This Month’s Reimbursement
                    </Text>
                    <Pressable onPress={() => {router.replace('/(tabs)/history')}} className='flex flex-row justify-end items-center p-[10px] pr-0 pl-[20px]'>
                        <Text className='text-[10px]'>
                            More
                        </Text>
                        <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 6, height: 8, marginLeft: 5 }}/>
                    </Pressable>
                </View>

                {/* STATUS ICON */}
                <View className='w-full justify-evenly items-center gap-5 mt-3'>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 20 }}
                        data={iconStatus}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View className='flex flex-col justify-center items-center'>
                                <View className='flex justify-center items-center w-[50px] h-[50px] rounded-full bg-blue-100'>
                                    <Image source={item.icon} style={{ width: 25, height: 25 }}/>
                                </View>
                                <Text className='text-[10px] mt-2'>
                                    {item.title}
                                </Text>
                            </View>
                        )}
                    />
                    
                </View>
            </View>

        </View>

        {/* LIST REIMBURSE */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className='h-[100px] w-full flex flex-row justify-start items-center bg-blue-100 mt-5 pl-[10px] pr-[30px]'>
                {dataReimburse.map((item) => (
                    <View className='w-[300px] h-[60px] bg-white rounded-lg ml-5 flex flex-row justify-start items-center shadow-md'>
                        <View className='w-[40px] h-[40px] rounded-lg bg-blue-50 ml-3 flex justify-center items-center overflow-hidden border border-black'>
                            <Image source={item.icon} style={{ width: 15, height: 15 }}/>
                        </View>
                        <View className='flex flex-col justify-start items-start ml-3'>
                            <Text className='text-[10px] font-bold'>
                                {item.title}
                            </Text>
                            <Text className='text-[10px]'>
                                {item.description}
                            </Text>
                        </View>
                        <View className='flex flex-col justify-start items-end absolute right-[15px] ml-3'>
                            <Text className='text-[12px] font-bold'>
                                {item.amount}
                            </Text>
                            <Text className='text-[10px]'>
                                {item.date}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>

        {/* MENU LIST */}
        <View className='w-full flex justify-start items-center px-[30px] pt-[10px]'>
            {/* HEAD MORE */}
            <View className='flex flex-row justify-between items-center w-full mt-4'>
                <Text className='text-[10px] font-bold'>
                    Menu
                </Text>
            </View>

            {/* STATUS ICON */}
            <View className='w-full justify-between items-center gap-4 flex flex-row flex-wrap mt-7 px-[20px]'>
                {iconMenu.map((item) => (
                    <Pressable onPress={() => {router.replace('/(tabs)/addkaryawan')}}className='p-[15px] w-[270px] flex flex-row justify-center items-center bg-black rounded-lg mt-10'>
                        <View className='flex flex-col justify-center items-center'>
                            <View className='flex justify-center items-center w-[50px] h-[50px] rounded-full bg-blue-100'>
                                <Image source={item.icon} style={{ width: 25, height: 25 }}/>
                            </View>
                            <Text className='text-[10px] mt-2'>
                                {item.title}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </View>
        </View>

        {/* TAMBAHAN BIAR BISA SCROLL */}
        <View className='w-full h-[1000px] bg-white'></View>

      </ScrollView>
    </View>
  )
}

export default home