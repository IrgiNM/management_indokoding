import * as SecureStore from 'expo-secure-store';

export async function saveToken(token: string, userId: string) {
  await SecureStore.setItemAsync('access_token', token);
  await SecureStore.setItemAsync('user_id', userId);
}

export async function getToken() {
  return await SecureStore.getItemAsync('access_token');
}

export async function getUserId() {
  return await SecureStore.getItemAsync('user_id');
}