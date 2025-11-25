import { FinanceManagementType } from '@/types/financeDataType'
import { ReimbursementType } from '@/types/reimburseDataType'
import React, { useEffect, useState } from 'react'
import { getReimburseUserByEmailThisMonth } from './api';

export function dataFinanceKaryawan(email: string) {
    const [dataFinancePerUser, setDataFinancePerUser] = useState<FinanceManagementType[]>([]);
    const [dataReimburseUserThisMonth, setDataReimburseUserThisMonth] = useState<ReimbursementType[]>([]);

    useEffect(()=>{
        try{
            const fetch = async() => {
                const res = await getReimburseUserByEmailThisMonth(email);
                if(res.status===200){
                    setDataReimburseUserThisMonth(res.data);
                }
            }
            fetch();
        }catch{

        }
    }, [])

    return {dataFinancePerUser}
}
