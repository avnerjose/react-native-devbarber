import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {extraBarberInfo} from '../../screens/Barber';
import ExpandIcon from '../../assets/expand.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import Api from '../../Api';
import {
  BarberAvatar,
  BarberInfo,
  BarberName,
  CloseButton,
  DateInfo,
  DateItem,
  DateItemDay,
  DateItemNumber,
  DateList,
  DateNextArea,
  DatePrevArea,
  DateTitle,
  DateTitleArea,
  FinishButton,
  FinishButtonText,
  HourItem,
  HourItemText,
  HourList,
  Modal,
  ModalArea,
  ModalBody,
  ModalItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
} from './styles';

interface BarberModalProps {
  show: boolean;
  setShow: (b: boolean) => void;
  barber: extraBarberInfo;
  service: null | number;
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

interface ListDays {
  status: boolean;
  weekday: string;
  number: number;
  hours: Array<string>;
}

export default function BarberModal(props: BarberModalProps) {
  const navigation = useNavigation();

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<null | number>(null);
  const [selectedHour, setSelectedHour] = useState('');
  const [listDays, setListDays] = useState<ListDays[]>([]);
  const [listHour, setListHour] = useState<string[]>([]);

  useEffect(() => {
    let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    let newListDays = [] as ListDays[];

    for (let i = 1; i <= daysInMonth; i++) {
      let d = new Date(selectedYear, selectedMonth, i);
      let year = d.getFullYear();
      let month = (d.getMonth() + 1) as number | string;
      let day = d.getDate() as number | string;
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      let selDate = `${year}-${month}-${day}`;

      let availability = props.barber.data.available.filter(
        (e) => e.date === selDate,
      );

      newListDays.push({
        status: availability.length > 0 ? true : false,
        weekday: days[d.getDay()],
        number: i,
        hours:
          availability.length > 0 && availability[0].hours.length > 0
            ? availability[0].hours
            : [],
      });
    }
    setListDays(newListDays);
    setSelectedDay(null);
    setListHour([]);
    setSelectedHour('');
  }, [props.barber, selectedMonth, selectedYear]);
  useEffect(() => {
    let today = new Date();

    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  const handleCloseButton = () => {
    props.setShow(false);
  };

  const handleFinishButton = async () => {
    /*if (
      props.barber.data.id &&
      props.service != null &&
      selectedYear > 0 &&
      selectedMonth > 0 &&
      selectedDay != null &&
      selectedDay > 0 &&
      selectedHour != ''
    ) {
      let res = await Api.setAppointment(
        props.barber.data.id,
        props.service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour,
      );
      console.log(res);
      if (res.error == '') {
        props.setShow(false);
        //navigation.navigate('Appointments');
      } else {
        Alert.alert(res.error);
      }
    }*/
    props.setShow(false);
    navigation.navigate('Appointments');
  };

  const handleLeftDateButton = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(1);
  };

  const handleRightDateButton = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(1);
  };

  const handleDaySelect = (itemNumber: number) => {
    setSelectedDay(itemNumber);
    let newHourList = null as null | Array<ListDays>;

    newHourList = listDays.filter((e) => e.number === itemNumber);

    setListHour(newHourList[0].hours);
  };

  return (
    <Modal transparent visible={props.show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width="40" height="40" fill="#000" />
          </CloseButton>

          <ModalItem>
            <BarberInfo>
              <BarberAvatar source={{uri: props.barber.data.avatar}} />
              <BarberName>{props.barber.data.name}</BarberName>
            </BarberInfo>
          </ModalItem>

          {props.service != null && (
            <ModalItem>
              <ServiceInfo>
                <ServiceName>
                  {props.barber.data.services[props.service].name}
                </ServiceName>
                <ServicePrice>
                  R${' '}
                  {props.barber.data.services[props.service].price.toFixed(2)}
                </ServicePrice>
              </ServiceInfo>
            </ModalItem>
          )}

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handleLeftDateButton}>
                <NavPrevIcon width="35" height="35" fill="#000" />
              </DatePrevArea>
              <DateTitleArea>
                <DateTitle>
                  {months[selectedMonth]} {selectedYear}
                </DateTitle>
              </DateTitleArea>
              <DateNextArea onPress={handleRightDateButton}>
                <NavNextIcon width="35" height="35" fill="#000" />
              </DateNextArea>
            </DateInfo>
            <DateList horizontal showsHorizontalScrollIndicator={false}>
              {listDays.map((item, key) => (
                <DateItem
                  key={key}
                  disabled={!item.status}
                  onPress={() => handleDaySelect(item.number)}
                  style={{
                    opacity: item.status ? 1 : 0.5,
                    backgroundColor:
                      item.number === selectedDay ? '#4EADBE' : '#FFF',
                  }}>
                  <DateItemDay
                    style={{
                      color: item.number === selectedDay ? '#FFF' : '#000',
                    }}>
                    {item.weekday}
                  </DateItemDay>
                  <DateItemNumber
                    style={{
                      color: item.number === selectedDay ? '#FFF' : '#000',
                    }}>
                    {item.number}
                  </DateItemNumber>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>
          {selectedDay && listHour.length > 0 && (
            <ModalItem>
              <HourList horizontal showsHorizontalScrollIndicator={false}>
                {listHour.map((item, key) => (
                  <HourItem
                    onPress={() => setSelectedHour(item)}
                    key={key}
                    style={{
                      backgroundColor:
                        item === selectedHour ? '#4EADBE' : '#FFF',
                    }}>
                    <HourItemText
                      style={{
                        color: item === selectedHour ? '#FFF' : '#000',
                      }}>
                      {item}
                    </HourItemText>
                  </HourItem>
                ))}
              </HourList>
            </ModalItem>
          )}

          <FinishButton onPress={handleFinishButton}>
            <FinishButtonText>Finalizar Agendamento</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
}
