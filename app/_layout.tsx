import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import "./global.css";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    async function prepare() {
      // di sini bisa load font/data, tapi kalau tidak ada cukup langsung hide
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);
  return <Stack>
    <Stack.Screen
      name="index"
      options={{ headerShown: false }}
    />
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
