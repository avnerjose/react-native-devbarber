import React, {useState, useEffect} from 'react';
import Api from '../../Api';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl} from 'react-native';
import BarberItem, {BarberData} from '../../components/BarberItem';
import BackIcon from '../../assets/back.svg';
import {
  Container,
  FavoritesTop,
  FavoritesTopButton,
  FavoritesTopText,
  LoadingIcon,
  Scroller,
} from './styles';

export default function Favorites() {
  const navigation = useNavigation();

  const [barberList, setBarberList] = useState<Array<BarberData>>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = async () => {
    setLoading(true);
    let res = await Api.getFavorites();

    if (res.error === '') {
      setBarberList(res.list);
    } else {
      console.log('Erro: ' + res.error);
    }
    setLoading(false);
  };

  const onRefresh = () => {
    loadFavorites();
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setRefreshing(true);
    loadFavorites();
    setRefreshing(false);
  }, []);

  return (
    <Container>
      <FavoritesTop>
        <FavoritesTopButton onPress={handleBackButton}>
          <BackIcon width="44" height="44" fill="#FFF" />
        </FavoritesTopButton>
        <FavoritesTopText>Favoritos</FavoritesTopText>
      </FavoritesTop>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && <LoadingIcon color="#fff" size="large" />}
        {!loading && barberList.length > 0 && (
          <>
            {barberList.map((item, key) => (
              <BarberItem key={key} data={item} />
            ))}
          </>
        )}
      </Scroller>
    </Container>
  );
}
