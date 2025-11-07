import { userData } from "@/data/userData";
import { getToken } from "./tokenFunction";
import { UserType } from "@/types/userType";
import { useEffect, useState } from "react";
import { getUserId } from "./api";

export const getDataUserLogin = (): UserType => {
    const [dataUserLogin, setDataUserLogin] = useState<UserType>({
        id: 0,
        username: '',
        email: ''
    });

    useEffect(()=>{
        const fetchDataUserLogin = async () => {
            const data = await getUserId();
            if(data.status === 200){
                setDataUserLogin(data.data);
                console.log('Data user login fetched successfully', data.data);
            }else{
                console.error('Failed to fetch user login data:', data);
            }
        };
        fetchDataUserLogin();
    }, []);
     
    return dataUserLogin;
}
