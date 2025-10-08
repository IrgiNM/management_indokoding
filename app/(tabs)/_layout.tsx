import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Image } from 'expo-image'
import TabIcon from '@/components/tabIcon'

const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false, // sembunyikan teks bawaan
            tabBarStyle: {
            position: "absolute",
            paddingTop: 20,
            bottom: 50,
            left: 20,
            right: 20,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 80,
            shadowColor: "#000",
            shadowOpacity: 0,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 0,
            elevation: 5,
            },
        }}
      >
        <Tabs.Screen
            name='home'
            options={{ 
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} image={require("../../assets/icons/home.png")} title="Home"/>
                )
            }}
        />
        <Tabs.Screen
            name='history'
            options={{ 
                headerShown: false, 
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} image={require("../../assets/icons/home.png")} title="History"/>
                )
            }}
        />
        <Tabs.Screen
            name='reimburse'
            options={{ 
                headerShown: false, 
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} image={require("../../assets/icons/home.png")} title="Reimburse"/>
                )
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{ 
                headerShown: false, 
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} image={require("../../assets/icons/home.png")} title="Profile"/>
                )
            }}
        />
    </Tabs>
  )
}

export default _layout