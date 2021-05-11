import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #63c2d1;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const LogoutButton = styled.TouchableOpacity`
  background: #4eadbe;
  padding: 15px;
  align-items: center;
  justify-content: center;
  margin: 32px 16px;
  border-radius: 10px;
  margin-top: auto;
`;

export const LogoutButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const UserAvatar = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 80px;
  align-self: center;
  margin: 40px 0px;
`;

export const UserContent = styled.View``;

export const UserContentBody = styled.View`
  background: #fff;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: 0 16px;
  border-radius: 10px;
`;

export const UserName = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const UserEmail = styled(UserName)`
  font-weight: normal;
  font-size: 16px;
`;

export const LoadingIcon = styled.ActivityIndicator``;

export const ProfileTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
`;

export const ProfileTopButton = styled.TouchableOpacity``;

export const ProfileTopText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
`;
