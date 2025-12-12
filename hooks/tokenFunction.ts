import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

// export async function saveToken(token: string, userId: string) {
//   await SecureStore.setItemAsync('access_token', token);
//   await SecureStore.setItemAsync('user_id', userId);
// }

export async function saveToken(userId: string) {
  await SecureStore.setItemAsync('token', userId);
}

export async function getToken() {
  return await SecureStore.getItemAsync('token');
}

// export async function getUserId() {
//   return await SecureStore.getItemAsync('userId');
// }

export async function logoutUser() {
    try {
      await SecureStore.deleteItemAsync('token');
      router.replace('/login');
      console.log('Berhasil logout, semua data login dihapus');
    } catch (error) {
      console.error('Gagal logout:', error);
    }
  }