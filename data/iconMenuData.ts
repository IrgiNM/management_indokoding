import { useRouter } from "expo-router";

export const iconMenuHome = () => {
    const router = useRouter();
    const iconMenu = [
        {
            title: "create reimburse",
            color: "#F3D1FF",
            border: "border-purple-800",
            icon: require("../assets/icons/reimburse-active.png"),
            link: () => {router.replace('/reimburse')},
            role: ['karyawan', 'admin']
        },
        {
            title: "data Reimburse",
            color: "#F3D1FF",
            border: "border-purple-800",
            icon: require("../assets/icons/data-reimburse.png"),
            link: () => {router.replace('../(admin)/historyReimburseKaryawan')},
            role: ['admin']
        },
        {
            title: "data karyawan",
            color: "#D1D6FF",
            border: "border-blue-800",
            icon: require("../assets/icons/karyawan.png"),
            link: () => {router.replace('../(admin)/dataKaryawan')},
            role: ['admin']
        },
        {
            title: "Salary karyawan",
            color: "#D1D6FF",
            border: "border-blue-800",
            icon: require("../assets/icons/salary-karyawan.png"),
            link: () => {router.replace('../(admin)/dataSalaryKaryawan')},
            role: ['admin']
        },
        {
            title: "Overtime Log",
            color: "#FFEDD1",
            border: "border-[#760E00]",
            icon: require("../assets/icons/salary-karyawan.png"),
            link: () => {router.replace('../(detail)/overtimeLog')},
            role: ['karyawan', 'admin']
        },
      ]

    return {iconMenu};
}