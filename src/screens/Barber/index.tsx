import React, {useState, useEffect} from 'react';
import {RefreshControl, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BarberData} from '../../components/BarberItem';
import Api from '../../Api';
import Swiper from 'react-native-swiper';
import {
  Container,
  Scroller,
  FakeSwiper,
  PageBody,
  BarberInfoArea,
  BarberInfo,
  BarberInfoName,
  BarberAvatar,
  BarberFavButton,
  ServiceArea,
  ServicesTitle,
  ServiceItem,
  ServiceName,
  ServicePrice,
  ServiceInfo,
  ServiceButton,
  ServiceButtonText,
  TestimonialArea,
  SwiperDot,
  SwiperDotActive,
  SwiperItem,
  SwiperImage,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
  BackButton,
} from './styles';
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';
import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import {LoadingIcon} from '../Home/styles';

export interface ExtraBarberInfoData extends BarberData {
  available: Array<{date: string; hours: Array<string>}>;
  favorited: boolean;
  photos: Array<{url: string}>;
  services: Array<{name: string; price: number}>;
  testimonials: Array<{name: string; rate: number; body: string}>;
}
export interface ExtraBarberInfo {
  data: ExtraBarberInfoData;
  error: string;
}

export default function Barber() {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params as BarberData;
  const [barberInfo, setBarberInfo] = useState({
    data: {
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      stars: data.stars,
      photos: [{}],
      services: [{}],
      available: [{}],
    },
    error: '',
  } as ExtraBarberInfo);

  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedService, setSelectedService] = useState<null | number>(null);
  const [showModal, setShowModal] = useState(false);

  const getBarberInfo = async () => {
    setLoading(true);
    let json = (await Api.getBarber(barberInfo.data.id)) as ExtraBarberInfo;

    if (json.error == '') {
      setBarberInfo(json);
      setFavorited(json.data.favorited);
    } else {
      Alert.alert('Erro: ' + json.error);
    }
    setLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getBarberInfo();
    setRefreshing(false);
  };
  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleFavoriteButton = async () => {
    setFavorited(!favorited);
    await Api.setFavorite(barberInfo.data.id);
  };

  const handleServiceButton = (key: number) => {
    setSelectedService(key);
    setShowModal(true);
  };

  useEffect(() => {
    getBarberInfo();
  }, []);

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {barberInfo.data.photos && barberInfo.data.photos.length > 0 ? (
          <Swiper
            style={{height: 240}}
            dot={<SwiperDot />}
            activeDot={<SwiperDotActive />}
            paginationStyle={{
              top: 15,
              right: 15,
              bottom: undefined,
              left: undefined,
            }}
            loop={true}
            autoplay={true}>
            {barberInfo.data.photos.map((item, key) => (
              <SwiperItem key={key}>
                <SwiperImage source={{uri: item.url}} />
              </SwiperItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper></FakeSwiper>
        )}

        <PageBody>
          <BarberInfoArea>
            <BarberAvatar source={{uri: barberInfo.data.avatar}} />
            <BarberInfo>
              <BarberInfoName>{barberInfo.data.name}</BarberInfoName>
              <Stars stars={barberInfo.data.stars} showNumber />
            </BarberInfo>
            <BarberFavButton onPress={handleFavoriteButton} activeOpacity={0.8}>
              {favorited ? (
                <FavoriteFullIcon width="24" height="24" fill="#FF0000" />
              ) : (
                <FavoriteIcon width="24" height="24" fill="#FF0000" />
              )}
            </BarberFavButton>
          </BarberInfoArea>
          {loading ? (
            <LoadingIcon size="large" color="#000" />
          ) : (
            <>
              {barberInfo.data.services && barberInfo.data.services.length > 0 && (
                <ServiceArea>
                  <ServicesTitle>Lista de serviços</ServicesTitle>
                  {barberInfo.data.services.map((item, key) => (
                    <ServiceItem key={key}>
                      <ServiceInfo>
                        <ServiceName>{item.name}</ServiceName>
                        <ServicePrice>R$ {item.price}</ServicePrice>
                      </ServiceInfo>
                      <ServiceButton onPress={() => handleServiceButton(key)}>
                        <ServiceButtonText>Agendar</ServiceButtonText>
                      </ServiceButton>
                    </ServiceItem>
                  ))}
                </ServiceArea>
              )}
              {barberInfo.data.testimonials &&
                barberInfo.data.testimonials.length > 0 && (
                  <TestimonialArea>
                    <Swiper
                      style={{height: 110, alignItems: 'center'}}
                      showsPagination={false}
                      showsButtons
                      nextButton={
                        <NavNextIcon height="35" width="35" fill="#000" />
                      }
                      prevButton={
                        <NavPrevIcon height="35" width="35" fill="#000" />
                      }>
                      {barberInfo.data.testimonials.map((item, key) => (
                        <TestimonialItem key={key}>
                          <TestimonialInfo>
                            <TestimonialName>{item.name}</TestimonialName>
                            <Stars stars={item.rate} showNumber={false} />
                          </TestimonialInfo>
                          <TestimonialBody>{item.body}</TestimonialBody>
                        </TestimonialItem>
                      ))}
                    </Swiper>
                  </TestimonialArea>
                )}
            </>
          )}
        </PageBody>
      </Scroller>

      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#FFF" />
      </BackButton>

      <BarberModal
        show={showModal}
        setShow={setShowModal}
        barber={barberInfo}
        service={selectedService}
      />
    </Container>
  );
}

//3:14 min
