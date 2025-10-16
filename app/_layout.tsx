import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="login"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="(admin)"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="(detail)"
      options={{ headerShown: false }}
    />
  </Stack>;
}
