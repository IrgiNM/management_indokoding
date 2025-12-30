import { GetTotalType } from "@/types/getTotalType";
import { UserGetAllType, UserGetType } from "@/types/userGetType";
import { useEffect, useState } from "react";
import { getFinanceDataByUser, getOvertimeLogByUserThisMonth, getReimburseUserByEmailThisMonth, getUserAll } from "./api";
import { dataReimburseMain } from "./dataReimburseFunction";
import { dataFinanceKaryawan } from "./dataFinanceKaryawan";
import { overtimeLogAdminFunction } from "./dataOvertimeLogFunction";
import { siteSettingType } from "@/types/siteSettingType";
import { fetchDataSettingPerCategory } from "./dataSiteSettingFunction";
import { overtimeLogType } from "@/types/overtimeLogType";
import { FinanceManagementType } from "@/types/financeDataType";
import { ReimbursementType } from "@/types/reimburseDataType";

export const dataUserFunction = ()=>{
    const [dataAllUser, setDataAllUser] = useState<UserGetAllType[]>([]);
    const [dataAllNewUser, setDataAllNewUser] = useState<UserGetType[]>([]);
    const { dataThisMonthAll } = dataReimburseMain();
    const [dataTotalReimburse, setDataTotalReimburse] = useState<GetTotalType[]>([]);
    const [dataSetting, setDataSetting] = useState<siteSettingType[]>([]);

    const hitungSalary = async(email: string) => {
        const resReimburse = await getReimburseUserByEmailThisMonth(email);
        const resFinance = await getFinanceDataByUser(email);
        const resOvertime = await getOvertimeLogByUserThisMonth(email);
        const resOvertimeData: overtimeLogType[] = resOvertime.data;
        const resFinanceData: FinanceManagementType = resFinance.data;
        const resReimburseData: ReimbursementType[] = resReimburse.data;

        const baseSalaryValue = Number(resFinanceData?.base_salary ?? 0);
        const totalReimburseValue = Number(resReimburseData.filter(item=>item.status==="Approved")
            .reduce((sum,item)=>sum + Number(item.total_amount),0));
        const spouseAmountFromSetting = Number(dataSetting?.find(item => item.key==="spouse_amount")?.value ?? 0);
        const childAmountFromSetting = Number(dataSetting?.find(item => item.key==="child_amount")?.value ?? 0);
        const spouseAllowanceValue = resFinanceData?.spouse_allowance ?? 0;
        const childAllowanceValue = resFinanceData?.child_allowance ?? 0;
        const taxValue = Number(resFinanceData?.tax_rate_percentage ?? 0);
        const bpjsHealthAllowance = resFinanceData?.enable_bpjs_health ?? false;
        const bpjsEmploymentAllowance = resFinanceData?.enable_bpjs_employment ?? false;
        const bpjsHealth = Number(dataSetting?.find(item => item.key==="bpjs_health_percentage")?.value ?? 0);
        const bpjsEmployment = Number(dataSetting?.find(item => item.key==="bpjs_employment_percentage")?.value ?? 0);
        const overtimeLogThisMonth = Number(resOvertimeData.filter(item=>item.status==="approved")
            .reduce((sum,item)=>sum + Number(item.duration_hours),0));
        const totalSpouseAmount = spouseAllowanceValue * spouseAmountFromSetting;
        const totalChildAmount = childAllowanceValue * childAmountFromSetting;
        const totalOvertimePrice = overtimeLogThisMonth * ((baseSalaryValue / 173) * 2);
        const salaryPokok = baseSalaryValue + totalSpouseAmount + totalChildAmount + totalReimburseValue + totalOvertimePrice;
        const bpjsHealthAmount = ((bpjsHealthAllowance ? bpjsHealth : 0) / 100) * baseSalaryValue;
        const bpjsEmploymentAmount = ((bpjsEmploymentAllowance ? bpjsEmployment : 0) / 100) * baseSalaryValue;
        const potongGaji = taxValue + bpjsHealthAmount + bpjsEmploymentAmount;
        const totalSalary = salaryPokok - potongGaji;

        return totalSalary
    }

    useEffect(()=>{
      const handleGetSetting = async() => {
        const res = await fetchDataSettingPerCategory("payroll");
        if(res){
          setDataSetting(res);
        }
      }
      handleGetSetting();
    }, [])

    useEffect(()=>{
        const fetchUser = async() => {
            const res = await getUserAll();
            if(res.status === 200){
                setDataAllUser(res.data);
                return // // console.error('Data all user fetched successfully', res.data);
            }
            // // console.error('Failed to fetch all user data:', res);
        }
        fetchUser();
    }, []);

    useEffect(()=>{
        const newUser = async() => {
            const totalReimburse = async() => {
                // // console.error('dataThisMonthAll : ', dataThisMonthAll);
                    {dataAllUser.map((user)=>{
                        const dataSelect = dataThisMonthAll.filter(
                          (item) => item.user_detail?.email === user.email
                        );
                        // // console.error('dataSelect : ', dataSelect);
                        const total = dataSelect.reduce((sum, item) => sum + Number(item.total_amount), 0);
                        // // console.error('total : ', total);
                        const totalReimburseData: GetTotalType = {
                            email: user.email,
                            total_reimburse: total,
                        }
                        setDataTotalReimburse(prev => [...prev, totalReimburseData]);
                          
                    })}
            }
            await totalReimburse();
        }
        newUser();
    }, [dataAllUser]);

    useEffect(() => {
        const newUserAsync = async () => {
            console.log('coba 1')
            if(!dataAllNewUser)return;
            const usersNew: UserGetType[] = [];
    
            for (const item of dataAllUser) {
                const totalSalary = await hitungSalary(item.email);
                usersNew.push({
                    username: item.username,
                    email: item.email,
                    is_staff: item.is_staff,
                    total_salary: totalSalary,
                });
            }
    
            setDataAllNewUser(usersNew);
        };
    
        newUserAsync();
    }, [dataSetting, dataAllUser]);
    



    return {dataAllNewUser};
}