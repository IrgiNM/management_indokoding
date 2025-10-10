import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router';

const login = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  return (
    <View className='bg-white flex-1 justify-center items-center'>
      <Text className='font-bold text-[20px]'>Login to your account</Text>
      <Text className='text-[10px] mb-10'>Welcome back, select method to Login </Text>

      <Pressable onPress={() => {console.log('Pressed!')}}className='p-[10px] w-[270px] flex flex-row justify-center items-center border-[.5px] rounded-lg'
      >
        <Image
            source={require('../assets/objek/google.png')}
            style={{ width: 20, height: 20 }}
        />
        <Text className='ml-2 font-bold'>
            Google
        </Text>
      </Pressable>

      <View className='w-[270px] h-[1px] bg-black my-5 opacity-20'/>

      <TextInput
      className='p-[10px] pl-[20px] w-[270px] flex flex-row justify-center items-center border-[.5px] rounded-lg'
      placeholder='Username'
      value={username}
      onChangeText={setUsername}
      />
      <TextInput
      className='p-[10px] pl-[20px] w-[270px] flex flex-row justify-center items-center border-[.5px] rounded-lg mt-5'
      placeholder='Password'
      value={username}
      onChangeText={setUsername}
      />

      <Pressable onPress={() => {router.replace('/(tabs)/home')}}className='p-[15px] w-[270px] flex flex-row justify-center items-center bg-black rounded-lg mt-10'
      >
        <Text className='ml-2 font-bold text-white'>
            Login
        </Text>
      </Pressable>
    </View>
  )
}

export default login