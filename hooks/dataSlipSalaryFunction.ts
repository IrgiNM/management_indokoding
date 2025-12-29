import { SalarySlipType } from "@/types/slipSalaryType"
import { useEffect, useState } from "react"
import { createSlipSalaryByUser, deleteSlipSalaryByUser, getAllSlipSalary } from "./api"

export const dataSlipSalary = () => {
    const [dataSlipSalaryAll, setDataSlipSalaryAll] = useState<SalarySlipType[]>([])
    const [dataUserSlip, setDataUserSlip] = useState<string[]>([])

    useEffect(()=>{
        const fetch = async() => {
            const res = await getAllSlipSalary()
            if(res){
                setDataSlipSalaryAll(res.data)
            }else{
                console.error('gagal get all slip salary')
            }
        }
        fetch() 
    }, [])

    useEffect(()=>{
        const fetch = dataSlipSalaryAll.map(item=>
            (item.user_detail.email??'')
        )
        const dataUnique = [...new Set(fetch)];
        dataUnique.sort((a,b)=>Number(b)-Number(a));
        setDataUserSlip(dataUnique)
    }, [dataSlipSalaryAll])

    useEffect(() => {
        // console.error('data slipSalary : ', dataSlipSalaryAll)
        // console.error('data user slip : ', dataUserSlip)
    }, [dataSlipSalaryAll,dataUserSlip]);

    return { dataSlipSalaryAll,dataUserSlip }
}

export const createManySlipSalary = async (data: string[]) => {
  const errorMessages: string[] = [];

  for (const email of data) {
    try {
      const res = await createSlipSalaryByUser(email);

      if (res.status !== 200&&res.status !== 201) {
        errorMessages.push(`Slip gaji ${email} gagal dikirim`);
      }
    } catch (error) {
      errorMessages.push(`Slip gaji ${email} error, pastikan data employee nya sudah ada`);
    }
  }

  if (errorMessages.length > 0) {
    return errorMessages;
  }

  return true;
};

export const deleteManySlipSalary = async (data: string[]) => {
  const errorMessages: string[] = [];

  for (const email of data) {
    try {
      const res = await deleteSlipSalaryByUser(email);

      if (res.status !== 200) {
        errorMessages.push(`Slip gaji ${email} gagal dihapus`);
      }
    } catch (error) {
      errorMessages.push(`Slip gaji ${email} error, pastikan data employee nya sudah ada`);
    }
  }

  if (errorMessages.length > 0) {
    return errorMessages;
  }

  return true;
};
  