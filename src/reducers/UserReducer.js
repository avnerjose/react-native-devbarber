export const initialState = {
    avatar: '',
    favorites: [],
    appointments: [],
};

export const UserReducer = (state, action) => {
    switch (action.type) {

        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar };
        case 'setFavorites':
            return { ...state, favorites: action.payload.favorites };
        case 'setAppointments':
            return { ...state, appointments: action.payload.appointments }
        default:
            return state;

    }
};