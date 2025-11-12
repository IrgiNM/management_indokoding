import { View, Text, ScrollView, FlatList, Pressable, Dimensions } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { Image, ImageBackground } from 'expo-image'
import { useRouter } from 'expo-router'
import CardInfo from '@/components/cardInfo'
import { dataReimburseMain } from '@/hooks/dataReimburseFunction'
import { getDataUserLogin } from '@/hooks/userFunction'
import { UserType } from '@/types/userType'
import { formatRupiah } from '@/hooks/formatRupiahFunction'
import { ReimbursementType } from '@/types/reimburseDataType'
const { width } = Dimensions.get('window');

const home = () => {

  const router = useRouter();
  const [statusActieve, setStatusActive] = useState(1);
  const { dataReimburseUser, totalAmountReimburse } = dataReimburseMain();
//   const [dataReimburse, setDataReimburse] = useState<ReimbursementType[]>([]);
  const dataUserLogin = getDataUserLogin();
  const [role, setRole] = useState<string>('karyawan');

  useEffect(()=>{
    if(dataUserLogin.is_staff){
        setRole('admin');
    }
  }, [dataUserLogin]);

  
//   const dataUser = getDataUserLogin();

  const iconStatus = [
    {
        id: 1,
        title: "All",
        icon: "null",
        color: 'bg-purple-50',
        action: () => setStatusActive(1),
        border: "border-purple-600"
    },
    {
        id: 2,
        title: "Pending",
        icon: require("../../assets/icons/pending-tint.png"),
        color: 'bg-yellow-50',
        action: () => setStatusActive(2),
        border: "border-purple-600"
    },
    {
        id: 3,
        title: "Approved",
        icon: require("../../assets/icons/approve-tint.png"),
        color: 'bg-green-50',
        action: () => setStatusActive(3),
        border: "border-purple-600"
    },
    {
        id: 4,
        title: "Rejected",
        icon: require("../../assets/icons/decline-tint.png"),
        color: 'bg-red-50',
        action: () => setStatusActive(4),
        border: "border-purple-600"
    },
  ]

  const iconMenu = [
    {
        id: 1,
        title: "create reimburse",
        icon: require("../../assets/icons/reimburse-active.png"),
        link: () => {router.replace('/reimburse')},
        role: ['karyawan', 'admin']
    },
    {
        id: 1,
        title: "data Reimburse",
        icon: require("../../assets/icons/data-reimburse.png"),
        link: () => {router.replace('../(admin)/historyReimburseKaryawan')},
        role: ['admin']
    },
    {
        id: 1,
        title: "data karyawan",
        icon: require("../../assets/icons/karyawan.png"),
        link: () => {router.replace('../(admin)/dataKaryawan')},
        role: ['admin']
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
                <Text className='font-bold'>Hi,
                </Text>
                <Text>
                    {dataUserLogin?.username}
                </Text>
            </View>
        </View>
        <View className='w-[45px] h-[45px] rounded-xl bg-purple-50 border-[.5px] border-purple-600 border-b-[1px] flex justify-center items-center'>
            <Image source={require("../../assets/icons/notif.png")} tintColor={"#7300BF"} style={{ width: 22, height: 22 }}/>
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
                            <Text className="text-[20px] text-white font-bold">{formatRupiah(totalAmountReimburse||0)}</Text>
                            <Pressable android_ripple={{ color: 'rgba(0,0,0,0.1)' }} onPress={() => {}} className="w-[100px] border-[.5px] border-b-[1px] border-white rounded-lg flex flex-row justify-center items-center bg-purple-500">
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
            <View className='w-full mt-5 flex- flex-col justify-start items-center p-[0px] pt-[5px]'>
                {/* HEAD MORE */}
                <View className='flex flex-row justify-between items-center w-full mb-3'>
                    <Text className='text-[10px] font-bold text-[#40006B]'>
                        This Month’s Reimbursement
                    </Text>
                    <Pressable onPress={() => {router.replace('/(tabs)/history')}} className='flex flex-row justify-center items-center p-[10px] py-[5px] bg-purple-50 border-[.5px] border-b-[1px] border-purple-600 rounded-md'>
                        <Text className='text-[10px] text-[#40006B]'>
                            More
                        </Text>
                        <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 6, height: 8, marginLeft: 5 }} tintColor={"#40006B"}/>
                    </Pressable>
                </View>

                {/* STATUS ICON */}
                <View className='w-full justify-evenly items-center gap-5 mt-0'>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 20 }}
                        data={iconStatus}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <Pressable onPress={item.action} android_ripple={{ color: 'rgba(0,0,0,0.1)' }} className='flex flex-col justify-center items-center relative'>
                                <Text className='relative z-10 -right-[15px] top-[10px] pt-[3px] w-[20px] h-[20px] rounded-full bg-purple-800 text-white text-[10px] text-center'>
                                    5
                                </Text>
                                <View className={`${statusActieve === item.id && `border-[.5px] border-b-[1px] ${item.border}`} flex justify-center items-center w-[50px] h-[50px] rounded-full ${item.color}`}>
                                    {item.icon === "null" ? (
                                        <Text className='text-[15px] font-bold text-purple-800'>
                                            All
                                        </Text>
                                    ):
                                    (
                                        <Image source={item.icon} style={{ width: 25, height: 25 }}/>
                                    )}
                                </View>
                                <Text className='text-[10px] mt-2 text-[#40006B]'>
                                    {item.title}
                                </Text>
                            </Pressable>
                        )}
                    />
                    
                </View>
            </View>

        </View>

        {/* LIST REIMBURSE */}
        {dataReimburseUser.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className='h-[100px] w-full flex flex-row justify-start items-center gap-3 pl-[30px] pr-[30px] bg-[#F1E3FA] mt-5'>
                    {dataReimburseUser.map((item, idx) => (
                        <CardInfo 
                            amount={Number(item.total_amount)} 
                            date={item.created_at??'null'}
                            description={item.description}
                            title={item.title}
                            status={item.status}
                            key={idx}
                            id={item.id??0}
                            w="w-[300px]"
                        />
                    ))}
                </View>
            </ScrollView>
        ) : (
            <View className='h-[100px] w-full flex flex-row justify-center items-center gap-3 bg-[#F1E3FA] mt-5'>
                <View className='flex flex-row justify-center items-center gap-2 text-[10px] py-3 px-[30px] border-[.5px] rounded-full border-purple-600 bg-purple-100 text-purple-800 font-bold'>
                    <Image
                    source={require('../../assets/icons/s-decline.png')}
                    style={{ width: 7, height: 7 }}
                    tintColor={'purple'}
                    />
                    <Text className='text-[10px] text-purple-800 font-bold'>
                        Not Reimbursements
                    </Text>
                </View>
            </View>
        )}
        

        {/* MENU LIST */}
        <View className='w-full flex justify-start items-center px-[30px] pt-[10px]'>
            {/* HEAD MORE */}
            <View className='flex flex-row justify-between items-center w-full mt-4'>
                <Text className='text-[10px] font-bold'>
                    Menu
                </Text>
            </View>

            {/* STATUS ICON */}
            <View className='w-full justify-start items-center gap-5 flex flex-row flex-wrap mt-7 px-[20px]'>
                {iconMenu.map((item, index) => {
                    if(item.role.includes(role)){
                        return (
                            <Pressable key={index} onPress={item.link}className='flex flex-col justify-center items-center'>
                                <View className='flex justify-center items-center w-[50px] h-[50px] rounded-lg bg-white border-[.5px] border-b-[1px] border-purple-600'>
                                    <Image source={item.icon} style={{ width: 25, height: 25 }}/>
                                </View>
                                <Text className='text-[10px] text-center w-[50px] mt-2'>
                                    {item.title}
                                </Text>
                            </Pressable>
                        )
                    }
                })}
            </View>
        </View>

        {/* TAMBAHAN BIAR BISA SCROLL */}
        <View className='w-full h-[1000px] bg-white'></View>

      </ScrollView>
    </View>
  )
}

export default home