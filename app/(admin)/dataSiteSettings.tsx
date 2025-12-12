import CardSetting from '@/components/cardSetting';
import HeaderBack from '@/components/headerBack';
import { detectType } from '@/hooks/cekTypeFunction';
import { createSettingFunction, dataSiteSettingFunction, deleteSettingFunction, updateSettingFunction } from '@/hooks/dataSiteSettingFunction';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const dataSiteSettings = () => {

  const router = useRouter();
  const { dataAllCategorySettings, dataSettings } = dataSiteSettingFunction()
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState('');
  const [popUpDelete, setPopUpDelete] = useState(false);
  const [categoryData, setCategoryData] = useState('create new')
  const [categoryDataNew, setCategoryDataNew] = useState('')
  const [keyData, setKeyData] = useState('')
  const [value, setValue] = useState('')
  const [valueData, setValueData] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [selectMonthPopUp, setSelectMonthPopUp] = useState(false);

  const handleUpdate = async(category: string, key: string, value: string) => {
    setLoading(true)
    const res = await updateSettingFunction(category, key, value);
    setLoading(false)
    setPopUpEdit(false);
    if(res){
      router.replace('/(admin)/dataSiteSettings');
    }
  }
  
  const handleCreate = async(category: string, key: string, value: string) => {
    setLoading(true)
    const res = await createSettingFunction(category, key, value);
    setLoading(false)
    setPopUpEdit(false);
    if(res){
      router.replace('/(admin)/dataSiteSettings');
    }
  }

  const handleDelete = async(category: string, key: string) => {
    setLoading(true)
    const res = await deleteSettingFunction(category, key);
    setLoading(false)
    setPopUpEdit(false);
    if(res){
      router.replace('/(admin)/dataSiteSettings');
    }
  }

  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='Data Site Setting' type='setting'/>    

      {dataSettings.length===0&&(
        <View className='w-full h-full pt-[140px] px-4 bg-[#ecf8f9] flex flex-col justify-start items-center'>
          <View className='w-[140px] h-[140px] flex justify-center items-center rounded-full bg-[#cdf6f8] opacity-50'>
            <Image source={require("../../assets/icons/no-setting.png")} style={{ width: 70, height: 70 }} tintColor={"#006381"}/>
          </View>
          <Text className='text-[20px] font-bold text-[#006d7b]'>
            No Setting
          </Text>
          <Text className='text-[12px] text-[#006d7b] w-[160px] text-center mb-8'>
            there is no setting yet. please add a new setting.
          </Text>
          <Pressable onPress={()=>{
              setPopUpEdit(true)
              setValue('choose')
              setPopUpTitle("Create")
            }} className="w-[100px] bg-[#ecf8f9] rounded-full overflow-hidden flex justify-center items-center border border-b-2 border-[#008091] py-2">
                <Text className='font-bold text-[12px] text-[#006d7b]'>+ setting</Text>
          </Pressable>
        </View>
      )}

      <ScrollView className='w-full pb-[100px]'>
        <View className='w-full pb-[100px] bg-white flex flex-col justify-start items-center gap-6'>
          {dataAllCategorySettings.map((item,index)=>{
            return (
              <View className='w-full flex flex-col justify-start items-start' key={index}>
                <View className='w-full px-4 py-3 bg-[#ecf8f9] flex flex-row justify-between items-center'>
                  <Text className='font-bold text-[12px] text-[#006d7b]'>{item}</Text>
                  <Pressable onPress={()=>{
                      setPopUpEdit(true)
                      setCategoryData(item);
                      setValue('choose')
                      setPopUpTitle("Create")
                    }} className="px-3 py-2 bg-[#ecf8f9] rounded-md border-[.5px] border-b-[1px] border-[#008091] flex justify-center items-center">
                      <Text className='font-bold text-[12px] text-[#006d7b]'>+ setting</Text>
                  </Pressable>
                </View>
                <View className='w-full px-5 flex flex-col justify-start items-start'>
                  {dataSettings.map((setting, idx)=>{
                    if(setting.category === item){
                      return (
                        <CardSetting
                          key={idx}
                          name={setting.key}
                          value={setting.value}
                          click ={()=>{
                            setPopUpEdit(true);
                            setCategoryData(setting.category);
                            setKeyData(setting.key);
                            setValue(setting.value);
                            if(setting.value==='true'){
                              setValueData(true);
                            }
                            if(setting.value==='false'){
                              setValueData(false);
                            }
                            setPopUpTitle("Edit");
                          }}
                          click2 ={()=>{
                            handleUpdate(item, setting.key, setting.value === 'true' ? 'false' : 'true');
                          }}
                         />
                      )
                    }
                  })}
                </View>
              </View>
            )
          })}
        </View>      
      </ScrollView>

      {/* POPUP EDIT*/}
      {popUpEdit && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#002531]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/setting.png")} style={{ width: 12, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[12px] font-bold text-[#002531]'>
                  {popUpTitle} Setting
                </Text>
              </View>
              {categoryData==='create new'&&(
                <TextInput
                  className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] border-[#006381] rounded-lg text-[12px]'
                  placeholder='new category'
                  value={categoryDataNew}
                  onChangeText={setCategoryDataNew}
                />
              )}
              <Pressable onPress={() => {setSelectMonthPopUp(!selectMonthPopUp)}} className='flex flex-row justify-between items-center w-full border-[1px] border-b-2 border-[#006381] rounded-lg p-[10px]'>
                  <Text className='text-[12px] font-bold text-[#006d7b]'>
                    {categoryData}
                  </Text>
                  <Image
                    source={require('../../assets/icons/arrow-dropdown.png')}
                    style={{ width: 9, height: 7, marginLeft: 5 }}
                    tintColor={'#006381'}
                  />
              </Pressable>
              {selectMonthPopUp && (
                <ScrollView className='w-full h-max-[50px]'>
                    <View className='w-full h-full rounded-lg border border-white flex flex-col justify-center items-center bg-[#22cde3] px-[10px]'>         
                        {dataAllCategorySettings.map((item, index) => {
                            return <Pressable onPress={() => {
                                setCategoryData(item.toString());
                                setSelectMonthPopUp(false);
                            }} key={index} className='py-3 border-b-[.5px] border-0 border-white w-full flex justify-center items-center'>
                                <Text className='text-white text-[12px] font-bold'>
                                    {item}
                                </Text>
                            </Pressable>;
                        })}
                        <Pressable onPress={() => {
                            setCategoryData('create new');
                            setSelectMonthPopUp(false);
                        }} className='py-3 border-white w-full flex justify-center items-center'>
                            <Text className='text-white text-[12px] font-bold'>
                                create new
                            </Text>
                        </Pressable>;
                    </View>
                </ScrollView>
              )}
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] border-[#006381] rounded-lg text-[12px]'
                placeholder='new key'
                value={keyData}
                onChangeText={setKeyData}
              />
              {value==='choose'?(
                <>
                  <Text className='w-full text-center text-[10px] text-[#002531]'>choose type value</Text>
                  <View className='w-full flex flex-row justify-center items-center gap-2'>
                    <Pressable onPress={() => { 
                      setValue('0');
                    }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#006381] rounded-lg py-[10px] flex-1 justify-center items-center`}>
                      <Text className='font-bold text-[10px] text-white'>
                        Number
                      </Text>
                    </Pressable>
                    <Pressable onPress={() => { 
                      setValue('false');
                    }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#006381] rounded-lg py-[10px] flex-1 justify-center items-center`}>
                      <Text className='font-bold text-[10px] text-white'>
                        On/Off
                      </Text>
                    </Pressable>
                    <Pressable onPress={() => { 
                      setValue('value');
                    }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#006381] rounded-lg py-[10px] flex-1 justify-center items-center`}>
                      <Text className='font-bold text-[10px] text-white'>
                        Text
                      </Text>
                    </Pressable>
                  </View>
                </>
              ):detectType(value)==="boolean"?(
                <View className='w-full flex flex-row justify-between items-center gap-2'>
                  <Pressable onPress={() => {setValueData(false)}} className={`flex-1 justify-center items-center rounded-md border border-b-2 border-[#006381] bg-[#00b1c8] py-3 ${valueData===false?'':'opacity-30'}`} >
                    <Text className={`font-bold text-[10px] ${valueData===false?'text-white':'text-[#006381]'}`}>OFF</Text>
                  </Pressable>
                  <Pressable onPress={() => {setValueData(true)}} className={`flex-1 justify-center items-center rounded-md border border-b-2 border-[#006381] bg-[#00b1c8] py-3 ${valueData===true?'':'opacity-30'}`} >
                    <Text className={`font-bold text-[10px] ${valueData===true?'text-white':'text-[#006381]'}`}>ON</Text>
                  </Pressable>
                </View>
              ):detectType(value)==="string"?(
                <TextInput
                  className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] border-[#006381] rounded-lg text-[12px]'
                  placeholder='new value'
                  value={value}
                  onChangeText={setValue}
                />
              ):detectType(value)==="integer"||detectType(value)==="float"?(
                <View className='w-full flex flex-row justify-between items-center my-3 gap-2'>
                  <Pressable onPress={() => {
                    if(detectType(value) === "integer"){
                      setValue(String(Number(value) - 1));
                    }
                  }} className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#006381]'>
                    <Text className='font-bold text-[25px] text-white mb-1'>-</Text>
                  </Pressable>
                  <TextInput
                    className='p-[10px] pl-[20px] text-black flex-1 flex-row justify-center items-center border-[.5px] border-[#006381] rounded-lg text-[12px]'
                    placeholder='new value'
                    value={value}
                    onChangeText={setValue}
                    keyboardType='numeric'
                  />
                  <Pressable onPress={() => {
                    if(detectType(value) === "integer"){
                      setValue(String(Number(value) + 1));
                    }
                  }} className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#006381]'>
                    <Text className='font-bold text-[25px] text-white mb-1'>+</Text>
                  </Pressable>
                </View>
              ):null}
              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                {popUpTitle==='Edit'&&(
                  <Pressable onPress={() => {setPopUpDelete(true)}} className='w-[50%] border border-b-[2px] border-[#006381] bg-[#e7feff] rounded-lg py-[11px] flex-1 justify-center items-center'>
                    <Image
                      source={require('../../assets/icons/trash.png')}
                      style={{ width: 15, height: 15 }}
                      tintColor={'#006381'}
                    />
                  </Pressable>
                )}
                <Pressable onPress={() => {
                    setValue('choose');
                    setCategoryData('create new');
                    setKeyData('');
                    setPopUpEdit(false)
                  }} className='w-[50%] border border-b-[2px] border-[#006381] bg-[#e7feff] rounded-lg py-[10px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                    if(popUpTitle==="Create"){
                      if(categoryData==='create new'&&categoryDataNew===''){
                        setError('category cannot be empty');
                        return;
                      }
                      if(keyData===''){
                        setError('key cannot be empty');
                        return;
                      }
                      if(value==='choose'){
                        setError('please choose value type');
                        return;
                      }
                      const finalCategory = categoryData==='create new'?categoryDataNew:categoryData;
                      const finalValue = detectType(value) === "boolean" ? (valueData ? 'true' : 'false') : value;
                      handleCreate(finalCategory, keyData, finalValue);
                    }else if(popUpTitle==="Edit"){
                      if(keyData===''){
                        setError('key cannot be empty');
                        return;
                      }
                      if(value==='choose'){
                        setError('please choose value type');
                        return;
                      }
                      const finalValue = detectType(value) === "boolean" ? (valueData ? 'true' : 'false') : value;
                      handleUpdate(categoryData, keyData, finalValue);
                    }
                  }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#22cde3] rounded-lg py-[10px] flex-1 justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    {popUpTitle==='Create'?(loading ? 'Creating...' : 'Create'):(loading ? 'Saving...' : 'Save')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}


      {/* POPUP */}
      {popUpDelete && (
        <>
          <View className='absolute w-full z-[1000] h-full opacity-80 bg-[#1e0031]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1001]'>
            <View className='w-full bg-white p-[20px] pt-[60px] rounded-lg flex flex-col justify-start items-center'>
              <View className='w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full bg-[#FF0066] flex justify-center items-center'>
                <Image source={require("../../assets/icons/trash.png")} style={{ width: 25, height: 28 }} tintColor={"#ffffff"} className='mb-5'/>
              </View>
              <Text className='text-[12px] w-full text-center'>
                Are you sure want to delete this setting?
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpDelete(false)}} className='w-[50%] border border-b-[2px] border-purple-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {
                  const finalCategory = categoryData==='create new'?categoryDataNew:categoryData;
                  handleDelete(finalCategory, keyData);
                }} className='w-[50%] border border-b-[2px] border-purple-800 bg-[#FF0066] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-white'>
                    Yes, Delete
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

export default dataSiteSettings
