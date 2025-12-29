import { useRouter } from "expo-router";

export const iconMenuHome = () => {
    const router = useRouter();
    const iconMenuHidden = [
        {
            title: "Create Reimburse",
            color: "#F3D1FF",
            border: "border-purple-800",
            icon: require("../assets/icons/reimburse-active.png"),
            link: () => {router.replace('/reimburse')},
            role: ['karyawan', 'admin']
        },
        {
            title: "My Bank Account",
            color: "#D1D6FF",
            border: "border-blue-800",
            icon: require("../assets/icons/bank-account-icon.png"),
            link: () => {router.replace('../(detail)/bankAccount')},
            role: ['karyawan','admin']
        },
        {
            title: "Data Karyawan",
            color: "#D1D6FF",
            border: "border-blue-800",
            icon: require("../assets/icons/karyawan.png"),
            link: () => {router.replace('../(admin)/dataKaryawan')},
            role: ['admin']
        },
        {
            title: "Overtime Log",
            color: "#FFEDD1",
            border: "border-orange-800",
            icon: require("../assets/icons/overtime-icon.png"),
            link: () => {router.replace('../(detail)/overtimeLog')},
            role: ['karyawan', 'admin']
        },
      ]

    const iconMenu = [
        {
            title: "Create Reimburse",
            color: "#F3D1FF",
            border: "border-purple-800",
            icon: require("../assets/icons/reimburse-active.png"),
            link: () => {router.replace('/reimburse')},
            role: ['karyawan', 'admin']
        },
        {
            title: "Data Reimburse",
            color: "#F3D1FF",
            border: "border-purple-800",
            icon: require("../assets/icons/data-reimburse.png"),
            link: () => {router.replace('../(admin)/historyReimburseKaryawan')},
            role: ['admin']
        },
        {
            title: "My Bank Account",
            color: "#D1D6FF",
            border: "border-blue-800",
            icon: require("../assets/icons/bank-account-icon.png"),
            link: () => {router.replace('../(detail)/bankAccount')},
            role: ['karyawan','admin']
        },
        {
            title: "Data Karyawan",
            color: "#D1D6FF",
            border: "border-blue-800",
            icon: require("../assets/icons/karyawan.png"),
            link: () => {router.replace('../(admin)/dataKaryawan')},
            role: ['admin']
        },
        {
            title: "Salary Karyawan",
            color: "#D1D6FF",
            border: "border-blue-800",
            icon: require("../assets/icons/salary-karyawan.png"),
            link: () => {router.replace('../(admin)/dataSalaryKaryawan')},
            role: ['admin']
        },
        {
            title: "Overtime Log",
            color: "#FFEDD1",
            border: "border-orange-800",
            icon: require("../assets/icons/overtime-icon.png"),
            link: () => {router.replace('../(detail)/overtimeLog')},
            role: ['karyawan', 'admin']
        },
        {
            title: "List Overtime",
            color: "#FFEDD1",
            border: "border-orange-800",
            icon: require("../assets/icons/list-overtime-icon.png"),
            link: () => {router.replace('../(admin)/dataOvertimeLog')},
            role: ['admin']
        },
      ]

    return {iconMenu,iconMenuHidden};
}