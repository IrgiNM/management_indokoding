import { View, Text, ScrollView, FlatList, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Image, ImageBackground } from 'expo-image'
import { useRouter } from 'expo-router'
import CardInfo from '@/components/cardInfo'
const { width } = Dimensions.get('window');

const home = () => {

  const router = useRouter();
  const [statusActieve, setStatusActive] = useState(1);

  const iconStatus = [
    {
        id: 1,
        title: "All",
        icon: require("../../assets/icons/reimburse-active.png"),
        color: 'bg-purple-50',
        action: () => setStatusActive(1),
    },
    {
        id: 2,
        title: "Pending",
        icon: require("../../assets/icons/pending.png"),
        color: 'bg-yellow-50',
        action: () => setStatusActive(2)
    },
    {
        id: 3,
        title: "Approved",
        icon: require("../../assets/icons/approve.png"),
        color: 'bg-green-50',
        action: () => setStatusActive(3)
    },
    {
        id: 4,
        title: "Rejected",
        icon: require("../../assets/icons/decline.png"),
        color: 'bg-red-50',
        action: () => setStatusActive(4)
    },
  ]

  const iconMenu = [
    {
        id: 1,
        title: "All",
        icon: require("../../assets/icons/reimburse-active.png"),
        link: () => {router.replace('/(admin)/dataKaryawanDetail')},
    },
    {
        id: 1,
        title: "Add karyawan",
        icon: require("../../assets/icons/home-active.png"),
        link: () => {router.replace('/(tabs)/addkaryawan')},
    },
    {
        id: 1,
        title: "detail karyawan",
        icon: require("../../assets/icons/home-active.png"),
        link: () => {router.replace('/(admin)/dataKaryawanDetail')},
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
                <Image source={require("../../assets/images/profile-bg.jpeg")} style={{ width: 40, height: 40 }}/>
                {/* <Text className='text-[20px] font-bold'>
                    I
                </Text> */}
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
        <View className='w-[45px] h-[45px] rounded-xl bg-purple-50 flex justify-center items-center'>
            <Image source={require("../../assets/icons/history-active.png")} style={{ width: 22, height: 22 }}/>
            <View className='w-[12px] h-[12px] bg-red-500 absolute -top-1 -right-1 rounded-full'/>
        </View>
      </View>


      <ScrollView className='w-full pb-[50px]'>
        <View className='w-full flex justify-start items-center px-[30px] pt-[10px]'>
            {/* TOTAL REIMBURSE */}
            <ImageBackground
            source={require('../../assets/images/total-reimburse-bg.png')} // ganti dengan path gambar kamu
            resizeMode="cover" // bisa juga "contain" atau "stretch"
            imageStyle={{ borderRadius: 12, }} // agar sudutnya ikut melengkung
            >
                <View className='w-full flex flex-row justify-between items-center p-[20px] py-[30px]'>
                    <View className="flex flex-col justify-start items-start">
                        <Text className="text-[10px] text-white">Total Reimburse</Text>
                        <View className='w-full flex flex-row justify-between items-center'>
                            <Text className="text-[20px] text-white font-bold">Rp 100.000.000</Text>
                            <Pressable onPress={() => {}} className="w-[100px] border-[.5px] border-b-[1px] border-white rounded-lg flex flex-row justify-center items-center bg-purple-500">
                                <Text className="text-[12px] font-bold py-[5px] text-white">Okt 2025</Text>
                                <Image
                                source={require('../../assets/icons/arrow-dropdown.png')}
                                style={{ width: 7, height: 7, marginLeft: 5 }}
                                tintColor={'white'}
                                />
                            </Pressable>
                        </View>
                    </View>

                    
                </View>
            </ImageBackground>

            {/* STATUS REIMBURSE */}
            <View className='w-full mt-2 flex- flex-col justify-start items-center p-[0px] pt-[5px]'>
                {/* HEAD MORE */}
                <View className='flex flex-row justify-between items-center w-full mb-3'>
                    <Text className='text-[10px] font-bold'>
                        This Month’s Reimbursement
                    </Text>
                    <Pressable onPress={() => {router.replace('/(tabs)/history')}} className='flex flex-row justify-center items-center p-[10px] py-[5px] bg-purple-50 border-[.5px] border-b-[1px] border-purple-500 rounded-md'>
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
                            <Pressable onPress={item.action} className='flex flex-col justify-center items-center'>
                                <View className={`${statusActieve === item.id && 'border-[.5px] border-b-[1px]'} flex justify-center items-center w-[50px] h-[50px] rounded-full ${item.color}`}>
                                    <Image source={item.icon} style={{ width: 25, height: 25 }}/>
                                </View>
                                <Text className='text-[10px] mt-2'>
                                    {item.title}
                                </Text>
                            </Pressable>
                        )}
                    />
                    
                </View>
            </View>

        </View>

        {/* LIST REIMBURSE */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className='h-[100px] w-full flex flex-row justify-start items-center gap-3 bg-blue-100 mt-5 pl-[30px] pr-[30px]'>
                {dataReimburse.map((item, idx) => (
                    <CardInfo 
                        amount={item.amount} 
                        date={item.date}
                        description={item.description}
                        icon={item.icon}
                        title={item.title}
                        key={idx}
                        id={item.id}
                        w="w-[300px]"
                    />
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
            <View className='w-full justify-start items-center gap-4 flex flex-row flex-wrap mt-7 px-[20px]'>
                {iconMenu.map((item) => (
                    <Pressable onPress={item.link}className='flex flex-col justify-center items-center'>
                            <View className='flex justify-center items-center w-[50px] h-[50px] rounded-full bg-blue-100'>
                                <Image source={item.icon} style={{ width: 25, height: 25 }}/>
                            </View>
                            <Text className='text-[10px] mt-2'>
                                {item.title}
                            </Text>
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