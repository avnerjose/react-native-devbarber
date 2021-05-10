import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import TodayIcon from '../../assets/today.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import AccountIcon from '../../assets/account.svg';
import {AvatarIcon, TabArea, TabItem, TabItemCenter} from './styles';

interface stateProps {
  index: number;
}

export default function CustomTabBar({
  state,
  navigation,
}: {
  state: stateProps;
  navigation: any;
}) {
  const {state: user} = useContext(UserContext);

  const customNavigate = (screenName: string) => {
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
