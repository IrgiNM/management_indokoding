import { getToken } from '@/hooks/tokenFunction';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native';

const index = () => {
  const router = useRouter();
  useEffect(()=>{
    const checkLogin = async ()=>{
      if(await getToken()){
        return router.replace('/(tabs)/home');
      }else{
        return router.replace('/login');
      }
    }
    checkLogin();
  }, []);

  return (
    <View>
        <Text></Text>
    </View>
  )
}

export default index
