import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBack from '@/components/headerBack'
import { Image, ImageBackground } from 'expo-image'
import { useRouter } from 'expo-router'
import { logoutUser } from '@/hooks/tokenFunction'
import { getDataUserLogin } from '@/hooks/userFunction'
import { formatRupiah } from '@/hooks/formatRupiahFunction'
import { getReimburseUserHome } from '@/hooks/dataReimburseFunction'
import { ReimbursementType } from '@/types/reimburseDataType'
import { updateUser } from '@/hooks/api'
import { LinearGradient } from 'expo-linear-gradient'

const profile = () => {
  const router = useRouter();
  const dataUserLogin = getDataUserLogin();
  const [totalReimburse, setTotalReimburse] = useState(0);
  const [dataReimburse, setDataReimburse] = useState<ReimbursementType[]>([]);
  const monthNumber = new Date().toISOString().slice(5, 7);
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [popUpPassword, setPopUpPassword] = useState(false);
  const [popUpLogout, setPopUpLogout] = useState(false);
  const [username, setUsername] = useState('')
  const [emailNew, setEmailNew] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReimburseUserHome(monthNumber);
        setDataReimburse(res);
      } catch (err) {
        // console.error(err);
      }
    };
  
    fetchData();
  }, [monthNumber]);

  useEffect(()=>{
    const total = dataReimburse.reduce((sum, item) => sum + Number(item.total_amount || 0), 0);
    setTotalReimburse(total);
  }, [dataReimburse])

  const handleEditUser = async ()=>{
    setLoading(true);
    try{
      const body = {
        ...(username !== '' && { username: username }),
        ...(emailNew !== '' && { email: emailNew }),
      };
      const res = await updateUser(dataUserLogin.email, body);
      if(res !== undefined){
        // console.error('User update successfully');
        setPopUpEdit(false);
        router.push("../profile");
      }
    }catch{
      // console.error('Failed to update user');
    }finally{
      setLoading(false);
    }
  }

  const handleEditPasswordUser = async ()=>{
    setLoading(true);
    try{
      const body = {
        password: password,
      };
      if(password !== passwordConfirm){
        setError('Password dan konfirmasi password tidak sesuai.');
        return;
      }
      const res = await updateUser(dataUserLogin.email, body);
      if(res !== undefined){
        // console.error('User update successfully');
        setPopUpPassword(false);
        router.push("../profile");
      }
    }catch{
      // console.error('Failed to update user');
    }finally{
      setLoading(false);
    }
  }
  
  return (
    <View className='bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      
      <ImageBackground
      source={require('../../assets/images/golang-bg.png')}
      imageStyle={{ borderRadius: 25, }} style={{ width: '100%' }} className='w-full'
      >
        <View className='relative w-full h-[200px] rounded-3xl flex justify-start items-center'>
          <HeaderBack textColor='text-white' title='My Profile' type='django'/>
          <View className='absolute flex justify-center items-center bottom-[-50px] w-[120px] h-[120px] overflow-hidden border-[10px] border-white bg-[#00d7f4] rounded-full'>
            <LinearGradient colors={['#00d7f4', '#009fb4']} className='w-full h-full flex flex-row justify-center items-center'>
              <Text className='text-[#00495f] font-bold text-[40px]'>
                  {dataUserLogin.username.charAt(0).toUpperCase()}{dataUserLogin.username.charAt(dataUserLogin.username.length - 1).toUpperCase()}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>

      <View className='w-full px-[30px] flex justify-start items-center mt-[50px]'>
        <Text className='font-bold text-center text-2xl text-[#00495f]'>
          {dataUserLogin.username}
        </Text>
        <Text className='text-[#00495f] mb-6'>
          {dataUserLogin.email}
        </Text>

        <View className='w-full rounded-md bg-[#dbf6ff] p-3 mb-3'>
          <View className='w-full p-6 rounded-md bg-white border border-b-2 border-purple-800 flex flex-row justify-between items-center'>
            <Text className='text-[12px] text-purple-800'>
              Reimburse this month :
            </Text>
            <Text className='text-[12px] text-purple-800 font-bold'>
              {formatRupiah(totalReimburse)}
            </Text>
          </View>
          <Pressable onPress={() => {router.replace('/history')}} className='p-3 w-full flex flex-row justify-center items-center   rounded-b-lg rounded-t-sm mt-1 bg-purple-200 border border-b-2 border-purple-800'
          >
            <Text className='mr-2 text-[12px] text-purple-800 font-bold'>
                History Reimburse
            </Text>
            <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 6, height: 8, marginLeft: 5 }} tintColor={"purple"}/>
          </Pressable>
        </View>

        <View className='w-full flex justify-start items-center gap-2 mt-5'>
          <Pressable onPress={() => {setPopUpEdit(true)}} className='flex-row justify-between items-center w-full bg-[#e7feff] rounded-lg border border-b-2 border-[#006381] py-[15px] px-[15px]'> 
            <View className='flex flex-row justify-start items-center gap-2'>
              <Image source={require("../../assets/icons/email.png")} style={{ width: 12, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
              <Text className='text-[12px] font-bold text-[#002531]'>
                Edit Profile
              </Text>
            </View>
            <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 6, height: 8, marginLeft: 5 }} tintColor={"#006381"}/>
          </Pressable>

          <Pressable onPress={() => {setPopUpPassword(true)}} className='flex-row justify-between items-center w-full bg-[#e7feff] rounded-lg border border-b-2 border-[#006381] py-[15px] px-[15px]'> 
            <View className='flex flex-row justify-start items-center gap-2'>
              <Image source={require("../../assets/icons/password.png")} style={{ width: 17, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
              <Text className='text-[12px] font-bold text-[#002531]'>
                Change Password
              </Text>
            </View>
            <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 6, height: 8, marginLeft: 5 }} tintColor={"#006381"}/>
          </Pressable>

          <Pressable onPress={() => {setPopUpLogout(true)}} className='w-full flex flex-row justify-center items-center overflow-hidden rounded-full'
          >
            <LinearGradient colors={['#009fb4', '#008091']} className='w-full h-full p-[15px] flex flex-row justify-center items-center'>
              <Text className='mr-2 text-white font-bold'>
                  Log Out
              </Text>
            </LinearGradient>
            {/* <Image source={require('../../assets/icons/s-decline.png')} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/> */}
          </Pressable>
        </View>
      </View>

      {/* POPUP EDIT*/}
      {popUpEdit && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#002531]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/email.png")} style={{ width: 12, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[12px] font-bold text-[#002531]'>
                  Edit Profile
                </Text>
              </View>
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Email'
                value={emailNew}
                onChangeText={setEmailNew}
              />
              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEdit(false)}} className='w-[50%] border border-b-[2px] border-[#006381] bg-[#e7feff] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                    handleEditUser();
                  }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#22cde3] rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    {loading ? 'Saving...' : 'Save'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP CHANGE PASSWORD*/}
      {popUpPassword && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#002531]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/password.png")} style={{ width: 17, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[12px] font-bold text-[#002531]'>
                  Change Password
                </Text>
              </View>
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Confirm Password'
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
              />
              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpPassword(false)}} className='w-[50%] border border-b-[2px] border-[#006381] bg-[#e7feff] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                    handleEditPasswordUser();
                  }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#22cde3] rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    {loading ? 'Saving...' : 'Save'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP LOGOUT*/}
      {popUpLogout && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#002531]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-col justify-start items-center gap-2'>
                <View className='w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full bg-[#FF0066] flex justify-center items-center'>
                  <Image source={require("../../assets/icons/power.png")} style={{ width: 30, height: 33 }} tintColor={"#ffffff"} className='mb-5'/>
                </View>
                <Text className='text-[12px] w-[130px] text-center mt-[50px] text-[#002531]'>
                  Are you sure you want to log out?
                </Text>
              </View>
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpLogout(false)}} className='w-[50%] border border-b-[2px] border-[#006381] bg-[#e7feff] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {
                    logoutUser();
                  }} className={`w-[50%] bg-[#e0216e] rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-white'>
                    Log Out
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

export default profile