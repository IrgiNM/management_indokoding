import CardKaryawan from '@/components/cardKaryawan'
import HeaderBack from '@/components/headerBack'
import { dataUserFunction } from '@/hooks/dataUserFunction'
import { createUserNew } from '@/hooks/userFunction'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native'

const dataKaryawan = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [createActive, setCreateActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { dataAllNewUser } = dataUserFunction()
  const [popUpInfo, setPopUpInfo] = useState(false);

  const dataKaryawan = [
    {
      id: 1,
      username: 'John Doe',
      email: 'john@gmail.com',
      reimburse: 'Rp 5.00.000',
    },
    {
      id: 2,
      username: 'Jane Smith',
      email: 'jane@gmail.com',
      reimburse: 'Rp 3.000.000',
    },
    {
      id: 3,
      username: 'Michael Johnson',
      email: 'michael@gmail.com',
      reimburse: 'Rp 1.500.000',
    }
  ]

  useEffect(()=>{
    // console.error('dataAllNewUser : ', dataAllNewUser);
  })

  const handleCreateKaryawan = async () => {
    setLoading(true);
    try {
      if (password !== passwordConfirm) {
        setError('Password dan konfirmasi password tidak sesuai.');
        return;
      }
      const res = await createUserNew({
        username: username,
        email: email,
        password: password,
      })
      if(res === 'berhasil membuat user'){
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setError(res);
        setPopUpInfo(true);
      }else{
        setError(res || 'Terjadi kesalahan saat membuat karyawan.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, width: '100%', backgroundColor: 'black' }}>
    <View className='relative w-full h-full bg-blue-50 flex-1 justify-start items-center'>

      {/* HEADER */}
      <HeaderBack title='Data Karyawan' type='python' textColor='text-white' backTo={'/home'}/>

      {/* HISTORY LIST */}
        <View className='w-full h-full border-b-1 flex justify-start items-center flex-col gap-3 pb-[50px]'>
          <LinearGradient colors={['#527EFE', '#001749']} className='w-full h-full p-4 px-[20px] flex-1 flex-col justify-start items-center gap-2'>
            <ScrollView className='w-full h-full'>
              <View className='w-full h-full flex justify-start items-center gap-2'>
                {dataAllNewUser.map((item,index)=>{
                  return(
                    <CardKaryawan 
                      key={index} 
                      email={item.email} 
                      reimburse={item.total_reimburse} 
                      username={item.username} 
                      w='w-full'
                    />
                  )
                })}
              </View>
              <View className='w-full h-[300px]'/>
            </ScrollView>
          </LinearGradient>
        </View>

      {/* BOTTOM BAR */}
      <View className='w-full h-[150px] flex flex-col justify-end absolute bottom-0 z-[999]' style={{ position: 'absolute', bottom: 0 }}>
        <View className='bg-white w-full h-[130px] flex-row items-start px-[30px] pt-[20px] rounded-t-3xl gap-[10px] border-[.5px] border-blue-600'>
          <Pressable onPress={() => {setCreateActive(true)}} className='flex-1 overflow-hidden bg-blue-200 rounded-md'>
            <LinearGradient colors={['#ffa850', '#E96500']} className='w-full p-4 flex justify-center items-center'>
              <Text className='text-white font-bold text-[12px]'>+ Create New</Text>
            </LinearGradient>
          </Pressable>
          {/* <Pressable onPress={() => {router.replace('../(admin)/dataKaryawan')}} className='w-[44px] h-[44px] bg-blue-50 border border-b-2 border-[#873600] overflow-hidden rounded-md'>
            <LinearGradient colors={['#FFFFFF', '#FFD23F']} className='w-full h-full flex justify-center items-center'>
              <Image source={require("../../assets/icons/refresh.png")} tintColor={'#CA5101'} style={{ width: 20, height: 20 }}/>
            </LinearGradient>
          </Pressable> */}
              
        </View>
      </View> 

      {/* POP UP CREATE KARYAWAN */}
      {createActive && (
        <>
          {/* EFEK BLUR */}
          <View className='absolute w-full h-full blur opacity-80 bg-[#000331] z-[999]'/>
          {/* FORM ADD KARYAWAN */}
          <View className='absolute z-[1000] bottom-[0px] w-full h-[600px] bg-white flex justify-start gap-3 items-center px-[30px] pt-[30px] rounded-t-3xl'>
              <Text className='w-full font-bold mb-5 text-blue-800'>Create Karyawan</Text>
              <Text className='w-full text-[12px] font-bold'>Username :</Text>
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
              />
              <Text className='w-full text-[12px] font-bold'>Email :</Text>
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
              />
              <Text className='w-full text-[12px] font-bold'>Password :</Text>
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Text className='w-full text-[12px] font-bold'>Confirm Password :</Text>
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Confirm Password'
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry
              />
              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <Pressable onPress={() => {handleCreateKaryawan()}} className='w-full overflow-hidden flex flex-row justify-center items-center bg-[#5088FF] rounded-lg mt-10'
              >
                <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full p-[15px] flex justify-center items-center'>
                  <Text className='ml-2 font-bold text-white'>
                    {loading ? 'Creating...' : '+ Create'}
                  </Text>
                </LinearGradient>
              </Pressable>
              <Pressable onPress={() => {setCreateActive(false)}} className='p-[15px] w-full flex flex-row justify-center items-center border border-b-2 border-blue-800 rounded-lg'
              >
                <Text className='ml-2 font-bold text-blue-800'>
                    cancel
                </Text>
              </Pressable>
          </View>
        </>
      )}

      
    </View>
    </KeyboardAvoidingView>
  )
}

export default dataKaryawan