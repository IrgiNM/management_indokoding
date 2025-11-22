import { UserSendType } from "@/types/userSendType";
import { UserType } from "@/types/userType";
import { useEffect, useState } from "react";
import { createUser, getUserId } from "./api";

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
                // console.error('Failed to fetch user login data:', data);
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
            return 'berhasil membuat user'
        }
        if(response.status === 400){
            return 'User sudah terdaftar, ganti username dan email'
        }
    } catch {
        // console.error('gagal membuat user');
        return null;
    }
}
