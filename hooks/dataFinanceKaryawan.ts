import { FinanceManagementSendType, FinanceManagementType } from '@/types/financeDataType'
import { ReimbursementType } from '@/types/reimburseDataType'
import React, { useEffect, useState } from 'react'
import { CreateOrUpdateFinanceDataByUser, getReimburseUserByEmailThisMonth } from './api';

export function dataFinanceKaryawan(email: string) {
    const [dataFinancePerUser, setDataFinancePerUser] = useState<FinanceManagementType[]>([]);
    const [dataReimburseUserThisMonth, setDataReimburseUserThisMonth] = useState<ReimbursementType[]>([]);

    useEffect(()=>{
        try{
            const fetch = async() => {
                console.error('liat email', email);
                const res = await getReimburseUserByEmailThisMonth(email);
                if(res.status===200){
                    setDataReimburseUserThisMonth(res.data);
                }
            }
            fetch();
        }catch{
            console.error('gagal menagmbil data reimburse user')
        }
    }, [email])

    useEffect(()=>{
        console.error('data rembuse',dataReimburseUserThisMonth)
    }, [dataReimburseUserThisMonth])

    return {dataFinancePerUser, dataReimburseUserThisMonth}
}

export const createOrUpdateFinanceUser = async(data: FinanceManagementSendType) => {
    const [dataFinanceUser, setDataFinanceUser] = useState<FinanceManagementType[]>([])

    useEffect(()=>{
        const fetch = async() => {
            try{
                const res = await CreateOrUpdateFinanceDataByUser(data)
                if(res.status===200){
                    setDataFinanceUser(res.data);
                }
            }catch{
                console.error('gagal membuat/mengupdate finance data user');
            }
        }
        fetch()
    }, [data])

    return {dataFinanceUser}
}


