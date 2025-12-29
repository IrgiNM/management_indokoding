import { cardSettingType } from "@/types/cardSettingType";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

const CardSetting = ({name,value,click,click2}: cardSettingType) => {
    return (
        <>
            <View className='w-full flex flex-row justify-between items-center py-4 border-b-[.5px] border-gray-200'>
                <View className='w-full flex flex-row justify-between items-center'>
                    <Text className='text-[12px]'>{name}</Text>
                    <View className="flex flex-row justify-center items-center gap-2">
                        {   value==='true'||value==='false'?
                            (
                                <Pressable onPress={click2} className={`w-[40px] h-[20px] rounded-full flex flex-row justify-${value==='true'?'end':'start'} items-center p-[2px] ${value==='true'?'bg-[#00b1c8]':'bg-gray-400'}`}>
                                    <View className='w-[16px] h-[16px] rounded-full bg-white'/>
                                </Pressable>
                            ):
                            (
                                <Text className='text-[10px] text-gray-400'>{value.slice(0, 20)}{value.length>19&&'...'}</Text>
                            )
                        }
                        {(value!=='true'&&value!=='false')&&(
                            <Pressable onPress={click} className="w-[25px] h-[25px] bg-[#ecf8f9] rounded-md border-[.5px] border-b-[1px] border-[#008091] flex justify-center items-center">
                                <Image source={require("../assets/icons/edit.png")} tintColor={"#008091"} style={{ width: 12, height: 12 }}/>
                            </Pressable>
                        )}
                    </View>
                </View>
            </View>
        </>
    )
}

export default CardSetting