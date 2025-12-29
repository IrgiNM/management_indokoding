import HeaderBack from '@/components/headerBack'
import { dataFinanceKaryawan } from '@/hooks/dataFinanceKaryawan'
import { createOvertimeLogFunction, deleteOvertimeLogFunction, fetchYearMonthAndDay, myOvertimeLogFunction, updateOvertimeLogFunction } from '@/hooks//dataOvertimeLogFunction'
import { formatRupiah } from '@/hooks/formatRupiahFunction'
import { getDataUserLogin } from '@/hooks/userFunction'
import { overtimeLogSendType } from '@/types/overtimeLogType'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native'

const overtimeLog = () => {
    const {dataDays,dataMonths,dataYears,day,month,year,hours,minutes} = fetchYearMonthAndDay();
    const dataUserLogin = getDataUserLogin();
    const {dataMyOvertimeLog, dataMyOvertimeLogThisMonth, dataMonthsNumber} = myOvertimeLogFunction();
    const { dataFinancePerUser } = dataFinanceKaryawan(dataUserLogin.email);
    const baseSalaryValue = Number(dataFinancePerUser?.base_salary ?? 0);
    const overtimeLogThisMonth = Math.ceil(dataMyOvertimeLogThisMonth.filter(item=>item.status==="approved").reduce((sum,item)=>sum + Number(item.duration_hours),0));
    const totalOvertimePrice = overtimeLogThisMonth * ((baseSalaryValue/173)*2);

    const [selectedDay, setSelectedDay] = useState<number>(day);
    const [selectedMonth, setSelectedMonth] = useState<number>(month);
    const [selectedYear, setSelectedYear] = useState<number>(year);
    const [selectedHourStart, setSelectedHourStart] = useState("00");
    const [selectedMinuteStart, setSelectedMinuteStart] = useState("00");
    const [selectedHourEnd, setSelectedHourEnd] = useState("00");
    const [selectedMinuteEnd, setSelectedMinuteEnd] = useState("00");
    const [description, setDescription] = useState('');
    const [activeDay, setActiveDay] = useState(false);
    const [activeMonth, setActiveMonth] = useState(false);
    const [activeYear, setActiveYear] = useState(false);
    const [activeHourStart, setActiveHourStart] = useState(false);
    const [activeMinuteStart, setActiveMinuteStart] = useState(false);
    const [activeHourEnd, setActiveHourEnd] = useState(false);
    const [activeMinuteEnd, setActiveMinuteEnd] = useState(false);

    const [hourLimitUp, setHourLimitUp] = useState(0);
    const [hourLimitDown, setHourLimitDown] = useState(0);

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

    const [popUpCreate, setPopUpCreate] = useState(false);
    const [popUpChoose, setPopUpChoose] = useState(false);
    const [popUpRemove, setPopUpRemove] = useState(false);
    const [popUpInfo, setPopUpInfo] = useState(false);
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

      useEffect(()=>{
        setHourLimitUp(Number(selectedHourStart))
        setHourLimitDown(Number(selectedHourEnd))
      }, [selectedHourStart,selectedHourEnd])

    const handleCreate = async() => {
      setLoading(true);
      const res = await createOvertimeLogFunction(dataSend);
      if(res){
        setLoading(false);
        setError('berhasil membuat overtime log');
        setPopUpCreate(false);
        setPopUpInfo(true);
        router.replace('/(detail)/overtimeLog');
      } else {
        setLoading(false);
        setError('gagal membuat overtime log');
      }
    }
    
    const handleUpdate = async() => {
      setLoading(true);
      const res = await updateOvertimeLogFunction(chooseId,dataSend);
      if(res){
        setLoading(false);
        setError('berhasil update overtime log');
        setPopUpCreate(false);
        setPopUpInfo(true);
        router.replace('/(detail)/overtimeLog');
      } else {
        setLoading(false);
        setError('gagal update overtime log');
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
        router.replace('/(detail)/overtimeLog');
      } else {
        setLoading(false);
        setError('gagal delete overtime log');
      }
    }

    

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, width: '100%', backgroundColor: 'black' }}>
    <View className='bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='Overtime Log' type='mysql' backTo={'/home'}/>

      <View className='w-full h-full pb-0'>
        <View className='w-full h-full bg-[#dfc1ef] pb-0'>
          <LinearGradient colors={['#FFB650', '#471313']} className='w-full h-full px-[20px] pt-[0px] pb-[220px] flex-1 flex-col justify-start items-center'>
            <View className='w-full mb-1 bg-white rounded-full flex flex-col justify-start items-center p-1'>
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
            <View className='w-full h-[82%] bg-white pt-3 rounded-lg flex flex-col justify-start items-center'>
                <ScrollView className='w-full h-full rounded-lg'>
                    <View className='w-full h-full flex flex-col justify-start items-center'>
                      <View className='relative z-[999] rounded-lg overflow-hidden w-[90%] bg-orange-600'>
                        <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full flex flex-col p-[15px] justify-center items-center'>
                          <Text className='text-[10px] text-white'>Total This Month</Text>
                          <Text className='text-[20px] text-white font-bold'>{formatRupiah(totalOvertimePrice??0)}</Text>
                        </LinearGradient>
                      </View>
                      {dataMonthsNumber.map((monthItem, index) => {
                        return(
                          <View className='w-full flex flex-col items-center' key={index}>
                            <Text className='w-[90%] py-2 rounded-t-xl rounded-b-0 text-center bg-white border-[5px] border-b-0 border-white mb-0 text-orange-800 text-[10px] m-1 font-bold'>
                                {bulanMap[monthItem]} 2025 
                            </Text>
                            <View className='w-full mb-5 bg-blue-100 p-3 flex flex-col justify-start items-center gap-2'>
                              {(selectStatus==="all"?(dataMyOvertimeLog.filter(item=>item.date.slice(5,7)===monthItem)):(dataMyOvertimeLog.filter(item=>item.status===selectStatus)).filter(item=>item.date.slice(5,7)===monthItem)).map((item,index)=>(
                                <Pressable key={index} onPress={()=>{
                                  setChooseId(item.id??0);
                                  setChooseStatus(item.status);
                                  setChooseDate(item.date);
                                  setChooseStartTime(item.start_time);
                                  setChooseEndTime(item.end_time);
                                  setChooseDuration(item.duration_hours);
                                  setChooseDescription(item.description??'No description');
                                  setPopUpChoose(true)
                                  }} className=' w-full overflow-hidden bg-white border border-b-2 border-[#0043a8] rounded-md flex flex-row justify-start gap-3 items-center'>
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
                                  <View className='w-[170px] flex flex-col justify-center items-center gap-1'>
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

      {/* BUTTON CREATE */}
      <View className='absolute z-20 bottom-[0px] w-full h-[150px] border border-purple-800 bg-white flex justify-start gap-3 items-center px-[30px] pt-[20px] rounded-t-3xl'>
        <Pressable onPress={() => {
          setSelectedDay(Number(day));
          setSelectedMonth(Number(month));
          setSelectedYear(Number(year));
          setSelectedHourStart(("00"))
          setSelectedMinuteStart(("00"))
          setSelectedHourEnd(("00"))
          setSelectedMinuteEnd(("00"))
          setDescription('');
          setPopUpCreate(true);
          setUpdateOrCreate('create')
        }} className='w-full overflow-hidden flex flex-row justify-center items-center rounded-lg bg-[#8111E6]'
        >
          <LinearGradient colors={['#ffa850', '#E96500']} className='w-full h-full flex flex-row p-[15px] justify-center items-center'>
            <Image source={require('../../assets/icons/pending-time.png')} style={{ width: 16, height: 16 }} tintColor={"#ffffff"}/>
            <Text className='ml-2 text-white font-bold'>
                create overtime log
            </Text>
          </LinearGradient>
        </Pressable>
      </View>

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
                <Pressable onPress={() => {setPopUpRemove(false)}} className='w-[50%] border border-b-[2px] border-purple-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
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
      {popUpInfo && (
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
                <Pressable onPress={() => {setPopUpInfo(false)}} className='w-[50%] border border-b-[2px] border-blue-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

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
              <Pressable onPress={()=>{
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
              </Pressable>
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
                  {updateOrCreate==='create' ? 'Create' : 'Update'}
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
                            {hours.slice(hourLimitUp).map((item, index) => (
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
                    if(updateOrCreate==='update'){
                      handleUpdate();
                    } else {
                      handleCreate();
                    }
                    
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

export default overtimeLog