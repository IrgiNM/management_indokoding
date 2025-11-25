import CardInfo from '@/components/cardInfo'
import HeaderBack from '@/components/headerBack'
import { updateReimburse } from '@/hooks/api'
import { ChangeUserReimburse, dataReimburseMain } from '@/hooks/dataReimburseFunction'
import { dataUserFunction } from '@/hooks/dataUserFunction'
import { formatRupiah } from '@/hooks/formatRupiahFunction'
import { ReimbursementType } from '@/types/reimburseDataType'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native'
const { width } = Dimensions.get('window');

const historyReimburseKaryawan = () => {

  const [isActive, setIsActive] = useState("All");
  const [checkActive, setCheckActive] = useState(false);
  const [statusActive, setStatusActive] = useState('All');
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const { dataThisMonthAll, dataMonthYear, dataThisYearAll, dataMonthAll } = dataReimburseMain();
  // const [dataMonth, setDataMonth] = useState<string[]>([]);
  const today = new Date().toISOString().split("T")[0];
  const thisMonth = today.slice(5,7);
  const thisYear = today.slice(0,4);
  const [dataReimburse, setDataReimburse] = useState<ReimbursementType[]>([]);
  const { dataAllNewUser } = dataUserFunction();
  const [popUpActive, setPopUpActive] = useState('');
  const router =  useRouter();
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
    // console.log("data:",dataMonthAll);
  }, [dataMonthAll]);

  useEffect(()=>{
    // // console.error('dataThisYearAll:', dataThisYearAll);
    if(isActive === "All"){
      setDataReimburse(dataThisYearAll);
    }
  }, [dataThisYearAll, isActive]);

  useEffect(()=>{
    // // console.error('statusActive changed:', statusActive);
    // // console.error('dataReimburse changed:', dataReimburse);
    // // console.error('thisMonth', thisMonth);
    // // console.error('dataMonth', dataMonthAll);
  }, [statusActive, dataReimburse]);

  const toggleSelect = (id: string) => {
    setSelectedId(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id) // hapus jika sudah ada
        : [...prev, id] // tambah jika belum ada
    );
  };

  const userHandle = async(email: string) => {
    setIsActive(email);
    const res = await ChangeUserReimburse(email);
    if(res){
      setDataReimburse(res);
    }
  }

  const handleApproveAll = () => {
    try{
      {selectedId.map(async(id, idx)=>{
        const res = await updateReimburse(Number(id??idx), {status: 'Approved'});
        if(res !== undefined){
          // console.error('Reimbursement approved successfully', id, idx);
          setPopUpActive('');
          setSelectedId([]);
        }
      })}
      router.replace('../(admin)/historyReimburseKaryawan');
    }catch{
      // console.error('Error approving reimbursements');
    }
  }

  const handleDeclineAll = () => {
    try{
      {selectedId.map(async(id, idx)=>{
        const res = await updateReimburse(Number(id??idx), {status: 'Rejected'});
        if(res !== undefined){
          // console.error('Reimbursement Rejected successfully', id, idx);
          setPopUpActive('');
          setSelectedId([]);
        }
      })}
      router.replace('../(admin)/historyReimburseKaryawan');
    }catch{
      // console.error('Error Rejecting reimbursements');
    }
  }

  
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
          {dataMonthAll.map((month, index) => {
            const totalR = dataReimburse
            .filter(item => item.created_at?.slice(5,7) === month)
            .reduce((acc, item) => acc + Number(item.total_amount || 0), 0);
            if(month === thisMonth){
              const total = dataReimburse
              .filter(item => item.created_at?.slice(5,7) === thisMonth)
              .reduce((acc, item) => acc + Number(item.total_amount || 0), 0);
              return (
                <View className='w-full flex flex-col justify-start items-center mb-[30px]' key={index}>
                  <View className='w-full px-[20px] rounded-lg flex flex-row justify-between items-center mb-2'>
                    <Text className='text-[12px] font-bold mb-2'>This Month</Text>
                    <Text className='text-[12px] font-bold mb-2'>{formatRupiah(total)}</Text>
                  </View>
                  <View className='w-full px-[20px] pt-[15px] bg-purple-200 pb-[30px] flex flex-col justify-start items-center gap-2'>
                    {(isActive === "All" ? (dataReimburse) : (dataReimburse)).map((item, idx) => {
                      const itemISO = item.created_at || '';
                      const itemMonth = itemISO.slice(5,7);
                      // // console.error('itemMonth:', itemMonth, 'thisMonth:', thisMonth);
                      if(itemMonth === thisMonth && (statusActive === "All" ? (item.status !== statusActive) : (item.status === statusActive))){
                        return (
                          <View className='w-full flex flex-row justify-start items-center' key={idx}>
                            {checkActive && (
                              <Pressable onPress={()=>{
                                  toggleSelect(item.id?.toString()??'');
                                }} className={`flex flex-row justify-center items-center mx-5 w-[22px] h-[22px] border rounded-lg border-purple-600`}>
                                {
                                  selectedId.includes(item.id?.toString()??'') && (
                                    <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 10, height: 10 }} tintColor={"#9333EA"}/>
                                  )
                                }
                              </Pressable>
                            )}
                            <CardInfo 
                              amount={Number(item.total_amount)} 
                              date={item.created_at||''}
                              description={item.description}
                              status={item.status}
                              title={isActive==="All" ? item.user_detail?.username??'tidak ada username' : item.title}
                              key={idx}
                              id={item.id??0}
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
                  <Text className='text-[12px] font-bold mb-2'>{`${bulanMap[month]} ${thisYear}`}</Text>
                  <Text className='text-[12px] font-bold mb-2'>{formatRupiah(totalR)}</Text>
                </View>
                <View className='w-full px-[20px] pt-[15px] bg-purple-50 pb-[30px] flex flex-col justify-start items-center gap-2'>
                  {(isActive === "All" ? (dataReimburse) : (dataReimburse)).map((item, idx) => {
                    const itemISO = item.created_at || '';
                    const itemMonth = itemISO.slice(5,7);
                    if(itemMonth === month && (statusActive === "All" ? (item.status !== statusActive) : (item.status === statusActive)) && (isActive === "All" ? (item.user_detail?.email !== isActive) : (item.user_detail?.email === isActive))){
                      return (
                        <View className='w-full flex flex-row justify-start items-center' key={idx}>
                          {checkActive && (
                            <Pressable onPress={()=>{
                              toggleSelect(item.id?.toString()??'');
                              }} className={`flex flex-row justify-center items-center mx-5 w-[22px] h-[22px] border rounded-lg border-purple-600`}>
                              {
                                selectedId.includes(item.id?.toString()??'') && (
                                  <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 10, height: 10 }} tintColor={"#9333EA"}/>
                                )
                              }
                            </Pressable>
                          )}
                          <CardInfo 
                            amount={Number(item.total_amount)} 
                            date={item.created_at||''}
                            description={item.description}
                            status={item.status}
                            title={isActive==="All" ? item.user_detail?.username??'tidak ada username' : item.title}
                            id={item.id??0}
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

      {/* APPROVE OR NO BUTTON */}
      {/* FILTER USER */}
      <View className='w-full h-[220px] flex flex-col absolute bottom-0 z-10'>
        
        {checkActive ? (
          <View className='w-full h-[70px] flex flex-row justify-end items-center gap-[10px] pr-[20px]'>
            <Pressable onPress={() => {
              setPopUpActive('approve')
              }} className='h-[40px] border border-b-[2px] border-purple-800 flex flex-row justify-center items-center bg-green-400 rounded-full gap-2 overflow-hidden'>
              <LinearGradient colors={['#00F080', '#00AC5C']} className='px-[20px] h-full flex flex-row justify-center items-center gap-2'>
                <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
                <Text className='font-bold text-[10px] text-white ml-1'>approved</Text>
              </LinearGradient>
            </Pressable>

            <Pressable onPress={() => {
              setPopUpActive('decline')
              }} className='h-[40px] border border-b-[2px] border-purple-800 overflow-hidden flex flex-row justify-center items-center bg-red-400 rounded-full gap-2'>
              <LinearGradient colors={['#FF0066', '#D90057']} className='px-[20px] h-full flex flex-row justify-center items-center gap-2'>
                <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
                <Text className='font-bold text-[10px] text-white ml-1'>rejected</Text>
              </LinearGradient>
            </Pressable>

            <Pressable onPress={() => {
              setCheckActive(false)
              }} className='h-[40px] w-[40px] border border-b-[2px] border-purple-800 flex justify-center items-center bg-white rounded-full'>
              <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 10, height: 10 }} tintColor={"#9333EA"}/>
            </Pressable>
          </View>
        ):
        (
          <View className='w-full h-[70px]'/>
        )}

        <View className='bg-white w-full h-[150px] flex-row items-start px-[30px] pt-[20px] rounded-t-3xl gap-[10px] border border-purple-600'>
          <Pressable onPress={() => setIsActive("All")}
          className={`w-[45px] h-[45px] flex  justify-center items-center mt-2 border-[1px] border-b-[2px] ${isActive==="All"?"border-purple-800 ":"border-purple-200"} rounded-lg`}>
            <Text className={`text-[12px] ${isActive==="All"?"text-purple-600":"text-purple-200"}`}>All</Text>
          </Pressable >

          {/*  Scroll horizontal dengan animasi scale */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View className='w-full h-[60px] flex flex-row items-center gap-2'>
              {dataAllNewUser.map((item, index) => {
                return (
                    <Pressable 
                      key={index}
                      onPress={() => {
                        userHandle(item.email);
                      }}
                      className={`w-[50px] h-[50px] flex justify-center items-center overflow-hidden rounded-full`}
                    >
                      <LinearGradient colors={['#CD00F1', '#9F00BB']} className={`w-full h-full flex justify-center items-center ${isActive===item.email?"opacity-100":'opacity-40'}`}>
                        <Text className={`text-lg font-bold text-white`}>{item.username.charAt(0).toUpperCase()}{item.username.charAt(item.username.length - 1).toUpperCase()}</Text>
                      </LinearGradient>
                    </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* POPUP */}
      {popUpActive !== '' && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#1e0031]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[20px] pt-[60px] rounded-lg flex flex-col justify-start items-center'>
              <View className={`w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full ${popUpActive==='approve'?'bg-[#00AC5C]':'bg-[#FF0066]'} bg-[#FF0066] flex justify-center items-center`}>
                {popUpActive==='approve'?(
                  <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 28, height: 25 }} tintColor={"#ffffff"} className='mb-5'/>
                ):(
                  <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 25, height: 25 }} tintColor={"#ffffff"} className='mb-5'/>
                )}
              </View>
              <Text className='text-[12px] w-full text-center'>
                Are you sure want to {popUpActive} this reimbursement?
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpActive('')}} className='w-[50%] border border-b-[2px] border-purple-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {
                  if(popUpActive==='approve'){
                    handleApproveAll();
                  } else if(popUpActive==='decline'){
                    handleDeclineAll();
                  }
                  }} className={`w-[50%] bg-[#ab25e0] rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-white'>
                    Yes, {popUpActive}
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

export default historyReimburseKaryawan
