import { ImageSourcePropType } from "react-native";

export type cardInfoType = {
    id: number,
    title: string,
    description: string,
    amount: string,
    date: string,
    icon: ImageSourcePropType,
    status?: string,
    link?: ()=> void,
    w?: string,
}