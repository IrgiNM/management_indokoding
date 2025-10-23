import { View, Text, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import HeaderBack from '@/components/headerBack'
import { cardInfoType } from '@/types/cardInfoType';
import CardInfo from '@/components/cardInfo';

const dataKaryawanDetail = () => {
  const [username, setUsername] = useState('')
  const [createActive, setCreateActive] = useState(false)
  const [statusActive, setStatusActive] = useState('Reimburse');

  const statusList = [
    {
      id: 1,
      status: 'Reimburse',
      link: ()=>{setStatusActive('Reimburse')}
    },  
    {
      id: 2,
      status: 'Soon',
      link: ()=>{setStatusActive('Soon')}
    },  
    {
      id: 3,
      status: 'Next',
      link: ()=>{setStatusActive('Next')}
    },  
  ]

  const dataReimburse: cardInfoType[] = [
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-10-13",
          status: "pending",
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-10-14",
          status: "pending"
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-09-13",
          status: "pending"
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-09-13",
          status: "pending"
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-09-13",
          status: "pending"
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-08-13",
          status: "pending"
      },
      {
          id: 1,
          title: "Reimburse Title",
          description: "description none",
          amount: "+ Rp 100.000.000",
          date: "2025-08-13",
          status: "pending"
      },
    ];

  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      <HeaderBack title='Data Karyawan' subTitle='detail'/>

      <View className='w-full px-[30px]'>
      {/* HEADER */}
      
      <View className='w-full  flex  items-center mt-5'>
        <View className='bg-purple-300  rounded-full w-[100px] h-[100px]'> </View>
      </View>

      <View className='mt-5 flex items-center'>
        <Text className='font-bold'>Tantri Cantik</Text>
        <Text className=''>tantricantik@gmail.com</Text>
      </View>

      <View className='w-full py-[10px] bg-white pt-[20px] mt-2'>
        <View className='w-full flex flex-row justify-between items-center bg-purple-50 border-[.5px] border-b-[1px] rounded-full border-purple-600 py-[5px] px-[5px]'>
          {statusList.map((item, index)=>{
            return(
              <Pressable key={index} onPress={item.link} className={`flex-1 flex-row justify-center items-center py-[10px] px-[20px] gap-2 rounded-full ${item.status === statusActive ? 'bg-purple-700' : 'bg-purple-50 border-[.5px] border-b-[1px] border-purple-200' }`}>
                <Text className={`text-[10px] ${item.status === statusActive ? 'text-white' : 'text-purple-900' } font-bold`}>{item.status}</Text>              
              </Pressable>
            )
          })}
        </View>
      </View>
      
    <ScrollView className='w-full h-[380px] mt-5 mb-50'>
      <View className='w-full flex flex-col items-center gap-2 '>
        {dataReimburse.map((item,index)=>{
          return (
          <CardInfo amount={item.amount} date={item.date} description={item.description} id={item.id} title={item.title} key={index} w="w-full" />
          )
        })}
      </View>
    </ScrollView>


    <View className='w-full h-[120px] py-[15px]  '>
      <Pressable 
        onPress={() => {setCreateActive(true)}}
        className=' w-full h-[50px]  flex flex-row justify-center items-center bg-purple-800 rounded-lg '>
        <Text className=' font-bold text-[15px] text-white'>
          Edit Karyawan
        </Text>
      </Pressable>
    </View>
    </View>

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
                <Pressable onPress={() => {}} className='p-[15px] w-full flex flex-row justify-center items-center bg-purple-700 rounded-lg mt-10'
                >
                  <Text className='ml-2 font-bold text-white'>
                      + Create
                  </Text>
                </Pressable>
                <Pressable onPress={() => {setCreateActive(false)}} className='p-[15px] w-full flex flex-row justify-center items-center border-purple-400 border-2 rounded-lg'
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

export default dataKaryawanDetail