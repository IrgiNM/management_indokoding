import { ReimbursementType } from "@/types/reimburseDataType";
import { ReimbursementItemType } from "@/types/reimburseItemType";
import { useEffect, useState } from "react";
import { DeleteReimburseId, getReimburseId, getReimburseItemId, getReimburseThisMonthAll, getReimburseThisYearAll, getReimburseThisYearAllPerUser, getReimburseUser, getReimburseUserPerMonth } from "./api";

export const dataReimburseMain = () => {
    // const { dataAllNewUser } = dataUserFunction()
    const [dataReimburseUser, setDataReimburseUser] = useState<ReimbursementType[]>([]);
    const [dataIdReimburseUser, setDataIdReimburseUser] = useState<number[]>([]);
    const [dataMonth, setDataMonth] = useState<string[]>([]);
    const [dataMonthAll, setDataMonthAll] = useState<string[]>([]);
    const [dataMonthYear, setDataMonthYear] = useState<string[]>([]);
    const [totalAmountReimburse, setTotalAmountReimburse] = useState<number>(0);
    const [categoryReimburse, setCategoryReimburse] = useState<string[]>([]);
    const [reimburseId, setReimburseId] = useState<number[]>([]);
    const [dataItem, setDataItem] = useState<ReimbursementItemType[]>([]);
    const [dataThisMonthAll, setDataThisMonthAll] = useState<ReimbursementType[]>([]);
    const [dataThisYearAll, setDataThisYearAll] = useState<ReimbursementType[]>([]);

    useEffect(() => {
        const getReimbursementAll = async () => {
            try {
                const data = await getReimburseUser();
                if(data.status === 200){
                    setDataReimburseUser(data.data);
                    console.log('Data reimburse fetched successfully', data.data);
                }
            } catch (error) {
                // console.error('Gagal mengambil user ID:', error);
            }
        };
        getReimbursementAll();
    }, []);

    useEffect(()=>{
        const getId = ()=>{
            {dataReimburseUser.map((item) => {
                const id = item.id??0;
                setDataIdReimburseUser(prev => [...prev, id]);
            })}
        }
        getId();
    }, [dataReimburseUser]);

    useEffect(() => {
        const getReimbursementThisMonthAll = async () => {
            try {
                const data = await getReimburseThisMonthAll();
                if(data.status === 200){
                    setDataThisMonthAll(data.data);
                    console.log('Data reimburse this month fetched successfully', data.data);
                }
            } catch (error) {
                // console.error('Gagal mengambil reimburse this month:', error);
            }
        };
        getReimbursementThisMonthAll();
    }, []);

    useEffect(() => {
        const getReimbursementThisYearAll = async () => {
            try {
                const data = await getReimburseThisYearAll();
                if(data.status === 200){
                    setDataThisYearAll(data.data);
                    console.log('Data reimburse this year fetched successfully', data.data);
                }
            } catch (error) {
                // console.error('Gagal mengambil reimburse this year:', error);
            }
        };
        getReimbursementThisYearAll();
    }, []);

    // useEffect(()=>{
    //     const createReimburseThisYearPerUser = async() => {
    //         {dataAllNewUser.map((user)=>{
    //             const dataSelect = dataThisYearAll.filter(
    //               (item) => item.user_detail?.email === user.email
    //             );
    //             console.log('dataSelect this year : ', dataSelect);
    //             const reimbursePerUser = {
    //                 user: user.email,
    //                 total_amount: dataSelect,
    //             }
    //             setDataReimburseThisYearPerUser(prev => [...prev, reimbursePerUser]);
    //         })}
    //     }
    //     createReimburseThisYearPerUser();
    // }, []);

    // DATA MONTH
    useEffect(() => {
        const months: string[] = [];
        dataReimburseUser.map((item) => {
        const itemISO = item.created_at??'';
        const itemMonth = itemISO.slice(5,7);
        months.push(itemMonth);
        });
        const uniqueMonths = [...new Set(months)];
        setDataMonth(uniqueMonths);
    }, [dataReimburseUser]);

    // DATA MONTH
    useEffect(() => {
        const months: string[] = [];
        dataThisYearAll.map((item) => {
        const itemISO = item.created_at??'';
        const itemMonth = itemISO.slice(5,7);
        months.push(itemMonth);
        });
        const uniqueMonths = [...new Set(months)];
        setDataMonthAll(uniqueMonths);
    }, [dataThisYearAll]);

    // DATA MONTH dan TAHUN
    useEffect(() => {
        const months: string[] = [];
        dataReimburseUser.map((item) => {
        const itemISO = item.created_at??'';
        const itemMonth = itemISO.slice(0,7);
        months.push(itemMonth);
        });
        const uniqueMonths = [...new Set(months)];
        setDataMonthYear(uniqueMonths);
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
                    // console.error('Gagal mengambil reimburse item by id:', error);
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
                    // console.error('Gagal memasukkan category:', error);
                }
            }))
        }
        fetchCategory();
    }, [dataItem]);

    // CONSOLE LOG
    useEffect(()=>{
        console.log('data r:', dataReimburseUser);
        // // console.error(' reimburse bulan:', dataThisYearAll);
        console.log('data item reimburse:', dataItem);
        console.log('data category:', categoryReimburse);
        console.log('reimburse id:', dataIdReimburseUser);
    }, [dataMonth, dataReimburseUser, dataItem, dataIdReimburseUser]);

    // TOTAL AMOUNT REIMBURSE
    useEffect(()=>{
        const total = dataReimburseUser.reduce((sum, item) => sum + Number(item.total_amount), 0);
        setTotalAmountReimburse(total);
        console.log('Total amount reimburse:', total);
    }, [dataReimburseUser]);

    return {dataReimburseUser, totalAmountReimburse, dataMonth, dataMonthAll, dataMonthYear, categoryReimburse, dataThisMonthAll, dataThisYearAll};
}

