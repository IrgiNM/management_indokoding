import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="dataKaryawanDetail"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="dataKaryawan"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="historyReimburseKaryawan"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="detailReimburseAdmin"
      options={{ headerShown: false }}
    />
  </Stack>;
}
