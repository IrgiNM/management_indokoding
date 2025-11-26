import { getUserId } from '@/hooks/api';
import { getToken } from '@/hooks/tokenFunction';
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
    <View className='flex-1 justify-center items-center'>
      {loading&&
        <Text className='font-bold text-[10px] text-black'>
          loading...
        </Text>
      }
    </View>
  )
}

export default index
