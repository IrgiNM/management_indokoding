import { EmployeeSendType, EmployeeType } from "@/types/employeeType";
import { useEffect, useState } from "react";
import { createEmployeeByUser, getEmployeeByUser, updateEmployeeByUser } from "./api";

export const dataEmployeeFunction = (email: string) => {
    const [dataEmployee, setDataEmployee] = useState<EmployeeType>({} as EmployeeType);

    useEffect(()=>{
        const fetch = async() => {
            const res = await getEmployeeByUser(email);
            if(res.status === 200){
                setDataEmployee(res.data);
            }
        }
        fetch();
    }, [email])

    useEffect(()=>{
        // console.error("Employee Data:", dataEmployee);
    }, [dataEmployee])

    return { dataEmployee }
}


export const createEmployeeDataFunction = async(email: string, data: EmployeeSendType) => {
    try{
        const res = await createEmployeeByUser(email,data);
        if(res.status === 201){
            return true
        }else{
            return false
        }
    }catch(error){
        if (error instanceof Error && 'response' in error) {
            console.log((error as any).response?.data);
        } else {
            console.log("An unknown error occurred:", error);
        }
    }
}

export const updateEmployeeDataFunction = async(email: string, data: EmployeeSendType) => {
    try{
        const res = await updateEmployeeByUser(email,data);
        if(res.status === 200){
            return true
        }else{
            return false
        }
    }catch(error){
        if (error instanceof Error && 'response' in error) {
            console.log((error as any).response?.data);
        } else {
            console.log("An unknown error occurred:", error);
        }
    }
}