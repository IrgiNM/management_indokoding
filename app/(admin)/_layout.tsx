import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="dataKaryawanDetail"
      options={{ headerShown: false, animation: "none" }}
    />
    <Stack.Screen
      name="dataKaryawan"
      options={{ headerShown: false, animation: "none" }}
    />
    <Stack.Screen
      name="historyReimburseKaryawan"
      options={{ headerShown: false, animation: "none" }}
    />
    <Stack.Screen
      name="detailReimburseAdmin"
      options={{ headerShown: false, animation: "none" }}
    />
    <Stack.Screen
      name="dataSalaryKaryawan"
      options={{ headerShown: false, animation: "none" }}
    />
    <Stack.Screen
      name="dataSiteSettings"
      options={{ headerShown: false, animation: "none" }}
    />
    <Stack.Screen
      name="dataOvertimeLog"
      options={{ headerShown: false, animation: "none" }}
    />
  </Stack>;
}
