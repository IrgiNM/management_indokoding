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
      <HeaderBack title='Data Karyawan' type='python' textColor='text-white'/>

      {/* HISTORY LIST */}
      <ScrollView className='absolute inset-0 w-full border border-b-1 h-full pb-[50px]'>
        <View className='w-full border-b-1 flex justify-start items-center flex-col gap-3 mt-[140px] px-[20px]'>
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
          <View className='w-full h-[300px]'/>
        </View>
      </ScrollView>

      {/* BUTTON ADD KARYAWAN POPUP */}
      <Pressable onPress={() => {setCreateActive(true)}} className='w-[60px] h-[60px] rounded-lg border-[1px] border-b-[2px] border-blue-600 bg-blue-50 overflow-hidden relative top-[520px] -right-[120px] flex justify-center items-center'>
        <LinearGradient colors={['#CFE9FF', '#7EC3FF']} className='w-full h-full flex justify-center items-center'> 
          <Image source={require("../../assets/icons/add-karyawan-3.png")} style={{ width: 30, height: 30 }}/>
        </LinearGradient>
      </Pressable>

      {/* BUTTON REFRESH */}
      <Pressable onPress={() => {router.replace('../(admin)/dataKaryawan')}} className='w-[50px] h-[50px] rounded-full border-[1px] border-b-[2px] border-[#873600] overflow-hidden bg-yellow-200 relative top-[400px] -right-[120px] flex justify-center items-center'>
        <LinearGradient colors={['#FFEDB3', '#FFD23F']} className='w-full h-full flex justify-center items-center'>
          <Image source={require("../../assets/icons/refresh.png")} tintColor={'#CA5101'} style={{ width: 20, height: 20 }}/>
        </LinearGradient>
      </Pressable>

      {/* POP UP CREATE KARYAWAN */}
      {createActive && (
        <>
          {/* EFEK BLUR */}
          <View className='absolute w-full h-full blur opacity-80 bg-[#000331] z-[999]'/>
          {/* FORM ADD KARYAWAN */}
          <View className='absolute z-[1000] bottom-[0px] w-full h-[500px] bg-white flex justify-start gap-3 items-center px-[30px] pt-[30px] rounded-t-3xl'>
              <Text className='w-full font-bold mb-5 text-blue-800'>Create Karyawan</Text>
              <TextInput
                className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Confirm Password'
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
              />
              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <Pressable onPress={() => {handleCreateKaryawan()}} className='p-[15px] w-full flex flex-row justify-center items-center bg-blue-800 rounded-lg mt-10'
              >
                <Text className='ml-2 font-bold text-white'>
                  {loading ? 'Creating...' : '+ Create'}
                </Text>
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