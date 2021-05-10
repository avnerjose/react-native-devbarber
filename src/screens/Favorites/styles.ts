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

export const FavoritesTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
`;

export const FavoritesTopText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
`;

export const FavoritesTopButton = styled.TouchableOpacity``;
