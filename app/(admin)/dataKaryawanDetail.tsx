import CardInfo from '@/components/cardInfo';
import HeaderBack from '@/components/headerBack';
import { DeleteUserByEmail, getUserByEmail, updateUser } from '@/hooks/api';
import { createEmployeeDataFunction, dataEmployeeFunction, updateEmployeeDataFunction } from '@/hooks/dataEmployeeFunction';
import { ChangeUserReimburse, dataReimburseMain } from '@/hooks/dataReimburseFunction';
import { formatRupiah } from '@/hooks/formatRupiahFunction';
import { ReimbursementType } from '@/types/reimburseDataType';
import { UserType } from '@/types/userType';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const dataKaryawanDetail = () => {
  const { email } = useLocalSearchParams();
  const emailData = email.toString();
  const { dataEmployee } = dataEmployeeFunction(email.toString());
  const [dataReimburse, setDataReimburse] = useState<ReimbursementType[]>([]);
  const [total, setTotal] = useState(0);
  const [salary, setSalary] = useState(5000000);
  const [loading, setLoading] = useState(false);
  const [selectMenu, setSelectMenu] = useState('Info');
  const { dataMonthAll } = dataReimburseMain();
  const today = new Date().toISOString().split("T")[0];
  const thisMonth = today.slice(5,7);

  // Personal Information
  const [emlpoyeeId, setEmlpoyeeId] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');

  // Contact
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailEmployee, setEmailEmployee] = useState('');
  const [address, setAddress] = useState('');

  // Job Information
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [resignDate, setResignDate] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');

  // Emergency Contact
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('');
  
  // Create Data
  const [employeeIdCreate, setEmployeeIdCreate] = useState('');
  const [fullNameCreate, setFullNameCreate] = useState('');
  const [genderCreate, setGenderCreate] = useState('');
  const [birthDateCreate, setBirthDateCreate] = useState('2000-02-13');
  const [taxNumberCreate, setTaxNumberCreate] = useState('');
  const [identityNumberCreate, setIdentityNumberCreate] = useState('');
  const [phoneNumberCreate, setPhoneNumberCreate] = useState('');
  const [emailEmployeeCreate, setEmailEmployeeCreate] = useState(emailData);
  const [addressCreate, setAddressCreate] = useState('');
  const [positionCreate, setPositionCreate] = useState('');
  const [departmentCreate, setDepartmentCreate] = useState('');
  const [joinDateCreate, setJoinDateCreate] = useState('2000-02-13');
  const [resignDateCreate, setResignDateCreate] = useState('2000-02-13');
  const [emergencyNameCreate, setEmergencyNameCreate] = useState('');
  const [emergencyPhoneCreate, setEmergencyPhoneCreate] = useState('');
  const [emergencyRelationCreate, setEmergencyRelationCreate] = useState('');
  const dataSend = {
    employee_id: employeeIdCreate??'',
    full_name: fullNameCreate??'',
    gender: genderCreate??'',
    birth_date: birthDateCreate??'',
    tax_number: taxNumberCreate??'',
    identity_number: identityNumberCreate??'',
    phone_number: phoneNumberCreate??'',
    address: addressCreate??'',
    position: positionCreate??'',
    department: departmentCreate??'',
    join_date: joinDateCreate??'',
    resign_date: resignDateCreate??'',
    emergency_name: emergencyNameCreate??'',
    emergency_phone: emergencyPhoneCreate??'',
    emergency_relation: emergencyRelationCreate??''
  }

  const [buttonEdit, setButtonEdit] = useState(false);
  const [popUpActive, setPopUpActive] = useState('');
  const [popUpDelete, setPopUpDelete] = useState('');
  const [popUpRole, setPopUpRole] = useState(false);
  const [popUpCreate, setPopUpCreate] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [popUpEditEmployee, setPopUpEditEmployee] = useState('');
  const [fillEditEmployee, setFillEditEmployee] = useState('');
  const [selectPopCreate, setSelectPopCreate] = useState('personal');
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
    setEmlpoyeeId(dataEmployee.employee_id?dataEmployee.employee_id:(dataEmployee.employee_id==='')?'unknown':'unknown');
    setFullName(dataEmployee.full_name?dataEmployee.full_name:(dataEmployee.full_name==='')?'unknown':'unknown');
    setGender(dataEmployee.gender?dataEmployee.gender:(dataEmployee.gender==='')?'unknown':'unknown');
    setBirthDate(dataEmployee.birth_date?dataEmployee.birth_date:(dataEmployee.birth_date==='')?'unknown':'unknown');
    setTaxNumber(dataEmployee.tax_number?dataEmployee.tax_number:(dataEmployee.tax_number==='')?'unknown':'unknown');
    setIdentityNumber(dataEmployee.identity_number?dataEmployee.identity_number:(dataEmployee.identity_number==='')?'unknown':'unknown');
    setPhoneNumber(dataEmployee.phone_number?dataEmployee.phone_number:(dataEmployee.phone_number==='')?'unknown':'unknown');
    setEmailEmployee(dataEmployee.email?dataEmployee.email:(dataEmployee.email==='')?'unknown':'unknown');
    setAddress(dataEmployee.address?dataEmployee.address:(dataEmployee.address==='')?'unknown':'unknown');
    setPosition(dataEmployee.position?dataEmployee.position:(dataEmployee.position==='')?'unknown':'unknown');
    setDepartment(dataEmployee.department?dataEmployee.department:(dataEmployee.department==='')?'unknown':'unknown');
    setJoinDate(dataEmployee.join_date?dataEmployee.join_date:(dataEmployee.join_date==='')?'unknown':'unknown');
    setResignDate(dataEmployee.resign_date?dataEmployee.resign_date:(dataEmployee.resign_date==='')?'unknown':'unknown');
    setEmploymentStatus(dataEmployee.employment_status?dataEmployee.employment_status:(dataEmployee.employment_status==='')?'unknown':'unknown');
    setEmergencyName(dataEmployee.emergency_name?dataEmployee.emergency_name:(dataEmployee.emergency_name==='')?'unknown':'unknown');
    setEmergencyPhone(dataEmployee.emergency_phone?dataEmployee.emergency_phone:(dataEmployee.emergency_phone==='')?'unknown':'unknown');
    setEmergencyRelation(dataEmployee.emergency_relation?dataEmployee.emergency_relation:(dataEmployee.emergency_relation==='')?'unknown':'unknown');
  }, [dataEmployee])
  
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

  const handleCreate = async() => {
    setLoading(true)
    console.log('dataSend', dataSend)
    if(dataSend.employee_id===''){
      setLoading(false);
      setError('employee id harus diisi');
      return
    }
    if(dataSend.full_name===''){
      setLoading(false);
      setError('full name harus diisi');
      return
    }
    if(dataSend.gender === '' || (dataSend.gender !== "male" && dataSend.gender !== "female")){
      setLoading(false);
      setError('gender harus diisi dan harus male atau female');
      return
    }
    if(dataSend.position===''){
      setLoading(false);
      setError('position harus diisi');
      return
    }
    if(dataSend.department===''){
      setLoading(false);
      setError('department harus diisi');
      return
    }
    if(dataSend.join_date===''){
      setLoading(false);
      setError('join date harus diisi');
      return
    }
    const res = await createEmployeeDataFunction(emailEmployeeCreate, dataSend)
    if(res){
      setLoading(false);
      setPopUpCreate(false)
      router.push({
        pathname: "../(admin)/dataKaryawanDetail",
        params: { email: email },
      });
    }else{
      setLoading(false);
      setError('gagal create');
    }
  }

  const handleUpdateEmployee = async() => {
    setLoading(true);
    const res = await updateEmployeeDataFunction(emailData, 
      (popUpEditEmployee==="Employee Id"?{employee_id: fillEditEmployee}:
      popUpEditEmployee==="Full Name"?{full_name: fillEditEmployee}:
      popUpEditEmployee==="Gender"?{gender: fillEditEmployee}:
      popUpEditEmployee==="Birth Date"?{birth_date: fillEditEmployee}:
      popUpEditEmployee==="tax Number"?{tax_number: fillEditEmployee}:
      popUpEditEmployee==="Identity Number"?{identity_number: fillEditEmployee}:
      popUpEditEmployee==="Phone Number"?{phone_number: fillEditEmployee}:
      popUpEditEmployee==="Address"?{address: fillEditEmployee}:
      popUpEditEmployee==="Position"?{position: fillEditEmployee}:
      popUpEditEmployee==="Department"?{department: fillEditEmployee}:
      popUpEditEmployee==="Join Date"?{join_date: fillEditEmployee}:
      popUpEditEmployee==="Resign Date"?{resign_date: fillEditEmployee}:
      popUpEditEmployee==="Emergency Name"?{emergency_name: fillEditEmployee}:
      popUpEditEmployee==="Emergency Phone"?{emergency_phone: fillEditEmployee}:
      popUpEditEmployee==="Emergency Relation"?{emergency_relation: fillEditEmployee}:
      {employment_status: fillEditEmployee}
      )
    )
    if(res){
      setLoading(false)
      setPopUpEditEmployee('')
      setFillEditEmployee('')
      router.push({
        pathname: "../(admin)/dataKaryawanDetail",
        params: { email: email },
      });
    }else{
      setLoading(false)
      setError('gagal update')
    }
  }

  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='Profile' type='python' backTo={'/dataKaryawan'}/>

      <View className='w-full flex flex-col justify-start items-center mt-5 px-[20px]'>
        <View className='w-full relative flex items-center mt-[-50px] z-[999]'>
          <View className='bg-blue-300 border-[6px] border-white flex justify-center items-center overflow-hidden rounded-full w-[80px] h-[80px]'>
            <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full h-full flex justify-center items-center'>
              <Text className='text-white font-bold text-[30px] flex justify-center items-center'>
                  {dataUser.username.charAt(0).toUpperCase()}{dataUser.username.charAt(dataUser.username.length - 1).toUpperCase()}
              </Text>
            </LinearGradient>
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
            <View className='w-full h-[60%]'>

              <ScrollView className='w-full h-[64%]'>
                <View className='w-full h-full p-2 bg-blue-100 rounded-lg mb-8 mt-2 overflow-hidden flex flex-col justify-start items-center gap-1'>
                    <View className='w-full flex p-4 border border-b-2 border-blue-800 justify-between items-center flex-col rounded-lg bg-white'>
                      <View className='w-full flex flex-row justify-between gap-2 px-3'>
                        <Text className='text-[12px] font-semibold text-blue-900'>Employment Status :</Text>
                        <View className='flex flex-row items-center gap-2'>
                          <View className='overflow-hidden rounded-lg border border-b-2 border-blue-800'>
                            <LinearGradient colors={['#ffa850', '#E96500']} className='w-full py-1 px-3 flex justify-center items-center'>
                              <Text className='font-bold text-white text-[10px]'>{employmentStatus}</Text>
                            </LinearGradient>
                          </View>
                          {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Employment Status');setFillEditEmployee(employmentStatus)}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                            </Pressable>
                          )}
                        </View>
                      </View>
                      <View className='w-full mt-2 flex flex-row justify-between gap-2 px-3'>
                        <Text className='text-[12px] font-semibold text-blue-900'>Promote to Admin</Text>
                        <Pressable onPress={()=>{
                          setPopUpRole(true)
                        }} className={`w-[40px] rounded-full ${dataUser.is_staff?'justify-end bg-blue-500':'justify-start bg-blue-200'} flex flex-row items-center p-1`}>
                          <View className={`w-[15px] h-[15px] rounded-full bg-white`}/>
                        </Pressable>
                      </View>
                    </View>
                    <Text className='w-full py-2 text-[10px] text-blue-800 text-center font-bold rounded-t-lg rounded-b-sm border border-b-2 border-blue-800 bg-blue-100'>Personal Information</Text>
                    <View className='w-full flex p-4 justify-between items-center flex-col gap-1 rounded-lg bg-white'>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Username :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{dataUser.username??'unknown'}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEdit(true)}} className="w-[25px] h-[25px] bg-[#ecf1f9] rounded-md border-[.5px] border-b-[1px] border-[#0040b8] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#0040b8"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Employee Id :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{emlpoyeeId}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Employee Id')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Full Name :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{fullName}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Full Name')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Gender :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{gender}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Gender')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Birth Date :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{birthDate}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Birth Date')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Tax Number :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{taxNumber}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Tax Number')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Identity Number :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{identityNumber}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Identity Number')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                    </View>
                    <Text className='w-full py-2 text-[10px] text-blue-800 text-center font-bold rounded-t-lg rounded-b-sm border border-b-2 border-blue-800 bg-blue-100'>Contact</Text>
                    <View className='w-full flex p-4 justify-between items-center flex-col gap-1 rounded-lg bg-white'>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Phone Number :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{phoneNumber}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Phone Number')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Email :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{emailEmployee}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEdit(true)}} className="w-[25px] h-[25px] bg-[#ecf1f9] rounded-md border-[.5px] border-b-[1px] border-[#0040b8] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#0040b8"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Address :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{address}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Address')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                    </View>
                    <Text className='w-full py-2 text-[10px] text-blue-800 text-center font-bold rounded-t-lg rounded-b-sm border border-b-2 border-blue-800 bg-blue-100'>Job Information</Text>
                    <View className='w-full flex p-4 justify-between items-center flex-col gap-1 rounded-lg bg-white'>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Position :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{position}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Position')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Department :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{department}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Department')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Join Date :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{joinDate}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Join Date')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Resign Date :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{resignDate}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Resign Date')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                    </View>
                    <Text className='w-full py-2 text-[10px] text-blue-800 text-center font-bold rounded-t-lg rounded-b-sm border border-b-2 border-blue-800 bg-blue-100'>Emergency Contact</Text>
                    <View className='w-full flex p-4 justify-between items-center flex-col gap-1 rounded-lg bg-white'>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Emergency Name :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{emergencyName}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Emergency Name')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Emergency Phone :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{emergencyPhone}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Emergency Phone')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                        <View className='w-full flex flex-row justify-between gap-2 px-3'>
                          <Text className='text-[12px] font-semibold text-blue-900'>Emergency Relation :</Text>
                          <View className='flex flex-row items-center gap-2'>
                            <Text className='text-[12px] text-blue-900'>{emergencyRelation}</Text>
                            {buttonEdit&&(
                            <Pressable onPress={()=>{setPopUpEditEmployee('Emergency Relation')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                              </Pressable>
                            )}
                          </View>
                        </View>
                    </View>
                </View>
              </ScrollView>
            </View>
          </>
        ):null}
        

        <View className='w-full flex flex-row justify-between items-center gap-2' style={{position: 'absolute', bottom: 10}}>
          {(selectMenu==='Info'&&employmentStatus==='unknown'&&fullName==='unknown'&&gender==='unknown'&&birthDate==='unknown'&&taxNumber==='unknown'&&identityNumber==='unknown'&&phoneNumber==='unknown'&&emailEmployee==='unknown'&&address==='unknown'&&position==='unknown'&&department==='unknown'&&joinDate==='unknown'&&resignDate==='unknown'&&emergencyName==='unknown'&&emergencyPhone==='unknown'&&emergencyRelation==='unknown')?(
            <Pressable onPress={() => {setPopUpCreate(true)}}
              className='h-[50px] mb-10 flex-1 flex-row justify-center items-center bg-blue-500 border border-b-2 border-blue-900 rounded-lg '>
              <Text className=' font-bold text-[15px] text-white'>
                Create Data
              </Text>
            </Pressable>
          ):(selectMenu==='Info')?(
            <Pressable onPress={() => {setButtonEdit(!buttonEdit);setEmailEmployeeCreate(email.toString())}}
              className='h-[50px] mb-10 flex-1 flex-row justify-center items-center bg-blue-500 border border-b-2 border-blue-900 rounded-lg '>
              <Text className=' font-bold text-[15px] text-white'>
                Edit Data
              </Text>
            </Pressable>
          ):null}
          <Pressable onPress={() => {setPopUpDelete('true')}}
            className='h-[50px] mb-10 flex-1 flex-row justify-center items-center bg-white border border-b-2 border-blue-800 rounded-lg '>
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
                className='text-black flex w-full p-[10px] pl-[15px] text-[12px] flex-row justify-center items-center border-[1px] border-blue-800 rounded-lg mt-4'
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
            <View className='w-full bg-white pt-[60px] p-[15px] rounded-lg flex flex-col justify-start items-center'>
              <View className='w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full bg-[#FF0066] flex justify-center items-center'>
                <Image source={require("../../assets/icons/trash.png")} style={{ width: 25, height: 28 }} tintColor={"#ffffff"} className='mb-5'/>
              </View>
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
                  }} className={`w-[50%] border border-b-[2px] border-blue-800 bg-[#FF0066] rounded-lg py-[10px] flex justify-center items-center`}>
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
                <Pressable onPress={() => {setPopUpRole(false)}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
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
              <Text className='text-[12px] text-blue-900 w-full text-center font-bold'>
                Change User
              </Text>
              <Text className='text-[10px] text-blue-900 w-full mb-3 text-justify'>
                Only fill out the fields you wish to change. If you are changing your password, please provide the confirmation as well.
              </Text>
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Email'
                value={emailNew}
                onChangeText={setEmailNew}
              />
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
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
      
      {/* POPUP */}
      {popUpEditEmployee!=='' && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-70 bg-black'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <Text className='text-[12px] text-blue-900 w-full mb-3 text-center font-bold'>
                Change {popUpEditEmployee}
              </Text>
              {popUpEditEmployee==='Employment Status'?(
                <>
                  <View className='w-full flex flex-row gap-2'>
                    <Pressable onPress={() => {setFillEditEmployee('active')}} className={`flex-1 overflow-hidden rounded-lg border border-b-2 border-blue-800 ${fillEditEmployee==='active'?"opacity-100":"opacity-40"}`}>
                      <LinearGradient colors={['#ffa850', '#E96500']} className='w-full py-2 flex justify-center items-center'>
                        <Text className='font-bold text-white text-[17px]'>active</Text>
                      </LinearGradient>
                    </Pressable>
                    <Pressable onPress={() => {setFillEditEmployee('probation')}} className={`flex-1 overflow-hidden rounded-lg border border-b-2 border-blue-800 ${fillEditEmployee==='resigned'?"opacity-100":"opacity-40"}`}>
                      <LinearGradient colors={['#ffa850', '#E96500']} className='w-full py-2 flex justify-center items-center'>
                        <Text className='font-bold text-white text-[17px]'>resigned</Text>
                      </LinearGradient>
                    </Pressable>
                  </View>
                  <View className='w-full flex flex-row gap-2'>
                    <Pressable onPress={() => {setFillEditEmployee('terminated')}} className={`flex-1 overflow-hidden rounded-lg border border-b-2 border-blue-800 ${fillEditEmployee==='terminated'?"opacity-100":"opacity-40"}`}>
                      <LinearGradient colors={['#ffa850', '#E96500']} className='w-full py-2 flex justify-center items-center'>
                        <Text className='font-bold text-white text-[17px]'>terminated</Text>
                      </LinearGradient>
                    </Pressable>
                    <Pressable onPress={() => {setFillEditEmployee('probation')}} className={`flex-1 overflow-hidden rounded-lg border border-b-2 border-blue-800 ${fillEditEmployee==='probation'?"opacity-100":"opacity-40"}`}>
                      <LinearGradient colors={['#ffa850', '#E96500']} className='w-full py-2 flex justify-center items-center'>
                        <Text className='font-bold text-white text-[17px]'>probation</Text>
                      </LinearGradient>
                    </Pressable>
                  </View>
                </>
              ):(
                <TextInput
                  className='text-black p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                  placeholder={'New '+popUpEditEmployee}
                  value={fillEditEmployee}
                  onChangeText={setFillEditEmployee}
                />
              )}
              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEditEmployee('');setFillEditEmployee('')}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-blue-800'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                    handleUpdateEmployee();
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
      
      {/* POPUP */}
      {popUpCreate && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-70 bg-black'/>
          <View className='w-full h-full px-[50px] pt-[60px] flex justify-start items-center absolute z-[1000] gap-2'>
            <View className='w-full bg-white p-[10px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='w-full rounded-md overflow-hidden'>
                <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full p-3 flex justify-center items-center'>
                  <Text className='text-[13px] text-white w-full text-center font-bold'>
                    Create new data
                  </Text>
                </LinearGradient>
              </View>
              <View className='px-[5px] flex flex-row justify-between items-center gap-2'>
                <Pressable onPress={() => {setSelectPopCreate('personal')}} className={`w-[30px] h-[30px] rounded-full border border-b-2 border-blue-700 ${selectPopCreate==='personal'&&'bg-blue-500'} flex justify-center items-center`}>
                  <Text className={`font-bold ${selectPopCreate==='personal'&&'text-white'} text-[15px] mb-[1px]`}>1</Text>
                </Pressable>
                <View className={`flex-1 h-[1px] ${selectPopCreate==='personal'||selectPopCreate==='contact'?'bg-blue-600':'bg-blue-100'}`}/>
                <Pressable onPress={() => {setSelectPopCreate('contact')}} className={`w-[30px] h-[30px] rounded-full border border-b-2 border-blue-700 ${selectPopCreate==='contact'&&'bg-blue-500'} flex justify-center items-center`}>
                  <Text className={`font-bold ${selectPopCreate==='contact'&&'text-white'} text-[15px] mb-[1px]`}>2</Text>
                </Pressable>
                <View className={`flex-1 h-[1px] ${selectPopCreate==='contact'||selectPopCreate==='job'?'bg-blue-600':'bg-blue-100'}`}/>
                <Pressable onPress={() => {setSelectPopCreate('job')}} className={`w-[30px] h-[30px] rounded-full border border-b-2 border-blue-700 ${selectPopCreate==='job'&&'bg-blue-500'} flex justify-center items-center`}>
                  <Text className={`font-bold ${selectPopCreate==='job'&&'text-white'} text-[15px] mb-[1px]`}>3</Text>
                </Pressable>
                <View className={`flex-1 h-[1px] ${selectPopCreate==='job'||selectPopCreate==='emergency'?'bg-blue-600':'bg-blue-100'}`}/>
                <Pressable onPress={() => {setSelectPopCreate('emergency')}} className={`w-[30px] h-[30px] rounded-full border border-b-2 border-blue-700 ${selectPopCreate==='emergency'&&'bg-blue-500'} flex justify-center items-center`}>
                  <Text className={`font-bold ${selectPopCreate==='emergency'&&'text-white'} text-[15px] mb-[1px]`}>4</Text>
                </Pressable>
              </View>
            </View>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              {selectPopCreate==='personal'?(
                <>
                  <Text className='text-[12px] w-full text-center font-bold text-blue-700 pl-2'>{selectPopCreate}</Text>
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Employee Id :</Text>
                    <Text className='text-[10px] font-bold text-blue-600 w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black text-[12px] border-[1.5px] border-blue-700 p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
                    placeholder={'New '}
                    value={employeeIdCreate}
                    onChangeText={setEmployeeIdCreate}
                  />
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Full Name :</Text>
                    <Text className='text-[10px] font-bold text-blue-600 w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black border-[1.5px] border-blue-700 text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
                    placeholder={'New '}
                    value={fullNameCreate}
                    onChangeText={setFullNameCreate}
                  />
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Gender : male/female</Text>
                    <Text className='text-[10px] font-bold text-blue-600 w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black border-[1.5px] border-blue-700 text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
                    placeholder={'New '}
                    value={genderCreate}
                    onChangeText={setGenderCreate}
                  />
                  <Text className='text-[10px] w-full pl-2'>Birth Date : year-month-day</Text>
                  <TextInput
                    className='text-black text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder={'2000-01-01'}
                    value={birthDateCreate}
                    onChangeText={setBirthDateCreate}
                  />
                  <Text className='text-[10px] w-full pl-2'>Tax Number :</Text>
                  <TextInput
                    className='text-black text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder={'New '}
                    value={taxNumberCreate}
                    onChangeText={setTaxNumberCreate}
                  />
                  <Text className='text-[10px] w-full pl-2'>Identity Number :</Text>
                  <TextInput
                    className='text-black text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder={'New '}
                    value={identityNumberCreate}
                    onChangeText={setIdentityNumberCreate}
                  />
                </>
              ):(selectPopCreate==='contact')?(
                <>
                  <Text className='text-[12px] w-full text-center font-bold text-blue-700 pl-2'>{selectPopCreate}</Text>
                  <Text className='text-[10px] w-full pl-2'>Phone Number :</Text>
                  <TextInput
                    className='text-black text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder={'New '}
                    value={phoneNumberCreate}
                    onChangeText={setPhoneNumberCreate}
                  />
                  <Text className='text-[10px] w-full pl-2'>Email Employee :</Text>
                  <TextInput
                    className='text-black text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder={'New '}
                    value={emailEmployeeCreate}
                    onChangeText={setEmailEmployeeCreate}
                    editable={false}
                  />
                  <Text className='text-[10px] w-full pl-2'>Address :</Text>
                  <TextInput
                    className='text-black text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder={'New '}
                    value={addressCreate}
                    onChangeText={setAddressCreate}
                  />
                </>
              ):(selectPopCreate==='job')?(
                <>
                  <Text className='text-[12px] w-full text-center font-bold text-blue-700 pl-2'>{selectPopCreate}</Text>
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Position :</Text>
                    <Text className='text-[10px] font-bold text-blue-600 w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black border-[1.5px] border-blue-700 text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
                    placeholder={'New '}
                    value={positionCreate}
                    onChangeText={setPositionCreate}
                  />
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Department :</Text>
                    <Text className='text-[10px] font-bold text-blue-600 w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black border-[1.5px] border-blue-700 text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
                    placeholder={'New '}
                    value={departmentCreate}
                    onChangeText={setDepartmentCreate}
                  />
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Join date : year-month-day</Text>
                    <Text className='text-[10px] font-bold text-blue-600 w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black border-[1.5px] border-blue-700 text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
                    placeholder={'2000-01-01'}
                    value={joinDateCreate}
                    onChangeText={setJoinDateCreate}
                  />
                  <Text className='text-[10px] w-full pl-2'>Resign Date : year-month-day</Text>
                  <TextInput
                    className='text-black text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder={'2000-01-01'}
                    value={resignDateCreate}
                    onChangeText={setResignDateCreate}
                  />
                </>
              ):(selectPopCreate==='emergency')?(
                <>
                  <Text className='text-[12px] w-full text-center font-bold text-blue-700 pl-2'>{selectPopCreate}</Text>
                  <Text className='text-[10px] w-full pl-2'>Emergency Name :</Text>
                  <TextInput
                    className='text-black text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder={'New '}
                    value={emergencyNameCreate}
                    onChangeText={setEmergencyNameCreate}
                  />
                  <Text className='text-[10px] w-full pl-2'>Emergency Phone :</Text>
                  <TextInput
                    className='text-black text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder={'New '}
                    value={emergencyPhoneCreate}
                    onChangeText={setEmergencyPhoneCreate}
                  />
                  <Text className='text-[10px] w-full pl-2'>Emergency Relation :</Text>
                  <TextInput
                    className='text-black text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder={'New '}
                    value={emergencyRelationCreate}
                    onChangeText={setEmergencyRelationCreate}
                  />
                </>
              ):null}
              {error !== '' && (
                <Text className={`w-full text-[12px] font-bold border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {
                  if(selectPopCreate==='contact'){
                    setSelectPopCreate('personal')
                  }else if(selectPopCreate==='job'){
                    setSelectPopCreate('contact')
                  }else if(selectPopCreate==='emergency'){
                    setSelectPopCreate('job')
                  }else{
                    setPopUpCreate(false)
                  }
                  }} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-blue-800'>
                  {selectPopCreate==='emergency'||selectPopCreate==='contact'||selectPopCreate==='job'?('Previous'):('Cancel')}
                  </Text>
                </Pressable>
                {(selectPopCreate==='personal'||selectPopCreate==='contact'||selectPopCreate==='job')&&(
                  <Pressable onPress={() => {
                    setError('');
                    if(selectPopCreate==='personal'){
                      setSelectPopCreate('contact')
                    }else if(selectPopCreate==='contact'){
                      setSelectPopCreate('job')
                    }else if(selectPopCreate==='job'){
                      setSelectPopCreate('emergency')
                    }
                    }} className={`w-[50%] border border-b-[2px] border-blue-800 bg-blue-500 rounded-lg py-[10px] flex justify-center items-center`}>
                    <Text className='font-bold text-[12px] text-white'>
                      Next
                    </Text>
                  </Pressable>
                )}
                {selectPopCreate==='emergency'&&(
                  <Pressable onPress={() => {
                    setError('');
                    handleCreate();
                    }} className={`w-[50%] border border-b-[2px] border-blue-800 bg-blue-500 rounded-lg py-[10px] flex justify-center items-center`}>
                    <Text className='font-bold text-[12px] text-white'>
                      {loading ? 'Creating...' : 'Create'}
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
            <Pressable onPress={()=>{
              setPopUpCreate(false)
              }} className='border-2 border-white w-[50px] h-[50px] rounded-full flex justify-center items-center'>
              <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 17, height: 17 }} tintColor={"#ffffff"}/>
            </Pressable>
          </View>
        </>
      )}

    </View>
  )
}

export default dataKaryawanDetail