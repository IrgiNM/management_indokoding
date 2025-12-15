import { overtimeLogSendType, overtimeLogType } from "@/types/overtimeLogType";
import { useEffect, useState } from "react";
import { createOvertimeLog, deleteOvertimeLog, getMyOvertimeLog, getOvertimeLogAll, getOvertimeLogByUser, updateOvertimeLog } from "./api";

export const fetchYearMonthAndDay = () => {
    const now = new Date();
    const [dataYears, setDataYears] = useState<number[]>([]);
    const [dataMonths, setDataMonths] = useState<number[]>([]);
    const [dataDays, setDataDays] = useState<number[]>([]);
    const year = now.getFullYear();
    const month = Number(now.getMonth() + 1);
    const day = Number(now.getDate());
    const hours = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
    ]
    const minutes = [
        "00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"
    ]

    useEffect(()=>{
        const yearsArray = [];
        for(let i = year; i >= year - 5; i--){
            yearsArray.push(i);
        }
        setDataYears(yearsArray);

        const monthsArray = [];
        for(let i = month; i >= 1; i--){
            monthsArray.push(i);
        }
        setDataMonths(monthsArray);

        const daysArray = [];
        for(let i = day; i >= 1; i--){
            daysArray.push(i);
        }
        setDataDays(daysArray);
    }, [])
    return { dataYears, dataMonths, dataDays, year, month, day, hours, minutes };    
}

export const myOvertimeLogFunction = () => {
    const [dataMyOvertimeLog, setDataMyOvertimeLog] = useState<overtimeLogType[]>([]);
    const [dataMonthsNumber, setDataMonths] = useState<string[]>([]);

    useEffect(()=>{
        const fetch = async() => {
            const res = await getMyOvertimeLog();
            if(res.status === 200){
                setDataMyOvertimeLog(res.data);
            }
        }
        fetch();
    }, [])

    useEffect(()=>{
        const months = dataMyOvertimeLog.map(item =>
            (item.date ?? '').slice(5, 7)
        );
        const all = [...months, ...dataMonthsNumber];
        const uniqueMonths = [...new Set(all)];
        uniqueMonths.sort((a, b) => Number(b) - Number(a));
        setDataMonths(uniqueMonths);
    }, [dataMyOvertimeLog])

    useEffect(()=>{
        console.log('My Overtime Log:', dataMyOvertimeLog);
        console.log('My month:', dataMonthsNumber);
    }, [dataMyOvertimeLog, dataMonthsNumber])

    return { dataMyOvertimeLog, dataMonthsNumber }
}

export const overtimeLogAdminFunction = (email: string) => {
    const [dataOvertimeLogAll, setDataOvertimeLogAll] = useState<overtimeLogType[]>([]);
    const [dataOvertimeLogByUser, setDataOvertimeLogByUser] = useState<overtimeLogType[]>([]);

    useEffect(()=>{
        const fetch = async() => {
            const res = await getOvertimeLogAll();
            if(res.status === 200){
                setDataOvertimeLogAll(res.data);
            }
        }
        fetch();
    }, [])

    useEffect(()=>{
        const fetch = async() => {
            const res = await getOvertimeLogByUser(email);
            if(res.status === 200){
                setDataOvertimeLogByUser(res.data);
            }
        }
        fetch();
    }, [email])

    useEffect(()=>{
        console.error("Overtime Log By User:", dataOvertimeLogByUser);
        console.error("Overtime Log All:", dataOvertimeLogAll);
    }, [dataOvertimeLogByUser, dataOvertimeLogAll])

    return { dataOvertimeLogAll, dataOvertimeLogByUser }
}

export const createOvertimeLogFunction = async(data: overtimeLogSendType) => {
    try{
        const res = await createOvertimeLog(data)
        if(res.status === 201){
            return true;
        }
        return false;
    }catch{
        console.error("Failed to create overtime log");
    }
}

export const updateOvertimeLogFunction = async(id: number, data: overtimeLogSendType) => {
    try{
        const res = await updateOvertimeLog(id, data)
        if(res.status === 200){
            return true;
        }
        return false;
    }catch{
        console.error("Failed to update overtime log");
    }
}

export const deleteOvertimeLogFunction = async(id: number) => {
    try{
        const res = await deleteOvertimeLog(id)
        if(res.status === 200){
            return true;
        }
        return false;
    }catch{
        console.error("Failed to delete overtime log");
    }
}