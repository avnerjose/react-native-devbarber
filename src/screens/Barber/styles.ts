import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const FakeSwiper = styled.View`
  height: 150px;
  background: #63c2d1;
`;

export const PageBody = styled.View`
  background: #fff;
  border-top-left-radius: 50px;
  margin-top: -50px;
`;

export const BarberInfoArea = styled.View`
  flex-direction: row;
  margin-top: -30px;
`;

export const BarberInfoName = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const BarberInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const BarberAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-left: 30px;
  margin-right: 20px;
  border-width: 4px;
  border-color: #fff;
`;

export const BarberFavButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background: #fff;
  border: 2px solid #999;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
`;

export const ServiceArea = styled.View`
  flex: 1;
  margin-top: 30px;
`;

export const ServicesTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #268596;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const ServiceItem = styled.View`
  flex-direction: row;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 20px;
`;

export const ServiceInfo = styled.View`
  flex: 1;
`;

export const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #268596;
`;

export const ServicePrice = styled.Text`
  font-size: 14px;
  color: #268596;
`;

export const ServiceButton = styled.TouchableOpacity`
  background: #4eadbe;
  border-radius: 10px;
  padding: 10px 15px;
`;

export const ServiceButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const SwiperDot = styled.View`
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 5px;
  margin: 3px;
`;

export const SwiperDotActive = styled.View`
  width: 10px;
  height: 10px;
  background: #000;
  border-radius: 5px;
  margin: 3px;
`;

export const SwiperItem = styled.View`
  flex: 1;
  background: #63c2d1;
`;

export const SwiperImage = styled.Image`
  width: 100%;
  height: 240px;
`;

export const TestimonialArea = styled.View`
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const TestimonialItem = styled.View`
  background-color: #268596;
  padding: 15px;
  border-radius: 10px;
  height: 110px;
  justify-content: center;
  align-self: center;
  width: 75%; 
`;

export const TestimonialInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const TestimonialName = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export const TestimonialBody = styled.Text`
  color: #fff;
  font-size: 13px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 15px;
`;
