import HeaderBack from '@/components/headerBack'
import { createBankAccountByUser } from '@/hooks/api'
import { dataMyBankAccountFunction, deleteBankAccountFunction, updateBankAccountFunction } from '@/hooks/dataBankAccountFunction'
import { createFinanceUser, dataFinanceKaryawan, UpdateFinanceUser } from '@/hooks/dataFinanceKaryawan'
import { overtimeLogAdminFunction } from '@/hooks/dataOvertimeLogFunction'
import { fetchDataSettingPerCategory } from '@/hooks/dataSiteSettingFunction'
import { dataUserFunction } from '@/hooks/dataUserFunction'
import { formatRupiah } from '@/hooks/formatRupiahFunction'
import { getDataUserLogin } from '@/hooks/userFunction'
import { BankAccountSendType } from '@/types/bankAccountType'
import { FinanceManagementSendType } from '@/types/financeDataType'
import { siteSettingType } from '@/types/siteSettingType'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
const { width } = Dimensions.get('window');

const historyReimburseKaryawan = () => {
  const router =  useRouter();
  const dataUserLogin = getDataUserLogin();
  const { dataAllNewUser } = dataUserFunction();
  const emailData = dataUserLogin.email;
  const [isActive, setIsActive] = useState('');
  const [Username, setUsername] = useState('');
  const [buttonEdit, setButtonEdit] = useState(false);
  const { dataReimburseUserThisMonth, dataFinancePerUser } = dataFinanceKaryawan(emailData);
  const {dataOvertimeLogByUserThisMonth} = overtimeLogAdminFunction(emailData);
  const [popUpSendUpdate, setPopUpSendUpdate] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [popUpEditSalary, setPopUpEditSalary] = useState(false);
  const [popUpEditTax, setPopUpEditTax] = useState(false);
  const [popUpEditSpouse, setPopUpEditSpouse] = useState(false);
  const [popUpEditChild, setPopUpEditChild] = useState(false);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [dataSetting, setDataSetting] = useState<siteSettingType[]>([]);

  // SALARY DATA
  const [dataSalaryAll, setDataSalaryAll] = useState<FinanceManagementSendType>({
    email: '',
    base_salary: 0,
    spouse_allowance: 0,
    child_allowance: 0,
    enable_bpjs_health: false,
    enable_bpjs_employment: false,
    bpjs_health_rate_percentage: 0,
    bpjs_employment_rate_percentage: 0,
    enable_tax: false,
    tax_rate_percentage: 0,
  });
  const [baseSalary, setBaseSalary] = useState<number>(0);
  const [spouseAmount, setSpouseAmount] = useState<number>(0);
  const [childAmount, setChildAmount] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  
  // CREATE NEW DATA SALARY
  const [dataSalaryAllCreate, setDataSalaryAllCreate] = useState<FinanceManagementSendType>({
    email: '',
    base_salary: 0,
    spouse_allowance: 0,
    child_allowance: 0,
    enable_bpjs_health: false,
    enable_bpjs_employment: false,
    bpjs_health_rate_percentage: 0,
    bpjs_employment_rate_percentage: 0,
    enable_tax: false,
    tax_rate_percentage: 0,
  });
  const [baseSalaryCreate, setBaseSalaryCreate] = useState<number>(0);
  const [spouseAllowanceCreate, setSpouseAllowanceCreate] = useState(false);
  const [childAllowanceCreate, setChildAllowanceCreate] = useState(false);
  const [spouseAmountCreate, setSpouseAmountCreate] = useState<number>(0);
  const [childAmountCreate, setChildAmountCreate] = useState<number>(0);
  const [taxAllowanceCreate, setTaxAllowanceCreate] = useState(false);
  const [taxAmountCreate, setTaxAmountCreate] = useState<number>(0);
  const [healthAllowanceCreate, setHealthAllowanceCreate] = useState(false);
  const [employmentAllowanceCreate, setEmploymentAllowanceCreate] = useState(false);

  // ENABLED ALLOWANCE
  const [spouseAllowance, setSpouseAllowance] = useState(false);
  const [childAllowance, setChildAllowance] = useState(false);
  const [taxAllowance, setTaxAllowance] = useState(false);
  const [healthAllowance, setHealthAllowance] = useState(false);
  const [employAllowance, setEmployAllowance] = useState(false);

  // NILAI
  const baseSalaryValue = Number(dataFinancePerUser?.base_salary ?? 0);
  const totalReimburseValue = Number((dataReimburseUserThisMonth.filter(item=>item.status==="Approved")).reduce((sum,item)=>sum + Number(item.total_amount),0) ?? 0);
  const spouseAmountFromSetting = Number(dataSetting?.find(item => item.key==="spouse_amount")?.value??0);
  const childAmountFromSetting = Number(dataSetting?.find(item => item.key==="child_amount")?.value??0);
  const spouseAllowanceValue = dataFinancePerUser?.spouse_allowance ?? 0;
  const childAllowanceValue = dataFinancePerUser?.child_allowance ?? 0;
  const taxValue = Number(dataFinancePerUser?.tax_rate_percentage ?? 0);
  const taxEnable = dataFinancePerUser?.enable_tax ?? false;
  const bpjsHealthAllowance = dataFinancePerUser?.enable_bpjs_health ?? false;
  const bpjsEmploymentAllowance = dataFinancePerUser?.enable_bpjs_employment ?? false;
  const bpjsHealth = Number(dataSetting?.find(item => item.key==="bpjs_health_percentage")?.value??0);
  const bpjsEmployment = Number(dataSetting?.find(item => item.key==="bpjs_employment_percentage")?.value??0);
  const overtimeLogThisMonth = Number(dataOvertimeLogByUserThisMonth.filter(item=>item.status==="approved").reduce((sum,item)=>sum + Number(item.duration_hours),0));
  
  const totalSpouseAmount = (spouseAllowance?spouseAmount:0) * spouseAmountFromSetting;
  const totalChildAmount = (childAllowance?childAmount:0) * childAmountFromSetting;
  const totalOvertimePrice = overtimeLogThisMonth * ((baseSalaryValue/173)*2);
  const salaryPokok = baseSalary + totalSpouseAmount + totalChildAmount + totalReimburseValue + totalOvertimePrice;
  const bpjsHealthAmount = ((healthAllowance?bpjsHealth:0)/100) * baseSalaryValue;
  const bpjsEmploymentAmount = ((employAllowance?bpjsEmployment:0)/100) * baseSalaryValue;
  const potongGaji = (taxAllowance?taxAmount:0) + (healthAllowance?bpjsHealthAmount:0) + (employAllowance?bpjsEmploymentAmount:0);

  const totalSalary = salaryPokok - potongGaji;

  const dataBankName = [
    "Bank Central Asia (BCA)",
    "Bank Negara Indonesia (BNI)",
    "Bank Rakyat Indonesia (BRI)",
    "Bank Mandiri",
    "CIMB Niaga",
    "Bank Tabungan Negara (BTN)",
    "Bank Danamon",
    "Bank Permata",
    "Bank Lainnya",
  ]
  const dataInisialBankName = [
    "BCA",
    "BNI", 
    "BRI",
    "MANDIRI",
    "CIMB",
    "BTN",
    "DANAMON",
    "PERMATA",
    "OTHER",
  ]

  const { dataMyBankAccount } = dataMyBankAccountFunction()
  const [createActive, setCreateActive] = useState(false)
  const [popUpDelete, setPopUpDelete] = useState(false)
  const [id, setId] = useState(0)
  const [bankNameActive, setBankNameActive] = useState(false)
  const [bankName, setBankName] = useState('Bank Central Asia (BCA)')
  const [bankNameInisial, setBankNameInisial] = useState('BCA')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountHolder, setAccountHolder] = useState('')
  const [isPrimary, setIsPrimary] = useState(false)
  const [createOrUpdate, setCreateOrUpdate] = useState('Create')
  const dataSend: BankAccountSendType = {
    bank_name: bankNameInisial,
    account_holder: accountHolder,
    account_number: accountNumber,
    is_primary: isPrimary
  }
  

  useEffect(()=>{
    if (dataAllNewUser && dataAllNewUser.length > 0) {
      setIsActive(dataAllNewUser[0].email);
      setUsername(dataAllNewUser[0].username);
    }
  }, [dataAllNewUser]);

  useEffect(()=>{
    const handleGetSetting = async() => {
      setLoading(true)
      const res = await fetchDataSettingPerCategory("payroll");
      setLoading(false)
      if(res){
        setDataSetting(res);
      }
    }
    handleGetSetting();
  }, [])

  useEffect(()=>{
    if(dataFinancePerUser){
      setSpouseAllowance(Number(dataFinancePerUser.spouse_allowance)>0?true:false);
      setChildAllowance(Number(dataFinancePerUser.child_allowance)>0?true:false);
      setTaxAllowance(dataFinancePerUser.enable_tax??false);
      setHealthAllowance(dataFinancePerUser.enable_bpjs_health??false);
      setEmployAllowance(dataFinancePerUser.enable_bpjs_employment??false);
    }
  }, [dataFinancePerUser])

  useEffect(() => {
    const fetchData = async () => {
      const result: FinanceManagementSendType = {
      email: isActive,
      base_salary: baseSalaryValue ?? 0,
      spouse_allowance: spouseAllowanceValue ?? 0,
      child_allowance: childAllowanceValue ?? 0,
      enable_bpjs_health: bpjsHealthAllowance ?? false,
      enable_bpjs_employment: bpjsEmploymentAllowance ?? false,
      bpjs_health_rate_percentage: bpjsHealth ?? 0,
      bpjs_employment_rate_percentage: bpjsEmployment ?? 0,
      enable_tax: taxEnable ?? false,
      tax_rate_percentage: taxValue ?? 0,
    };

    setDataSalaryAll(result);
    };

    const setData = async() => {
      if(dataFinancePerUser){
        setBaseSalary(baseSalaryValue ?? 0);
        setSpouseAmount(spouseAllowanceValue ?? 0);
        setChildAmount(childAllowanceValue ?? 0);
        setTaxAmount(taxValue ?? 0);
      }
    }
  
    fetchData();
    setData();
  }, [isActive,dataSetting,dataFinancePerUser]);


  const setAllSendData = async() => {
    const newData: FinanceManagementSendType = {
      email: isActive,
      base_salary: baseSalary,
      spouse_allowance: spouseAllowance?spouseAmount:0,
      child_allowance: childAllowance?childAmount:0,
      enable_bpjs_health: healthAllowance,
      enable_bpjs_employment: employAllowance,
      bpjs_health_rate_percentage: healthAllowance?bpjsHealth:0,
      bpjs_employment_rate_percentage: employAllowance?bpjsEmployment:0,
      enable_tax: taxAllowance,
      tax_rate_percentage: taxAllowance?taxAmount:0,
    } 
    setDataSalaryAll(newData);
    return newData;
  }
  
  const setAllSendDataCreate = async() => {
    const newData: FinanceManagementSendType = {
      email: isActive,
      is_active: true,
      base_salary: baseSalaryCreate,
      spouse_allowance: spouseAllowanceCreate?spouseAmountCreate:0,
      child_allowance: childAllowanceCreate?childAmountCreate:0,
      enable_bpjs_health: healthAllowanceCreate,
      enable_bpjs_employment: employmentAllowanceCreate,
      bpjs_health_rate_percentage: healthAllowanceCreate?bpjsHealth:0,
      bpjs_employment_rate_percentage: employmentAllowanceCreate?bpjsEmployment:0,
      enable_tax: taxAllowanceCreate,
      tax_rate_percentage: taxAllowanceCreate?taxAmountCreate:0,
    } 
    setDataSalaryAllCreate(newData);
    return newData;
  }

  const handleUpdate = async() => {
    setLoading(true);
    const res = await updateBankAccountFunction(id,dataSend);
    setLoading(false);
    if(res){
      router.replace('/(detail)/bankAccount')
    }else{
      setError('gagal mengupdate data bank account')
    }
  }

  const handleDelete = async() => {
    setLoading(true);
    const res = await deleteBankAccountFunction(id);
    setLoading(false);
    if(res){
      router.replace('/(detail)/bankAccount')
    }else{
      setError('gagal delete data bank account')
    }
  }

  const handleCreate = async() => {
    setLoading(true);
    console.log('data send:', dataSend)
    const res = await createBankAccountByUser(emailData, dataSend);
    setLoading(false);
    if(res){
      setPopUpEdit(false);
      setAccountHolder('')
      setAccountNumber('')
      setIsPrimary(false)
      router.replace('/(detail)/bankAccount')
    }else{
      setError('gagal create bank account')
    }
  }
  

  
  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title={`My Bank Account`} type='python' backTo={'/home'}/>

      <View className='w-full flex-1 bg-[#4d84f0]'>
        <LinearGradient colors={['#527EFE', '#001749']} className='w-full h-full p-4 px-[20px] flex-1 flex-col justify-start items-center'>
            <View className={`relative top-[-20px] z-[998] w-full overflow-hidden h-full p-3 rounded-lg bg-white flex justify-start items-center`}>
                {/* DATA HEADER TOTAL SALARY */}
                <View className='w-full h-[85px] rounded-lg overflow-hidden flex flex-col justify-center items-center'>
                    <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full h-full p-[15px] flex flex-col justify-center items-center'>
                        <Text className='text-[12px] text-white'>total salary this month</Text>
                        <Text className='text-[20px] text-white font-bold'>{formatRupiah(totalSalary)}</Text>
                        <Text className='text-[10px] opacity-50 text-white font-bold'>+ {formatRupiah(salaryPokok)} - {formatRupiah(potongGaji)}</Text>
                    </LinearGradient>
                </View>
                <Text className='font-bold text-[12px] text-blue-900 mt-4'>
                    Bank Account
                </Text>
                <View className='w-full mt-2 h-[70%]'>
                  <ScrollView className='w-full h-full'>
                    <View className='w-full h-full flex justify-start items-center gap-2 mt-4'>
                        {dataMyBankAccount.length>0?
                            dataMyBankAccount.map((item,index)=>{
                                return(
                                  <View className='w-full flex flex-row items-center gap-3'>
                                    <View key={index} className={`${buttonEdit?'w-[85%]':'w-full'} overflow-hidden rounded-md flex flex-col justify-center items-center border-[.5px] border-b-[1px] ${item.is_primary?'border-blue-600 mb-3':'border-blue-300'}`}>
                                        {item.is_primary&&(
                                            <Text className='font-bold text-white text-[10px] w-full text-center bg-blue-500 py-1'>Primary</Text>
                                        )}
                                        <View className='w-full  p-3 flex flex-row justify-between items-center'>
                                            <Image source={
                                                item.bank_name === 'BCA'
                                                ? require('../../assets/objek/bank-bca.jpeg') :
                                                item.bank_name === 'BNI'
                                                ? require('../../assets/objek/bank-bni.png') :
                                                item.bank_name === 'BRI'
                                                ? require('../../assets/objek/bank-bri.png') :
                                                item.bank_name === 'MANDIRI'
                                                ? require('../../assets/objek/bank-mandiri.png') :
                                                item.bank_name === 'CIMB'
                                                ? require('../../assets/objek/bank-cimb.png') :
                                                item.bank_name === 'BTN'
                                                ? require('../../assets/objek/bank-btn.png') :
                                                item.bank_name === 'DANAMON'
                                                ? require('../../assets/objek/bank-danamon.png') :
                                                item.bank_name === 'PERMATA'
                                                ? require('../../assets/objek/bank-permata.png') :
                                                require('../../assets/images/total-reimburse-bg.png')
                                                } style={{
                                                    height: 20,
                                                    width: undefined,
                                                    aspectRatio: 4,
                                                  }}
                                                  resizeMode="contain"
                                            />
                                            <View className='flex flex-row items-center'>
                                                <View className='flex justify-center items-end'>
                                                    <Text className='text-[12px] font-bold'>{item.account_number}</Text>
                                                    <Text className='text-[12px]'>{item.account_holder}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    {buttonEdit&&(
                                      <View className='flex gap-1'>
                                        <Pressable onPress={()=>{
                                          setCreateActive(true);
                                          setBankName(item.bank_name)
                                          setBankNameInisial(item.bank_name)
                                          setIsPrimary(item.is_primary)
                                          setAccountHolder(item.account_holder)
                                          setAccountNumber(item.account_number)
                                          setId(item.id??0)
                                          setCreateOrUpdate('Update')
                                          }} className="w-[25px] h-[25px] bg-[#f9f4ec] rounded-md border-[.5px] border-b-[1px] border-[#b86200] flex justify-center items-center">
                                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#b86200"} style={{ width: 12, height: 12 }}/>
                                        </Pressable>
                                        <Pressable onPress={()=>{
                                          setPopUpDelete(true)
                                          setId(item.id??0)
                                          }} className="w-[25px] h-[25px] bg-[#f9ecec] rounded-md border-[.5px] border-b-[1px] border-[#912200] flex justify-center items-center">
                                            <Image source={require("../../assets/icons/trash.png")} tintColor={"#912200"} style={{ width: 12, height: 12 }}/>
                                        </Pressable>
                                      </View>
                                    )}
                                  </View>
                                )
                            })
                            :
                            (
                                <Text className='rounded-lg w-full text-center p-2 font-bold border-[.5px] border-b-[1px] border-blue-800 text-blue-800 bg-white text-[10px]'>no data</Text>
                            )
                        }
                    </View>
                  </ScrollView>
                  <View className='w-full flex flex-row justify-between items-center gap-3 mt-5'>
                    <Pressable onPress={() => {setCreateActive(true)}} className='w-[85%] overflow-hidden flex flex-row justify-center items-center rounded-lg bg-[#8111E6]'
                    >
                      <LinearGradient colors={['#ffa850', '#E96500']} className='w-full h-full flex flex-row p-[10px] justify-center items-center'>
                        <Text className='ml-2 text-white font-bold text-[12px]'>
                            +  create new bank account
                        </Text>
                      </LinearGradient>
                    </Pressable>
                    <Pressable onPress={()=>{setButtonEdit(!buttonEdit)}} className="w-[37px] h-[37px] bg-[#ecf1f9] rounded-md border-[.5px] border-b-[1px] border-[#0040b8] flex justify-center items-center overflow-hidden">
                      <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full h-full flex-1 flex-col justify-center items-center'>
                        <Image source={require("../../assets/icons/edit.png")} tintColor={"#FFFFFF"} style={{ width: 12, height: 12 }}/>
                      </LinearGradient>
                    </Pressable>
                  </View>
                </View>
            </View>
        </LinearGradient>
      </View>

      {/* POP UP CREATE KARYAWAN */}
      {createActive && (
        <>
          {/* EFEK BLUR */}
          <View className='absolute w-full h-full blur opacity-80 bg-[#310000] z-[999]'/>
          {/* FORM ADD KARYAWAN */}
          <View className='absolute z-[1000] bottom-[0px] w-full h-[600px] bg-white flex justify-start gap-3 items-center px-[30px] pt-[30px] rounded-t-3xl'>
              <Text className='w-full font-bold mb-5 text-blue-900'>{createOrUpdate} New Bank Account</Text>
              <Text className='w-full text-[12px] font-bold'>Bank Name :</Text>
              <Pressable onPress={() => {setBankNameActive(!bankNameActive)}} className='w-full border border-b-2 border-blue-800 rounded-lg p-3 px-4 flex flex-row justify-between items-center'>
                <Text className='text-[12px]'>
                  {bankName}
                </Text>
                <Image
                source={require('../../assets/icons/arrow-dropdown.png')}
                style={{ width: 7, height: 5, marginLeft: 5 }}
                tintColor={'blue'}
                />
              </Pressable>
              {bankNameActive&&(
                <View className='w-full overflow-hidden bg-orange-50 flex border border-blue-800 rounded-md'>
                  <ScrollView className='w-full h-[150px]'>
                    <View className='bg-blue-100 flex flex-col justify-center items-center rounded-b-lg rounded-t-sm w-full'>
                      {dataBankName.map((item, index) => (
                        <Pressable onPress={() => {
                          setBankName(dataBankName[index]);
                          setBankNameInisial(dataInisialBankName[index])
                          setBankNameActive(false);
                        }} className='py-1 w-full flex justify-center items-center border-b-[.5px] border-blue-300' key={index}>
                          <Text className='text-[12px] text-blue-900 py-2'>
                            {item}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </ScrollView>

                </View>
              )}
              <Text className='w-full text-[12px] font-bold'>Account Number :</Text>
              <TextInput
                className='text-black text-[12px] p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] border-blue-800 rounded-lg'
                placeholder='account number'
                value={accountNumber}
                onChangeText={setAccountNumber}
              />
              <Text className='w-full text-[12px] font-bold'>Account Holder :</Text>
              <TextInput
                className='text-black text-[12px] p-[10px] pl-[20px] w-full flex flex-row justify-center items-center border-[.5px] border-blue-800 rounded-lg'
                placeholder='account holder'
                value={accountHolder}
                onChangeText={setAccountHolder}
              />
              <View className='w-full flex flex-row justify-between items-center'>
                <Text className='text-[12px] font-bold'>Account Holder :</Text>
                <Pressable onPress={() => {
                  setIsPrimary(!isPrimary);
                }} className={`p-1 w-[40px] rounded-lg flex flex-row ${isPrimary?'justify-end bg-blue-600':'justify-start bg-gray-300'}`}>
                  <View className='w-[15px] h-[15px] bg-white rounded-md'/>
                </Pressable>
              </View>
              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <Pressable onPress={() => {
                if(createOrUpdate==='Update'){
                  handleUpdate()
                }else{
                  handleCreate()
                }
              }} className='w-full overflow-hidden flex flex-row justify-center items-center bg-[#5088FF] rounded-lg mt-10'
              >
                <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full p-[15px] flex justify-center items-center'>
                  {createOrUpdate==='Update'?
                  (
                    <Text className='ml-2 font-bold text-white'>
                      {loading ? 'Updating...' : 'Update'}
                    </Text>
                  ):(
                    <Text className='ml-2 font-bold text-white'>
                      {loading ? 'Creating...' : '+ Create'}
                    </Text>
                  )}
                </LinearGradient>
              </Pressable>
              <Pressable onPress={() => {
                setCreateActive(false);
                setBankName('Bank Central Asia (BCA)')
                setBankNameInisial('BCA')
                setIsPrimary(false)
                setAccountHolder('')
                setAccountNumber('')
                setCreateOrUpdate('Create')
              }} className='p-[15px] w-full flex flex-row justify-center items-center border border-b-2 border-blue-800 rounded-lg'
              >
                <Text className='ml-2 font-bold text-blue-800'>
                    cancel
                </Text>
              </Pressable>
          </View>
        </>
      )}

      {popUpDelete && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#310000]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[20px] pt-[60px] rounded-lg flex flex-col justify-start items-center'>
              <View className='w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full bg-[#FF0066] flex justify-center items-center'>
                <Image source={require("../../assets/icons/trash.png")} style={{ width: 25, height: 28 }} tintColor={"#ffffff"} className='mb-5'/>
              </View>
              <Text className='text-[12px] w-full text-center'>
                Are you sure want to cancel this reimbursement?
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpDelete(false)}} className='w-[50%] border border-b-[2px] border-purple-800 bg-purple-50 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {handleDelete()}} className='w-[50%] border border-b-[2px] border-purple-800 bg-[#FF0066] rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-white'>
                    {loading?'deleting...':'Yes, Delete'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* FILTER USER
      <View className='w-full h-[200px] flex flex-col justify-end items-center absolute bottom-0 z-[999]' style={{ position: 'absolute', bottom: 0 }}>
        <View className='p-2 bg-blue-500 flex justify-center items-center w-[300px] rounded-t-lg'>
          <Text className='text-[10px] font-bold text-white'>User : {Username??'-'}</Text>
        </View>
        <View className='bg-white w-full h-[140px] flex-row items-start px-[30px] pt-[20px] rounded-t-3xl gap-[10px] border-[.5px] border-blue-600'>
          {buttonEdit?(
            <Pressable onPress={()=>{setPopUpSendUpdate(true)}} className='w-full rounded-lg overflow-hidden'>
              <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full p-5 gap-2 flex flex-row justify-center items-center'>
                <Text className='text-white text-[12px] font-bold'>
                  Save
                </Text>
                <Image source={require("../../assets/icons/send.png")} tintColor={"#FFFFFF"} style={{ width: 12, height: 12 }}/>
              </LinearGradient>
            </Pressable>
          ):(
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View className='w-full h-[60px] flex flex-row items-center gap-2'>
                {dataAllNewUser.map((item, index) => {
                  return (
                      <Pressable 
                        key={index}
                        onPress={() => {
                          setIsActive(item.email);
                          setUsername(item.username);
                        }}
                        className={`w-[50px] h-[50px] flex justify-center items-center overflow-hidden rounded-full`}
                      >
                        <LinearGradient colors={['#5088FF', '#1A63FF']} className={`w-full h-full flex justify-center items-center ${isActive===item.email?"opacity-100":'opacity-40'}`}>
                          <Text className={`text-lg font-bold text-white`}>{item.username.charAt(0).toUpperCase()}{item.username.charAt(item.username.length - 1).toUpperCase()}</Text>
                        </LinearGradient>
                      </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          )}
        </View>
      </View>  */}



      

    </View>
  )
}

export default historyReimburseKaryawan
