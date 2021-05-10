import styled from 'styled-components/native';

export const TabArea = styled.View`
  height: 60px;
  background: #4eadbe;
  flex-direction: row;
`;

export const TabItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 35px;
  border: 1px solid #4eadbe;
  margin-top: -20px;
`;

export const AvatarIcon = styled.Image`
  height: 24px;
  width: 24px;
  border-radius: 12px;
`;
