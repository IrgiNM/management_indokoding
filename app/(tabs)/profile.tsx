import HeaderBack from '@/components/headerBack'
import { updateUser } from '@/hooks/api'
import { createEmployeeDataFunction, dataMyEmployeeFunction, updateEmployeeDataFunction } from '@/hooks/dataEmployeeFunction'
import { dataFinanceKaryawan } from '@/hooks/dataFinanceKaryawan'
import { myOvertimeLogFunction } from '@/hooks/dataOvertimeLogFunction'
import { getReimburseUserHome } from '@/hooks/dataReimburseFunction'
import { formatRupiah } from '@/hooks/formatRupiahFunction'
import { logoutUser } from '@/hooks/tokenFunction'
import { getDataUserLogin } from '@/hooks/userFunction'
import { ReimbursementType } from '@/types/reimburseDataType'
import { Image, ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'

const Profile = () => {
  const router = useRouter();
  const dataUserLogin = getDataUserLogin();
  const emailData = dataUserLogin.email;
  const displayName = dataUserLogin.username ? dataUserLogin.username.replace(/_/g, ' ') : '';
  const [totalReimburse, setTotalReimburse] = useState(0);
  const [dataReimburse, setDataReimburse] = useState<ReimbursementType[]>([]);
  const monthNumber = new Date().toISOString().slice(5, 7);
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [popUpPassword, setPopUpPassword] = useState(false);
  const [popUpLogout, setPopUpLogout] = useState(false);
  const [username, setUsername] = useState('')
  const [emailNew, setEmailNew] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const {dataMyOvertimeLog, dataMyOvertimeLogThisMonth, dataMonthsNumber} = myOvertimeLogFunction();
  const { dataFinancePerUser } = dataFinanceKaryawan(dataUserLogin.email);
  const baseSalaryValue = Number(dataFinancePerUser?.base_salary ?? 0);
  const overtimeLogThisMonth = Number(dataMyOvertimeLogThisMonth.filter(item=>item.status==="approved").reduce((sum,item)=>sum + Number(item.duration_hours),0));
  const totalOvertimePrice = overtimeLogThisMonth * ((baseSalaryValue/173)*2);

  const { dataMyEmployee } = dataMyEmployeeFunction();
  

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
  const [popUpEditEmployee, setPopUpEditEmployee] = useState('');
  const [popUpCreate, setPopUpCreate] = useState(false);
  const [fillEditEmployee, setFillEditEmployee] = useState('');
  const [selectPopCreate, setSelectPopCreate] = useState('personal');
  const [selectMenu, setSelectMenu] = useState('Info');

  useEffect(()=>{
    setEmailEmployeeCreate(dataUserLogin.email)
  }, [dataUserLogin])

  useEffect(()=>{
    setEmlpoyeeId(dataMyEmployee.employee_id?dataMyEmployee.employee_id:(dataMyEmployee.employee_id==='')?'unknown':'unknown');
    setFullName(dataMyEmployee.full_name?dataMyEmployee.full_name:(dataMyEmployee.full_name==='')?'unknown':'unknown');
    setGender(dataMyEmployee.gender?dataMyEmployee.gender:(dataMyEmployee.gender==='')?'unknown':'unknown');
    setBirthDate(dataMyEmployee.birth_date?dataMyEmployee.birth_date:(dataMyEmployee.birth_date==='')?'unknown':'unknown');
    setTaxNumber(dataMyEmployee.tax_number?dataMyEmployee.tax_number:(dataMyEmployee.tax_number==='')?'unknown':'unknown');
    setIdentityNumber(dataMyEmployee.identity_number?dataMyEmployee.identity_number:(dataMyEmployee.identity_number==='')?'unknown':'unknown');
    setPhoneNumber(dataMyEmployee.phone_number?dataMyEmployee.phone_number:(dataMyEmployee.phone_number==='')?'unknown':'unknown');
    setEmailEmployee(dataMyEmployee.email?dataMyEmployee.email:(dataMyEmployee.email==='')?'unknown':'unknown');
    setAddress(dataMyEmployee.address?dataMyEmployee.address:(dataMyEmployee.address==='')?'unknown':'unknown');
    setPosition(dataMyEmployee.position?dataMyEmployee.position:(dataMyEmployee.position==='')?'unknown':'unknown');
    setDepartment(dataMyEmployee.department?dataMyEmployee.department:(dataMyEmployee.department==='')?'unknown':'unknown');
    setJoinDate(dataMyEmployee.join_date?dataMyEmployee.join_date:(dataMyEmployee.join_date==='')?'unknown':'unknown');
    setResignDate(dataMyEmployee.resign_date?dataMyEmployee.resign_date:(dataMyEmployee.resign_date==='')?'unknown':'unknown');
    setEmploymentStatus(dataMyEmployee.employment_status?dataMyEmployee.employment_status:(dataMyEmployee.employment_status==='')?'unknown':'unknown');
    setEmergencyName(dataMyEmployee.emergency_name?dataMyEmployee.emergency_name:(dataMyEmployee.emergency_name==='')?'unknown':'unknown');
    setEmergencyPhone(dataMyEmployee.emergency_phone?dataMyEmployee.emergency_phone:(dataMyEmployee.emergency_phone==='')?'unknown':'unknown');
    setEmergencyRelation(dataMyEmployee.emergency_relation?dataMyEmployee.emergency_relation:(dataMyEmployee.emergency_relation==='')?'unknown':'unknown');
  }, [dataMyEmployee])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReimburseUserHome(monthNumber);
        setDataReimburse(res);
      } catch (err) {
        // console.error(err);
      }
    };
  
    fetchData();
  }, [monthNumber]);

  useEffect(()=>{
    const total = dataReimburse.reduce((sum, item) => sum + Number(item.total_amount || 0), 0);
    setTotalReimburse(total);
  }, [dataReimburse])

  const handleEditUser = async ()=>{
    setLoading(true);
    try{
      const body = {
        ...(username !== '' && { username: username }),
        ...(emailNew !== '' && { email: emailNew }),
      };
      const res = await updateUser(dataUserLogin.email, body);
      if(res !== undefined){
        // console.error('User update successfully');
        setPopUpEdit(false);
        router.push("../profile");
      }
    }catch{
      // console.error('Failed to update user');
    }finally{
      setLoading(false);
    }
  }

  const handleEditPasswordUser = async ()=>{
    setLoading(true);
    try{
      const body = {
        password: password,
      };
      if(password !== passwordConfirm){
        setError('Password dan konfirmasi password tidak sesuai.');
        return;
      }
      const res = await updateUser(dataUserLogin.email, body);
      if(res !== undefined){
        // console.error('User update successfully');
        setPopUpPassword(false);
        router.push("../profile");
      }
    }catch{
      // console.error('Failed to update user');
    }finally{
      setLoading(false);
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
      router.replace('/profile')
    }else{
      setLoading(false)
      setError('gagal update')
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
    const res = await createEmployeeDataFunction(emailData, dataSend)
    if(res){
      setLoading(false);
      setPopUpCreate(false)
      router.replace('/profile')
    }else{
      setLoading(false);
      setError('gagal create');
    }
  }
  
  return (
    <View className='bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      
      <ImageBackground
      source={require('../../assets/images/golang-bg.png')}
      imageStyle={{ borderRadius: 25, }} style={{ width: '100%' }} className='w-full'
      >
        <View className='relative w-full h-[200px] rounded-3xl flex justify-start items-center'>
          <HeaderBack textColor='text-white' title='My Profile' type='django' backTo={'/home'}/>
          <View className='absolute flex justify-center items-center bottom-[-30px] w-[100px] h-[100px] overflow-hidden border-[10px] border-white bg-[#00d7f4] rounded-full'>
            <LinearGradient colors={['#00d7f4', '#009fb4']} className='w-full h-full flex flex-row justify-center items-center'>
              <Text className='text-[#00495f] font-bold text-[30px]'>
                  {displayName.charAt(0).toUpperCase()}{displayName.charAt(displayName.length - 1).toUpperCase()}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>

      <View className='w-full px-[30px] flex justify-start items-center mt-[25px]'>
        <Text className='font-bold text-center text-[#00495f]'>
          {displayName}
        </Text>
        <Text className='text-[#00495f] mb-6'>
          {dataUserLogin.email}
        </Text>

        <View className='w-full h-[58%] rounded-md bg-[#dbf6ff]'>
          <ScrollView className='w-full h-full p-2'>

            <View className='w-full p-4 rounded-md bg-white border border-b-2 border-purple-800 flex flex-row justify-between items-center'>
              <Text className='text-[12px] text-purple-800'>
                Reimburse this month :
              </Text>
              <Text className='text-[12px] text-purple-800 font-bold'>
                {formatRupiah(totalReimburse)}
              </Text>
            </View>
            <Pressable onPress={() => {router.replace('/history')}} className='p-2 w-full flex flex-row justify-center items-center rounded-b-lg rounded-t-sm my-1 bg-purple-200 border border-b-2 border-purple-800'
            >
              <Text className='mr-2 text-[10px] text-purple-800 font-bold'>
                  History Reimburse
              </Text>
              <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 6, height: 8, marginLeft: 5 }} tintColor={"purple"}/>
            </Pressable>
            <View className='w-full p-4 rounded-md bg-white border border-b-2 border-orange-800 flex flex-row justify-between items-center'>
              <Text className='text-[12px] text-orange-800'>
                Overtime this month :
              </Text>
              <Text className='text-[12px] text-orange-800 font-bold'>
                {formatRupiah(totalOvertimePrice)}
              </Text>
            </View>
            <Pressable onPress={() => {router.replace('/(detail)/overtimeLog')}} className='p-2 w-full flex flex-row justify-center items-center   rounded-b-lg rounded-t-sm mt-1 bg-orange-200 border border-b-2 border-orange-800'
            >
              <Text className='mr-2 text-[10px] text-orange-800 font-bold'>
                  History Overtime Log
              </Text>
              <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 6, height: 8, marginLeft: 5 }} tintColor={"orange"}/>
            </Pressable>
            <View className='w-full p-2 rounded-md bg-white flex flex-col justify-start gap-1 items-center'>
              
              <View className='w-full flex p-4 border border-b-2 border-[#006381] justify-between items-center flex-col rounded-lg bg-white'>
                <View className='w-full flex flex-row justify-between items-center gap-2 px-3'>
                  <Text className='text-[12px] font-semibold text-[#002531]'>Employment Status :</Text>
                  <View className='flex flex-row items-center gap-2'>
                    <View className='overflow-hidden rounded-lg border border-b-2 border-[#006381]'>
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
              </View>
              <Text className='w-full py-2 text-[10px] text-[#002531] text-center font-bold rounded-t-lg rounded-b-sm border border-b-2 border-[#006381] bg-[#e7feff]'>Personal Information</Text>
              <View className='w-full flex p-4 justify-between items-center flex-col gap-1 rounded-lg bg-white'>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Username :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{displayName??'unknown'}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEdit(true)}} className="w-[25px] h-[25px] bg-[#ecf1f9] rounded-md border-[.5px] border-b-[1px] border-[#0040b8] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#0040b8"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Employee Id :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{emlpoyeeId}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Employee Id')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Full Name :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{fullName}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Full Name')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Gender :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{gender}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Gender')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Birth Date :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{birthDate}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Birth Date')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Tax Number :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{taxNumber}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Tax Number')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Identity Number :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{identityNumber}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Identity Number')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
              </View>
              <Text className='w-full py-2 text-[10px] text-[#002531] text-center font-bold rounded-t-lg rounded-b-sm border border-b-2 border-[#006381] bg-[#e7feff]'>Contact</Text>
              <View className='w-full flex p-4 justify-between items-center flex-col gap-1 rounded-lg bg-white'>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Phone Number :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{phoneNumber}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Phone Number')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Email :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{emailEmployee}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEdit(true)}} className="w-[25px] h-[25px] bg-[#ecf1f9] rounded-md border-[.5px] border-b-[1px] border-[#0040b8] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#0040b8"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Address :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{address}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Address')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
              </View>
              <Text className='w-full py-2 text-[10px] text-[#002531] text-center font-bold rounded-t-lg rounded-b-sm border border-b-2 border-[#006381] bg-[#e7feff]'>Job Information</Text>
              <View className='w-full flex p-4 justify-between items-center flex-col gap-1 rounded-lg bg-white'>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Position :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{position}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Position')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Department :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{department}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Department')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Join Date :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{joinDate}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Join Date')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Resign Date :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{resignDate}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Resign Date')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
              </View>
              <Text className='w-full py-2 text-[10px] text-[#002531] text-center font-bold rounded-t-lg rounded-b-sm border border-b-2 border-[#006381] bg-[#e7feff]'>Emergency Contact</Text>
              <View className='w-full flex p-4 justify-between items-center flex-col gap-1 rounded-lg bg-white'>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Emergency Name :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{emergencyName}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Emergency Name')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Emergency Phone :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{emergencyPhone}</Text>
                      {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditEmployee('Emergency Phone')}} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between gap-2 px-3'>
                    <Text className='text-[12px] font-semibold text-[#002531]'>Emergency Relation :</Text>
                    <View className='flex flex-row items-center gap-2'>
                      <Text className='text-[12px] text-[#002531]'>{emergencyRelation}</Text>
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

        <View className='w-full flex justify-start items-center gap-2 mt-2'>
          <View className='w-full flex flex-row gap-2'>
            <Pressable onPress={() => {setPopUpEdit(true)}} className='flex-1 flex-row justify-between items-center w-full bg-[#e7feff] rounded-lg border border-b-2 border-[#006381] p-[10px]'> 
              <View className='flex flex-row justify-start items-center gap-2'>
                <Image source={require("../../assets/icons/email.png")} style={{ width: 12, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[10px] font-bold text-[#002531]'>
                  Edit Profile
                </Text>
              </View>
              <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 6, height: 8, marginLeft: 5 }} tintColor={"#006381"}/>
            </Pressable>

            <Pressable onPress={() => {setPopUpPassword(true)}} className='flex-1 flex-row justify-between items-center w-full bg-[#e7feff] rounded-lg border border-b-2 border-[#006381] p-[10px]'> 
              <View className='flex flex-row justify-start items-center gap-2'>
                <Image source={require("../../assets/icons/password.png")} style={{ width: 17, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[10px] font-bold text-[#002531]'>
                  Change Password
                </Text>
              </View>
              <Image source={require("../../assets/objek/arrow-more.png")} style={{ width: 6, height: 8, marginLeft: 5 }} tintColor={"#006381"}/>
            </Pressable>
          </View>

          <View className='w-full flex flex-row items-center gap-2'>
            <Pressable onPress={() => {setPopUpLogout(true)}} className='w-[80%] flex flex-row justify-center items-center overflow-hidden rounded-full'
            >
              <LinearGradient colors={['#009fb4', '#008091']} className='w-full h-full p-[15px] flex flex-row justify-center items-center'>
                <Text className='mr-2 text-white font-bold'>
                    Log Out
                </Text>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={() => {
              if(selectMenu==='Info'&&employmentStatus==='unknown'&&fullName==='unknown'&&gender==='unknown'&&birthDate==='unknown'&&taxNumber==='unknown'&&identityNumber==='unknown'&&phoneNumber==='unknown'&&emailEmployee==='unknown'&&address==='unknown'&&position==='unknown'&&department==='unknown'&&joinDate==='unknown'&&resignDate==='unknown'&&emergencyName==='unknown'&&emergencyPhone==='unknown'&&emergencyRelation==='unknown'){
                setPopUpCreate(true)
              }else{
                setButtonEdit(!buttonEdit)
              }
            }} className='w-[50px] h-[50px] flex flex-row justify-center items-center overflow-hidden rounded-full'
            >
              <LinearGradient colors={['#009fb4', '#008091']} className='w-full h-full p-[5px] flex flex-row justify-center items-center'>
                <View className={`w-full h-full ${buttonEdit?'opacity-100 border border-white rounded-full':'opacity-40'} flex justify-center items-center`}>
                  <Image source={require('../../assets/icons/edit.png')} style={{ width: 17, height: 17 }} tintColor={"#ffffff"}/>
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>

      {/* POPUP EDIT*/}
      {popUpEdit && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#002531]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/email.png")} style={{ width: 12, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[12px] font-bold text-[#002531]'>
                  Edit Profile
                </Text>
              </View>
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
              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEdit(false)}} className='w-[50%] border border-b-[2px] border-[#006381] bg-[#e7feff] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                    handleEditUser();
                  }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#22cde3] rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    {loading ? 'Saving...' : 'Save'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP CHANGE PASSWORD*/}
      {popUpPassword && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#002531]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/password.png")} style={{ width: 17, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[12px] font-bold text-[#002531]'>
                  Change Password
                </Text>
              </View>
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
                <Pressable onPress={() => {setPopUpPassword(false)}} className='w-[50%] border border-b-[2px] border-[#006381] bg-[#e7feff] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                    handleEditPasswordUser();
                  }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#22cde3] rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    {loading ? 'Saving...' : 'Save'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP LOGOUT*/}
      {popUpLogout && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#002531]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-col justify-start items-center gap-2'>
                <View className='w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full bg-[#FF0066] flex justify-center items-center'>
                  <Image source={require("../../assets/icons/power.png")} style={{ width: 30, height: 33 }} tintColor={"#ffffff"} className='mb-5'/>
                </View>
                <Text className='text-[12px] w-[130px] text-center mt-[50px] text-[#002531]'>
                  Are you sure you want to log out?
                </Text>
              </View>
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpLogout(false)}} className='w-[50%] border border-b-[2px] border-[#006381] bg-[#e7feff] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {
                    logoutUser();
                  }} className={`w-[50%] bg-[#e0216e] rounded-lg py-[10px] flex justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-white'>
                    Log Out
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP Edit Employee */}
      {popUpEditEmployee!=='' && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-70 bg-black'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <Text className='text-[12px] text-[#002531] w-full mb-3 text-center font-bold'>
                Change {popUpEditEmployee}
              </Text>
              {popUpEditEmployee==='Employment Status'?(
                <>
                  <View className='w-full flex flex-row gap-2'>
                    <Pressable onPress={() => {setFillEditEmployee('active')}} className={`flex-1 overflow-hidden rounded-lg border border-b-2 border-[#006381] ${fillEditEmployee==='active'?"opacity-100":"opacity-40"}`}>
                      <LinearGradient colors={['#ffa850', '#E96500']} className='w-full py-2 flex justify-center items-center'>
                        <Text className='font-bold text-white text-[17px]'>active</Text>
                      </LinearGradient>
                    </Pressable>
                    <Pressable onPress={() => {setFillEditEmployee('resigned')}} className={`flex-1 overflow-hidden rounded-lg border border-b-2 border-[#006381] ${fillEditEmployee==='resigned'?"opacity-100":"opacity-40"}`}>
                      <LinearGradient colors={['#ffa850', '#E96500']} className='w-full py-2 flex justify-center items-center'>
                        <Text className='font-bold text-white text-[17px]'>resigned</Text>
                      </LinearGradient>
                    </Pressable>
                  </View>
                  <View className='w-full flex flex-row gap-2'>
                    <Pressable onPress={() => {setFillEditEmployee('terminated')}} className={`flex-1 overflow-hidden rounded-lg border border-b-2 border-[#006381] ${fillEditEmployee==='terminated'?"opacity-100":"opacity-40"}`}>
                      <LinearGradient colors={['#ffa850', '#E96500']} className='w-full py-2 flex justify-center items-center'>
                        <Text className='font-bold text-white text-[17px]'>terminated</Text>
                      </LinearGradient>
                    </Pressable>
                    <Pressable onPress={() => {setFillEditEmployee('probation')}} className={`flex-1 overflow-hidden rounded-lg border border-b-2 border-[#006381] ${fillEditEmployee==='probation'?"opacity-100":"opacity-40"}`}>
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
                <Pressable onPress={() => {setPopUpEditEmployee('');setFillEditEmployee('')}} className='w-[50%] border border-b-[2px] border-[#006381] bg-[#e7feff] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#002531]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                    handleUpdateEmployee();
                  }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#009fb4] rounded-lg py-[10px] flex justify-center items-center`}>
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
                <LinearGradient colors={['#009fb4', '#008091']} className='w-full p-3 flex justify-center items-center'>
                  <Text className='text-[13px] text-white w-full text-center font-bold'>
                    Create new data
                  </Text>
                </LinearGradient>
              </View>
              <View className='px-[5px] flex flex-row justify-between items-center gap-2'>
                <Pressable onPress={() => {setSelectPopCreate('personal')}} className={`w-[30px] h-[30px] rounded-full border border-b-2 border-[#006381] ${selectPopCreate==='personal'&&'bg-[#009fb4]'} flex justify-center items-center`}>
                  <Text className={`font-bold ${selectPopCreate==='personal'&&'text-white'} text-[15px] mb-[1px]`}>1</Text>
                </Pressable>
                <View className={`flex-1 h-[1px] ${selectPopCreate==='personal'||selectPopCreate==='contact'?'bg-blue-600':'bg-blue-100'}`}/>
                <Pressable onPress={() => {setSelectPopCreate('contact')}} className={`w-[30px] h-[30px] rounded-full border border-b-2 border-[#006381] ${selectPopCreate==='contact'&&'bg-[#009fb4]'} flex justify-center items-center`}>
                  <Text className={`font-bold ${selectPopCreate==='contact'&&'text-white'} text-[15px] mb-[1px]`}>2</Text>
                </Pressable>
                <View className={`flex-1 h-[1px] ${selectPopCreate==='contact'||selectPopCreate==='job'?'bg-blue-600':'bg-blue-100'}`}/>
                <Pressable onPress={() => {setSelectPopCreate('job')}} className={`w-[30px] h-[30px] rounded-full border border-b-2 border-[#006381] ${selectPopCreate==='job'&&'bg-[#009fb4]'} flex justify-center items-center`}>
                  <Text className={`font-bold ${selectPopCreate==='job'&&'text-white'} text-[15px] mb-[1px]`}>3</Text>
                </Pressable>
                <View className={`flex-1 h-[1px] ${selectPopCreate==='job'||selectPopCreate==='emergency'?'bg-blue-600':'bg-blue-100'}`}/>
                <Pressable onPress={() => {setSelectPopCreate('emergency')}} className={`w-[30px] h-[30px] rounded-full border border-b-2 border-[#006381] ${selectPopCreate==='emergency'&&'bg-[#009fb4]'} flex justify-center items-center`}>
                  <Text className={`font-bold ${selectPopCreate==='emergency'&&'text-white'} text-[15px] mb-[1px]`}>4</Text>
                </Pressable>
              </View>
            </View>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              {selectPopCreate==='personal'?(
                <>
                  <Text className='text-[12px] w-full text-center font-bold text-[#006381] pl-2'>{selectPopCreate}</Text>
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Employee Id :</Text>
                    <Text className='text-[10px] font-bold text-[#006381] w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black text-[12px] border-[1.5px] border-[#006381] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
                    placeholder={'New '}
                    value={employeeIdCreate}
                    onChangeText={setEmployeeIdCreate}
                  />
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Full Name :</Text>
                    <Text className='text-[10px] font-bold text-[#006381] w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black border-[1.5px] border-[#006381] text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
                    placeholder={'New '}
                    value={fullNameCreate}
                    onChangeText={setFullNameCreate}
                  />
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Gender : male/female</Text>
                    <Text className='text-[10px] font-bold text-[#006381] w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black border-[1.5px] border-[#006381] text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
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
                  <Text className='text-[12px] w-full text-center font-bold text-[#006381] pl-2'>{selectPopCreate}</Text>
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
                  <Text className='text-[12px] w-full text-center font-bold text-[#006381] pl-2'>{selectPopCreate}</Text>
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Position :</Text>
                    <Text className='text-[10px] font-bold text-[#006381] w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black border-[1.5px] border-[#006381] text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
                    placeholder={'New '}
                    value={positionCreate}
                    onChangeText={setPositionCreate}
                  />
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Department :</Text>
                    <Text className='text-[10px] font-bold text-[#006381] w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black border-[1.5px] border-[#006381] text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
                    placeholder={'New '}
                    value={departmentCreate}
                    onChangeText={setDepartmentCreate}
                  />
                  <View className='w-full flex flex-row gap-2'>
                    <Text className='text-[10px] pl-2'>Join date : year-month-day</Text>
                    <Text className='text-[10px] font-bold text-[#006381] w-full'>required</Text>
                  </View>
                  <TextInput
                    className='text-black border-[1.5px] border-[#006381] text-[12px] p-[10px] pl-[15px] w-full flex flex-row justify-center items-center rounded-lg'
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
                  <Text className='text-[12px] w-full text-center font-bold text-[#006381] pl-2'>{selectPopCreate}</Text>
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
                  }} className='w-[50%] border border-b-[2px] border-[#006381] bg-blue-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#006381]'>
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
                    }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#009fb4] rounded-lg py-[10px] flex justify-center items-center`}>
                    <Text className='font-bold text-[12px] text-white'>
                      Next
                    </Text>
                  </Pressable>
                )}
                {selectPopCreate==='emergency'&&(
                  <Pressable onPress={() => {
                    setError('');
                    handleCreate();
                    }} className={`w-[50%] border border-b-[2px] border-[#006381] bg-[#009fb4] rounded-lg py-[10px] flex justify-center items-center`}>
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

export default Profile