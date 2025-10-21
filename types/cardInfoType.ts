import { ImageSourcePropType } from "react-native";

export type cardInfoType = {
    id: number,
    user?: string,
    title: string,
    description: string,
    amount: string,
    date: string,
    status?: string,
    type?: string,
    longPress?: ()=> void,
    w?: string,
}