import { ImageSourcePropType } from "react-native";

export type cardKaryawanType = {
    id?: number,
    username: string,
    email: string,
    reimburse: number,
    image?: ImageSourcePropType,
    link?: ()=> void,
    w?: string,
}