import React, { useState, useContext } from "react";
import BarberLogo from "../../assets/barber.svg";
import { UserContext } from "../../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import Api from '../../Api';
import SignInput from "../../components/SignInput";
import EmailIcon from "../../assets/email.svg";
import LockIcon from "../../assets/lock.svg";
import ProfileIcon from "../../assets/person.svg";

export default function SignUp() {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [nameField, setNameField] = useState("");

    const handleSignClick = async () => {
        if (nameField != '' && emailField != '' && passwordField != '') {

            let json = await Api.signUp(nameField, emailField, passwordField);

            if (json.token) {
                await AsyncStorage.setItem("token", json.token);

                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: json.data.avatar,
                    }
                });

                navigation.reset({
                    routes: [{ name: 'MainTab' }]
                });

            } else {
                alert("Erro: " + json.error)
            }


        } else {
            alert("Preencha os campos!")
        }
    }
    const handleMessageButtonCLick = () => {
        navigation.reset({
            routes: [{ name: "SignIn" }]
        });
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
                <SignInput
                    IconSvg={ProfileIcon}
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={text => setNameField(text)}
                />
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu email"
                    value={emailField}
                    onChangeText={text => setEmailField(text)}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={text => setPasswordField(text)}
                    password={true} />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Cadastrar</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonCLick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}

//1:36