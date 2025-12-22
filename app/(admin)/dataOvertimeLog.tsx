import HeaderBack from '@/components/headerBack'
import { ChangeUserOvertimeLog, createOvertimeLogFunction, deleteOvertimeLogFunction, fetchYearMonthAndDay, overtimeLogAdminFunction, updateOvertimeLogFunction } from '@/hooks/dataOvertimeLogFunction'
import { dataUserFunction } from '@/hooks/dataUserFunction'
import { overtimeLogSendType, overtimeLogType } from '@/types/overtimeLogType'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native'

const dataOvertimeLog = () => {
    const {dataDays,dataMonths,dataYears,day,month,year,hours,minutes} = fetchYearMonthAndDay();
    const { dataAllNewUser } = dataUserFunction();
    const [isActive, setIsActive] = useState("All");
    const [dataOvertimeLog, setDataOvertimeLog] = useState<overtimeLogType[]>([]);
    const [selectedId, setSelectedId] = useState<string[]>([]);
    const [Username, setUsername] = useState('All');

    const [selectedDay, setSelectedDay] = useState<number>(day);
    const [selectedMonth, setSelectedMonth] = useState<number>(month);
    const [selectedYear, setSelectedYear] = useState<number>(year);
    const [selectedHourStart, setSelectedHourStart] = useState("00");
    const [selectedMinuteStart, setSelectedMinuteStart] = useState("00");
    const [selectedHourEnd, setSelectedHourEnd] = useState("00");
    const [selectedMinuteEnd, setSelectedMinuteEnd] = useState("00");
    const [activeDay, setActiveDay] = useState(false);
    const [activeMonth, setActiveMonth] = useState(false);
    const [activeYear, setActiveYear] = useState(false);
    const [activeHourStart, setActiveHourStart] = useState(false);
    const [activeMinuteStart, setActiveMinuteStart] = useState(false);
    const [activeHourEnd, setActiveHourEnd] = useState(false);
    const [activeMinuteEnd, setActiveMinuteEnd] = useState(false);
    const [description, setDescription] = useState('');

    const [updateOrCreate, setUpdateOrCreate] = useState('create');

    // DATA DETAIL
    const [chooseId, setChooseId] = useState(0);
    const [chooseStatus, setChooseStatus] = useState('pending');
    const [chooseDate, setChooseDate] = useState('0-0-0');
    const [chooseStartTime, setChooseStartTime] = useState('00:00:00');
    const [chooseEndTime, setChooseEndTime] = useState('00:00:00');
    const [chooseDuration, setChooseDuration] = useState('2');
    const [chooseDescription, setChooseDescription] = useState('null');

    const dataSend: overtimeLogSendType = {
        date: `${selectedYear}-${selectedMonth}-${selectedDay}`,
        start_time: `${selectedHourStart}:${selectedMinuteStart}:00`,
        end_time: `${selectedHourEnd}:${selectedMinuteEnd}:00`,
        description: description,
    }

    const {dataOvertimeLogAll,dataOvertimeLogByUser,dataMonthsNumber} = overtimeLogAdminFunction(isActive);
    const [popUpCreate, setPopUpCreate] = useState(false);
    const [popUpChoose, setPopUpChoose] = useState(false);
    const [popUpRemove, setPopUpRemove] = useState(false);
    const [popUpInfo, setPopUpInfo] = useState(false);
    const [checkActive, setCheckActive] = useState(false);
    const [popUpActive, setPopUpActive] = useState('');
    const [infoText, setInfoText] = useState('');
    const [selectStatus, setSelectStatus] = useState('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const router = useRouter();
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
          status: 'all', 
          icon: require('../../assets/icons/s-all.png'),
          link: ()=>{setSelectStatus('all')}
        },
        { 
          id: 2, 
          status: 'pending', 
          icon: require('../../assets/icons/s-pending.png'),
          link: ()=>{setSelectStatus('pending')}
        },
        { 
          id: 3, 
          status: 'approved', 
          icon: require('../../assets/icons/s-approve.png'),
          link: ()=>{setSelectStatus('approved')}
        },
        {
          id: 4,
          status: 'rejected',
          icon: require('../../assets/icons/s-decline.png'),
          link: ()=>{setSelectStatus('rejected')}
        },
      ]

    const toggleSelect = (id: string) => {
      setSelectedId(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id) // hapus jika sudah ada
          : [...prev, id] // tambah jika belum ada
      );
    };

    const userHandle = async(email: string) => {
      setIsActive(email);
      const res = await ChangeUserOvertimeLog(email);
      if(res){
        setDataOvertimeLog(res);
        setUsername(dataAllNewUser.find(user => user.email === email)?.username || '');
      }
    }
    
    const handleDelete = async() => {
      setLoading(true);
      const res = await deleteOvertimeLogFunction(chooseId);
      if(res){
        setLoading(false);
        setError('berhasil delete overtime log');
        setPopUpCreate(false);
        setPopUpInfo(true);
        router.replace('../(admin)/dataOvertimeLog');
      } else {
        setLoading(false);
        setError('gagal delete overtime log');
      }
    }

    const handleCreate = async() => {
      setLoading(true);
      const res = await createOvertimeLogFunction(dataSend);
      if(res){
        setLoading(false);
        setError('berhasil membuat overtime log');
        setPopUpCreate(false);
        setPopUpInfo(true);
        router.replace('../(admin)/dataOvertimeLog');
      } else {
        setLoading(false);
        setError('gagal membuat overtime log');
      }
    }

    const handleApproveAll = () => {
      try{
        {selectedId.map(async(id, idx)=>{
          const res = await updateOvertimeLogFunction(Number(id??idx), {status: 'approved'});
          if(res !== undefined){
            // console.error('Reimbursement approved successfully', id, idx);
            setPopUpActive('');
            setSelectedId([]);
          }
        })}
        router.replace('../(admin)/dataOvertimeLog');
      }catch{
        // console.error('Error approving reimbursements');
      }
    }

    const handleDeclineAll = () => {
      try{
        {selectedId.map(async(id, idx)=>{
          const res = await updateOvertimeLogFunction(Number(id??idx), {status: 'rejected'});
          if(res !== undefined){
            // console.error('Reimbursement Rejected successfully', id, idx);
            setPopUpActive('');
            setSelectedId([]);
          }
        })}
        router.replace('../(admin)/dataOvertimeLog');
      }catch{
        // console.error('Error Rejecting reimbursements');
      }
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, width: '100%', backgroundColor: 'black' }}>
    <View className='bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title={`Data Overtime Log`} type='mysql' backTo={'/home'}/>

      <View className='w-full h-full pb-0'>
        <View className='w-full h-full bg-[#dfc1ef] pb-0'>
          <LinearGradient colors={['#FFB650', '#471313']} className='w-full h-full pt-[0px] pb-[220px] flex-1 flex-col justify-start items-center'>
            <View className='w-[90%] mb-1 bg-white rounded-full flex flex-col justify-start items-center p-1'>
                <View className='w-full flex flex-row justify-between items-center bg-orange-50 border-[.5px] border-b-[1px] rounded-full border-orange-600 py-[5px] px-[5px]'>
                    {statusList.map((item, index)=>{
                    return(
                        <Pressable key={index} onPress={item.link} className={`flex flex-row justify-center items-center py-[10px] px-3 gap-2 rounded-full ${item.status === selectStatus ? 'bg-orange-700' : 'bg-orange-50 border-[.5px] border-b-[1px] border-orange-200' }`}>
                        <Image source={item.icon} style={{ width: 10, height: 10 }} tintColor={item.status === selectStatus ? "#FFFFFF" : "#760E00"}/>
                        <Text className={`text-[10px] ${item.status === selectStatus ? 'text-white' : 'text-orange-900' } font-bold`}>{item.status}</Text>
                        </Pressable>
                    )
                    })}
                </View>
            </View>
            <View className='w-full h-full bg-white pt-3 rounded-lg flex flex-col justify-start items-center'>
                <ScrollView className='w-full h-full rounded-lg'>
                    <View className='w-full h-full flex flex-col justify-start items-center'>
                      {dataMonthsNumber.map((monthItem, index) => {
                        // const totalPrice = Number((isActive === "All" ? (selectStatus==="all"?(dataOvertimeLogAll.filter(item=>item.date.slice(5,7)===monthItem)):(dataOvertimeLogAll.filter(item=>item.status===selectStatus)).filter(item=>item.date.slice(5,7)===monthItem)) : (selectStatus==="all"?(dataOvertimeLogByUser.filter(item=>item.date.slice(5,7)===monthItem)):(dataOvertimeLogByUser.filter(item=>item.status===selectStatus)).filter(item=>item.date.slice(5,7)===monthItem))).reduce((acc, curr) => acc + parseFloat(curr.duration_hours), 0));
                        return(
                          <View className='w-full flex flex-col items-center' key={index}>
                            <View className='w-full flex flex-row justify-between items-center px-5'>
                              <Text className='flex-1 py-2 rounded-t-xl rounded-b-0 text-center bg-white border-[5px] border-b-0 border-white mb-0 text-orange-800 text-[10px] m-1 font-bold'>
                                  {bulanMap[monthItem]} 2025 
                              </Text>
                              {/* {(selectStatus === 'all' || selectStatus === 'approved') && (
                                <Text className='flex-1 py-2 rounded-t-xl rounded-b-0 text-center bg-white border-[5px] border-b-0 border-white mb-0 text-orange-800 text-[10px] m-1 font-bold'>
                                    Total Overtime Hours: {totalPrice} h
                                </Text>
                              )} */}
                            </View>
                            <View className='w-full mb-5 bg-blue-100 p-3 flex flex-col justify-start items-center gap-2'>
                              {(isActive === "All" ? (selectStatus==="all"?(dataOvertimeLogAll.filter(item=>item.date.slice(5,7)===monthItem)):(dataOvertimeLogAll.filter(item=>item.status===selectStatus)).filter(item=>item.date.slice(5,7)===monthItem)) : (selectStatus==="all"?(dataOvertimeLogByUser.filter(item=>item.date.slice(5,7)===monthItem)):(dataOvertimeLogByUser.filter(item=>item.status===selectStatus)).filter(item=>item.date.slice(5,7)===monthItem))).map((item,index)=>(
                                <View className='flex flex-row justify-center items-center'>
                                    {checkActive && (
                                    <Pressable onPress={()=>{
                                        toggleSelect(item.id?.toString()??'');
                                        }} className={`flex flex-row justify-center items-center mx-5 w-[22px] h-[22px] border rounded-lg border-blue-600 bg-white`}>
                                        {
                                        selectedId.includes(item.id?.toString()??'') && (
                                            <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 10, height: 10 }} tintColor={"#0043a8"}/>
                                        )
                                        }
                                    </Pressable>
                                    )}
                                    <Pressable key={index} onPress={()=>{
                                    setChooseId(item.id??0);
                                    setChooseStatus(item.status);
                                    setChooseDate(item.date);
                                    setChooseStartTime(item.start_time);
                                    setChooseEndTime(item.end_time);
                                    setChooseDuration(item.duration_hours);
                                    setChooseDescription(item.description??'No description');
                                    setPopUpChoose(true)
                                    }} onLongPress={() => setCheckActive(true)} className=' w-[270px] overflow-hidden bg-white border border-b-2 border-[#0043a8] rounded-md flex flex-row justify-start gap-3 items-center'>
                                    <View className='h-full p-2 px-3 bg-orange-300'>
                                        <View className='flex flex-col justify-center items-center bg-orange-50 rounded-full p-3'>
                                        <Image source={
                                            item.status === "approved" ? require('../../assets/icons/approve-icon.png') :
                                            item.status === "pending" ? require('../../assets/icons/pending-time.png') :
                                            item.status === "rejected" ? require('../../assets/icons/decline-icon.png') :
                                            require('../../assets/icons/home-active.png')
                                        } style={{ width: 23, height: 23 }} tintColor={"#a84900"}/>
                                        </View>
                                    </View>
                                    <View className='w-[150px] flex flex-col justify-center items-center gap-1'>
                                        <View className='w-full flex flex-row justify-between items-center'>
                                        <Text className='text-[10px]'>{item.duration_hours} h</Text>
                                        <Text className='text-[10px]'>{item.date}</Text>
                                        </View>
                                        <View className='w-full flex flex-row justify-between items-center gap-2'>
                                        <View className=''>
                                            <Text className='text-[15px] font-bold'>{item.start_time}</Text>
                                        </View>
                                        <Text className='font-bold'>-</Text>
                                        <View className=''>
                                            <Text className='text-[15px] font-bold'>{item.end_time}</Text>
                                        </View>
                                        </View>
                                    </View>
                                    <View className='pl-[10px]'>
                                        <Image
                                        source={require('../../assets/objek/arrow-more.png')}
                                        style={{ width: 7, height: 10, opacity: 0.3 }}
                                        className='relative right-[0px]'
                                        tintColor={"orange"}
                                        />
                                    </View>
                                    </Pressable>
                                </View>
                              ))}
                            </View>
                          </View>
                        )
                      })}
                    </View>
                </ScrollView>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* APPROVE OR NO BUTTON */}
      {/* FILTER USER */}
      <View className='w-full h-[220px] flex flex-col items-center absolute bottom-0 z-10'>
        
        {checkActive ? (
          <View className='w-full h-[70px] flex flex-row justify-end items-center gap-[10px] pr-[20px]'>
            <Pressable onPress={() => {
              setPopUpActive('approve')
              }} className='h-[40px] border border-b-[2px] border-blue-800 flex flex-row justify-center items-center bg-green-400 rounded-full gap-2 overflow-hidden'>
              <LinearGradient colors={['#00F080', '#00AC5C']} className='px-[20px] h-full flex flex-row justify-center items-center gap-2'>
                <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
                <Text className='font-bold text-[10px] text-white ml-1'>approved</Text>
              </LinearGradient>
            </Pressable>
  
            <Pressable onPress={() => {
              setPopUpActive('decline')
              }} className='h-[40px] border border-b-[2px] border-blue-800 overflow-hidden flex flex-row justify-center items-center bg-red-400 rounded-full gap-2'>
              <LinearGradient colors={['#FF0066', '#D90057']} className='px-[20px] h-full flex flex-row justify-center items-center gap-2'>
                <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
                <Text className='font-bold text-[10px] text-white ml-1'>rejected</Text>
              </LinearGradient>
            </Pressable>
  
            <Pressable onPress={() => {
              setCheckActive(false)
              }} className='h-[40px] w-[40px] border border-b-[2px] border-blue-800 flex justify-center items-center bg-white rounded-full'>
              <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 10, height: 10 }} tintColor={"#0043a8"}/>
            </Pressable>
          </View>
        ):
        (
          <View className='w-full h-[70px]'/>
        )}
        <View className='p-2 bg-orange-400 flex justify-center items-center w-[300px] rounded-t-lg'>
          <Text className='text-[10px] font-bold text-white'>User : {Username??'-'}</Text>
        </View>
        <View className='bg-white w-full h-[150px] flex-row items-start px-[30px] pt-[20px] rounded-t-3xl gap-[10px] border border-blue-600'>
          <Pressable onPress={() => {
            setIsActive("All")
            setUsername('All');
          }}
          className={`w-[45px] h-[45px] flex  justify-center items-center mt-2 border-[1px] border-b-[2px] ${isActive==="All"?"border-blue-800 ":"border-blue-200"} rounded-lg`}>
            <Text className={`text-[12px] ${isActive==="All"?"text-blue-600":"text-blue-200"}`}>All</Text>
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
                      <LinearGradient colors={['#5088FF', '#1A63FF']} className={`w-full h-full flex justify-center items-center ${isActive===item.email?"opacity-100":'opacity-40'}`}>
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
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#310000]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[20px] pt-[60px] rounded-lg flex flex-col justify-start items-center'>
              <View className={`w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full ${popUpActive==='approve'?'bg-[#00AC5C]':'bg-[#FF0066]'} flex justify-center items-center`}>
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
                <Pressable onPress={() => {setPopUpActive('')}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
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
                  }} className={`w-[50%] bg-[#ed4b27] rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-white'>
                    Yes, {popUpActive}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP DELETE */}
      {popUpRemove && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#1e0031]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[20px] pt-[60px] rounded-lg flex flex-col justify-start items-center'>
              <View className='w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full bg-[#FF0066] flex justify-center items-center'>
                <Image source={require("../../assets/icons/trash.png")} style={{ width: 25, height: 28 }} tintColor={"#ffffff"} className='mb-5'/>
              </View>
              <Text className='text-[12px] w-full text-center'>
                Are you sure want to cancel this overtime log?
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpRemove(false)}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {handleDelete()}} className='w-[50%] bg-[#FF0066] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-white'>
                    {loading ? 'deleting...' : 'Yes, Cancel'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP */}
      {/* {popUpInfo && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#310000]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[20px] pt-[60px] rounded-lg flex flex-col justify-start items-center'>
              <View className='w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full bg-orange-600 flex justify-center items-center pr-[9px]'>
                <Image source={require("../../assets/icons/send.png")} style={{ width: 25, height: 25 }} tintColor={"#ffffff"} className='ml-[-20px]'/>
              </View>
              <Text className='text-[20px] font-bold w-full text-center'>
                SUCCESS
              </Text>
              <Text className='text-[12px] w-full text-center'>
                Your overtime log has been created successfully.
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpInfo(false)}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )} */}

      {/* POPUP EDIT*/}
      {popUpChoose && (
        <>
          <Pressable onPress={()=>{setPopUpChoose(false)}} className='absolute w-full z-[999] h-full opacity-80 bg-[#210100]'/>
          <View className='w-full h-full pt-[120px] px-[30px] flex justify-start items-center absolute z-[1000]'>
            <View className='w-full bg-white overflow-hidden rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='w-full flex flex-row justify-center items-center gap-1 py-2 mb-3 bg-orange-400'>
                <Image source={
                  chooseStatus === "approved" ? require('../../assets/icons/approve-icon.png') :
                  chooseStatus === "pending" ? require('../../assets/icons/pending-time.png') :
                  chooseStatus === "rejected" ? require('../../assets/icons/decline-icon.png') :
                  require('../../assets/icons/home-active.png')
                } style={{ width: 12, height: 12 }} tintColor={"#ffffff"}/>
                <Text className='text-[10px] text-white'>{chooseStatus}</Text>
              </View>
              <View className='w-full px-7 pb-3 flex flex-row justify-between items-start'>
                <View className='flex flex-col justify-start items-start'>
                  <Text className='text-[12px] font-bold'>Date :</Text>
                  <Text className='text-[12px] font-bold'>Start Time :</Text>
                  <Text className='text-[12px] font-bold'>End Time :</Text>
                </View>
                <View className='flex flex-col justify-start items-end'>
                  <Text className='text-[12px]'>{chooseDate}</Text>
                  <Text className='text-[12px]'>{chooseStartTime}</Text>
                  <Text className='text-[12px]'>{chooseEndTime}</Text>
                </View>
              </View>
              <View className='w-full h-[1px] bg-orange-300'/>
              <View className='w-full px-7 flex flex-row justify-between items-start'>
                <View className='flex flex-col justify-start items-start'>
                  <Text className='text-[12px] font-bold'>Duration :</Text>
                  <Text className='text-[12px] font-bold'>Description :</Text>
                </View>
                <View className='flex flex-col justify-start items-end'>
                  <Text className='text-[12px]'>{chooseDuration} h</Text>
                  <Text className='text-[12px]'></Text>
                </View>
              </View>
              <View className='w-full px-7 mb-7'>
                <View className='border rounded-md p-2 px-4 border-orange-800 bg-orange-50'>
                  <Text className='text-[12px]'>{chooseDescription}</Text>
                </View>
              </View>
            </View>
            <View className='flex flex-row justify-center items-center gap-2 mt-5'>
              {/* <Pressable onPress={()=>{
                setPopUpChoose(false);
                setPopUpCreate(true);
                setUpdateOrCreate('update')
                setSelectedDay(Number(chooseDate.slice(8,10)));
                setSelectedMonth(Number(chooseDate.slice(5,7)));
                setSelectedYear(Number(chooseDate.slice(0,4)));
                setSelectedHourStart((chooseStartTime.slice(0,2).toString()))
                setSelectedMinuteStart((chooseStartTime.slice(3,5).toString()))
                setSelectedHourEnd((chooseEndTime.slice(0,2).toString()))
                setSelectedMinuteEnd((chooseEndTime.slice(3,5).toString()))
                setDescription(chooseDescription);
                }} className='border border-b-2 border-orange-800 w-[50px] h-[50px] rounded-full flex justify-center items-center bg-orange-400'>
                <Image source={require("../../assets/icons/edit.png")} style={{ width: 17, height: 17 }} tintColor={"#ffffff"}/>
              </Pressable> */}
              <Pressable onPress={()=>{
                setPopUpChoose(false);
                setPopUpRemove(true)
                }} className='border-2 border-white w-[50px] h-[50px] rounded-full flex justify-center items-center'>
                <Image source={require("../../assets/icons/trash.png")} style={{ width: 17, height: 17 }} tintColor={"#ffffff"}/>
              </Pressable>
              <Pressable onPress={()=>{
                setPopUpChoose(false)
                }} className='border-2 border-white w-[50px] h-[50px] rounded-full flex justify-center items-center'>
                <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 17, height: 17 }} tintColor={"#ffffff"}/>
              </Pressable>
            </View>
          </View>
        </>
      )}

      {/* POPUP EDIT*/}
      {popUpCreate && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#210a00]'/>
          <View className='w-full h-full pt-[120px] px-[30px] flex justify-start items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/pending-time.png")} style={{ width: 20, height: 20, marginLeft: 5 }} tintColor={"#a84900"}/>
                <Text className='text-[15px] font-bold text-[#002531]'>
                  Create
                </Text>
              </View>

              <Text className='text-[10px] font-bold w-full pl-1'>Date :</Text>
              <View className='w-full flex flex-row justify-center items-start gap-1'>

                {/* CHOOOSE DAY */}
                <View className='flex-1 flex-col justify-start items-center gap-1'>
                  <Text className='w-full py-1 text-center text-[10px] font-bold text-white rounded-t-lg rounded-b-sm bg-orange-500'>Day</Text>
                  <Pressable onPress={() => {setActiveDay(true)}} className='w-full py-2 rounded-lg border border-b-2 border-[#a84900] bg-orange-100 flex flex-row justify-center items-center'>
                    <Text className='text-[12px] font-bold'>{selectedDay}</Text>
                    <Image
                      source={require('../../assets/icons/arrow-dropdown.png')}
                      style={{ width: 7, height: 5, marginLeft: 5 }}
                      tintColor={'#a84900'}
                    />
                  </Pressable>
                  {activeDay &&(
                    <ScrollView className='w-full h-[100px] rounded-md'>
                      <View className='bg-orange-400 flex flex-col justify-center items-center rounded-b-lg rounded-t-sm w-full'>
                        {dataDays.map((item, index) => (
                          <Pressable onPress={() => {
                            setSelectedDay(item);
                            setActiveDay(false);
                          }} className='py-1 w-full flex justify-center items-center border-b-[.5px] border-orange-200' key={index}>
                            <Text className='text-[12px] text-white font-bold py-1'>
                              {item}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </ScrollView>
                  )}
                </View>

                {/* CHOOOSE MONTH */}
                <View className='flex-1 flex-col justify-start items-center gap-1'>
                  <Text className='w-full py-1 text-center text-[10px] font-bold text-white rounded-t-lg rounded-b-sm bg-orange-500'>Month</Text>
                  <Pressable onPress={() => {setActiveMonth(true)}} className='w-full py-2 rounded-lg border border-b-2 border-[#a84900] bg-orange-100 flex flex-row justify-center items-center'>
                    <Text className='text-[12px] font-bold'>{selectedMonth}</Text>
                    <Image
                      source={require('../../assets/icons/arrow-dropdown.png')}
                      style={{ width: 7, height: 5, marginLeft: 5 }}
                      tintColor={'#a84900'}
                    />
                  </Pressable>
                  {activeMonth &&(
                    <ScrollView className='w-full h-[100px] rounded-md'>
                      <View className='bg-orange-400 flex flex-col justify-center items-center rounded-b-lg rounded-t-sm w-full'>
                        {dataMonths.map((item, index) => (
                          <Pressable onPress={() => {
                            setSelectedMonth(item);
                            setActiveMonth(false);
                          }} className='py-1 w-full flex justify-center items-center border-b-[.5px] border-orange-200' key={index}>
                            <Text className='text-[12px] text-white font-bold py-1'>
                              {item}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </ScrollView>
                  )}
                </View>

                {/* CHOOOSE YEAR */}
                <View className='flex-1 flex-col justify-start items-center gap-1'>
                  <Text className='w-full py-1 text-center text-[10px] font-bold text-white rounded-t-lg rounded-b-sm bg-orange-500'>Year</Text>
                  <Pressable onPress={() => {setActiveYear(true)}} className='w-full py-2 rounded-lg border border-b-2 border-[#a84900] bg-orange-100 flex flex-row justify-center items-center'>
                    <Text className='text-[12px] font-bold'>{selectedYear}</Text>
                    <Image
                      source={require('../../assets/icons/arrow-dropdown.png')}
                      style={{ width: 7, height: 5, marginLeft: 5 }}
                      tintColor={'#a84900'}
                    />
                  </Pressable>
                  {activeYear &&(
                    <ScrollView className='w-full h-[100px] rounded-md'>
                      <View className='bg-orange-400 flex flex-col justify-center items-center rounded-b-lg rounded-t-sm w-full'>
                        {dataYears.map((item, index) => (
                          <Pressable onPress={() => {
                            setSelectedYear(item);
                            setActiveYear(false);
                          }} className='py-1 w-full flex justify-center items-center border-b-[.5px] border-orange-200' key={index}>
                            <Text className='text-[12px] text-white font-bold py-1'>
                              {item}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </ScrollView>
                  )}
                </View>

              </View>

              <Text className='text-[10px] font-bold w-full pl-1'>Duration :</Text>
              <View className='w-full flex flex-row justify-center items-start gap-1'>

                {/* CHOOOSE START TIME */}
                <View className='flex-1 flex-col justify-start items-center gap-1'>
                  <Text className='w-full py-1 text-center text-[10px] font-bold text-white rounded-t-lg rounded-b-sm bg-orange-500'>Start Time</Text>
                  <View className='w-full flex flex-row gap-1'>
                    <View className='flex-1 flex-col gap-1'>
                      <Pressable onPress={() => {setActiveHourStart(true)}} className='w-full py-2 rounded-lg border border-b-2 border-[#a84900] bg-orange-100 flex flex-row justify-center items-center'>
                        <Text className='text-[12px] font-bold'>{selectedHourStart}</Text>
                        <Image
                          source={require('../../assets/icons/arrow-dropdown.png')}
                          style={{ width: 7, height: 5, marginLeft: 5 }}
                          tintColor={'#a84900'}
                        />
                      </Pressable>
                      {activeHourStart &&(
                        <ScrollView className='w-full h-[100px] rounded-md'>
                          <View className='bg-orange-400 flex flex-col justify-center items-center rounded-b-lg rounded-t-sm w-full'>
                            {hours.map((item, index) => (
                              <Pressable onPress={() => {
                                setSelectedHourStart(item);
                                setActiveHourStart(false);
                              }} className='py-1 w-full flex justify-center items-center border-b-[.5px] border-orange-200' key={index}>
                                <Text className='text-[12px] text-white font-bold py-1'>
                                  {item}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                        </ScrollView>
                      )}
                    </View>
                    <View className='flex-1 flex-col gap-1'>
                      <Pressable onPress={() => {setActiveMinuteStart(true)}} className='w-full py-2 rounded-lg border border-b-2 border-[#a84900] bg-orange-100 flex flex-row justify-center items-center'>
                        <Text className='text-[12px] font-bold'>{selectedMinuteStart}</Text>
                        <Image
                          source={require('../../assets/icons/arrow-dropdown.png')}
                          style={{ width: 7, height: 5, marginLeft: 5 }}
                          tintColor={'#a84900'}
                        />
                      </Pressable>
                      {activeMinuteStart &&(
                        <ScrollView className='w-full h-[100px] rounded-md'>
                          <View className='bg-orange-400 flex flex-col justify-center items-center rounded-b-lg rounded-t-sm w-full'>
                            {minutes.map((item, index) => (
                              <Pressable onPress={() => {
                                setSelectedMinuteStart(item);
                                setActiveMinuteStart(false);
                              }} className='py-1 w-full flex justify-center items-center border-b-[.5px] border-orange-200' key={index}>
                                <Text className='text-[12px] text-white font-bold py-1'>
                                  {item}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                        </ScrollView>
                      )}
                    </View>
                  </View>
                </View>

                <View className='px-3 pt-[30px]'>
                  <Text className='font-bold'>-</Text>
                </View>

                {/* CHOOOSE END TIME */}
                <View className='flex-1 flex-col justify-start items-center gap-1'>
                  <Text className='w-full py-1 text-center text-[10px] font-bold text-white rounded-t-lg rounded-b-sm bg-orange-500'>End Time</Text>
                  <View className='w-full flex flex-row gap-1'>
                    <View className='flex-1 flex-col gap-1'>
                      <Pressable onPress={() => {setActiveHourEnd(true)}} className='w-full py-2 rounded-lg border border-b-2 border-[#a84900] bg-orange-100 flex flex-row justify-center items-center'>
                        <Text className='text-[12px] font-bold'>{selectedHourEnd}</Text>
                        <Image
                          source={require('../../assets/icons/arrow-dropdown.png')}
                          style={{ width: 7, height: 5, marginLeft: 5 }}
                          tintColor={'#a84900'}
                        />
                      </Pressable>
                      {activeHourEnd &&(
                        <ScrollView className='w-full h-[100px] rounded-md'>
                          <View className='bg-orange-400 flex flex-col justify-center items-center rounded-b-lg rounded-t-sm w-full'>
                            {hours.map((item, index) => (
                              <Pressable onPress={() => {
                                setSelectedHourEnd(item);
                                setActiveHourEnd(false);
                              }} className='py-1 w-full flex justify-center items-center border-b-[.5px] border-orange-200' key={index}>
                                <Text className='text-[12px] text-white font-bold py-1'>
                                  {item}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                        </ScrollView>
                      )}
                    </View>
                    <View className='flex-1 flex-col gap-1'>
                      <Pressable onPress={() => {setActiveMinuteEnd(true)}} className='w-full py-2 rounded-lg border border-b-2 border-[#a84900] bg-orange-100 flex flex-row justify-center items-center'>
                        <Text className='text-[12px] font-bold'>{selectedMinuteEnd}</Text>
                        <Image
                          source={require('../../assets/icons/arrow-dropdown.png')}
                          style={{ width: 7, height: 5, marginLeft: 5 }}
                          tintColor={'#a84900'}
                        />
                      </Pressable>
                      {activeMinuteEnd &&(
                        <ScrollView className='w-full h-[100px] rounded-md'>
                          <View className='bg-orange-400 flex flex-col justify-center items-center rounded-b-lg rounded-t-sm w-full'>
                            {minutes.map((item, index) => (
                              <Pressable onPress={() => {
                                setSelectedMinuteEnd(item);
                                setActiveMinuteEnd(false);
                              }} className='py-1 w-full flex justify-center items-center border-b-[.5px] border-orange-200' key={index}>
                                <Text className='text-[12px] text-white font-bold py-1'>
                                  {item}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                        </ScrollView>
                      )}
                    </View>
                  </View>
                </View>

              </View>

              <Text className='text-[10px] font-bold w-full pl-1'>Description :</Text>
              <TextInput
                className='text-black text-[12px] p-[7px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] border-[#a84900] rounded-lg'
                placeholder=''
                value={description}
                onChangeText={setDescription}
              />
              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpCreate(false)}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                      handleCreate();
                    
                  }} className={`w-[50%] bg-[#22cde3] rounded-lg flex justify-center items-center overflow-hidden`}>
                  <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full py-[10px] flex justify-center items-center'>
                    <Text className='font-bold text-[12px] text-[#ffffff]'>
                      {updateOrCreate==='update'?
                        (loading ? 'Updating...' : 'Update'):
                        (loading ? 'Creating...' : 'Create')
                      }
                    </Text>
                  </LinearGradient>  
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

    </View>
    </KeyboardAvoidingView>
  )
}

export default dataOvertimeLog