export const dataItemId = (id: number)=>{
    const [dataItemById, setDataItemById] = useState<ReimbursementItemType[]>([]);
    const [dataReimbursebyId, setDataReimbursebyId] = useState<ReimbursementType>({
        id: 0,
        user: 0,
        user_detail: {
            username: '',
            email: '',
            is_staff: false,
        },
        title: '',
        total_amount: '',
        created_at: '',
        updated_at: '',
        description: '',
        image: null,
        status: '',
    });

    useEffect(()=>{
        const fetchItem = async() => {
            const res = await getReimburseItemId(id);
            if(res.status === 200){
                setDataItemById(res.data);
                console.log('Data item by id fetched successfully', res.data);
            }
        }
        fetchItem();
    }, [id]);

    useEffect(()=>{
        const fetchReimburseById = async() => {
            const res = await getReimburseId(id);
            if(res.status === 200){
                setDataReimbursebyId(res.data);
                console.log('Data reimburse by id fetched successfully', res.data);
            }
        }
        fetchReimburseById();
    }, [id]);

    return {dataItemById, dataReimbursebyId};
}

export const deleteReimburseById = async (id: number) => {
    try{
        const res = await DeleteReimburseId(id);
        if(res.status === 204){
            // // console.error('Reimburse deleted successfully', res.data);
            return res.data;
        }
    }catch{
        // // console.error('Failed to delete reimburse');
    }
}

export const ChangeUserReimburse = async(email: string) => {
    try{
        // // console.error('email di change user reimburse : ', email);
        const res = await getReimburseThisYearAllPerUser(email);
        if(res.status === 200){
            // console.error('res di change user reimburse : ', res.data);
            return res.data;
        }
        return [];
    }catch{
        // console.error('Failed to change user reimburse');
    }
}

export const getReimburseUserHome = async (month:string) => {
  try{
      const year = new Date().getFullYear();
      const res = await getReimburseUserPerMonth(month);
      if(res.status === 200){
          console.error('get reimburse per month success : ', res.data);
          return res.data;
      }
      return [];
  }catch{
        // console.error('Failed to get reimburse per month');
  }
}

