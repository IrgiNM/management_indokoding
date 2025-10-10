import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { tabIconType } from '@/types/tabIconType'

const TabIcon = ({ focused, image, imageActive, title }: tabIconType ) => {
  return (
    <View className='flex justify-start items-center'>
        <Image
            source={focused ? imageActive : image}
            style={{
            width: 30,
            height: 30,
            // tintColor: focused ? "#00185A" : "#00185A",
            }}
        />
        <Text
            className='text-[10px] w-full mt-3 text-[#00185A]'
            style={{ color: "#00185A"}}
        >
            {title}
        </Text>
    </View>
  )
}

export default TabIcon