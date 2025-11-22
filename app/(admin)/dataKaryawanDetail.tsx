import CardInfo from '@/components/cardInfo';
import HeaderBack from '@/components/headerBack';
import { DeleteUserByEmail, getUserByEmail, updateUser } from '@/hooks/api';
import { ChangeUserReimburse, dataReimburseMain } from '@/hooks/dataReimburseFunction';
import { formatRupiah } from '@/hooks/formatRupiahFunction';
import { ReimbursementType } from '@/types/reimburseDataType';
import { UserType } from '@/types/userType';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const dataKaryawanDetail = () => {
  const { email } = useLocalSearchParams();
  const [dataReimburse, setDataReimburse] = useState<ReimbursementType[]>([]);
  const [total, setTotal] = useState(0);
  const [salary, setSalary] = useState(5000000);
  const [loading, setLoading] = useState(false);
  const [selectMenu, setSelectMenu] = useState('reimburse');
  const { dataMonthAll } = dataReimburseMain();
  const today = new Date().toISOString().split("T")[0];
  const thisMonth = today.slice(5,7);
  const [popUpActive, setPopUpActive] = useState('');
  const [popUpDelete, setPopUpDelete] = useState('');
  const [popUpRole, setPopUpRole] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [username, setUsername] = useState('')
  const [emailNew, setEmailNew] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [dataUser, setDataUser] = useState<UserType>({
    id: 0,
    username: '',
    email: '',
    is_staff: false,
    role: 'karyawan',
  });
  
  useEffect(()=>{
    try{
      const getUser = async () => {
        const res = await getUserByEmail(email.toString());
        if(res){
          // console.error('User Data: ', res.data);
          setDataUser(res.data);
        }
      }
      getUser();
    }catch{
      // console.error('Gagal mendapatkan data user');
    }
  }, [email]);

  useEffect(()=>{
    // console.error('dataUser : ', dataUser);
    const fetchReimburse = async() => {
      const res = await ChangeUserReimburse(dataUser.email);
      if(res){
        setDataReimburse(res);
      }
    }
    fetchReimburse();
  }, [dataUser]);

  useEffect(()=>{
    const totalPrice = () => {
      {dataMonthAll.map((month)=>{
        if(month === thisMonth){
          const total = dataReimburse
          .filter(item => item.created_at?.slice(5,7) === thisMonth && item.status !== "Rejected" && item.status !== "Pending")
          .reduce((acc, item) => acc + Number(item.total_amount || 0), 0);
          setTotal(total);
        }
      })}
    }
    totalPrice();
  }, [dataReimburse]);

  const handleDelete = async(email: string) => {
    // console.error('Delete user with email:', email);
    setLoading(true);
    try{
      const res = await DeleteUserByEmail(email);
      if(res.status === 200){
        // console.error('User deleted successfully');
        router.back();
      }
    }catch{
      // console.error('Failed to delete user');
    }
  }

  const handleUpdateAdmin = async ()=>{
    setLoading(true);
    try{
      const res = await updateUser(dataUser.email, {is_staff: true});
      if(res !== undefined){
        console.error('User update successfully');
        setPopUpRole(false);
        router.push({
          pathname: "../(admin)/dataKaryawanDetail",
          params: { email: dataUser.email },
        });
      }
    }catch{
      console.error('Failed to update user');
    }finally{
      setLoading(false);
    }
  }

  const handleUpdateUser = async ()=>{
    setLoading(true);
    try{
      const body = {
        ...(username !== '' && { username: username }),
        ...(emailNew !== '' && { email: emailNew }),
        ...((password !== '' && password === passwordConfirm) && { password: password }),
      };
      if(password !== passwordConfirm){
        setError('Password dan konfirmasi password tidak sesuai.');
        return;
      }
      const res = await updateUser(dataUser.email, body);
      if(res !== undefined){
        // console.error('User update successfully');
        setPopUpRole(false);
        router.push("../(admin)/dataKaryawan");
      }
    }catch{
      // console.error('Failed to update user');
    }finally{
      setLoading(false);
    }
  }

  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='Profile' type='python'/>

      <View className='w-full flex flex-col justify-start items-center mt-5 px-[20px]'>
        <View className='w-full relative flex items-center mt-[-50px] z-[999]'>
          <View className='bg-blue-300 border border-b-2 border-blue-800 flex justify-center items-center rounded-full w-[80px] h-[80px]'>
            <Text className='text-white font-bold text-[30px] flex justify-center items-center'>
                {dataUser.username.charAt(0).toUpperCase()}{dataUser.username.charAt(dataUser.username.length - 1).toUpperCase()}
            </Text>
          </View>
        </View>

        <View className='mt-3 flex items-center'>
          <Text className='font-bold'>{dataUser.username}</Text>
          <Text className=''>{dataUser.email}</Text>
        </View>

        <View className='bg-blue-50 flex flex-row p-[5px] justify-between border border-blue-600 rounded-full w-full mt-5 gap-1'>
          <Pressable onPress={()=>{setSelectMenu('reimburse')}} className={`py-2 ${selectMenu==='reimburse'&&'bg-blue-500'} rounded-full flex-1 justify-center items-center`}>
            <Text className={`font-bold text-[10px] ${selectMenu==='reimburse'?'text-white':'text-blue-600'}`}>Reimburse</Text>
          </Pressable>
          <Pressable onPress={()=>{setSelectMenu('Salary')}} className={`py-2 ${selectMenu==='Salary'&&'bg-blue-500'} rounded-full flex-1 justify-center items-center`}>
            <Text className={`font-bold text-[10px] ${selectMenu==='Salary'?'text-white':'text-blue-600'}`}>Salary</Text>
          </Pressable>
          <Pressable onPress={()=>{setSelectMenu('Info')}} className={`py-2 ${selectMenu==='Info'&&'bg-blue-500'} rounded-full flex-1 justify-center items-center`}>
            <Text className={`font-bold text-[10px] ${selectMenu==='Info'?'text-white':'text-blue-600'}`}>Info</Text>
          </Pressable>
        </View>

        {selectMenu==='reimburse'?(
          <>
            <View className='w-full bg-blue-100 rounded-lg mt-3 p-2 flex flex-row justify-start items-center gap-2'>
              <View className='w-[60px] h-[40px] bg-white rounded-lg flex flex-row justify-center items-center'>
                <Image source={require("../../assets/icons/reimburse-icon.png")} style={{ width: 18, height: 18 }}/>
                <Text className='ml-2 text-[12px] text-blue-900 font-bold'>{dataReimburse.length}</Text>
              </View>
              <View className='w-[78%] h-[40px] bg-white rounded-lg flex flex-row justify-start items-center pl-4'>
                <Text className='ml-2 text-[12px] text-blue-900 font-bold'>{formatRupiah(total)}</Text>
                <Text className='ml-2 text-[10px] text-blue-900'>this month</Text>
              </View>
            </View>

            <View className='w-full h-[50%] bg-blue-100 rounded-lg mb-8 mt-2 overflow-hidden flex flex-col justify-start items-center'>
              <ScrollView className='w-full h-[60%] mt-2 mb-5'>
                  <View className='w-full flex h-[100%] overflow-hidden flex-col items-center gap-2 px-2 rounded-md'>
                    {dataReimburse.map((item,index)=>{
                      return (
                        <CardInfo
                          amount={Number(item.total_amount)}
                          date={item.created_at??''}
                          description={item.description}
                          title={item.title}
                          key={index}
                          status={item.status}
                          id={item.id??0}
                          type=''
                          w="w-full"
                        />
                      )
                    })}
                  </View>
              </ScrollView>
            </View>
          </>
        ):selectMenu==='Salary'?(
          <>
            <View className='w-full h-[60%] p-2 bg-blue-100 rounded-lg mb-8 mt-2 overflow-hidden flex flex-col justify-start items-center gap-2'>
              <View className='w-full flex p-4 justify-between items-center flex-row rounded-lg bg-white'>
                <View className='flex flex-row gap-2 pl-3'>
                  <Text className='text-[12px] text-blue-900'>Monthly salary :</Text>
                  <Text className='text-[12px] text-blue-900 font-bold ml-4'>{formatRupiah(salary)}</Text>
                </View>
                <Pressable onPress={()=>{setPopUpActive('true')}} className='w-[30px] h-[30px] flex justify-center items-center border border-b-2 border-blue-800 bg-blue-50 rounded-lg'>
                  <Image source={require("../../assets/icons/edit.png")} style={{ width: 12, height: 12 }} tintColor={'blue'}/>
                </Pressable>
              </View>
              <View className='w-full flex p-4 justify-between items-center flex-row rounded-lg bg-white border border-b-2 border-blue-800'>
                <View className='flex flex-col justify-start gap-2 pl-3'>
                  <Text className='text-[12px] text-blue-900'>Monthly Salary :</Text>
                  <Text className='text-[12px] text-blue-900 font-bold ml-4'>{formatRupiah(salary)}</Text>
                </View>
                <View className='flex flex-col justify-center items-center gap-2 pl-3'>
                  <Text className='text-[20px] text-blue-900'>+</Text>
                </View>
                <View className='flex flex-col gap-2 justify-start pl-3'>
                  <Text className='text-[12px] text-blue-900'>Monthly Reimburse :</Text>
                  <Text className='text-[12px] text-blue-900 font-bold ml-4'>{formatRupiah(total)}</Text>
                </View>
              </View>
              <View className='w-full flex p-4 justify-center items-center flex-row rounded-lg bg-blue-800'>
                <Text className='text-[12px] text-white'>Total salary :</Text>
                <Text className='text-[12px] text-white font-bold ml-4'>{formatRupiah(salary+total)}</Text>
              </View>
            </View>
          </>
        ):selectMenu==='Info'?(
          <>
            <View className='w-full h-[60%] p-2 bg-blue-100 rounded-lg mb-8 mt-2 overflow-hidden flex flex-col justify-start items-center gap-2'>
              <View className='w-full flex p-4 border border-b-2 border-blue-800 justify-between items-center flex-col rounded-lg bg-white'>
                <View className='w-full flex flex-row justify-between gap-2 px-3'>
                  <Text className='text-[12px] font-bold text-blue-900'>Username :</Text>
                  <Text className='text-[12px] text-blue-900'>{dataUser.username}</Text>
                </View>
                <View className='w-full flex flex-row justify-between gap-2 px-3'>
                  <Text className='text-[12px] font-bold text-blue-900'>Email :</Text>
                  <Text className='text-[12px] text-blue-900'>{dataUser.email}</Text>
                </View>
              </View>
              <View className='w-full flex p-4 px-7 border border-b-2 border-blue-800 justify-between items-center flex-row rounded-lg bg-white'>
                <Text className='text-[12px] font-bold text-blue-900'>Promote to Admin</Text>
                <Pressable onPress={()=>{
                  if(dataUser.is_staff){
                    return;
                  }
                  setPopUpRole(true)
                  }} className={`w-[50px] h-[30px] rounded-full ${dataUser.is_staff?'justify-end bg-blue-500':'justify-start bg-blue-200'} flex flex-row items-center p-1`}>
                  <View className={`w-[20px] h-[20px] rounded-full bg-white border border-blue-800`}/>
                </Pressable>
              </View>
            </View>
          </>
        ):null}
        

        <View className='w-full flex flex-row justify-between items-center' style={{position: 'absolute', bottom: 10}}>
          <Pressable onPress={() => {setPopUpEdit(true)}}
            className=' w-[75%] h-[50px] mb-10 flex flex-row justify-center items-center bg-blue-500 border border-b-2 border-blue-900 rounded-lg '>
            <Text className=' font-bold text-[15px] text-white'>
              Edit Karyawan
            </Text>
          </Pressable>
          <Pressable onPress={() => {setPopUpDelete('true')}}
            className=' w-[20%] h-[50px] mb-10 flex flex-row justify-center items-center bg-white border border-b-2 border-blue-800 rounded-lg '>
            <Image source={require("../../assets/icons/trash.png")} style={{ width: 20, height: 20 }} tintColor={'#FF1D8A'}/>
          </Pressable>
        </View>
      </View>
      
      {/* POPUP */}
      {popUpActive !== '' && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-70 bg-black'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center'>
              <Text className='text-[12px] text-blue-900 w-full text-center font-bold'>
                Change Salary
              </Text>
              <TextInput
                className='flex w-full p-[10px] pl-[15px] text-[12px] flex-row justify-center items-center border-[1px] border-blue-800 rounded-lg mt-4'
                placeholder='Add Price'
                keyboardType='numeric'
                onChangeText={(text) => setSalary(Number(text))}
              />
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpActive('')}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-blue-800'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {
                  }} className={`w-[50%] border border-b-[2px] border-blue-800 bg-blue-500 rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-white'>
                    Yes
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP */}
      {popUpDelete !== '' && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-70 bg-black'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center'>
              <Text className='text-[12px] w-full text-center font-bold'>
                Are you sure to delete this user?
              </Text>
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpDelete('')}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-blue-800'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {
                  handleDelete(dataUser.email);
                  }} className={`w-[50%] border border-b-[2px] border-blue-800 bg-blue-500 rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-white'>
                    {loading ? 'Deleting...' : 'Yes'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP */}
      {popUpRole && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-70 bg-black'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center'>
              <Text className='text-[12px] w-full text-center font-bold'>
                Are you sure to Promote this user to admin ?
              </Text>
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpDelete('')}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-blue-800'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {
                  handleUpdateAdmin();
                  }} className={`w-[50%] border border-b-[2px] border-blue-800 bg-blue-500 rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-white'>
                    {loading ? 'Promote...' : 'Yes'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP */}
      {popUpEdit && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-70 bg-black'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <Text className='text-[12px] text-blue-900 w-full mb-3 text-center font-bold'>
                Change User
              </Text>
              <TextInput
                className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Email'
                value={emailNew}
                onChangeText={setEmailNew}
              />
              <TextInput
                className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                className='p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Confirm Password'
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
              />
              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEdit(false)}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-blue-800'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                    handleUpdateUser();
                  }} className={`w-[50%] border border-b-[2px] border-blue-800 bg-blue-500 rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-white'>
                    {loading ? 'Saving...' : 'Save'}
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

export default dataKaryawanDetail