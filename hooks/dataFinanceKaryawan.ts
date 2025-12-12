import { FinanceManagementSendType, FinanceManagementType } from '@/types/financeDataType'
import { ReimbursementType } from '@/types/reimburseDataType'
import React, { useEffect, useState } from 'react'
import { CreateFinanceDataByUser, getFinanceDataByUser, getReimburseUserByEmailThisMonth, UpdateFinanceDataByUser } from './api';

export function dataFinanceKaryawan(email: string) {
    const [dataFinancePerUser, setDataFinancePerUser] = useState<FinanceManagementType>();
    const [dataReimburseUserThisMonth, setDataReimburseUserThisMonth] = useState<ReimbursementType[]>([]);

    useEffect(()=>{
        try{
            const fetch = async() => {
                if(!email) return;
                // console.error('liat email', email);
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
        try{
            const fetch = async() => {
                if(!email) return;
                const res = await getFinanceDataByUser(email);
                if(res.status===200){
                    setDataFinancePerUser(res.data);
                }
            }
            fetch();
        }catch{
            console.error('gagal mengambil data finance user')
        }
    }, [email])

    useEffect(()=>{
        console.log('data rembuse',dataReimburseUserThisMonth)
        console.log('data finance',dataFinancePerUser)
    }, [dataReimburseUserThisMonth, dataFinancePerUser])

    return {dataFinancePerUser, dataReimburseUserThisMonth}
}

export const createFinanceUser = async(data: FinanceManagementSendType) => {
    try{
        const res = await CreateFinanceDataByUser(data)
        if(res.status===201){
            return true
        }else{
            return false
        }
    }catch{
        console.error('gagal membuat finance data user');
    }
}

export const UpdateFinanceUser = async(data: FinanceManagementSendType) => {
    try{
        const res = await UpdateFinanceDataByUser(data)
        if(res.status===200){
            return true
        }else{
            return false
        }
    }catch{
        console.error('gagal mengupdate finance data user');
    }
}


