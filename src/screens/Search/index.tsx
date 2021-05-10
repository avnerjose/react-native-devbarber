import React, {useEffect, useState} from 'react';
import Api from '../../Api';
import {useNavigation} from '@react-navigation/native';
import {Alert, RefreshControl} from 'react-native';
import BarberItem, {BarberData} from '../../components/BarberItem';
import BackIcon from '../../assets/back.svg';
import {
  Container,
  LoadingIcon,
  Scroller,
  SearchInput,
  SearchTop,
  SearchTopButton,
} from './styles';

export default function Search() {
  const navigation = useNavigation();

  const [barberList, setBarberList] = useState<Array<BarberData>>([]);
  const [filteredList, setFilteredList] = useState<Array<BarberData>>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadBarbers = async () => {
    setLoading(true);
    let res = await Api.getBarbers();
    if (res.error === '') {
      setBarberList(res.data);
      setFilteredList(res.data);
      setSearchText('');
    } else {
      Alert.alert('Erro: ' + res.error);
    }
    setLoading(false);
  };

  const handleBarberSearch = (text: string) => {
    let newFilteredList = [];

    newFilteredList = barberList.filter((item) => {
      if (text === '') {
        return item;
      } else if (item.name.toLowerCase().includes(text.toLowerCase())) {
        return item;
      }
    });

    setSearchText(text);
    setFilteredList(newFilteredList);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBarbers();
    setRefreshing(false);
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  useEffect(() => {
    loadBarbers();
  }, []);

  return (
    <Container>
      <SearchTop>
        <SearchTopButton onPress={handleBackButton}>
          <BackIcon fill="#FFF" height="44" width="44" />
        </SearchTopButton>
        <SearchInput
          placeholder="Procure um barbeiro"
          placeholderTextColor="#FFF"
          value={searchText}
          onChangeText={(text: string) => {
            handleBarberSearch(text);
          }}
        />
      </SearchTop>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && <LoadingIcon size="large" color="#fff" />}
        {!loading && filteredList.length > 0 && (
          <>
            {filteredList.map((item, key) => (
              <BarberItem key={key} data={item} />
            ))}
          </>
        )}
      </Scroller>
    </Container>
  );
}
