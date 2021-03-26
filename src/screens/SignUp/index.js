import React, { useState } from "react";
import BarberLogo from "../../assets/barber.svg";
import { useNavigation } from "@react-navigation/native"
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from "./styles";
import SignInput from "../../components/SignInput";
import EmailIcon from "../../assets/email.svg";
import LockIcon from "../../assets/lock.svg";
import ProfileIcon from "../../assets/person.svg";

export default function SignUp() {

    const navigation = useNavigation();
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [nameField, setNameField] = useState("");

    const handleMessageButtonCLick = () => {
        navigation.reset({
            routes: [{ name: "Login" }]
        });
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
                <SignInput
                    IconSvg={ProfileIcon}
                    placeholder="Digite seu nome"
                    value={emailField}
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
                <CustomButton>
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