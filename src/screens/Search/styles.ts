import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #63c2d1;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 0 20px 20px 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const SearchInput = styled.TextInput`
  font-size: 16px;
  flex: 1;
  color: #fff;
  background: #4eadbe;
  height: 50px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const SearchTop = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

export const SearchTopButton = styled.TouchableOpacity``;
