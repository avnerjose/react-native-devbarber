import React, { useState, useEffect } from "react";
import { Platform, RefreshControl } from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import Api from "../../Api";

import { useNavigation } from "@react-navigation/native";
import SearchIcon from "../../assets/search.svg";
import MyLocationIcon from "../../assets/my_location.svg";
import BarberItem from "../../components/BarberItem";
import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea,
} from "./styles";

export default function Home() {

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState({});
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const handleLocationFinder = async () => {
        setCoords({});

        let result = await request(
            Platform.OS === "ios" ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if (result === "granted") {

            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    setCoords(position.coords);
                    getBarbers();
                },
                (error) => {
                    alert("Erros: " + error.code + " " + error.message)
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }

    }

    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        let lat = null;
        let lng = null;

        if (coords) {
            lat = coords.latitude;
            lng = coords.longitude;
        }

        let res = await Api.getBarbers(lat, lng, locationText);


        if (res.error === '') {
            if (res.loc != '') {
                setLocationText(res.loc);
            }
            setList(res.data);
        } else {
            alert("Erro: " + res.error);
        }

        setLoading(false);

    }

    const onRefresh = () => {
        setRefreshing(true);
        getBarbers();
        setRefreshing(false);
    }

    const handleLocationSearch = () => {
        setCoords({});
        getBarbers();
    }

    useEffect(() => {
        getBarbers();
    }, []);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate("Search")}>
                        <SearchIcon width="26" height="26" fill="#FFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFF"
                        value={locationText}
                        onChangeText={text => setLocationText(text)}
                        onEndEditing={handleLocationSearch} />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFF" />
                    </LocationFinder>
                </LocationArea>

                {loading && <LoadingIcon size="large" color="#FFf" />}
                <ListArea>
                    {list.map((item, k) => (
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    )
}