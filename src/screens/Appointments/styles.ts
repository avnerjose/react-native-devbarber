import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #63c2d1;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 0 20px 20px 20px;
`;

export const AppointmentItem = styled.TouchableOpacity`
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 20px;
`;

export const AppointmentItemTop = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const AppointmentItemMiddle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`;

export const AppointmentItemBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const BarberAvatar = styled.Image`
  width: 65px;
  height: 65px;
  border-radius: 20px;
`;

export const BarberName = styled.Text`
  font-size: 18px;
  margin-left: 15px;
  font-weight: bold;
`;

export const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const ServicePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const AppointmentDateItem = styled.View`
  background: #4eadbe;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 10px;
`;

export const AppointmentDateText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const AppointmentHourItem = styled(AppointmentDateItem)``;

export const AppointmentHourText = styled(AppointmentDateText)``;

export const LoadingIcon = styled.ActivityIndicator`
  margin: auto;
`;

export const AppointmentsTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
`;

export const AppointmentsTopText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
`;

export const AppointmentsTopButton = styled.TouchableOpacity``;
