import { View, Text, ScrollView, TextInput, Pressable, Button } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import HeaderBack from '@/components/headerBack'
import { Image } from 'expo-image'
import { formatRupiah } from '@/hooks/formatRupiahFunction'
import * as ImagePicker from 'expo-image-picker';
import { PickedImageType } from '@/types/PickerImageType'
import { dataReimburseMain } from '@/hooks/dataReimburseFunction'
import { createCategory, createReimburse, createReimburseItem } from '@/hooks/api'
import { ReimbursementSendType } from '@/types/reimburseDataType'

const reimburse = () => {

  const [popUpActive, setPopUpActive] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState(true);
  const [infoText, setInfoText] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const { categoryReimburse } = dataReimburseMain();
  const [categoryData, setCategoryData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // DATA REIMBURSE
  const [titleReimburse, setTitleReimburse] = useState('');
  const [descriptionReimburse, setDescriptionReimburse] = useState('');
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataReimburseSend, setDataReimburseSend] = useState<ReimbursementSendType>({
    title: "",
    total_amount: "0",
    description: "",
    status: "",
  });
  
  // DATA ITEM
  const [dataCategory, setDataCategory] = useState<{ name: string }[]>([]);
  const [dataItem, setDataItem] = useState<{ name: string; price: number }[]>([]);
  const [dataIdCategory, setDataIdCategory] = useState<number[]>([]);
  const [dataIdReimburse, setDataIdReimburse] = useState(0);

  useEffect(()=>{
    setCategoryData(categoryReimburse);
  }, [categoryReimburse])

  useEffect(()=>{
    const calculate = async ()=>{
      const total = dataItem.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(total);
    };
    calculate();
  }, [dataItem]);

  useEffect(() => {
    setDataReimburseSend({
      title: titleReimburse,
      total_amount: totalPrice.toString(),
      description: descriptionReimburse,
      status: 'Pending',
    });
  }, [titleReimburse, descriptionReimburse, totalPrice]);

  useEffect(()=>{
    if(dataIdCategory.length > 0){
      handleReimburse();
    }
  }, [dataIdCategory]);

  useEffect(()=>{
    if(dataIdReimburse!==0){
      handleItem();
    }
  }, [dataIdReimburse]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      alert('Izin akses galeri dibutuhkan!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(prev => [...prev, ...result.assets]);
    }
  };

  const handleCategory = async () => {
    console.error('Data Category to submit:', dataCategory);
    (dataCategory.map(async (item)=>{
      const resCategory = await createCategory(item);
      if(resCategory){
        setDataIdCategory(prev=>[...prev, resCategory.data.id]);
        console.log('Category created successfully', resCategory.data);
        setInfoText('Category created successfully');
        setPopUpInfo(true);
        setCategoryData([]);
        setItemPrice(0);
      }
      console.error('ResponseCategory from createCategory:', resCategory);
    }));
  }

  const handleReimburse = async () => {
    try{
      const resReimburse = await createReimburse(dataReimburseSend);
      if(resReimburse){
        setDataIdReimburse(resReimburse.data.id)
        console.error('Reimburse created successfully', resReimburse.data);
      }
    }catch{
      console.error("error dibagian kirim reimburse");
    }
  }

  const handleItem = async () => {
    try{
      (dataIdCategory.map(async (item, index)=>{
        console.error("mengirim id reimburse:", dataIdReimburse,"mengirim id category:", item,"mengirim data item:", dataItem[index].price);
        const resItem = await createReimburseItem({
          reimbursement: dataIdReimburse,
          category: item,
          item_amount: dataItem[index].price.toString(),
        })
        if(resItem){
          console.error('Item created successfully', resItem.data);
        }
      }))
      setDataItem([]);
      setTitleReimburse('');
      setDescriptionReimburse('');
    }catch{
      console.error("error dibagian kirim item");
    }
  }
  
  const handleSubmit = async () => {
    setLoading(true);
    try{
      await handleCategory();
    } catch(error) {
      console.error('Error creating category', error);
      setInfoText('Error creating category');
      setPopUpInfo(true);
    } finally {
      setLoading(false);
    }
  }
  
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
                        <View key={index} className='w-full flex flex-row justify-between items-center'>
                          <View className='flex-row justify-between w-[80%] '>
                            <Text className='text-purple-900 text-[12px]'>{item.name}</Text>
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
                  <Pressable onPress={() => {
                    setItemName('');
                    setCategoryData(categoryReimburse);
                  }} className='bg-purple-100 border-[.5px] border-b-[1px] border-purple-800 rounded-lg py-[5px] px-[10px] mt-2 text-center text-[10px]'>
                    <Image source={require("../../assets/icons/refresh.png")} style={{ width: 12, height: 12 }} tintColor={'purple'}/>
                  </Pressable>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} className='w-full'>
                    <View className='flex-row gap-2'>
                      {categoryData.map((item,index)=>{
                        return (
                          <Pressable onPress={() => {
                            setItemName(item);
                            setCategoryData(prev => prev.filter(col => col !== item));
                          }} key={index} className='bg-purple-100 border-[.5px] border-b-[1px] border-purple-800 rounded-lg py-[5px] px-[10px] mt-2 text-center text-[10px]'>
                            <Text className='text-[10px]'>
                              {item}
                            </Text>
                          </Pressable>
                        )
                      })}
                    </View>
                  </ScrollView>
                </View>
              </View>

              <Pressable onPress={()=>{
                if(itemName && itemPrice){
                  setDataItem([...dataItem, { name: itemName, price: itemPrice }]);
                  setDataCategory([...dataCategory, { name: itemName }]);
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
                <View className='flex-row items-center gap-5 mt-2 w-full overflow-hidden'>
                  <Pressable onPress={()=>{pickImage()}} className=' h-[60px] border-[1px] border-b-[2px] border-purple-600 bg-purple-50 w-[130px] rounded-lg flex justify-center items-center'>
                    <Image source={require("../../assets/icons/add-image.png")} style={{ width: 20, height: 20 }} tintColor={'purple'}/>
                  </Pressable>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} className='w-full'>
                    <View className='flex-row gap-3 w-full'>
                      {image && (
                        (image.map((item, index)=>{
                          return (
                            <Image
                              key={index}
                              source={{ uri: item.uri }}
                              style={{ width: 130, height: 60, borderRadius: 8 }}
                              resizeMode="cover"
                            />
                          )
                        }))
                      )}
                    </View>
                  </ScrollView>
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
            {formatRupiah(totalPrice)}
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
                <Pressable onPress={() => {handleSubmit(); setPopUpActive(false)}} className='w-[50%] border border-b-[2px] border-purple-800 bg-green-500 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-white'>
                    {loading ? 'Loading...' : 'Yes'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP INFO */}
      {popUpInfo && (
        <>
          <View className='absolute w-full z-30 h-full opacity-70 bg-black'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-40'>
            <View className='w-full bg-white p-[20px] pt-[70px] rounded-lg flex flex-col justify-start items-center'>
              <Text className='text-[12px] w-full text-center'>
                {infoText}
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpInfo(false)}} className='w-full border border-b-[2px] border-purple-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    Close
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