import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router';
import { userData } from '@/data/userData';
// import CookieManager from '@react-native-cookies/cookies';
import { getUserId, saveToken } from '@/hooks/tokenFunction';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dataUser = userData;
  const router = useRouter();
  const API_BASE_URL = 'http://192.168.1.31:8000';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // 1. Cek apakah sedang loading, kalau iya, jangan lakukan apa-apa
    if (isLoading) return;

    // 2. Mulai proses login
    setIsLoading(true);
    setError(null); // Bersihkan error lama

    // 3. Kirim data ke backend (ini bagian "ajaib"-nya)
    try {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ubah data state kita jadi string JSON
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // 4. Baca jawaban dari backend
      const data = await response.json();

      // 5. Tentukan hasilnya
      if (response.ok) {
        // --- BERHASIL! ---
        console.log('Login berhasil, token:', data.token);
        console.log('dataUser : ', data);
        
        // TODO: Nanti kita akan simpan token ini
        
        // Pindahkan user ke halaman home
        router.replace('/(tabs)/home'); 

      } else {
        // --- GAGAL (Username/password salah) ---
        // 'non_field_errors' adalah pesan error default dari Django
        setError(data.non_field_errors[0] || 'Username atau password salah.');
      }

    } catch (err) {
      // --- GAGAL (Server mati / Jaringan / IP salah) ---
      console.error('Error koneksi:', err);
      setError('Gagal terhubung ke server. Pastikan IP sudah benar.');
    } finally {
      // 6. Selesai (baik gagal atau sukses, loadingnya dihentikan)
      setIsLoading(false); 
    }
  };

  // const handleLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = dataUser.find(item => item.username === username && item.password === password);
  //     if(data){
  //       await saveToken(data.id.toString());
  //       router.replace('/(tabs)/home');
  //     }
  //   } catch (error) {
  //     console.error('Gagal menyimpan user ID:', error);
  //   }
  //   finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(()=>{
    const checkLogin = async ()=>{
      if(await getUserId()){
        router.replace('/(tabs)/home');
      }
    }
    checkLogin();
  }, []);

  return (
    <View className='flex-1 w-full bg-black'>
      <View className='absolute w-full pb-[100px] pt-[50px] rounded-t-3xl bottom-0 bg-white flex-1 justify-center items-center'>
        <Text className='font-bold text-[20px]'>Login to your account</Text>
        <Text className='text-[10px] mb-10'>Welcome back, select method to Login </Text>

        <Pressable onPress={() => {console.log('Pressed!')}}className='p-[10px] w-[270px] flex flex-row justify-center items-center border-[.5px] rounded-lg'
        >
          <Image
              source={require('../assets/objek/google.png')}
              style={{ width: 20, height: 20 }}
          />
          <Text className='ml-2 font-bold'>
              Google
          </Text>
        </Pressable>

        <View className='w-[270px] h-[1px] bg-black my-5 opacity-20'/>

      <View className='w-[270px] h-[1px] bg-black my-5 opacity-20'/>
        <TextInput
        className='p-[10px] pl-[20px] w-[270px] flex flex-row justify-center items-center border-[.5px] rounded-lg'
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        />
        <TextInput
        className='p-[10px] pl-[20px] w-[270px] flex flex-row justify-center items-center border-[.5px] rounded-lg mt-5'
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        />

        <Pressable 
          onPress={() => {handleLogin()}} // <-- 1. Panggil fungsi handleLogin
          disabled={isLoading} // <-- 2. Bikin tombol nonaktif saat loading
          className={`p-[15px] w-[270px] flex flex-row justify-center items-center rounded-lg mt-10 ${isLoading ? 'bg-gray-500' : 'bg-black'}`} // <-- 3. Ubah warna saat loading
        >
          <Text className='ml-2 font-bold text-white'>
            {isLoading ? 'Loading...' : 'Login'} 
          </Text>
        </Pressable>
          {error && (
          <Text className='text-red-500 text-center mt-4 w-[270px]'>
            {error}
          </Text>
        )}
      </View>
    </View>
)
}


export default Login