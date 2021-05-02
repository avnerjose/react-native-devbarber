import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {UserContext} from '../contexts/UserContext';
import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';


type CustomTabBarProps = BottomTabNavigationProp;

const TabArea = styled.View`
  height: 60px;
  background: #4eadbe;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 35px;
  border: 1px solid #4eadbe;
  margin-top: -20px;
`;

const AvatarIcon = styled.Image`
  height: 24px;
  width: 24px;
  border-radius: 12px;
`;



export default function CustomTabBar({
  state,
  navigation,
}) {
  const {state: user} = useContext(UserContext);

  const customNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => customNavigate('Home')}>
        <HomeIcon
          style={{opacity: state.index == 0 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="#FFF"
        />
      </TabItem>
      <TabItem onPress={() => customNavigate('Search')}>
        <SearchIcon
          style={{opacity: state.index == 1 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="#FFF"
        />
      </TabItem>
      <TabItemCenter onPress={() => customNavigate('Appointments')}>
        <TodayIcon width="32" height="32" fill="#4eadbe" />
      </TabItemCenter>
      <TabItem onPress={() => customNavigate('Favorites')}>
        <FavoriteIcon
          style={{opacity: state.index == 3 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="#FFF"
        />
      </TabItem>
      <TabItem onPress={() => customNavigate('Profile')}>
        {user.avatar ? (
          <AvatarIcon source={{uri: user.avatar}} />
        ) : (
          <AccountIcon
            style={{opacity: state.index == 4 ? 1 : 0.5}}
            width="24"
            height="24"
            fill="#FFF"
          />
        )}
      </TabItem>
    </TabArea>
  );
}
