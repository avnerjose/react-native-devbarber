import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Area,
  Avatar,
  InfoArea,
  SeeProfileButton,
  SeeProfileButtonText,
  BarberName,
} from './styles';
import Stars from '../Stars';
import {ExtraBarberInfoData} from '../../screens/Barber';

export interface BarberData {
  id: number;
  name: string;
  avatar: string;
  stars: number;
}

export default function BarberItem({
  data,
}: {
  data: BarberData | ExtraBarberInfoData;
}) {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('Barber', {
      id: data.id,
      avatar: data.avatar,
      name: data.name,
      stars: data.stars,
    });
  };

  return (
    <Area onPress={handleClick}>
      <Avatar source={{uri: data.avatar}} />
      <InfoArea>
        <BarberName>{data.name}</BarberName>
        <Stars stars={data.stars} showNumber={true} />
        <SeeProfileButton>
          <SeeProfileButtonText>Ver perfil</SeeProfileButtonText>
        </SeeProfileButton>
      </InfoArea>
    </Area>
  );
}
