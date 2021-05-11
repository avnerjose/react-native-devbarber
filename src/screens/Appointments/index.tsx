import React, {useEffect, useState} from 'react';
import {Alert, RefreshControl} from 'react-native';
import Api from '../../Api';
import {useNavigation} from '@react-navigation/native';
import {BarberData} from '../../components/BarberItem';
import BackIcon from '../../assets/back.svg';
import {
  AppointmentDateItem,
  AppointmentDateText,
  AppointmentHourItem,
  AppointmentHourText,
  AppointmentItem,
  AppointmentItemBottom,
  AppointmentItemMiddle,
  AppointmentItemTop,
  AppointmentsTop,
  AppointmentsTopButton,
  AppointmentsTopText,
  BarberAvatar,
  BarberName,
  Container,
  LoadingIcon,
  Scroller,
  ServiceName,
  ServicePrice,
} from './styles';

interface AppointmentData {
  datetime: string;
  barber: BarberData;
  service: {
    id: number;
    id_barber: number;
    name: string;
    price: number;
  };
}

export default function Appointments() {
  const navigation = useNavigation();

  const [appointmentsList, setAppointmentsList] = useState<
    Array<AppointmentData>
  >([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadAppointments = async () => {
    setLoading(true);
    let res = await Api.getAppointments();
    if (res.error == '') {
      setAppointmentsList(res.list);
    } else {
      Alert.alert('Erro: ' + res.error);
    }
    setLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAppointments();
    setRefreshing(false);
  };

  const handleAppointmentClick = (item: BarberData) => {
    navigation.navigate('Barber', {
      id: item.id,
      avatar: item.avatar,
      name: item.name,
      stars: item.stars,
    });
  };

  const handleApiDate = (cod: number, datetime: string) => {
    let dt = datetime.split(/\-|\s/);
    let dat = dt.slice(0, 3).reverse().join('/') + ' ' + dt[3];
    const [date, hour] = dat.split(' ');
    let auxHour = hour.slice(0, 5);

    if (cod == 1) return date;
    else if (cod == 2) return auxHour;
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <Container>
      <AppointmentsTop>
        <AppointmentsTopButton onPress={handleBackButton}>
          <BackIcon width="44" height="44" fill="#FFF" />
        </AppointmentsTopButton>
        <AppointmentsTopText>Agendamentos</AppointmentsTopText>
      </AppointmentsTop>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && <LoadingIcon color="#fff" size="large" />}
        {!loading && (
          <>
            {appointmentsList.map((item, key) => (
              <AppointmentItem
                key={key}
                onPress={() => handleAppointmentClick(item.barber)}>
                <AppointmentItemTop>
                  <BarberAvatar source={{uri: item.barber.avatar}} />
                  <BarberName>{item.barber.name}</BarberName>
                </AppointmentItemTop>
                <AppointmentItemMiddle>
                  <ServiceName>{item.service.name}</ServiceName>
                  <ServicePrice>R$ {item.service.price}</ServicePrice>
                </AppointmentItemMiddle>
                <AppointmentItemBottom>
                  <AppointmentDateItem>
                    <AppointmentDateText>
                      {handleApiDate(1, item.datetime)}
                    </AppointmentDateText>
                  </AppointmentDateItem>
                  <AppointmentHourItem>
                    <AppointmentHourText>
                      {handleApiDate(2, item.datetime)}
                    </AppointmentHourText>
                  </AppointmentHourItem>
                </AppointmentItemBottom>
              </AppointmentItem>
            ))}
          </>
        )}
      </Scroller>
    </Container>
  );
}
