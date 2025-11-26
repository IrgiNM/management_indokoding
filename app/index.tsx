import { getUserId } from '@/hooks/api';
import { getToken } from '@/hooks/tokenFunction';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';

const index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const cekToken = async() => {
    setLoading(true)
    try{
      const token = await getToken();
      if(token){
        const data = await getUserId();
        if(data){
          return router.replace('/(tabs)/home');
        }else{
          return router.replace('/login');
        }
      }
    }catch{
      console.error('gagal login')
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    cekToken();
  }, []);

  return (
    <View className='flex-1 justify-center items-center'>
        <Text className='font-bold text-[10px] text-black'>
          {loading&&'loading...'}
        </Text>
    </View>
  )
}

export default index
