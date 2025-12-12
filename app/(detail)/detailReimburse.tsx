import HeaderBack from '@/components/headerBack'
import { BASEURLIMAGE, updateReimburse } from '@/hooks/api'
import { dataItemId, deleteReimburseById } from '@/hooks/dataReimburseFunction'
import { formatRupiah } from '@/hooks/formatRupiahFunction'
import { getDataUserLogin } from '@/hooks/userFunction'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

const detailReimburse = () => {
  const [popUpActive, setPopUpActive] = useState(false);
  const [popUpGambar, setPopUpGambar] = useState(false);
  const [popUpActiveAdmin, setPopUpActiveAdmin] = useState('');
  const { id } = useLocalSearchParams();
  const { dataItemById, dataReimbursebyId } = dataItemId(Number(id));
  const firstData = dataReimbursebyId;
  const totalAmount = dataReimbursebyId.total_amount;
  const router = useRouter();
  const dataUserLogin = getDataUserLogin();
  const [role, setRole] = useState<string>('karyawan');
  const [imagePath, setImagePath] = useState('');
  const [imageSource, setImageSource] = useState('');

  useEffect(()=>{
    setImagePath(dataReimbursebyId.image?.slice(dataReimbursebyId.image.indexOf("/media"))||'');
  }, [dataReimbursebyId])

  useEffect(()=>{
    setImageSource(BASEURLIMAGE+imagePath)
  }, [imagePath])

  useEffect(()=>{
    // console.error('imag path', imageSource);
    // console.log('imag path', imageSource);
  }, [imageSource])
  
  useEffect(()=>{
    if(dataUserLogin.is_staff){
        setRole('admin');
    }
  }, [dataUserLogin]);

  const handleDelete = async ()=>{
    const res = await deleteReimburseById(Number(id));
    if(res !== undefined){
      setPopUpActive(false);
      router.replace('../(tabs)/history');
    }
  }

  const handleApprove = async ()=>{
    const res = await updateReimburse(Number(id), {status: 'Approved'});
    if(res !== undefined){
      // console.error('Reimbursement approved successfully');
      setPopUpActiveAdmin('');
      router.replace('../(tabs)/history');
    }
  }

  const handleDecline = async ()=>{
    const res = await updateReimburse(Number(id), {status: 'Rejected'});
    if(res !== undefined){
      // console.error('Reimbursement rejected successfully');
      setPopUpActiveAdmin('');
      router.replace('../(tabs)/history');
    }
  }

  return (
    <LinearGradient
    colors={['#A950FF','#A950FF', '#2D1347']}
    className="flex-1 justify-center items-center">
      {/* HEADER */}
      <HeaderBack title='Reimbursement History' subTitle='Detail'/>

      {/* STATUS */}
      <View className='w-full flex justify-center items-center px-[20px]'>
        <View className={`flex flex-row justify-center gap-2 rounded-t-lg w-full h-[35px] items-center ${
          firstData.status === "Approved" ? "bg-purple-200 border-[#00883D]" :
          firstData.status === "Pending" ? "bg-purple-200 border-[#885600]" :
          firstData.status === "Rejected" ? "bg-purple-200 border-[#88003B]" :
          "bg-[#f5ebff]" 
        }`}>
          <Image source={
            firstData.status === "Approved" ? require('../../assets/icons/approve-icon.png') :
            firstData.status === "Pending" ? require('../../assets/icons/pending-time.png') :
            firstData.status === "Rejected" ? require('../../assets/icons/decline-icon.png') :
            require('../../assets/icons/pending-time.png')
          } style={{ width: 12, height: 12 }} tintColor=
          {
            firstData.status === "Approved" ? "#9333EA" :
            firstData.status === "Pending" ? "#9333EA" :
            firstData.status === "Rejected" ? "#9333EA" :
            "border-[#9333EA] bg-purple-50" 
          }/>
          <Text className={`font-bold text-[10px] ${
            firstData.status === "Approved" ? "text-[#9333EA]" :
            firstData.status === "Pending" ? "text-[#9333EA]" :
            firstData.status === "Rejected" ? "text-[#9333EA]" :
            "" 
          }`}>
            {firstData.status}
          </Text>
        </View>
      </View>

      {/* ISI REIMBURSE */}
      <ScrollView className='w-full px-[20px]'>
        <View className='w-full px-[30px] flex justify-start items-center bg-white flex-col gap-3'>

          {/* TITLE */}
          <View className='mt-2 w-full'>
            <LinearGradient colors={['#A950FF', '#8111E6']} className='rounded-lg w-full text-[12px] border border-b-2 border-purple-800 h-[40px] text-center pt-[10px] overflow-hidden text-purple-900 bg-purple-100 mt-2 font-bold'>
                <Text className='text-white text-[12px] font-bold w-full text-center'>
                  {firstData.title}
                </Text>
              </LinearGradient>
          </View>

          {/* IMAGE */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: '100%' }} className='w-full'>
            <View className={`w-full flex-row gap-5 mt-3 rounded-md flex items-center ${dataReimbursebyId.image?'justify-start':'justify-center bg-purple-50'}`}>
              {dataReimbursebyId.image?(
                <Pressable onPress={() => {setPopUpGambar(true)}} className='rounded-md overflow-hidden w-[250px] h-[130px]'>
                  <Image source={{uri: `${BASEURLIMAGE}${imagePath}`}} style={{ width: 250, height: 130 }} className='rounded-md'/>
                </Pressable>
              ):(
                <View className='w-full h-[70px] rounded-md bg-purple-50 flex flex-col justify-center items-center'>
                  <Image source={require('../../assets/icons/s-decline.png')} style={{ width: 10, height: 10 }} tintColor={"purple"}/>
                  <Text className='text-[10px] text-purple-800'>
                    no images
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* LIST REIMBURSE */}
          <View className='flex-col gap-2 p-[20px] w-full border-[.5px] border-purple-600 mt-5 rounded-lg'>
            {dataItemById.map((item, index)=>{
              return (
                <View key={index} className='flex-row justify-between'>
                  <Text className='text-[12px] text-purple-900'>{item.category_detail?.name}</Text>
                  <Text className='font-bold text-[12px] text-purple-900'>{formatRupiah(Number(parseFloat(item.item_amount)))}</Text>
                </View>
              )
            })}
          </View>

          {/* REIMBURSE DATA */}
          <View className='flex flex-row gap-5 justify-between w-full mt-2'>
            <View className='w-[47%] flex flex-col'>
              <Text className='font-bold text-[12px] text-purple-900'>Date</Text>
              <Text className=' rounded-lg border-[.5px] border-purple-600 w-full text-[12px] h-[40px] text-center pt-[10px] text-purple-900 mt-2'>{firstData.created_at?.slice(0,10)}</Text>
            </View>
            <View className='w-[47%] flex flex-col'>
              <Text className='font-bold text-[12px] text-purple-900'>Total Price</Text>
              <Text className=' rounded-lg border-[.5px] border-purple-600 w-full text-[12px] h-[40px] font-bold text-center pt-[10px] text-purple-900 mt-2'>{formatRupiah(Number(parseFloat(totalAmount)))}</Text>
            </View>
          </View>
          <View className='mt-2 w-full'>
            <Text className='font-bold text-[12px] text-purple-900'>Description:</Text>
            <Text className=' rounded-lg border-[.5px] border-purple-600 w-full text-[12px] text-justify px-[20px] py-[10px] text-purple-900 mt-2'>{firstData.description}</Text>
          </View>

          {/* IMBUHAN */}
          <View className='w-full h-[200px]'/>
        </View>
      </ScrollView>

      {/* BUTTON CANCEL */}
      {role === 'karyawan' ? (
        <View className='absolute z-20 bottom-[0px] w-full h-[150px] border border-purple-800 bg-white flex justify-start gap-3 items-center px-[30px] pt-[20px] rounded-t-3xl'>
          <Pressable onPress={() => {setPopUpActive(true)}} className='overflow-hidden w-full flex flex-row justify-center items-center border border-b-2 border-purple-800 rounded-lg bg-[#FF0066]'
          >
            <LinearGradient colors={['#FF0066', '#D90057']} className='p-[15px] w-full flex flex-row justify-center items-center gap-2'>
              <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
              <Text className='font-bold text-[12px] text-white ml-1'>Canceled</Text>
            </LinearGradient>
          </Pressable>
        </View>
      ):
      (
        <View className='absolute z-20 bottom-[0px] w-full h-[160px] border border-purple-800 bg-white flex flex-col justify-start gap-3 items-start px-[20px] pt-[20px] rounded-t-3xl'>
          <View className='w-full flex flex-row justify-between gap-2 items-center'>
            <Pressable onPress={() => {setPopUpActiveAdmin('decline')}} className='w-full flex-1 flex-row justify-center items-center rounded-lg bg-[#FF0066] overflow-hidden'
            >
              <LinearGradient colors={['#FF0066', '#D90057']} className='p-[10px] w-full flex flex-row justify-center items-center gap-2'>
                <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
                <Text className='font-bold text-[12px] text-white ml-1'>rejected</Text>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={() => {setPopUpActiveAdmin('approve')}} className='overflow-hidden w-full flex-1 flex-row justify-center items-center rounded-lg bg-[#0fcb73]'
            >
              <LinearGradient colors={['#00F080', '#00AC5C']} className='p-[10px] w-full flex flex-row justify-center items-center gap-2'>
                <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
                <Text className='font-bold text-[12px] text-white ml-1'>approved</Text>
              </LinearGradient>
            </Pressable>
          </View>
          <Pressable onPress={() => {setPopUpActive(true)}} className='p-[10px] w-full flex flex-row justify-center items-center border border-b-2 border-purple-800 rounded-lg bg-purple-50'
          >
            <Text className='text-purple-800 font-bold text-[12px]'>
                delete
            </Text>
          </Pressable>
        </View>
      )}

      {/* POPUP */}
      {popUpActive && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#1e0031]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[20px] pt-[60px] rounded-lg flex flex-col justify-start items-center'>
              <View className='w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full bg-[#FF0066] flex justify-center items-center'>
                <Image source={require("../../assets/icons/trash.png")} style={{ width: 25, height: 28 }} tintColor={"#ffffff"} className='mb-5'/>
              </View>
              <Text className='text-[12px] w-full text-center'>
                Are you sure want to cancel this reimbursement?
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpActive(false)}} className='w-[50%] border border-b-[2px] border-purple-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {handleDelete()}} className='w-[50%] border border-b-[2px] border-purple-800 bg-[#FF0066] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-white'>
                    Yes, Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP */}
      {popUpGambar && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#1e0031]'/>
          <View className='w-full h-full flex justify-center items-center absolute z-[1000]'>
            <View className='w-full'>
              <Image source={{uri: `${BASEURLIMAGE}${imagePath}`}} style={{ width: '100%', height: 200 }} resizeMode="contain" className='rounded-md'/>
            </View>
            <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
              <Pressable onPress={() => {setPopUpGambar(false)}} className='w-[50%] border border-b-[2px] border-purple-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
                <Text className='font-bold text-[12px]'>
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      )}

      {/* POPUP */}
      {popUpActiveAdmin !== '' && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#1e0031]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[20px] pt-[60px] rounded-lg flex flex-col justify-start items-center'>
              <View className={`w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full ${popUpActiveAdmin==='approve'?'bg-[#00AC5C]':'bg-[#FF0066]'} flex justify-center items-center`}>
                {popUpActiveAdmin==='approve'?(
                  <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 28, height: 25 }} tintColor={"#ffffff"} className='mb-5'/>
                ):(
                  <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 25, height: 25 }} tintColor={"#ffffff"} className='mb-5'/>
                )}
              </View>
              <Text className='text-[12px] w-full text-center'>
                Are you sure want to cancel this reimbursement?
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpActiveAdmin('')}} className='w-[50%] border border-b-[2px] border-purple-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {
                  if(popUpActiveAdmin==='approve'){
                    handleApprove();
                  } else if(popUpActiveAdmin==='decline'){
                    handleDecline();
                  }
                  }} className={`w-[50%] ${popUpActiveAdmin==='decline'?'bg-[#FF0066]':'bg-[#0fcb73]'}  rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-white'>
                    Yes, {popUpActiveAdmin}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

    </LinearGradient>
  )
}

export default detailReimburse