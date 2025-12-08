import HeaderBack from '@/components/headerBack'
import { updateReimburse } from '@/hooks/api'
import { dataFinanceKaryawan } from '@/hooks/dataFinanceKaryawan'
import { ChangeUserReimburse, dataReimburseMain } from '@/hooks/dataReimburseFunction'
import { fetchDataSettingPerCategory } from '@/hooks/dataSiteSettingFunction'
import { dataUserFunction } from '@/hooks/dataUserFunction'
import { formatRupiah } from '@/hooks/formatRupiahFunction'
import { ReimbursementType } from '@/types/reimburseDataType'
import { siteSettingType } from '@/types/siteSettingType'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
const { width } = Dimensions.get('window');

const historyReimburseKaryawan = () => {
  const router =  useRouter();
  const { dataAllNewUser } = dataUserFunction();
  const [isActive, setIsActive] = useState('');
  const [isEnableButton, setIsEnableButton] = useState(false);
  const [buttonEdit, setButtonEdit] = useState(false);
  const { dataReimburseUserThisMonth, dataFinancePerUser } = dataFinanceKaryawan(isActive);
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [popUpEditSalary, setPopUpEditSalary] = useState(false);
  const [popUpEditTax, setPopUpEditTax] = useState(false);
  const [popUpEditSpouse, setPopUpEditSpouse] = useState(false);
  const [popUpEditChild, setPopUpEditChild] = useState(false);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [dataSetting, setDataSetting] = useState<siteSettingType[]>([]);

  // SALARY DATA
  const [baseSalary, setBaseSalary] = useState<number>(0);
  const [spouseAmount, setSpouseAmount] = useState<number>(0);
  const [childAmount, setChildAmount] = useState<number>(0);
  const [bpjsHealthPercentage, setBpjsHealthPercentage] = useState<number>(0);
  const [bpjsEmploymentPercentage, setBpjsEmploymentPercentage] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [receivableAmount, setReceivableAmount] = useState<number>(0);

  // NILAI
  const baseSalaryValue = Number(dataFinancePerUser?.base_salary ?? 0);
  const totalReimburseAmount = dataReimburseUserThisMonth.reduce((sum, item) => sum + Number(item.total_amount), 0);
  const spouseAmountValue = Number(dataSetting?.find(item => item.key==="spouse_amount")?.value??0);
  const childAmountValue = Number(dataSetting?.find(item => item.key==="child_amount")?.value??0);
  const spouseAllowanceValue = dataFinancePerUser?.spouse_allowance ?? 0;
  const childAllowanceValue = dataFinancePerUser?.child_allowance ?? 0;
  const taxValue = Number(dataFinancePerUser?.tax_rate_percentage ?? 0);
  const bpjsHealthAllowance = Number(dataFinancePerUser?.enable_bpjs_health ?? false);
  const bpjsEmploymentAllowance = Number(dataFinancePerUser?.enable_bpjs_employment ?? false);
  const bpjsHealth = Number(dataSetting?.find(item => item.key==="bpjs_health_percentage")?.value??0);
  const bpjsEmployment = Number(dataSetting?.find(item => item.key==="bpjs_employment_percentage")?.value??0);
  
  const totalSpouseAmount = spouseAllowanceValue * spouseAmountValue;
  const totalChildAmount = childAllowanceValue * childAmountValue;
  const salaryPokok = baseSalaryValue + totalSpouseAmount + totalChildAmount + totalReimburseAmount;
  const bpjsHealthAmount = (bpjsHealth/100) * baseSalaryValue;
  const bpjsEmploymentAmount = (bpjsEmployment/100) * baseSalaryValue;
  const potongGaji = taxValue + (bpjsHealthAllowance?bpjsHealthAmount:0) + (bpjsEmploymentAllowance?bpjsEmploymentAmount:0);

  const totalSalary = salaryPokok - potongGaji;
  
  // ENABLED ALLOWANCE
  const [spouseAllowance, setSpouseAllowance] = useState(false);
  const [childAllowance, setChildAllowance] = useState(false);
  const [taxAllowance, setTaxAllowance] = useState(false);
  const [healthAllowance, setHealthAllowance] = useState(false);
  const [employAllowance, setEmployAllowance] = useState(false);

  useEffect(()=>{
    if (dataAllNewUser && dataAllNewUser.length > 0) {
      setIsActive(dataAllNewUser[0].email);
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

  
  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='Data Salary Karyawan' type='python'/>

      <View className='w-full flex-1 bg-[#4d84f0]'>
        <LinearGradient colors={['#5088FF', '#001749']} className='w-full h-full p-4 px-[20px] flex-1 flex-col justify-start items-center'>
        <View className={`relative top-[-20px] z-[998] w-full overflow-hidden ${buttonEdit?"h-[65%]":"h-[82%]"} p-3 rounded-lg bg-white flex justify-start items-center`}>

          {/* DATA HEADER TOTAL SALARY */}
          <View className='w-full h-[85px] rounded-lg overflow-hidden flex flex-col justify-center items-center'>
            <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full h-full p-[15px] flex flex-col justify-center items-center'>
              <Text className='text-[12px] text-white'>total salary</Text>
              <Text className='text-[20px] text-white font-bold'>{formatRupiah(totalSalary)}</Text>
              <Text className='text-[10px] opacity-50 text-white font-bold'>+ {formatRupiah(salaryPokok)} - {formatRupiah(potongGaji)}</Text>
              <Pressable onPress={()=>{setButtonEdit(!buttonEdit)}} className="w-[35px] h-[35px] bg-[#5088FF] rounded-md border-[.5px] border-b-[1px] border-[#ffffff] flex justify-center items-center absolute right-[20px]">
                  <Image source={require("../../assets/icons/edit.png")} tintColor={"#ffffff"} style={{ width: 14, height: 14 }}/>
              </Pressable>
              <Pressable onPress={()=>{}} className="w-[35px] h-[35px] bg-[#5088FF] rounded-md border-[.5px] border-b-[1px] border-[#ffffff] flex justify-center items-center absolute left-[20px]">
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
                  <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>+ {formatRupiah(baseSalaryValue)}</Text>
                  {buttonEdit&&(
                    <Pressable onPress={()=>{setPopUpEditSalary(true)}} className="w-[25px] h-[25px] bg-[#ffeed9] rounded-md border-[.5px] border-b-[1px] border-[#913800] flex justify-center items-center">
                        <Image source={require("../../assets/icons/edit.png")} tintColor={"#913800"} style={{ width: 12, height: 12 }}/>
                    </Pressable>
                  )}
                </View>
              </View>

              {/* REIMBURSE */}
              {(dataReimburseUserThisMonth.length>0)&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>total reimburse</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>+ {formatRupiah(0)}</Text>
                      {buttonEdit&&(
                        <View className="w-[25px] h-[25px] opacity-0"></View>
                      )}
                    </View>
                  </View>
                </>
              )}

              {/* TUNJANGAN ISTRI */}
              {(dataFinancePerUser?.spouse_allowance??0)>0&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>tunjangan istri</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{spouseAllowanceValue}</Text>
                      <Text className='text-[12px]  opacity-30'>x</Text>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{formatRupiah(spouseAmountValue)}</Text>
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
              {(dataFinancePerUser?.child_allowance??0)>0&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>tunjangan anak</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{childAllowanceValue}</Text>
                      <Text className='text-[12px]  opacity-30'>x</Text>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{formatRupiah(childAmountValue)}</Text>
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
              {(dataFinancePerUser?.enable_tax??false)&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>pajak</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] font-semibold text-blue-700 p-2 px-3 border-[.5px] border-b-[1px] border-blue-600 rounded-lg'>- {formatRupiah(taxValue)}</Text>
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
              {(dataFinancePerUser?.enable_bpjs_health??false)&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>bpjs kesehatan</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{bpjsHealth}%</Text>
                      <Text className='text-[12px]  opacity-30'>x</Text>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{formatRupiah(baseSalaryValue)}</Text>
                      {buttonEdit&&(
                        <Pressable onPress={()=>{}} className="w-[25px] h-[25px] bg-[#ecf8f9] rounded-md border-[.5px] border-b-[1px] border-[#008091] flex justify-center items-center">
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
              {(dataFinancePerUser?.enable_bpjs_employment??false)&&(
                <>
                  <View className='w-full flex flex-row justify-between items-center mb-1'>
                    <Text className='text-[10px]'>bpjs employment</Text>
                    <View className='flex flex-row justify-center items-center gap-2'>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{bpjsEmployment}%</Text>
                      <Text className='text-[12px]  opacity-30'>x</Text>
                      <Text className='text-[12px] p-2 px-3 border-[.5px] rounded-lg  opacity-30'>{formatRupiah(baseSalaryValue)}</Text>
                      {buttonEdit&&(
                        <Pressable onPress={()=>{}} className="w-[25px] h-[25px] bg-[#ecf8f9] rounded-md border-[.5px] border-b-[1px] border-[#008091] flex justify-center items-center">
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

      {/* FILTER USER */}
      <View className='w-full h-[200px] flex flex-col justify-end absolute bottom-0 z-[999]' style={{ position: 'absolute', bottom: 0 }}>
        <View className='bg-white w-full h-[140px] flex-row items-start px-[30px] pt-[20px] rounded-t-3xl gap-[10px] border-[.5px] border-blue-600'>
          {buttonEdit?(
            <Pressable onPress={()=>{}} className='w-full rounded-lg overflow-hidden'>
              <LinearGradient colors={['#5088FF', '#1A63FF']} className='w-full p-5 gap-2 flex flex-row justify-center items-center'>
                <Text className='text-white text-[12px] font-bold'>
                  {loading?"Saving...":"Save"}
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
                  <Pressable onPress={() => {}} className='w-[35px] rounded-full flex flex-row justify-end bg-[#cfd2e5] p-1 items-center'>
                    <View className='w-[10px] h-[10px] bg-white rounded-full'/>
                  </Pressable>
                </View>
                <TextInput
                  className='p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                  placeholder='new base salary'
                  value={baseSalary.toString()}
                  keyboardType='numeric'
                  onChangeText={(text) => setBaseSalary(Number(text))}
                />
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>tunjangan istri</Text>
                  <Pressable onPress={() => {}} className='w-[35px] rounded-full flex flex-row justify-end bg-[#cfd2e5] p-1 items-center'>
                    <View className='w-[10px] h-[10px] bg-white rounded-full'/>
                  </Pressable>
                </View>
                <TextInput
                  className='p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                  placeholder='ada berapa istri'
                  value={baseSalary.toString()}
                  keyboardType='numeric'
                  onChangeText={(text) => setBaseSalary(Number(text))}
                />
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>tunjangan anak</Text>
                  <Pressable onPress={() => {}} className='w-[35px] rounded-full flex flex-row justify-end bg-[#cfd2e5] p-1 items-center'>
                    <View className='w-[10px] h-[10px] bg-white rounded-full'/>
                  </Pressable>
                </View>
                <TextInput
                  className='p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                  placeholder='ada berapa anak'
                  value={baseSalary.toString()}
                  keyboardType='numeric'
                  onChangeText={(text) => setBaseSalary(Number(text))}
                />
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>pajak</Text>
                  <Pressable onPress={() => {}} className='w-[35px] rounded-full flex flex-row justify-end bg-[#cfd2e5] p-1 items-center'>
                    <View className='w-[10px] h-[10px] bg-white rounded-full'/>
                  </Pressable>
                </View>
                <TextInput
                  className='p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                  placeholder='ada berapa anak'
                  value={baseSalary.toString()}
                  keyboardType='numeric'
                  onChangeText={(text) => setBaseSalary(Number(text))}
                />
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>bpjs kesehatan</Text>
                  <Pressable onPress={() => {}} className='w-[35px] rounded-full flex flex-row justify-end bg-[#cfd2e5] p-1 items-center'>
                    <View className='w-[10px] h-[10px] bg-white rounded-full'/>
                  </Pressable>
                </View>
              </View>

              <View className='w-full flex flex-col gap-1'>
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>bpjs ketenagakerjaan</Text>
                  <Pressable onPress={() => {}} className='w-[35px] rounded-full flex flex-row justify-end bg-[#cfd2e5] p-1 items-center'>
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
                  }} className={`bg-[#4575e6] rounded-lg py-[10px] flex-1 justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#ffffff]'>
                    {loading ? 'Creating...' : 'Create'}
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
                <View className='flex flex-row justify-between items-center px-2'>
                  <Text className='text-[10px] font-bold'>Base salary</Text>
                </View>
                <TextInput
                  className='p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                  placeholder='new base salary'
                  value={baseSalary.toString()}
                  keyboardType='numeric'
                  onChangeText={(text) => setBaseSalary(Number(text))}
                />
              </View>

              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEditSalary(false)}} className='border border-b-[2px] border-[#003681] bg-blue-50 rounded-lg py-[8px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#003681]'>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                  }} className={`bg-[#4575e6] rounded-lg py-[10px] flex-1 justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#ffffff]'>
                    {loading ? 'Saving...' : 'Save'}
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
                  className='p-[8px] pl-[20px] text-[12px] w-full flex flex-row justify-center items-center border-[.5px] rounded-lg'
                  placeholder='new base Tax'
                  value={taxAmount.toString()}
                  keyboardType='numeric'
                  onChangeText={(text) => setTaxAmount(Number(text))}
                />
              </View>

              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEditTax(false)}} className='border border-b-[2px] border-[#003681] bg-blue-50 rounded-lg py-[8px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#003681]'>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                  }} className={`bg-[#4575e6] rounded-lg py-[10px] flex-1 justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#ffffff]'>
                    {loading ? 'Saving...' : 'Save'}
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
                  className='p-[10px] pl-[20px] text-[#006381] flex-1 flex-row justify-center items-center border-[.5px] border-[#006381] rounded-lg text-[12px]'
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

              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEditSpouse(false)}} className='border border-b-[2px] border-[#003681] bg-blue-50 rounded-lg py-[8px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#003681]'>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                  }} className={`bg-[#4575e6] rounded-lg py-[10px] flex-1 justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#ffffff]'>
                    {loading ? 'Saving...' : 'Save'}
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
                  className='p-[10px] pl-[20px] text-[#006381] flex-1 flex-row justify-center items-center border-[.5px] border-[#006381] rounded-lg text-[12px]'
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

              {error !== '' && (
                <Text className={`w-full border-[.5px] rounded-lg p-3 ${error === 'berhasil membuat user' ? 'border-green-600 text-green-500' : 'border-red-600 text-red-500'} text-center mt-2`}>
                  {error}
                </Text>
              )}
              <View className='flex flex-row justify-center items-center gap-2 mt-3 w-full'>
                <Pressable onPress={() => {setPopUpEditChild(false)}} className='border border-b-[2px] border-[#003681] bg-blue-50 rounded-lg py-[8px] flex-1 justify-center items-center'>
                  <Text className='font-bold text-[12px] text-[#003681]'>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable onPress={() => { 
                    setError('');
                  }} className={`bg-[#4575e6] rounded-lg py-[10px] flex-1 justify-center items-center`}>
                  <Text className='font-bold text-[12px] text-[#ffffff]'>
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

export default historyReimburseKaryawan
