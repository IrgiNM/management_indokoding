import { ReimbursementType } from "@/types/reimburseDataType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getToken } from "./tokenFunction";
import { getReimburseAll, getReimburseItemId, getReimburseUser } from "./api";
import { ReimbursementItemType } from "@/types/reimburseItemType";

export const dataReimburseMain = () => {
    const [dataReimburseUser, setDataReimburseUser] = useState<ReimbursementType[]>([]);
    const [dataMonth, setDataMonth] = useState<string[]>([]);
    const [totalAmountReimburse, setTotalAmountReimburse] = useState<number>(0);
    const [categoryReimburse, setCategoryReimburse] = useState<string[]>([]);
    const [reimburseId, setReimburseId] = useState<number[]>([]);
    const [dataItem, setDataItem] = useState<ReimbursementItemType[]>([]);

    useEffect(() => {
        const getReimbursementAll = async () => {
            try {
                const data = await getReimburseUser();
                if(data.status === 200){
                    setDataReimburseUser(data.data);
                    console.log('Data reimburse fetched successfully', data.data);
                }
            } catch (error) {
                console.error('Gagal mengambil user ID:', error);
            }
        };
        getReimbursementAll();
    }, []);

    // DATA MONTH
    useEffect(() => {
        const months: string[] = [];
        dataReimburseUser.map((item) => {
        const itemISO = item.created_at??'';
        const itemMonth = itemISO.slice(0,7);
        months.push(itemMonth);
        });
        const uniqueMonths = [...new Set(months)];
        setDataMonth(uniqueMonths);
    }, [dataReimburseUser]);

    // REIMBURSE ID
    useEffect(()=>{
        dataReimburseUser.map((item) => {
            const id = item.id??0;
            setReimburseId(prev => [...prev, id]);
        });
        console.log('reimburse id:', reimburseId);
    }, [dataReimburseUser,dataMonth]);

    // DATA ITEM REIMBURSE BY ID
    useEffect(()=>{
        const fetchReimburseItemById = async () => {
            if (!reimburseId) return;
            (reimburseId.map(async (id) => {
                try {
                    const data = await getReimburseItemId(id);
                    if(data.status === 200){
                        console.log('Data ITEM reimburse by id fetched successfully', data.data);
                        setDataItem(prev => [...prev, data.data]);
                    }
                } catch (error) {
                    console.error('Gagal mengambil reimburse item by id:', error);
                    console.log('Reimburse ID yang gagal:', reimburseId);
                }
            }))
        }
        fetchReimburseItemById();
    }, [reimburseId]);

    // DATA CATEGORY
    useEffect(()=>{
        const fetchCategory = async () => {
            if (!dataItem) return;
            (dataItem.map(async (item) => {
                try {
                    // const name = item.category_detail?.name ?? '';
                    // setCategoryReimburse(prev => [...prev, name]);
                    const flat = dataItem.flat();
                    const categories = flat
                        .map(item => item.category_detail?.name ?? '')
                        .filter(name => name !== '');
                    const uniqueCategories = [...new Set(categories)];

                    setCategoryReimburse(uniqueCategories);
                } catch (error) {
                    console.error('Gagal memasukkan category:', error);
                }
            }))
        }
        fetchCategory();
    }, [dataItem]);

    // CONSOLE LOG
    useEffect(()=>{
        console.log('data r:', dataReimburseUser);
        console.log(' reimburse bulan:', dataMonth);
        console.log('data item reimburse:', dataItem);
        console.log('data category:', categoryReimburse);
    }, [dataMonth, dataReimburseUser, dataItem]);

    // TOTAL AMOUNT REIMBURSE
    useEffect(()=>{
        const total = dataReimburseUser.reduce((sum, item) => sum + Number(item.total_amount), 0);
        setTotalAmountReimburse(total);
        console.log('Total amount reimburse:', total);
    }, [dataReimburseUser]);

    return {dataReimburseUser, totalAmountReimburse, dataMonth, categoryReimburse};
}


