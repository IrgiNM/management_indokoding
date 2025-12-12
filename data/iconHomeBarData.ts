import { useRouter } from "expo-router";

const router = useRouter();
export const iconHomeBar = [
  {
      id: 1,
      title: "create reimburse",
      color: "#F3D1FF",
      icon: require("../assets/icons/home-active.png"),
      iconN: require("../assets/icons/home.png"),
      link: () => {router.replace('/reimburse')},
      role: ['karyawan', 'admin']
  },
  {
      id: 1,
      title: "data Reimburse",
      color: "#F3D1FF",
      icon: require("../assets/icons/history-active.png"),
      iconN: require("../assets/icons/history.png"),
      link: () => {router.replace('../(admin)/historyReimburseKaryawan')},
      role: ['admin']
  },
  {
      id: 1,
      title: "data karyawan",
      color: "#D1D6FF",
      icon: require("../assets/icons/reimburse-active.png"),
      iconN: require("../assets/icons/reimburse.png"),
      link: () => {router.replace('../(admin)/dataKaryawan')},
      role: ['admin']
  },
  {
      id: 1,
      title: "Salary karyawan",
      color: "#D1D6FF",
      icon: require("../assets/icons/profile-active.png"),
      iconN: require("../assets/icons/profile.png"),
      link: () => {router.replace('../(admin)/dataSalaryKaryawan')},
      role: ['admin']
  },
]