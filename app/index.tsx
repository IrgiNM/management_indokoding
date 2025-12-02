import { getUserId } from '@/hooks/api';
import { getToken } from '@/hooks/tokenFunction';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const cekToken = async() => {
    setLoading(true)
    try{
      const token = await getToken();
      if(token !== ''){
        // console.error('sebelum data')
        const data = await getUserId();
        // console.error('habis data');
        if(data.status===200){
          return router.replace('/(tabs)/home');
        } 
       
      }
    }catch{
      // console.error('gagal login')
      return router.replace('/login');
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    cekToken();
  }, []);

  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <View className='w-[400px] h-[400px] bg-white rounded-full flex justify-center items-center animate-spin'>
        {loading&&
          <Image source={require("../assets/images/loading-page.png")} className='animate-spin' style={{ width: 50, height: 50 }}/>
          // <Text className='font-bold text-[10px] text-black animate-spin'>
          //   loading...
          // </Text>
        }
      </View>
      {/* <LinearGradient colors={['#00d7f4', '#009fb4']} className='w-full h-full flex justify-center items-center'> */}
        
      {/* </LinearGradient> */}
    </View>
  )
}

export default index
