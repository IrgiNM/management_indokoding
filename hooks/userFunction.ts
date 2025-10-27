import { userData } from "@/data/userData";
import { getUserId } from "./tokenFunction";
import { UserType } from "@/types/userType";
import { useEffect, useState } from "react";

export const getDataUserLogin = (): UserType[] => {
    const [dataUserLogin, setDataUserLogin] = useState<UserType[]>([]);

    useEffect(()=>{
        const fetchDataUserLogin = async () => {
            const idUserLogin = await getUserId();
            const dataUserLogin = (userData.find(item => item.id === (idUserLogin ? Number(idUserLogin) : 0))) || userData[0]; 
            setDataUserLogin([dataUserLogin]);
        };
        fetchDataUserLogin();
    }, []);
     
    return dataUserLogin;
}
