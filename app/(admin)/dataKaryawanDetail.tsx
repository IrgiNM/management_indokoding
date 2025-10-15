import { View, Text } from 'react-native'
import React from 'react'
import HeaderBack from '@/components/headerBack'

const dataKaryawanDetail = () => {
  return (
    <View className='w-full bg-white flex-1 justify-start items-center'>
      {/* HEADER */}
      <HeaderBack title='Data Karyawan' subTitle='detail'/>
      <Text>dataKaryawanDetail</Text>
    </View>
  )
}

export default dataKaryawanDetail