import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="detailReimburse"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="changePassword"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="editProfile"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="overtimeLog"
      options={{ headerShown: false }}
    />
  </Stack>;
}
