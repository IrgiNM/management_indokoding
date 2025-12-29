import { BankAccountSendType, BankAccountType } from "@/types/bankAccountType"
import { useEffect, useState } from "react"
import { createBankAccountByUser, deleteBankAccountByUser, getBankAccountAll, getBankAccountByUser, getMyBankAccount, updateBankAccountByUser } from "./api"

export const dataBankAccountByUserFunction = (email:string) => {
    const [dataBankAccount, setDataBankAccount] = useState<BankAccountType[]>([])

    useEffect(()=>{
        const fetch = async() => {
            if(!email)return;
                const res = await getBankAccountByUser(email);
                if(res){
                    setDataBankAccount(res.data)
                }else{
                    console.error('gagal ambil data bank account user')
                }
        }
        fetch()
    }, [email])

    useEffect(()=>{
        console.log('data bankaccount : ', dataBankAccount);
    }, [dataBankAccount])

    return { dataBankAccount }
}

export const dataMyBankAccountFunction = () => {
    const [dataMyBankAccount, setDataMyBankAccount] = useState<BankAccountType[]>([])

    useEffect(()=>{
        const fetch = async() => {
            const res = await getMyBankAccount();
            if(res){
                setDataMyBankAccount(res.data)
            }else{
                console.error('gagal ambil data my bank account')
            }
        }
        fetch()
    }, [])

    useEffect(()=>{
        // console.error('data my bankaccount : ', dataMyBankAccount);
    }, [dataMyBankAccount])

    return { dataMyBankAccount }
}


export const createBankAccountFunction = async(email: string, data: BankAccountSendType) => {
    try{
        const res = await createBankAccountByUser(email,data)
        if(res.status===200){
            return true
        }else{
            return false
        }
    }catch{
        console.error('gagal create bank account')
    }
}

export const updateBankAccountFunction = async(id: number, data: BankAccountSendType) => {
    try{
        const res = await updateBankAccountByUser(id,data)
        if(res.status===200){
            return true
        }else{
            return false
        }
    }catch{
        console.error('gagal update bank account')
    }
}

export const deleteBankAccountFunction = async(id: number) => {
    try{
        const res = await deleteBankAccountByUser(id)
        if(res.status===204){
            return true
        }else{
            return false
        }
    }catch{
        console.error('gagal delete bank account')
    }
}