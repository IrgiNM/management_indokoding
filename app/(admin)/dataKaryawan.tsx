import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import HeaderBack from '@/components/headerBack'
import { useRouter } from 'expo-router'
import CardKaryawan from '@/components/cardKaryawan'
import { Image } from 'expo-image'
import { BlurView } from 'expo-blur'

const dataKaryawan = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createActive, setCreateActive] = useState(false)

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

  const handleCreateKaryawan = () => {

  }

  return (
    <View className='relative w-full bg-white flex-1 justify-start items-center'>

      {/* HEADER */}
      <HeaderBack title='Data Karyawan'/>

      {/* HISTORY LIST */}
      <ScrollView className='w-full pb-[50px]'>
        <View className='w-full flex justify-start items-center flex-col gap-3 mt-[20px] px-[20px]'>
          {dataKaryawan.map((item,index)=>{
            return(
              <CardKaryawan 
                key={index} 
                id={item.id} 
                email={item.email} 
                reimburse={item.reimburse} 
                username={item.username} 
                link={() => {router.replace('/(admin)/dataKaryawanDetail')}} w='w-full'
              />

            )
          })}
          <View className='w-full h-[300px]'/>
        </View>
      </ScrollView>

      {/* BUTTON ADD KARYAWAN POPUP */}
      <Pressable onPress={() => {setCreateActive(true)}} className='w-[60px] h-[60px] rounded-lg border-[1px] border-b-[2px] border-purple-600 bg-purple-50 relative bottom-[80px] -right-[120px] flex justify-center items-center'>
          <Image source={require("../../assets/icons/add-karyawan-2.png")} style={{ width: 30, height: 30 }}/>
      </Pressable>

      {/* POP UP CREATE KARYAWAN */}
      {createActive && (
        <>
          {/* EFEK BLUR */}
          <View className='absolute z-10 w-full h-full blur bg-black opacity-70'/>
          {/* FORM ADD KARYAWAN */}
          <View className='absolute z-20 bottom-[0px] w-full h-[500px] bg-white flex justify-start gap-3 items-center px-[30px] pt-[30px] rounded-t-3xl'>
            <Text className='w-full font-bold mb-5'>Create Karyawan</Text>
            <TextInput
              className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
              placeholder='Username'
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
              placeholder='Email'
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
              placeholder='Password'
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
              placeholder='Confirm Password'
              value={username}
              onChangeText={setUsername}
            />
            <Pressable onPress={() => {}} className='p-[15px] w-full flex flex-row justify-center items-center bg-black rounded-lg mt-10'
            >
              <Text className='ml-2 font-bold text-white'>
                  + Create
              </Text>
            </Pressable>
            <Pressable onPress={() => {setCreateActive(false)}} className='p-[15px] w-full flex flex-row justify-center items-center border border-b-2 rounded-lg'
            >
              <Text className='ml-2 font-bold'>
                  cancel
              </Text>
            </Pressable>
          </View>
        </>
      )}

    </View>
  )
}

export default dataKaryawan