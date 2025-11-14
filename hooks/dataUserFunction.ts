import { UserGetAllType, UserGetType } from "@/types/userGetType";
import { useEffect, useState } from "react";
import { getUserAll } from "./api";
import { dataReimburseMain } from "./dataReimburseFunction";
import { GetTotalType } from "@/types/getTotalType";

export const dataUserFunction = ()=>{
    const [dataAllUser, setDataAllUser] = useState<UserGetAllType[]>([]);
    const [dataAllNewUser, setDataAllNewUser] = useState<UserGetType[]>([]);
    const { dataThisMonthAll } = dataReimburseMain();
    const [dataTotalReimburse, setDataTotalReimburse] = useState<GetTotalType[]>([]);

    useEffect(()=>{
        const fetchUser = async() => {
            const res = await getUserAll();
            if(res.status === 200){
                setDataAllUser(res.data);
                return // console.error('Data all user fetched successfully', res.data);
            }
            // console.error('Failed to fetch all user data:', res);
        }
        fetchUser();
    }, []);

    useEffect(()=>{
        const newUser = async() => {
            const totalReimburse = async() => {
                // console.error('dataThisMonthAll : ', dataThisMonthAll);
                    {dataAllUser.map((user)=>{
                        const dataSelect = dataThisMonthAll.filter(
                          (item) => item.user_detail?.email === user.email
                        );
                        // console.error('dataSelect : ', dataSelect);
                        const total = dataSelect.reduce((sum, item) => sum + Number(item.total_amount), 0);
                        // console.error('total : ', total);
                        const totalReimburseData: GetTotalType = {
                            email: user.email,
                            total_reimburse: total,
                        }
                        setDataTotalReimburse(prev => [...prev, totalReimburseData]);
                          
                    })}
            }
            await totalReimburse();
        }
        newUser();
    }, [dataAllUser]);

    useEffect(()=>{
        // console.error('dataTotalReimburse : ', dataTotalReimburse);
        const newUserAsync = async() => {
            {dataAllUser.map((item)=>{
                {dataTotalReimburse.map((price)=>{
                    if(item.email === price.email){
                        const userDataNew: UserGetType = {
                            username: item.username,
                            email: item.email,
                            is_staff: item.is_staff,
                            total_reimburse: price.total_reimburse,
                        }
                        setDataAllNewUser(prev => [...prev, userDataNew]);
                    }
                })}
            })}
        }
        newUserAsync();
    }, [dataTotalReimburse]);



    return {dataAllNewUser};
}