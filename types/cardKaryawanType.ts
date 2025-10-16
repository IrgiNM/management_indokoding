import { ImageSourcePropType } from "react-native";

export type cardKaryawanType = {
    id: number,
    username: string,
    email: string,
    reimburse: string,
    image?: ImageSourcePropType,
    link?: ()=> void,
    w?: string,
}