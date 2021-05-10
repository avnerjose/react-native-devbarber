import React from "react";
import { View,Button} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Api from "../../Api";
import AsyncStorage from "@react-native-community/async-storage";


export default function Profile() {
    const navigation = useNavigation(); 

    const handleClick =  async () =>{
        await Api.logout(); 
        await AsyncStorage.removeItem('token'); 
        navigation.reset({
          routes: [{name: 'SignIn'}],
        });
    }
    return (
        <View>
            <Button title="Sair" onPress={handleClick}/>
        </View>
    )

}