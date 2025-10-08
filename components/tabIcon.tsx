import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { tabIconType } from '@/types/tabIconType'

const TabIcon = ({ focused, image, title }: tabIconType ) => {
  return (
    <View className='flex justify-center items-center'>
        <Image
            source={image}
            style={{
            width: 25,
            height: 25,
            tintColor: focused ? "#007AFF" : "#000",
            }}
        />
        <Text
            className='text-[10px] w-full mt-2'
            style={{ color: focused ? "#007AFF" : "#000" }}
        >
            {title}
        </Text>
    </View>
  )
}

export default TabIcon