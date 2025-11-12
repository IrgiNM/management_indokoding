import { userData } from "@/data/userData";
import { getToken } from "./tokenFunction";
import { UserType } from "@/types/userType";
import { useEffect, useState } from "react";
import { createUser, getUserId } from "./api";
import { UserSendType } from "@/types/userSendType";

export const getDataUserLogin = (): UserType => {
    const [dataUserLogin, setDataUserLogin] = useState<UserType>({
        id: 0,
        username: '',
        email: '',
        is_staff: false,
        role: 'karyawan',
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

export const createUserNew = async (data: UserSendType) => {
    try {
        const response = await createUser(data);
        if(response.status === 201){
            return response.data;
        }
    } catch {
        console.error('gagal membuat user');
        return null;
    }
}
