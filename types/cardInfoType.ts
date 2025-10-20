import { ImageSourcePropType } from "react-native";

export type cardInfoType = {
    id: number,
    user?: string,
    title: string,
    description: string,
    amount: string,
    date: string,
    icon: ImageSourcePropType,
    status?: string,
    type?: string,
    link?: ()=> void,
    longPress?: ()=> void,
    w?: string,
}