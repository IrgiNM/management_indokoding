import { dateFormat } from '@/hooks/todayFunction';
import { cardInfoType } from '@/types/cardInfoType';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const CardOvertimeLog = ({id, date, status, w, longPress}: cardInfoType) => {
    const router = useRouter();
    return (
      <Pressable android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
      onPress={() => {
        router.push({
          pathname: "../(detail)/detailReimburse",
          params: { id: id }, // kirim id ke halaman tujuan
        });
      }}
       onLongPress={longPress} className={`w-full h-[60px] bg-white rounded-lg flex flex-row justify-between items-center shadow-md border-[.5px] border-b-[1px] border-[#9A3412]`}>
        <View className='flex flex-row justify-start items-center'>
          <View className={`w-[40px] h-[40px] rounded-lg ${
            status === "Approved" ? "bg-[#e8fff2]" :
            status === "Pending" ? "bg-[#fffde9]" :
            status === "Rejected" ? "bg-[#ffeaf2]" :
            "bg-[#f5ebff]"
          } ml-3 flex justify-center items-center overflow-hidden border border-[#9A3412]`}>
              <Image source={
                status === "Approved" ? require('../assets/icons/approve-icon.png') :
                status === "Pending" ? require('../assets/icons/pending-time.png') :
                status === "Rejected" ? require('../assets/icons/decline-icon.png') :
                require('../assets/icons/home-active.png')
              } style={{ width: 20, height: 20 }} tintColor=
              {
                status === "Approved" ? "#00883D" :
                status === "Pending" ? "#885600" :
                status === "Rejected" ? "#88003B" :
                "#FFFFFF" 
              }/>
          </View>
        </View>
        <View className='flex flex-row justify-end items-center pr-[20px]'>
          <View className='flex flex-col justify-start items-end relative right-[5px] mr-3'>
              <Text className='text-[10px] '>
                  {dateFormat(date)}
              </Text>
          </View>
          <Image
            source={require('../assets/objek/arrow-more.png')}
            style={{ width: 7, height: 10, opacity: 0.3 }}
            className='relative right-[0px]'
            tintColor={"orange"}
          />
        </View>
      </Pressable>
    )
}

export default CardOvertimeLog