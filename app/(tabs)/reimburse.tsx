import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import HeaderBack from '@/components/headerBack'
import { Image } from 'expo-image'
import { formatRupiah } from '@/hooks/formatRupiahFunction'

const reimburse = () => {

  const [popUpActive, setPopUpActive] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);

  // DATA REIMBURSE
  const [titleReimburse, setTitleReimburse] = useState('');
  const [dataItem, setDataItem] = useState<{ name: string; price: number }[]>([]);
  const [descriptionReimburse, setDescriptionReimburse] = useState('');
  const status = 'Pending';
  
  return (
    <View className='bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='Pengajuan Reimburse'/>

      <ScrollView className='w-full pb-[50px] mt-5'>
        <View className='w-full p-[15px] pt-[20px] bg-[#dfc1ef]'>

          <View className='w-full bg-white rounded-2xl border-[.5px] border-b-[1px] border-purple-600 flex flex-col justify-start items-center p-[20px]'>

            <View className='w-full flex-col justify-start'>
              <View className=' w-full flex justify-start'>
                <Text className='font-bold text-[12px]'>Title:</Text>
                <TextInput 
                  className='p-[10px] text-[12px] pl-[15px] w-full flex flex-row justify-center items-center border-[1px] border-purple-800  rounded-lg mt-2' 
                  placeholder='Add New Title'
                  value={titleReimburse}
                  onChangeText={setTitleReimburse}
                />
              </View>

              <View className='p-[15px] mt-5 w-full border border-purple-500 bg-white rounded-t-lg'>
                <View className='w-full'>
                  <Text className='font-bold text-[12px]'>List Reimburse:</Text>
                  <View className='flex flex-col justify-center items-center p-[20px] border-[1px] border-purple-100 mt-2 rounded-lg gap-1'>
                    {dataItem.length > 0 ? dataItem.map((item,index)=>{
                      return (
                        <View className='w-full flex flex-row justify-between items-center'>
                          <View className='flex-row justify-between w-[80%] '>
                            <Text className='text-purple-800 text-[12px]'>{item.name}</Text>
                            <Text className='font-bold text-purple-800 text-[12px]'>{formatRupiah(item.price)}</Text>
                          </View>
                          <Pressable onPress={() => {setDataItem(prev => prev.filter(col => col.name !== item.name));
                            }} className='w-[20px] h-[20px] flex flex-row justify-center items-center border border-b-2 border-[#88003B] rounded-lg bg-[#FF0066]'
                          >
                            <Image source={require('../../assets/icons/s-decline.png')} style={{ width: 8, height: 8 }} tintColor={"#ffffff"}/>
                          </Pressable>
                        </View>
                      )
                    }):
                      <Text className='text-purple-300 text-[12px]'>No items added yet.</Text>
                    }
                  </View>
                  
                </View>
                <View className='flex-row justify-between gap-3 w-full mt-2'>
                  <TextInput
                        className='flex-1 p-[10px] pl-[15px] text-[12px] flex-row justify-center items-center border-[1px] border-purple-800 rounded-lg mt-2'
                        placeholder='Add New Category'
                        value={itemName}
                        onChangeText={setItemName}
                        />
                  <TextInput
                        className='flex-3 p-[10px] pl-[15px] text-[12px] flex-row justify-center items-center border-[1px] border-purple-800 rounded-lg mt-2'
                        placeholder='Add Price'
                        keyboardType='numeric'
                        onChangeText={(text) => setItemPrice(Number(text))}
                        />
                </View>

                <View className='w-full flex-row gap-2 mt-2'>
                  <Text className='bg-purple-100 border-[.5px] border-b-[1px] border-purple-800 rounded-lg py-[5px] px-[10px] mt-2 text-center text-[10px]'>Bensin</Text>
                  <Text className='bg-purple-100 border-[.5px] border-b-[1px] border-purple-800 rounded-lg py-[5px] px-[10px] mt-2 text-center text-[10px]'>Listrik</Text>
                  <Text className='bg-purple-100 border-[.5px] border-b-[1px] border-purple-800 rounded-lg py-[5px] px-[10px] mt-2 text-center text-[10px]'>Hotel</Text>
                </View>
              </View>

              <Pressable onPress={()=>{
                if(itemName && itemPrice){
                  setDataItem([...dataItem, { name: itemName, price: itemPrice }]);
                  setItemName('');
                  setItemPrice(0);
                }
              }} className='p-[10px] mt-[-1px] w-full flex flex-row justify-center items-center bg-[#692D8A] rounded-b-lg rounded-t-sm'>
                      <Text className=' font-bold text-[20px] text-green-100'>
                          +
                      </Text>
              </Pressable>

              <View className=' mt-5 '>
                <Text className='font-bold text-[12px]'>Description:</Text>
                <TextInput
                  className='text-[12px] p-[10px] pl-[20px] pb-[50px] w-full flex flex-row justify-center items-center border-[1px] border-purple-800 rounded-lg mt-2'
                  placeholder='Add New Description'
                  multiline={true}            // biar bisa banyak baris
                  numberOfLines={4}           // tinggi awal
                  textAlignVertical='top'     // teks mulai dari atas
                  value={descriptionReimburse}
                  onChangeText={setDescriptionReimburse}
                />
              </View>

              <View className=' mt-5 '>
                <Text className='font-bold text-[12px]'>Image:</Text>
                <View className='flex-row gap-5 w-full overflow-hidden'>
                  <Text className=' pb-[50px] pl-5  bg-purple-800 w-[130px] mt-2 rounded-lg '></Text>
                  <Text className=' pb-[50px] pl-5  bg-purple-800 w-[130px] mt-2 rounded-lg '></Text>
                </View>
              </View>


            </View>
          </View>
              <View className='w-full h-[200px]'/>
        </View>
      </ScrollView>

      {/* BUTTON CANCEL */}
      <View className='absolute z-20 bottom-[0px] w-full h-[170px] border border-purple-800 bg-white flex justify-start gap-3 items-center px-[30px] pt-[20px] rounded-t-3xl'>
        <View className='w-full flex flex-row justify-between items-center'>
          <Text className='text-[12px] text-purple-900'>
            Total Reimburse Amount
          </Text>
          <Text className='font-bold text-[12px] text-purple-900'>
            Rp. 1.000.000
          </Text>
        </View>
        <Pressable onPress={() => {setPopUpActive(true)}} className='p-[15px] w-full flex flex-row justify-center items-center border border-b-2 border-purple-800 rounded-lg bg-green-500'
        >
          <Image source={require('../../assets/icons/send.png')} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
          <Text className='ml-2 text-white font-bold'>
              create reimbursement
          </Text>
        </Pressable>
      </View>

      {/* POPUP */}
      {popUpActive && (
        <>
          <View className='absolute w-full z-30 h-full opacity-70 bg-black'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-40'>
            <View className='w-full bg-white p-[20px] pt-[70px] rounded-lg flex flex-col justify-start items-center'>
              <Text className='text-[12px] w-full text-center'>
                Are you sure you want to proceed with this reimbursement?
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpActive(false)}} className='w-[50%] border border-b-[2px] border-purple-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {}} className='w-[50%] border border-b-[2px] border-purple-800 bg-green-500 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-white'>
                    Yes
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

    </View>
  )
}

export default reimburse