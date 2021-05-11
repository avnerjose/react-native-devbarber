import React, {useState, useEffect} from 'react';
import {RefreshControl, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';
import BackIcon from '../../assets/back.svg';
import {
  Container,
  LoadingIcon,
  LogoutButton,
  LogoutButtonText,
  ProfileTop,
  ProfileTopButton,
  ProfileTopText,
  Scroller,
  UserAvatar,
  UserContent,
  UserContentBody,
  UserEmail,
  UserName,
} from './styles';
interface UserData {
  name: string;
  avatar: string;
  email: string;
}

export default function Profile() {
  const navigation = useNavigation();

  const [user, setUser] = useState<UserData>({
    name: ' ',
    avatar: ' ',
    email: ' ',
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadUser = async () => {
    setLoading(true);
    let res = await Api.getUser();
    console.log(res);
    if (res.error === '') {
      setUser(res.data);
    } else {
      Alert.alert('Erro: ' + res.error);
    }
    setLoading(false);
  };

  const handleClick = async () => {
    await Api.logout();
    await AsyncStorage.removeItem('token');
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadUser();
    setRefreshing(false);
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Container>
      <ProfileTop>
        <ProfileTopButton onPress={handleBackButton}>
          <BackIcon width="44" height="44" fill="#FFF" />
        </ProfileTopButton>
        <ProfileTopText>Perfil do usuário</ProfileTopText>
      </ProfileTop>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && <LoadingIcon color="#fff" size="large" />}
        {!loading && (
          <UserContent>
            <UserAvatar source={{uri: user.avatar}} />
            <UserContentBody>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserContentBody>
          </UserContent>
        )}
      </Scroller>
      <LogoutButton onPress={handleClick}>
        <LogoutButtonText>Sair</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
}
