import { userData } from '@/data/userData';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
// import CookieManager from '@react-native-cookies/cookies';
import { BASEURL } from '@/hooks/api';
import { getToken, saveToken } from '@/hooks/tokenFunction';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dataUser = userData;
  const router = useRouter();
  const API_BASE_URL = 'http://192.168.1.31:8000';

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleLogin = async () => {
    console.log('username : ',username, 'password :', password)
    setIsLoading(true);
    setErrorText('');
    if(!username || !password){
      setErrorText('Username and Password are required');
      setIsLoading(false);
      return;
    }
    try {
      console.log('1')
      // const data = await login({username:username, password:password});
      const res = await axios.post(`${BASEURL}login/`,{username:username, password:password});
      console.log('2')
      if(res){
        console.log('Login successful:', res);
        setUsername('');
        setPassword('');
        await saveToken(res.data.token.toString());
        // console.log('Token saved:', res.data.token);
        const tokenBaru = await getToken();
        // console.log('Retrieved token:', tokenBaru);
        router.replace('/(tabs)/home');
      }
    } catch(error) {
      setErrorText('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, width: '100%', backgroundColor: 'black' }}>
      {/* <View className='flex-1 w-full bg-black'> */}
        <View className='absolute w-full pb-[100px] pt-[50px] rounded-t-3xl bottom-0 bg-white flex-1 justify-center items-center'>
          <Text className='font-bold text-[20px]'>Login to your account</Text>
          <Text className='text-[10px] mb-10'>Welcome back, select method to Login </Text>

          <Pressable onPress={() => {
            // console.log('Pressed!')
          }}className='p-[10px] w-[270px] flex flex-row justify-center items-center border-[.5px] rounded-lg'
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

        <View className='w-[270px] h-[1px] bg-black my-5 opacity-20'/>
          
            <TextInput
            className='text-black p-[10px] pl-[20px] w-[270px] flex flex-row justify-center items-center border-[.5px] rounded-lg'
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
            />
            <TextInput
            className='text-black p-[10px] pl-[20px] w-[270px] flex flex-row justify-center items-center border-[.5px] rounded-lg mt-5'
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
          

          <Pressable 
            onPress={() => {handleLogin()}} // <-- 1. Panggil fungsi handleLogin
            disabled={isLoading} // <-- 2. Bikin tombol nonaktif saat loading
            className={`p-[15px] w-[270px] flex flex-row justify-center items-center rounded-lg mt-10 ${isLoading ? 'bg-gray-500' : 'bg-black'}`} // <-- 3. Ubah warna saat loading
          >
            <Text className='ml-2 font-bold text-white'>
              {isLoading ? 'Loading...' : 'Login'} 
            </Text>
          </Pressable>
            {errorText && (
            <View className='flex flex-row justify-center items-center gap-2 w-[270px] p-3 border-[.5px] rounded-full border-red-500 text-center mt-4'>
              <Image
                source={require('../assets/icons/warning.png')}
                style={{ width: 12, height: 12 }}
                tintColor={'red'}
              />
              <Text className='text-red-500 text-[10px]'>
                {errorText}
              </Text>
            </View>
          )}
        </View>
      {/* </View> */}
    </KeyboardAvoidingView>
)
}


export default Login