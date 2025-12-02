import HeaderBack from '@/components/headerBack'
import { updateReimburse } from '@/hooks/api'
import { dataFinanceKaryawan } from '@/hooks/dataFinanceKaryawan'
import { ChangeUserReimburse, dataReimburseMain } from '@/hooks/dataReimburseFunction'
import { dataUserFunction } from '@/hooks/dataUserFunction'
import { ReimbursementType } from '@/types/reimburseDataType'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native'
const { width } = Dimensions.get('window');

const historyReimburseKaryawan = () => {
  const [checkActive, setCheckActive] = useState(false);
  const [statusActive, setStatusActive] = useState('All');
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const { dataThisMonthAll, dataMonthYear, dataThisYearAll, dataMonthAll } = dataReimburseMain();
  const today = new Date().toISOString().split("T")[0];
  const thisMonth = today.slice(5,7);
  const thisYear = today.slice(0,4);
  const [dataReimburse, setDataReimburse] = useState<ReimbursementType[]>([]);
  const { dataAllNewUser } = dataUserFunction();
  const [isActive, setIsActive] = useState('');
  const [popUpActive, setPopUpActive] = useState('');
  const router =  useRouter();
  const { dataReimburseUserThisMonth } = dataFinanceKaryawan(isActive);

  const [baseSalary, setBaseSalary] = useState<number>(0);
  const [spouseAllowance, setSpouseAllowance] = useState<number>(0);
  const [childAllowance, setChildAllowance] = useState<number>(0);
  const [bpjsHealthPercentage, setBpjsHealthPercentage] = useState<number>(0);
  const [bpjsEmploymentPercentage, setBpjsEmploymentPercentage] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [receivableAmount, setReceivableAmount] = useState<number>(0);

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

  useEffect(()=>{
    if (dataAllNewUser && dataAllNewUser.length > 0) {
      setIsActive(dataAllNewUser[0].email);
    }
  }, [dataAllNewUser]);

  useEffect(()=>{
    // // console.error('dataThisYearAll:', dataThisYearAll);
    if(isActive === "All"){
      setDataReimburse(dataThisYearAll);
    }
  }, [dataThisYearAll, isActive]);

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
      <HeaderBack title='Data Salary Karyawan' type='python'/>

      {/* APPROVE OR NO BUTTON */}
      {/* FILTER USER */}
      <View className='w-full h-[220px] flex flex-col justify-end absolute bottom-0 z-10' style={{ position: 'absolute', bottom: 0 }}>
        <View className='bg-white w-full h-[150px] flex-row items-start px-[30px] pt-[20px] rounded-t-3xl gap-[10px] border border-blue-600'>
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
