import CardInfo from '@/components/cardInfo'
import { getReimburseUserPerMonth } from '@/hooks/api'
import { dataReimburseMain, getReimburseUserHome } from '@/hooks/dataReimburseFunction'
import { formatRupiah } from '@/hooks/formatRupiahFunction'
import { getDataUserLogin } from '@/hooks/userFunction'
import { ReimbursementType } from '@/types/reimburseDataType'
import { Image, ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Pressable, ScrollView, Text, View } from 'react-native'
const { width } = Dimensions.get('window');

const home = () => {

  const router = useRouter();
  const [statusActieve, setStatusActive] = useState(1);
  const { dataReimburseUser, totalAmountReimburse, dataMonth, dataThisMonthAll, } = dataReimburseMain();
  const [dataReimburse, setDataReimburse] = useState<ReimbursementType[]>([]);
  const dataUserLogin = getDataUserLogin();
  const [role, setRole] = useState<string>('karyawan');
  const year = new Date().getFullYear();
  const month = new Date().toString().slice(4, 7);
  const yearMonth = new Date().toISOString().slice(0,7);
  const monthNumber = new Date().toISOString().slice(5, 7);
  const [selectMonthPopUp, setSelectMonthPopUp] = useState(false);
  const [selectMonth, setSelectMonth] = useState('');
  const [monthTotalPrice, setMonthTotalPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectStatus, setSelectStatus] = useState('All');
  const bulanMap: any = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };

  useEffect(()=>{
    const total = dataReimburse.reduce((sum, item) => sum + Number(item.total_amount || 0), 0);
    setTotalPrice(total);
  }, [dataReimburse])

  useEffect(()=>{
    if(dataMonth.length > 0){
        setSelectMonth(`${bulanMap[dataMonth[0]]} ${year.toString()}`);
    }else{
        setSelectMonth(`${month} ${year.toString()}`);
        // console.error('select month default : ', selectMonth);
    }
  }, [dataMonth])

  useEffect(()=>{
    setMonthTotalPrice(monthNumber);
    // console.error('set month total price : ', monthTotalPrice);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReimburseUserHome(monthTotalPrice);
        setDataReimburse(res);
      } catch (err) {
        // console.error(err);
      }
    };
  
    fetchData();
  }, [monthTotalPrice]);

  useEffect(()=>{
    // console.error('bulan tahun : ', yearMonth, 'bulan:', month);
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
        action: () => {
            setSelectStatus('All')
            setStatusActive(1)
        },
        border: "border-purple-600"
    },
    {
        id: 2,
        title: "Pending",
        icon: require("../../assets/icons/pending-tint.png"),
        color: 'bg-yellow-50',
        action: () => {
            setSelectStatus('Pending')
            setStatusActive(2)
        },
        border: "border-purple-600"
    },
    {
        id: 3,
        title: "Approved",
        icon: require("../../assets/icons/approve-tint.png"),
        color: 'bg-green-50',
        action: () => {
            setSelectStatus('Approved')
            setStatusActive(3)
        },
        border: "border-purple-600"
    },
    {
        id: 4,
        title: "Rejected",
        icon: require("../../assets/icons/decline-tint.png"),
        color: 'bg-red-50',
        action: () => {
            setSelectStatus('Rejected')
            setStatusActive(4)
        },
        border: "border-purple-600"
    },
  ]

  const iconMenu = [
    {
        id: 1,
        title: "create reimburse",
        color: "#F3D1FF",
        icon: require("../../assets/icons/reimburse-active.png"),
        link: () => {router.replace('/reimburse')},
        role: ['karyawan', 'admin']
    },
    {
        id: 1,
        title: "data Reimburse",
        color: "#F3D1FF",
        icon: require("../../assets/icons/data-reimburse.png"),
        link: () => {router.replace('../(admin)/historyReimburseKaryawan')},
        role: ['admin']
    },
    {
        id: 1,
        title: "data karyawan",
        color: "#D1D6FF",
        icon: require("../../assets/icons/karyawan.png"),
        link: () => {router.replace('../(admin)/dataKaryawan')},
        role: ['admin']
    },
    {
        id: 1,
        title: "Salary karyawan",
        color: "#D1D6FF",
        icon: require("../../assets/icons/salary-karyawan.png"),
        link: () => {router.replace('../(admin)/dataSalaryKaryawan')},
        role: ['admin']
    },
  ]


  return (
    <View className='bg-white flex-1 justify-start items-center'>

      {/* HEADER */}
      <View className='flex flex-row justify-between items-center relative z-[997] top-30 w-full h-[110px] p-[30px] pt-[55px]'>
        <View className='flex flex-row justify-start items-center'>
            <View className='flex justify-center items-center w-[40px] h-[40px] overflow-hidden bg-[#00d7f4] rounded-full'>
              <LinearGradient colors={['#00d7f4', '#009fb4']} className='w-full h-full flex flex-row justify-center items-center'>
                <Text className='text-[#00495f] font-bold text-[15px]'>
                    {dataUserLogin.username.charAt(0).toUpperCase()}{dataUserLogin.username.charAt(dataUserLogin.username.length - 1).toUpperCase()}
                </Text>
              </LinearGradient>
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
            source={require('../../assets/images/total-reimburse-bg.png')}
            imageStyle={{ borderRadius: 12, }}
            >
                <View className='w-full flex flex-row justify-between items-center p-[20px] py-[30px]'>
                    <View className="flex flex-col justify-start items-start">
                        <Text className="text-[10px] text-white">Total Reimburse</Text>
                        <View className='w-full flex flex-row justify-between items-center'>
                            <Text className="text-[20px] text-white font-bold">{
                                formatRupiah(totalPrice||0)
                            }</Text>
                            <Pressable android_ripple={{ color: 'rgba(0,0,0,0.1)' }} onPress={() => {
                                if(dataMonth.length > 0){
                                    setSelectMonthPopUp(true)
                                }
                                }} className="w-[100px] border-[.5px] border-b-[1px] border-white rounded-lg flex flex-row justify-center items-center bg-purple-500">
                                <Text className="text-[12px] font-bold py-[5px] text-white">{selectMonth}</Text>
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
                                <View className='w-[20px] h-[20px] rounded-full overflow-hidden bg-purple-50 relative z-10 -right-[15px] top-[10px]'>    
                                    <LinearGradient colors={['#9000E4', '#7200B4']} className='w-[20px] h-[20px] rounded-full bg-purple-800 flex justify-center items-center'>
                                        <Text className='text-[10px] text-white'>
                                            {item.title==="All" ? dataReimburse.length : item.title==="Pending" ? dataReimburse.filter(i=>i.status==="Pending").length : item.title==="Approved" ? dataReimburse.filter(i=>i.status==="Approved").length : dataReimburse.filter(i=>i.status==="Rejected").length}
                                        </Text>
                                    </LinearGradient>
                                </View>
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
        <View className='w-full h-[100px] bg-blue-50 mt-5 p-0' style={{ width: '100%' }}>
            {dataReimburse.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                    <LinearGradient colors={['#E2B7F1', '#D58DFF']} className='h-[100px] w-full flex flex-row justify-start items-center gap-3 pl-[30px] pr-[30px] bg-[#F1E3FA]'>
                        {(selectStatus==="Pending"?dataReimburse.filter(i=>i.status==="Pending"):selectStatus==="Approved"?dataReimburse.filter(i=>i.status==="Approved"):selectStatus==="Rejected"?dataReimburse.filter(i=>i.status==="Rejected"):dataReimburse).map((item, idx) => (
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
                    </LinearGradient>
                </ScrollView>
            ) : (
                <View className='w-full h-[100px]'>
                    <LinearGradient colors={['#E2B7F1', '#D58DFF']} className='h-[100px] w-full flex flex-row justify-center items-center gap-3 bg-[#F1E3FA]'>
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
                    </LinearGradient>
                </View>
            )}
        </View>
        

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
                                <View className='flex justify-center items-center w-[50px] h-[50px] rounded-lg bg-white border border-b-[2px] border-purple-600 overflow-hidden'>
                                    <LinearGradient colors={['#FFFFFF', item.color]} className='h-full w-full flex flex-row justify-center items-center'>
                                        <Image source={item.icon} style={{ width: 30, height: 30 }}/>
                                    </LinearGradient>
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

      {selectMonthPopUp && (
        <>
            <Pressable onPress={() => {setSelectMonthPopUp(false)}} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, left: 0 }} className='z-[998] bg-black opacity-60' />
            <View style={{ position: 'absolute', right: 50, top: 210, }} className='w-[100px] rounded-lg border border-white justify-center items-center bg-purple-500 z-[999] px-[10px]'>         
                {dataMonth.map((item, index) => {
                    return <Pressable onPress={() => {
                        setSelectMonth(`${bulanMap[item]} ${year.toString()}`);
                        setMonthTotalPrice(item.toString());
                        setSelectMonthPopUp(false);
                    }} key={index} className='py-3 border border-l-[0px] border-r-[0px] border-purple-400 w-full flex justify-center items-center'>
                        <Text className='text-white text-[12px] font-bold'>
                            {bulanMap[item]} {year.toString()}
                        </Text>
                    </Pressable>;
                })}
            </View>
        </>
      )}
    </View>
  )
}

export default home