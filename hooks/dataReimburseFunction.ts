import { reimburseData } from "@/data/reimburseData";
import { ReimburseType } from "@/types/reimburseDataType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function getDataReimburseUser(userId: number) {
    const dataReimburseUser: ReimburseType[] = reimburseData.filter(item => item.id_user === userId);
    return dataReimburseUser;
}

export const dataReimburseMain = () => {
    const [dataReimburse, setDataReimburse] = useState<ReimburseType[]>([]);
    const [dataMonth, setDataMonth] = useState<string[]>([]);

    useEffect(() => {
        const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const dataReimburse = getDataReimburseUser(Number(userId));
            setDataReimburse(dataReimburse);
            console.log('User ID:', userId);
        } catch (error) {
            console.error('Gagal mengambil user ID:', error);
        }
        };
        getUserId();
    }, []);

    useEffect(() => {
        const months: string[] = [];
        dataReimburse.map((item) => {
        const itemISO = new Date(item.date).toISOString();
        const itemMonth = itemISO.slice(0,7);
        months.push(itemMonth);
        });
        const uniqueMonths = [...new Set(months)];
        setDataMonth(uniqueMonths);
    }, [dataReimburse]);

    useEffect(()=>{
        console.log('data r:', dataReimburse);
        console.log(' reimburse bulan:', dataMonth);
    }, [dataMonth, dataReimburse]);

    return {dataReimburse, dataMonth};
}