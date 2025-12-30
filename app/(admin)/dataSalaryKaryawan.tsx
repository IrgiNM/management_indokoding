import HeaderBack from '@/components/headerBack'
import { dataEmployeeFunction } from '@/hooks/dataEmployeeFunction'
import { createFinanceUser, dataFinanceKaryawan, UpdateFinanceUser } from '@/hooks/dataFinanceKaryawan'
import { overtimeLogAdminFunction } from '@/hooks/dataOvertimeLogFunction'
import { fetchDataSettingPerCategory } from '@/hooks/dataSiteSettingFunction'
import { createManySlipSalary, dataSlipSalary, deleteManySlipSalary } from '@/hooks/dataSlipSalaryFunction'
import { dataUserFunction } from '@/hooks/dataUserFunction'
import { formatRupiah, formatRupiahTanpaRp } from '@/hooks/formatRupiahFunction'
import { FinanceManagementSendType } from '@/types/financeDataType'
import { siteSettingType } from '@/types/siteSettingType'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
const { width } = Dimensions.get('window');
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const historyReimburseKaryawan = () => {
  const router =  useRouter();
  const { dataAllNewUser } = dataUserFunction();
  const [isActive, setIsActive] = useState('');
  const [Username, setUsername] = useState('');
  const [buttonEdit, setButtonEdit] = useState(false);
  const { dataReimburseUserThisMonth, dataFinancePerUser } = dataFinanceKaryawan(isActive);
  const {dataOvertimeLogAll,dataOvertimeLogByUser,dataMonthsNumber, dataOvertimeLogByUserThisMonth} = overtimeLogAdminFunction(isActive);
  const [popUpSendUpdate, setPopUpSendUpdate] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [popUpEditSalary, setPopUpEditSalary] = useState(false);
  const [popUpEditTax, setPopUpEditTax] = useState(false);
  const [popUpEditSpouse, setPopUpEditSpouse] = useState(false);
  const [popUpEditChild, setPopUpEditChild] = useState(false);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [dataSetting, setDataSetting] = useState<siteSettingType[]>([]);
  const [dataSettingGeneral, setDataSettingGeneral] = useState<siteSettingType[]>([]);

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
  const overtimeLogThisMonth = Math.ceil(dataOvertimeLogByUserThisMonth.filter(item=>item.status==="approved").reduce((sum,item)=>sum + Number(item.duration_hours),0));
  
  const totalSpouseAmount = (spouseAllowance?spouseAmount:0) * spouseAmountFromSetting;
  const totalChildAmount = (childAllowance?childAmount:0) * childAmountFromSetting;
  const totalOvertimePrice = overtimeLogThisMonth * ((baseSalaryValue/173)*2);
  const salaryPokok = baseSalary + totalSpouseAmount + totalChildAmount + totalReimburseValue + totalOvertimePrice;
  const bpjsHealthAmount = ((healthAllowance?bpjsHealth:0)/100) * baseSalaryValue;
  const bpjsEmploymentAmount = ((employAllowance?bpjsEmployment:0)/100) * baseSalaryValue;
  const potongGaji = (taxAllowance?taxAmount:0) + (healthAllowance?bpjsHealthAmount:0) + (employAllowance?bpjsEmploymentAmount:0);

  const totalSalary = salaryPokok - potongGaji;

  const { dataSlipSalaryAll,dataUserSlip } = dataSlipSalary();
  const { dataEmployee } = dataEmployeeFunction(isActive);
  const [popUpSendSlip, setPopUpSendSlip] = useState(false);
  const [popUpShowSlip, setPopUpShowSlip] = useState(false);
  const [checkActive, setCheckActive] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string[]>([]);
  const [checkActiveDelete, setCheckActiveDelete] = useState(false);
  const [selectedEmailDelete, setSelectedEmailDelete] = useState<string[]>([]);
  const [errorSend, setErrorSend] = useState<string[]>([]);
  const [popUpErrorMessage,setPopUpErrorMessage] = useState(false);
  const months = [
    "Januari", "Februari", "Maret", "April",
    "Mei", "Juni", "Juli", "Agustus",
    "September", "Oktober", "November", "Desember"
  ];

  // NILAI SETTING SLIP
  const companyName = (dataSettingGeneral?.find(item => item.key==="company_name")?.value??'no data').toString();
  const companyAddress = (dataSettingGeneral?.find(item => item.key==="company_address")?.value??'no data').toString();
  const companyCity = (dataSettingGeneral?.find(item => item.key==="company_city")?.value??'no data').toString();
  const adminName = (dataSettingGeneral?.find(item => item.key==="admin_name")?.value??'no data').toString();
  const titleSlip = 'SLIP GAJI'
  const namaLengkap = (dataEmployee.full_name)
  const nik = (dataEmployee.identity_number)
  const posisi = (dataEmployee.position)
  const now = new Date();
  const year = (new Date().getFullYear()).toString()
  const month = months[now.getMonth()];

  useEffect(()=>{
    dataSetting.forEach(item => {
      console.log(
        item.key,
        [...item.key].map(c => c.charCodeAt(0))
      );
    });    
  }, [dataSetting])

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
    const handleGetSetting = async() => {
      setLoading(true)
      const res = await fetchDataSettingPerCategory("general");
      setLoading(false)
      if(res){
        setDataSettingGeneral(res);
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

  const printSlipPdf = async () => {
    const html = `
      <html>
        <head>
          <style>
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              font-family: 'Helvetica', 'Arial', sans-serif;
              padding: 30px 25px;
              background-color: white;
              color: #000;
            }
            .container { width: 100%; display: flex; flex-direction: column; }
            .center { text-align: center; width: 100%; }
            .company-name { font-size: 24px; font-weight: bold; margin-bottom: 2px; }
            .header-text { font-size: 22px; margin-bottom: 2px; }
            .title-slip { font-size: 22px; margin-bottom: 10px; }
            
            .row {
              display: flex;
              flex-direction: row;
              align-items: center;
              width: 100%;
              font-size: 22px;
              margin-bottom: 2px;
            }
            .label { width: 250px; }
            .separator { margin-right: 8px; }
            .value-container {
              width: 310px;
              display: flex;
              justify-content: space-between;
            }
            .bold { font-weight: bold; }
            .mt-2 { margin-top: 8px; }
            .mt-4 { margin-top: 35px; }
            .mb-2 { margin-bottom: 25px; }
            .line {
              width: 100%;
              height: 1px;
              background-color: black;
              margin: 8px 0;
            }
            .right-align {
              text-align: right;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            }
            .signature-box {
              width: 270px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="center company-name">${companyName}</div>
            <div class="center header-text">${companyAddress}</div>
            <div class="center title-slip mb-2">${titleSlip}</div>
  
            <div class="row"><div class="label">Nama</div><div class="separator">:</div><div>${namaLengkap}</div></div>
            <div class="row"><div class="label">NIK</div><div class="separator">:</div><div>${nik}</div></div>
            <div class="row"><div class="label">Jabatan</div><div class="separator">:</div><div>${posisi}</div></div>
            <div class="row"><div class="label">Bulan</div><div class="separator">:</div><div>${month} ${year}</div></div>
  
            <div class="row mt-4 bold">
              <div class="label">Gaji Pokok</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(baseSalaryValue)}</span></div>
            </div>
            <div class="row">
              <div class="label">Lemburan (${overtimeLogThisMonth} jam)</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(totalOvertimePrice)}</span></div>
            </div>
            <div class="row">
              <div class="label">Reimburse</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(totalReimburseValue)}</span></div>
            </div>
            
            <div class="row bold">Tunjangan</div>
            <div class="row">
              <div class="label">Istri</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(totalSpouseAmount)}</span></div>
            </div>
            <div class="row">
              <div class="label">Anak</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(totalChildAmount)}</span></div>
            </div>
            <div class="row bold">
              <div class="label">Total</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(salaryPokok)}</span></div>
            </div>
  
            <div class="line"></div>
  
            <div class="row bold">POTONGAN</div>
            <div class="row">
              <div class="label">PPh 21</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(totalSpouseAmount)}</span></div>
            </div>
            <div class="row">
              <div class="label">BPJS Kesehatan</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(bpjsHealthAmount)}</span></div>
            </div>
            <div class="row">
              <div class="label">BPJS Ketenagakerjaan</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(bpjsEmploymentAmount)}</span></div>
            </div>
            <div class="row">
              <div class="label">Kasbon (Angsuran 4)</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(0)}</span></div>
            </div>
  
            <div class="row bold">
              <div class="label">JUMLAH</div>
              <div class="separator">:</div>
              <div class="value-container"><span>Rp</span><span>${formatRupiahTanpaRp(totalSalary)}</span></div>
            </div>
  
            <div class="right-align mt-4">
              <div style="font-size: 22px;">${companyCity}, ${month} ${year}</div>
              <div style="height: 100px;"></div>
              <div class="signature-box">
                <span style="font-size: 22px;">${adminName}</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  
    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  const toggleSelect = (email: string) => {
    setSelectedEmail(prev =>
      prev.includes(email)
        ? prev.filter(item => item !== email)
        : [...prev, email]
    );
  };
  
  const toggleSelectDelete = (email: string) => {
    setSelectedEmailDelete(prev =>
      prev.includes(email)
        ? prev.filter(item => item !== email)
        : [...prev, email]
    );
  };

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
    const newData = await setAllSendData();
    // console.error('data send update finance', newData)
    const res = await UpdateFinanceUser(newData);
    setLoading(false);
    if(res){
      setPopUpEdit(false);
      setPopUpSendUpdate(false)
    }else{
      setError('gagal mengupdate data salary karyawan')
    }
  }

  const handleCreate = async() => {
    setLoading(true);
    const newData = await setAllSendDataCreate();
    // yconsole.error('data send create finance', newData)
    const res = await createFinanceUser(newData);
    setLoading(false);
    if(res){
      setPopUpEdit(false);
    }else{
      setError('gagal create data salary karyawan')
    }
  }
  
  const handleManyCreateSlip = async() => {
    setLoading(true);
    const res = await createManySlipSalary(selectedEmail);
    setLoading(false);
    if(res===true){
      router.replace('/(admin)/dataSalaryKaryawan')
    }else{
      setPopUpErrorMessage(true)
      setPopUpSendSlip(false)
      setErrorSend(res)
    }
  }
  
  const handleManyDeleteSlip = async() => {
    setLoading(true);
    const res = await deleteManySlipSalary(selectedEmailDelete);
    setLoading(false);
    if(res===true){
      router.replace('/(admin)/dataSalaryKaryawan')
    }else{
      setPopUpErrorMessage(true)
      setPopUpSendSlip(false)
      setErrorSend(res)
    }
  }
  

  
  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title={`Data Salary`} type='python' backTo={'/home'}/>

      <View className='w-full flex-1 bg-[#4d84f0]'>
        <LinearGradient colors={['#527EFE', '#001749']} className='w-full h-full p-4 px-[20px] flex-1 flex-col justify-start items-center'>
        <View className={`relative top-[-20px] z-[998] w-full overflow-hidden ${buttonEdit?"h-[63%]":"h-[78%]"} p-3 rounded-lg bg-white flex justify-start items-center`}>

          {/* DATA HEADER TOTAL SALARY */}
          <View className='w-full h-[85px] rounded-lg overflow-hidden flex flex-col justify-center items-center'>
            <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full h-full p-[15px] flex flex-col justify-center items-center'>
              <Text className='text-[12px] text-white'>total salary</Text>
              <Text className='text-[20px] text-white font-bold'>{formatRupiah(totalSalary)}</Text>
              <Text className='text-[10px] opacity-50 text-white font-bold'>+ {formatRupiah(salaryPokok)} - {formatRupiah(potongGaji)}</Text>
              <Pressable onPress={()=>{setButtonEdit(!buttonEdit)}} className="w-[35px] h-[35px] bg-[#5088FF] rounded-md border-[.5px] border-b-[1px] border-[#ffffff] flex justify-center items-center absolute right-[20px]">
                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#ffffff"} style={{ width: 14, height: 14 }}/>
              </Pressable>
              <Pressable onPress={()=>{
                setPopUpShowSlip(true)
              }} className="w-[35px] h-[35px] bg-[#5088FF] rounded-md border-[.5px] border-b-[1px] border-[#ffffff] flex justify-center items-center absolute left-[20px]">
                  <Image source={require("../../assets/icons/file.png")} tintColor={"#ffffff"} style={{ width: 12, height: 14 }}/>
              </Pressable>
            </LinearGradient>
          </View>

          {/* TOMBOL CREATE NEW SALARY DATA */}
          <Pressable onPress={()=>{setPopUpEdit(true)}} className='w-full py-2 rounded-lg mt-1 rounded-b-3xl border border-b-2 border-[#008091] bg-[#ecf8f9] flex justify-center items-center'>
            <Text className='text-[#008091] text-[10px] font-bold'>+ create new salary</Text>
          </Pressable>

          {/* DATA SALARY DETAIL */}
          <ScrollView className='w-full overflow-hidden h-full pt-[20px]'>
            <View className='w-full flex flex-col justify-start items-start px-5 pb-5 mb-5'>
              <Text className='text-[12px] font-bold mb-3'>salary pokok</Text>

              {/* BASE SALARY */}
              <View className='w-full flex flex-row justify-between items-center mb-1'>
                <Text className='text-[10px]'>Base Salary</Text>
                <View className='flex flex-row justify-center items-center gap-2'>
                  <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>+ {formatRupiah(baseSalary)}</Text>
                  {buttonEdit&&(
                    <Pressable onPress={()=>{
                      setPopUpEditSalary(true)
                    }} className="w-[25px] h-[25px] bg-[#ffeed9] rounded-md border-[.5px] border-b-[1px] border-[#913800] flex justify-center items-center">
                        <Image source={require("../../assets/icons/edit.png")} tintColor={"#913800"} style={{ width: 12, height: 12 }}/>
                    </Pressable>
                  )}
                </View>
              </View>

              {/* REIMBURSE */}
              {((dataReimburseUserThisMonth.filter(item=>item.status==="Approved")).length>0)&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>total reimburse</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>+ {formatRupiah(totalReimburseValue)}</Text>
                      {buttonEdit&&(
                        <View className="w-[25px] h-[25px] opacity-0"></View>
                      )}
                    </View>
                  </View>
                </>
              )}

              {/* OVERTIME */}
              {(overtimeLogThisMonth>0)&&(
                <>
                <View className='w-full flex flex-row justify-between items-center mb-1'>
                  <Text className='text-[10px]'>kerja lembur</Text>
                  <View className='flex flex-row justify-center items-center gap-2'>
                    <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{overtimeLogThisMonth}</Text>
                    <Text className='text-[12px]  opacity-30'>x</Text>
                    <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{formatRupiah((baseSalary/173)*2)}</Text>
                    {buttonEdit&&(
                      <Pressable onPress={()=>{setPopUpEditSpouse(true)}} className="w-[25px] h-[25px] bg-[#ffeed9] rounded-md border-[.5px] border-b-[1px] border-[#913800] flex justify-center items-center">
                          <Image source={require("../../assets/icons/edit.png")} tintColor={"#913800"} style={{ width: 12, height: 12 }}/>
                      </Pressable>
                    )}
                  </View>
                </View>
                <View className='w-full flex flex-row justify-between items-center mb-1'>
                  <Text className='text-[10px]'></Text>
                  <View className='flex flex-row justify-center items-center gap-2'>
                    <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>+ {formatRupiah(totalOvertimePrice)}</Text>
                    {buttonEdit&&(
                      <View className="w-[25px] h-[25px] opacity-0"></View>
                    )}
                  </View>
                </View>
              </>
              )}

              {/* TUNJANGAN ISTRI */}
              {spouseAllowance&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>tunjangan istri</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{spouseAmount}</Text>
                      <Text className='text-[12px]  opacity-30'>x</Text>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{formatRupiah(spouseAmountFromSetting)}</Text>
                      {buttonEdit&&(
                        <Pressable onPress={()=>{setPopUpEditSpouse(true)}} className="w-[25px] h-[25px] bg-[#ffeed9] rounded-md border-[.5px] border-b-[1px] border-[#913800] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#913800"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'></Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>+ {formatRupiah(totalSpouseAmount)}</Text>
                      {buttonEdit&&(
                        <View className="w-[25px] h-[25px] opacity-0"></View>
                      )}
                    </View>
                  </View>
                </>
              )}

              {/* TUNJANGAN ANAK */}
              {childAllowance&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>tunjangan anak</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{childAmount}</Text>
                      <Text className='text-[12px]  opacity-30'>x</Text>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{formatRupiah(childAmountFromSetting)}</Text>
                      {buttonEdit&&(
                        <Pressable onPress={()=>{setPopUpEditChild(true)}} className="w-[25px] h-[25px] bg-[#ffeed9] rounded-md border-[.5px] border-b-[1px] border-[#913800] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#913800"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'></Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>+ {formatRupiah(totalChildAmount)}</Text>
                      {buttonEdit&&(
                        <View className="w-[25px] h-[25px] opacity-0"></View>
                      )}
                    </View>
                  </View>
                </>
              )}

              <Text className='text-[12px] font-bold mb-3'>potongan gaji</Text>

              {/* PIUTANG */}
              <View className='w-full flex flex-row justify-between items-center mb-1'>
                <Text className='text-[10px]'>piutang</Text>
                <View className='flex flex-row justify-center items-center gap-2'>
                  <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>- {formatRupiah(0)}</Text>
                  {buttonEdit&&(
                    <View className="w-[25px] h-[25px] opacity-0"></View>
                  )}
                </View>
              </View>
              
              {/* PAJAK */}
              {taxAllowance&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>pajak</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>- {formatRupiah(taxAmount)}</Text>
                      {buttonEdit&&(
                        <Pressable onPress={()=>{setPopUpEditTax(true)}} className="w-[25px] h-[25px] bg-[#ffeed9] rounded-md border-[.5px] border-b-[1px] border-[#913800] flex justify-center items-center">
                            <Image source={require("../../assets/icons/edit.png")} tintColor={"#913800"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </>
              )}

              {/* BPJS HEALTH */}
              {healthAllowance&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>bpjs kesehatan</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{bpjsHealth}%</Text>
                      <Text className='text-[12px]  opacity-30'>x</Text>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{formatRupiah(baseSalaryValue)}</Text>
                      {buttonEdit&&(
                        <Pressable onPress={()=>{router.replace("/(admin)/dataSiteSettings")}} className="w-[25px] h-[25px] bg-[#ecf8f9] rounded-md border-[.5px] border-b-[1px] border-[#008091] flex justify-center items-center">
                          <Image source={require("../../assets/icons/setting.png")} tintColor={"#008091"} style={{ width: 12, height: 12 }}/>
                      </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'></Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>- {formatRupiah(bpjsHealthAmount)}</Text>
                      {buttonEdit&&(
                        <View className="w-[25px] h-[25px] opacity-0"></View>
                      )}
                    </View>
                  </View>
                </>
              )}

              {/* BPJS EMPLOYMENT */}
              {employAllowance&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>bpjs employment</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{bpjsEmployment}%</Text>
                      <Text className='text-[12px]  opacity-30'>x</Text>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{formatRupiah(baseSalaryValue)}</Text>
                      {buttonEdit&&(
                        <Pressable onPress={()=>{router.replace("/(admin)/dataSiteSettings")}} className="w-[25px] h-[25px] bg-[#ecf8f9] rounded-md border-[.5px] border-b-[1px] border-[#008091] flex justify-center items-center">
                            <Image source={require("../../assets/icons/setting.png")} tintColor={"#008091"} style={{ width: 12, height: 12 }}/>
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'></Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>- {formatRupiah(bpjsEmploymentAmount)}</Text>
                      {buttonEdit&&(
                        <View className="w-[25px] h-[25px] opacity-0"></View>
                      )}
                    </View>
                  </View>
                </>
              )}


            </View>
          </ScrollView>

        </View>
        
        {buttonEdit&&(
          <View className='relative top-[-20px] z-[998] w-full overflow-hidden h-[100px] p-3 rounded-lg bg-white flex flex-col justify-start items-center mt-2'>
            <View className='flex flex-row justify-center items-center gap-2'>
              <Text className='text-[10px] font-bold'>enableButton button</Text>
              <Text className='text-[10px] font-bold'>-</Text>
              <Text className='text-[10px]'>pilih tombol yang ingin diaktifkan</Text>
            </View>
            <View className='flex flex-row justify-center items-center gap-4 mt-4'>
              <View className='flex flex-col justify-center items-center gap-1'>
                <Pressable onPress={()=>{setHealthAllowance(!healthAllowance)}} className={`w-[40px] rounded-full flex flex-row ${healthAllowance===true?"justify-end bg-blue-600":"justify-start bg-[#dbdeef]"} p-1 items-center`}>
                    <View className='w-[15px] h-[15px] bg-white rounded-full'/>
                </Pressable>
                <Text className='text-[10px]'>health</Text>
              </View>
              <View className='flex flex-col justify-center items-center gap-1'>
                <Pressable onPress={()=>{setEmployAllowance(!employAllowance)}} className={`w-[40px] rounded-full flex flex-row ${employAllowance===true?"justify-end bg-blue-600":"justify-start bg-[#dbdeef]"} p-1 items-center`}>
                    <View className='w-[15px] h-[15px] bg-white rounded-full'/>
                </Pressable>
                <Text className='text-[10px]'>employ</Text>
              </View>
              <View className='flex flex-col justify-center items-center gap-1'>
                <Pressable onPress={()=>{setTaxAllowance(!taxAllowance)}} className={`w-[40px] rounded-full flex flex-row ${taxAllowance===true?"justify-end bg-blue-600":"justify-start bg-[#dbdeef]"} p-1 items-center`}>
                    <View className='w-[15px] h-[15px] bg-white rounded-full'/>
                </Pressable>
                <Text className='text-[10px]'>tax</Text>
              </View>
              <View className='flex flex-col justify-center items-center gap-1'>
                <Pressable onPress={()=>{setSpouseAllowance(!spouseAllowance)}} className={`w-[40px] rounded-full flex flex-row ${spouseAllowance===true?"justify-end bg-blue-600":"justify-start bg-[#dbdeef]"} p-1 items-center`}>
                    <View className='w-[15px] h-[15px] bg-white rounded-full'/>
                </Pressable>
                <Text className='text-[10px]'>spouse</Text>
              </View>

              <View className='flex flex-col justify-center items-center gap-1'>
                <Pressable onPress={()=>{setChildAllowance(!childAllowance)}} className={`w-[40px] rounded-full flex flex-row ${childAllowance===true?"justify-end bg-blue-600":"justify-start bg-[#dbdeef]"} p-1 items-center`}>
                    <View className='w-[15px] h-[15px] bg-white rounded-full'/>
                </Pressable>
                <Text className='text-[10px]'>child</Text>
              </View>

            </View>
          </View>
        )}

        </LinearGradient>
      </View>

      <View style={{ position: 'absolute', top: 50, right: 0, zIndex: 999 }} className='w-[110px] rounded-l-lg h-[50px] bg-white p-2'>
        <Pressable onPress={()=>{setPopUpSendSlip(true)}} className='w-full h-full rounded-lg overflow-hidden bg-blue-200'>
          <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full h-full p-[15px] flex flex-row justify-center items-center gap-2'>
            <Image source={require("../../assets/icons/file.png")} tintColor={"#FFFFFF"} style={{ width: 12, height: 14 }}/>
            <Image source={require("../../assets/icons/send.png")} tintColor={"#FFFFFF"} style={{ width: 12, height: 12 }}/>
          </LinearGradient>
        </Pressable>
      </View>

      {/* FILTER USER */}
      <View className={`w-full h-[200px] flex flex-col justify-end items-center absolute bottom-0 ${popUpShowSlip?'z-[1001]':'z-[999]'}`} style={{ position: 'absolute', bottom: 0 }}>
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
      </View> 

      {/* POPUP EDIT*/}
      {popUpEdit && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#001431]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/setting.png")} style={{ width: 12, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[12px] font-bold text-[#002531]'>
                  Create New Salary
                </Text>
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>Base salary</Text>
                </View>
                <TextInput
                  className='text-black p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                  placeholder='new base salary'
                  value={baseSalaryCreate.toString()}
                  keyboardType='numeric'
                  onChangeText={(text) => setBaseSalaryCreate(Number(text))}
                />
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>tunjangan istri</Text>
                  <Pressable onPress={() => {setSpouseAllowanceCreate(!spouseAllowanceCreate)}} className={`w-[35px] rounded-full flex flex-row ${spouseAllowanceCreate?"justify-end bg-blue-600":"justify-start bg-[#cfd2e5]"} p-1 items-center`}>
                    <View className='w-[10px] h-[10px] bg-white rounded-full'/>
                  </Pressable>
                </View>
                {spouseAllowanceCreate&&(
                  <TextInput
                    className='text-black p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder='ada berapa istri'
                    value={spouseAmountCreate.toString()}
                    keyboardType='numeric'
                    onChangeText={(text) => setSpouseAmountCreate(Number(text))}
                  />
                )}
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>tunjangan anak</Text>
                  <Pressable onPress={() => {setChildAllowanceCreate(!childAllowanceCreate)}} className={`w-[35px] rounded-full flex flex-row ${childAllowanceCreate?"justify-end bg-blue-600":"justify-start bg-[#cfd2e5]"} p-1 items-center`}>
                    <View className='w-[10px] h-[10px] bg-white rounded-full'/>
                  </Pressable>
                </View>
                {childAllowanceCreate&&(
                  <TextInput
                    className='text-black p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder='ada berapa anak'
                    value={childAmountCreate.toString()}
                    keyboardType='numeric'
                    onChangeText={(text) => setChildAmountCreate(Number(text))}
                  />
                )}
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>pajak</Text>
                  <Pressable onPress={() => {setTaxAllowanceCreate(!taxAllowanceCreate)}} className={`w-[35px] rounded-full flex flex-row ${taxAllowanceCreate?"justify-end bg-blue-600":"justify-start bg-[#cfd2e5]"} p-1 items-center`}>
                    <View className='w-[10px] h-[10px] bg-white rounded-full'/>
                  </Pressable>
                </View>
                {taxAllowanceCreate&&(
                  <TextInput
                    className='text-black p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                    placeholder='ada berapa anak'
                    value={taxAmountCreate.toString()}
                    keyboardType='numeric'
                    onChangeText={(text) => setTaxAmountCreate(Number(text))}
                  />
                )}
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>bpjs kesehatan</Text>
                  <Pressable onPress={() => {setHealthAllowanceCreate(!healthAllowanceCreate)}} className={`w-[35px] rounded-full flex flex-row ${healthAllowanceCreate?"justify-end bg-blue-600":"justify-start bg-[#cfd2e5]"} p-1 items-center`}>
                    <View className='w-[10px] h-[10px] bg-white rounded-full'/>
                  </Pressable>
                </View>
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>bpjs ketenagakerjaan</Text>
                  <Pressable onPress={() => {setEmploymentAllowanceCreate(!employmentAllowanceCreate)}} className={`w-[35px] rounded-full flex flex-row ${employmentAllowanceCreate?"justify-end bg-blue-600":"justify-start bg-[#cfd2e5]"} p-1 items-center`}>
                    <View className='w-[10px] h-[10px] bg-white rounded-full'/>
                  </Pressable>
                </View>
              </View>

              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEdit(false)}} className='border border-b-[2px] border-[#003681] bg-blue-50 rounded-lg py-[8px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#003681]'>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                    handleCreate();
                  }} className={`bg-[#4575e6] rounded-lg py-[10px] flex-1 justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#ffffff]'>
                    {loading?'Creating...':'Create'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP EDIT BASE SALARY*/}
      {popUpEditSalary && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#001431]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/setting.png")} style={{ width: 12, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[12px] font-bold text-[#002531]'>
                  Edit Base Salary
                </Text>
              </View>

              <View className='w-full flex flex-col gap-1'>
                <TextInput
                  className='text-black p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                  placeholder='new base salary'
                  value={baseSalary.toString()}
                  keyboardType='numeric'
                  onChangeText={(text) => setBaseSalary(Number(text))}
                />
              </View>
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEditSalary(false)}} className='border border-b-[2px] border-[#003681] bg-blue-50 rounded-lg py-[8px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#003681]'>
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP EDIT PAJAK*/}
      {popUpEditTax && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#001431]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/setting.png")} style={{ width: 12, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[12px] font-bold text-[#002531]'>
                  Edit Tax
                </Text>
              </View>

              <View className='w-full flex flex-col gap-1'>
                <TextInput
                  className='text-black p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                  placeholder='new base Tax'
                  value={taxAmount.toString()}
                  keyboardType='numeric'
                  onChangeText={(text) => setTaxAmount(Number(text))}
                />
              </View>
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEditTax(false)}} className='border border-b-[2px] border-[#003681] bg-blue-50 rounded-lg py-[8px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#003681]'>
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP EDIT TUNJANGAN ISTRI*/}
      {popUpEditSpouse && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#001431]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/setting.png")} style={{ width: 12, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[12px] font-bold text-[#002531]'>
                  Edit Tunjangan Istri
                </Text>
              </View>

              <View className='w-full flex flex-row justify-between items-center my-3 gap-2'>
                <Pressable onPress={() => {
                  setSpouseAmount(Number(spouseAmount-1))
                }} className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#006381]'>
                  <Text className='font-bold text-[25px] text-white mb-1'>-</Text>
                </Pressable>
                <TextInput
                  className='text-black p-[10px] pl-[20px] flex-1 flex-row justify-center items-center border-[.5px] border-[#006381] rounded-lg text-[12px]'
                  placeholder='new value'
                  value={spouseAmount.toString()}
                  onChangeText={(text) => setSpouseAmount(Number(text))}
                  keyboardType='numeric'
                />
                <Pressable onPress={() => {
                  setSpouseAmount(Number(spouseAmount+1))
                }} className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#006381]'>
                  <Text className='font-bold text-[25px] text-white mb-1'>+</Text>
                </Pressable>
              </View>
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEditSpouse(false)}} className='border border-b-[2px] border-[#003681] bg-blue-50 rounded-lg py-[8px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#003681]'>
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}

      {/* POPUP EDIT TUNJANGAN ANAK*/}
      {popUpEditChild && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#001431]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Image source={require("../../assets/icons/setting.png")} style={{ width: 12, height: 12, marginLeft: 5 }} tintColor={"#006381"}/>
                <Text className='text-[12px] font-bold text-[#002531]'>
                  Edit Tunjangan Anak
                </Text>
              </View>

              <View className='w-full flex flex-row justify-between items-center my-3 gap-2'>
                <Pressable onPress={() => {
                  setChildAmount(Number(childAmount-1))
                }} className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#006381]'>
                  <Text className='font-bold text-[25px] text-white mb-1'>-</Text>
                </Pressable>
                <TextInput
                  className='p-[10px] pl-[20px] text-black flex-1 flex-row justify-center items-center border-[.5px] border-[#006381] rounded-lg text-[12px]'
                  placeholder='new value'
                  value={childAmount.toString()}
                  onChangeText={(text) => setChildAmount(Number(text))}
                  keyboardType='numeric'
                />
                <Pressable onPress={() => {
                  setChildAmount(Number(childAmount+1))
                }} className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#006381]'>
                  <Text className='font-bold text-[25px] text-white mb-1'>+</Text>
                </Pressable>
              </View>
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEditChild(false)}} className='border border-b-[2px] border-[#003681] bg-blue-50 rounded-lg py-[8px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#003681]'>
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}
      
      {/* POPUP SHOW SLIP*/}
      {popUpShowSlip && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#000031]'/>
          <View className='w-full h-full px-[30px] pt-[60px] flex justify-start items-center absolute z-[1000]'>
            <View className='w-full bg-white px-[25px] py-[30px] rounded-md flex flex-col justify-start items-center'>
              <Text className='w-full text-center font-bold text-[12px]'>{companyName}</Text>
              <Text className='w-full text-center text-[10px]'>{companyAddress}</Text>
              <Text className='w-full text-center text-[10px] mb-2'>{titleSlip}</Text>
              {/* IDENTITY */}
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>Nama</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <Text className='text-[10px]'>{namaLengkap}</Text>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>NIK</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <Text className='text-[10px]'>{nik}</Text>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>Jabatan</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <Text className='text-[10px]'>{posisi}</Text>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>Bulan</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <Text className='text-[10px]'>{month} {year}</Text>
              </View>
              {/* IDENTITY */}
              <View className='w-full flex flex-row justify-start items-center mt-4'>
                <Text className='text-[10px] w-[130px] font-bold'>Gaji Pokok</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px]'>Rp</Text>
                  <Text className='text-[10px]'>{formatRupiahTanpaRp(baseSalaryValue)}</Text>
                </View>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>Lemburan ({overtimeLogThisMonth} jam)</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px]'>Rp</Text>
                  <Text className='text-[10px]'>{formatRupiahTanpaRp(totalOvertimePrice)}</Text>
                </View>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>Reimburse</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px]'>Rp</Text>
                  <Text className='text-[10px]'>{formatRupiahTanpaRp(totalReimburseValue)}</Text>
                </View>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px] font-bold'>Tunjangan</Text>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px] font-bold'>Istri</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px]'>Rp</Text>
                  <Text className='text-[10px]'>{formatRupiahTanpaRp(totalSpouseAmount)}</Text>
                </View>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>Anak</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px]'>Rp</Text>
                  <Text className='text-[10px]'>{formatRupiahTanpaRp(totalChildAmount)}</Text>
                </View>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px] font-bold'>Total</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px] font-bold'>Rp</Text>
                  <Text className='text-[10px] font-bold'>{formatRupiahTanpaRp(salaryPokok)}</Text>
                </View>
              </View>
              <View className=' w-full h-[1px] bg-black mt-2 mb-2'>
                <Text>as</Text>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px] font-bold'>POTONGAN</Text>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>PPh 21</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px]'>Rp</Text>
                  <Text className='text-[10px]'>{formatRupiahTanpaRp(totalSpouseAmount)}</Text>
                </View>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>BPJS Kesehatan</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px]'>Rp</Text>
                  <Text className='text-[10px]'>{formatRupiahTanpaRp(bpjsHealthAmount)}</Text>
                </View>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>BPJS Ketenagakerjaan</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px]'>Rp</Text>
                  <Text className='text-[10px]'>{formatRupiahTanpaRp(bpjsEmploymentAmount)}</Text>
                </View>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px]'>Kasbon (Angsuran 4)</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px]'>Rp</Text>
                  <Text className='text-[10px]'>{formatRupiahTanpaRp(0)}</Text>
                </View>
              </View>
              <View className='w-full flex flex-row justify-start items-center'>
                <Text className='text-[10px] w-[130px] font-bold'>JUMLAH</Text>
                <Text className='text-[10px] mr-2'>:</Text>
                <View className=' w-[110px] flex flex-row justify-between'>
                  <Text className='text-[10px] font-bold'>Rp</Text>
                  <Text className='text-[10px] font-bold'>{formatRupiahTanpaRp(totalSalary)}</Text>
                </View>
              </View>
              <View className='w-full flex flex-row justify-end items-center mt-4'>
                <Text className='text-[10px]'>{companyCity}, {month} {year}</Text>
              </View>
              <View className='w-full h-[20px] flex flex-row justify-end items-center mt-4'>
                <Text className='text-white'>sa</Text>
              </View>
              <View className='w-full flex flex-row justify-end items-center'>
                <View className='w-[124px] flex flex-row justify-start'>
                  <Text className='text-[10px] text-black'>{adminName}</Text>
                </View>
              </View>
            </View>
            <View className='flex flex-row gap-3 mt-3'>
              <Pressable onPress={()=>{
                setPopUpShowSlip(false)
                }} className='border-2 mt-3 border-white w-[50px] h-[50px] rounded-full flex justify-center items-center'>
                <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 17, height: 17 }} tintColor={"#ffffff"}/>
              </Pressable>
              <Pressable onPress={()=>{
                printSlipPdf()
                }} className='border-2 mt-3 border-white w-[50px] h-[50px] rounded-full flex justify-center items-center'>
                <Image source={require("../../assets/icons/download.png")} style={{ width: 17, height: 17 }} tintColor={"#ffffff"}/>
              </Pressable>
            </View>
          </View>
        </>
      )}
      
      {/* POPUP ERROR MESSAGE*/}
      {popUpErrorMessage && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#31000f]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[15px] rounded-lg flex flex-col justify-start items-center gap-2'>
              <View className='flex flex-row justify-start items-center gap-2 mb-3'>
                <Text className='text-[12px] font-bold text-[#31000d]'>
                  error send slip
                </Text>
              </View>
              <View className='w-full flex gap-2'>
                {errorSend.map((item,index)=>{
                  return(
                    <View key={index} className='w-full rounded-md p-2 flex justify-center items-center border border-red-700'>
                      <Text className='text-[10px] text-red-700'>{item}</Text>
                    </View>
                  )
                })}
              </View>
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {router.replace('/(admin)/dataSalaryKaryawan')}} className='border border-b-[2px] border-[#003681] bg-blue-50 rounded-lg py-[8px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#003681]'>
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}
      
      {/* POPUP SEND SLIP*/}
      {popUpSendSlip && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#001431]'/>
          <View className='w-full h-full px-[30px] flex justify-center items-center absolute z-[1000]'>
            <Text className='text-[15px] font-bold text-white mb-3'>
              SEND SLIP SALARY
            </Text>
            <Text className='text-[10px] text-white mb-3 text-justify'>
              pilih user yang mau dikirim slip gajinya. tekan yang lama card usernya untuk memilih banyak user.
            </Text>
            <View className='w-full p-[10px] rounded-lg flex flex-col justify-start items-center gap-2 border border-white'>
              <View className='w-full h-[300px]'>
                <ScrollView className='w-full h-full'>
                  <View className='w-full h-full flex justify-center items-center gap-2'>
                    {dataAllNewUser.length>0?
                    (
                      dataAllNewUser.map((item,index)=>{
                        const isMatch = dataUserSlip.some(
                          (userEmail) => userEmail === item.email
                        );
                      
                        if (isMatch) return null;
                        return(
                          <View key={index} className='w-full flex flex-row gap-2 justify-center items-center rounded-md'>
                            {checkActive && (
                            <Pressable onPress={()=>{
                                toggleSelect(item.email?.toString()??'');
                                }} className={`flex flex-row justify-center items-center mx-5 w-[22px] h-[22px] border rounded-lg border-white `}>
                                {
                                selectedEmail.includes(item.email?.toString()??'') && (
                                    <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
                                )
                                }
                            </Pressable>
                            )}
                            <Pressable onLongPress={()=>{setCheckActive(true)}} className={`${checkActive?'w-[80%]':'w-full'} p-2 rounded-md bg-white flex flex-row justify-start items-center`}>
                              <View
                                className={`w-[40px] h-[40px] flex justify-center items-center overflow-hidden rounded-full`}
                              >
                                <LinearGradient colors={['#5088FF', '#1A63FF']} className={`w-full h-full flex justify-center items-center`}>
                                  <Text className={`text-lg font-bold text-white`}>{item.username.charAt(0).toUpperCase()}{item.username.charAt(item.username.length - 1).toUpperCase()}</Text>
                                </LinearGradient>
                              </View>
                              <View className='w-[1px] h-full bg-blue-400 mx-2'/>
                              <View className='flex justify-center items-start'>
                                <Text className='text-[12px] font-bold text-blue-900'>{item.username}</Text>
                                <Text className='text-[12px] text-blue-900'>{item.email}</Text>
                              </View>
                            </Pressable>
                          </View>
                        )
                      })
                    ):(
                      <Text className='text-[12px] text-white font-bold'>
                        All Done Send
                      </Text>
                    )}
                  </View>
                </ScrollView>
                <View className='w-full flex flex-row gap-2 mt-2'>
                  <Pressable onPress={()=>{
                    handleManyCreateSlip()
                  }} className={`${checkActive?'w-[80%]':'w-full'} ${selectedEmail.length>0?'opacity-100':'opacity-50'} py-3 flex flex-row justify-center items-center gap-2 bg-blue-500 rounded-md`}>
                      <Text className='text-[12px] font-bold text-white'>
                        {loading?'Send...':'Send'}
                      </Text>
                      <Image source={require("../../assets/icons/send.png")} tintColor={"#FFFFFF"} style={{ width: 12, height: 12 }}/>
                  </Pressable>
                  {checkActive&&(
                    <Pressable onPress={()=>{
                      setCheckActive(false)
                      setSelectedEmail([])
                    }} className='w-[50px] h-[40px] flex flex-row justify-center items-center gap-2 bg-blue-500 rounded-md p-1'>
                      <View className='w-full h-full border-2 border-white rounded-md flex justify-center items-center'>
                        <Image source={require("../../assets/icons/s-decline.png")} tintColor={"#FFFFFF"} style={{ width: 12, height: 12 }}/>
                      </View>
                    </Pressable>
                  )}
                </View>
              </View>
              
            </View>
            <Text className='text-[10px] font-bold mt-3 text-white'>Done Send :</Text>
            <Text className='text-[10px] text-white mb-3 text-justify'>
              tekan yang lama card usernya untuk menghapus slip gaji.
            </Text>
            <View className={`w-full ${checkActiveDelete?'h-[230px]':'h-[150px]'} border border-white p-2 flex gap-2 mt-2 rounded-md`}>
              <ScrollView className='w-full h-full'>
                <View className='w-full h-full flex justify-center items-center gap-2'>
                  
                  {dataAllNewUser.length > 0 ? (
                    dataAllNewUser.map((item, index) => {
                      const isMatch = dataUserSlip.some(
                        (userEmail) => userEmail === item.email
                      );
                    
                      if (!isMatch) return null;
                    
                      return (
                        <View
                          key={index}
                          className="opacity-60 w-full flex flex-row gap-2 justify-center items-center rounded-md"
                        >
                          {checkActiveDelete && (
                          <Pressable onPress={()=>{
                              toggleSelectDelete(item.email?.toString()??'');
                              }} className={`flex flex-row justify-center items-center mx-5 w-[22px] h-[22px] border rounded-lg border-white `}>
                              {
                              selectedEmailDelete.includes(item.email?.toString()??'') && (
                                  <Image source={require("../../assets/icons/s-approve.png")} style={{ width: 10, height: 10 }} tintColor={"#ffffff"}/>
                              )
                              }
                          </Pressable>
                          )}
                          <Pressable onLongPress={()=>{setCheckActiveDelete(true)}}
                            className={`${checkActiveDelete?'w-[80%]':'w-full'} p-2 rounded-md bg-white flex flex-row justify-start items-center`}
                          >
                            <View className="w-[40px] h-[40px] flex justify-center items-center overflow-hidden rounded-full">
                              <LinearGradient
                                colors={['#5088FF', '#1A63FF']}
                                className="w-full h-full flex justify-center items-center"
                              >
                                <Text className="text-lg font-bold text-white">
                                  {item.username.charAt(0).toUpperCase()}
                                  {item.username.charAt(item.username.length - 1).toUpperCase()}
                                </Text>
                              </LinearGradient>
                            </View>
                      
                            <View className="w-[1px] h-full bg-blue-400 mx-2" />
                      
                            <View className="flex justify-center items-start">
                              <Text className="text-[12px] font-bold text-blue-900">
                                {item.username}
                              </Text>
                              <Text className="text-[12px] text-blue-900">
                                {item.email}
                              </Text>
                            </View>
                          </Pressable>
                        </View>
                      );
                    })
                  ) : (
                    <Text className="text-[12px] text-white font-bold">
                      No User Has Send
                    </Text>
                  )}
                </View>
              </ScrollView>
              {checkActiveDelete&&(
                <View className='w-full flex flex-row gap-2 mt-2'>
                  <Pressable onPress={()=>{
                    handleManyDeleteSlip()
                  }} className={`${checkActiveDelete?'w-[80%]':'w-full'} ${selectedEmailDelete.length>0?'opacity-100':'opacity-50'} py-3 flex flex-row justify-center items-center gap-2 bg-[#dc0049] rounded-md`}>
                      <Text className='text-[12px] font-bold text-white'>
                        {loading?'Deleting...':'Delete'}
                      </Text>
                      <Image source={require("../../assets/icons/send.png")} tintColor={"#FFFFFF"} style={{ width: 12, height: 12 }}/>
                  </Pressable>
                  {checkActiveDelete&&(
                    <Pressable onPress={()=>{
                      setCheckActiveDelete(false)
                      setSelectedEmailDelete([])
                    }} className='w-[50px] h-[40px] flex flex-row justify-center items-center gap-2 bg-blue-500 rounded-md p-1'>
                      <View className='w-full h-full border-2 border-white rounded-md flex justify-center items-center'>
                        <Image source={require("../../assets/icons/s-decline.png")} tintColor={"#FFFFFF"} style={{ width: 12, height: 12 }}/>
                      </View>
                    </Pressable>
                  )}
                </View>
              )}
            </View>
            <Pressable onPress={()=>{
              setPopUpSendSlip(false)
              }} className='border-2 mt-3 border-white w-[50px] h-[50px] rounded-full flex justify-center items-center'>
              <Image source={require("../../assets/icons/s-decline.png")} style={{ width: 17, height: 17 }} tintColor={"#ffffff"}/>
            </Pressable>
          </View>
        </>
      )}

      {/* POPUP Update */}
      {popUpSendUpdate && (
        <>
          <View className='absolute w-full z-[999] h-full opacity-80 bg-[#001431]'/>
          <View className='w-full h-full px-[50px] flex justify-center items-center absolute z-[1000]'>
            <View className='w-full bg-white p-[20px] pt-[60px] rounded-lg flex flex-col justify-start items-center'>
              <View className='w-[75px] h-[75px] absolute top-[-25px] border-[7px] border-white rounded-full bg-blue-600 flex justify-center items-center pr-[9px]'>
                <Image source={require("../../assets/icons/send.png")} style={{ width: 25, height: 25 }} tintColor={"#ffffff"} className='ml-[-20px]'/>
              </View>
              <Text className='text-[12px] w-full text-center'>
                Are you sure you want to saved new data salary?
              </Text>
              <View className='flex flex-row justify-center items-center gap-3 mt-5 w-full'>
                <Pressable onPress={() => {setPopUpSendUpdate(false)}} className='w-[50%] border border-b-[2px] border-blue-800 bg-blue-50 rounded-lg py-[8px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px]'>
                    No
                  </Text>
                </Pressable>
                <Pressable onPress={() => {handleUpdate()}} className='w-[50%] bg-blue-500 rounded-lg py-[10px] flex justify-center items-center'>
                  <Text className='font-bold text-[12px] text-white'>
                    {loading ? 'Loading...' : 'Yes'}
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

export default historyReimburseKaryawan
