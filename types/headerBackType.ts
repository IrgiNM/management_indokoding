import { Href } from "expo-router"

export type headerBackType = {
    title: string,
    subTitle?: string,
    type?: string
    textColor?: string,
    backTo?: Href,
}