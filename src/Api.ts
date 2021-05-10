import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
  checkToken: async (token: string) => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });

    const json = await req.json();

    return json;
  },

  signIn: async (email: string, password: string) => {
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await req.json();

    return json;
  },

  signUp: async (name: string, email: string, password: string) => {
    const req = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await req.json();

    return json;
  },

  logout: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/auth/logout`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(token),
    });
    const json = await req.json();

    return json;
  },

  getBarbers: async (lat?: string, lng?: string, address?: string) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(
      `${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`,
    );
    const json = await req.json();

    return json;
  },

  getBarber: async (id: number) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);

    const json = await req.json();

    return json;
  },

  getFavorites: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/favorites?token=${token}`);

    const json = await req.json();

    return json;
  },

  setFavorite: async (barberId: number) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/favorite?token=${token}`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({barber: barberId}),
    });
    const json = await req.json();

    return json;
  },

  setAppointment: async (
    barberId: number,
    service: number,
    selectedYear: number,
    selectedMonth: number,
    selectedDay: number,
    selectedHour: string,
  ) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/appointment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        id: barberId,
        service,
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
        hour: selectedHour,
      }),
    });
    const json = await req.json();

    return json;
  },
};
