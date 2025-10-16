import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="detailReimburse"
      options={{ headerShown: false }}
    />
  </Stack>;
}
