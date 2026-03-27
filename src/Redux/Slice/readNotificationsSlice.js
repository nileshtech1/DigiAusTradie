import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  readNotifications: [],
  loading: false,
};

const readNotificationsSlice = createSlice({
  name: 'readNotifications',
  initialState,
  reducers: {
    setReadNotifications: (state, action) => {
      state.readNotifications = action.payload;
    },
    markAsRead: (state, action) => {
      if (!state.readNotifications.includes(action.payload)) {
        state.readNotifications.push(action.payload);
      }
    },
    clearAllReadNotifications: (state) => {
      state.readNotifications = [];
    },
  },
});

export const { setReadNotifications, markAsRead, clearAllReadNotifications } =
  readNotificationsSlice.actions;

// ✅ Load from AsyncStorage
export const loadReadNotifications = () => async (dispatch) => {
  try {
    const stored = await AsyncStorage.getItem('readNotifications');
    const parsed = stored ? JSON.parse(stored) : [];
    dispatch(setReadNotifications(parsed));
  } catch (error) {
    console.error('Error loading read notifications', error);
  }
};

// ✅ Save to AsyncStorage
export const saveReadNotification = (notificationId) => async (dispatch, getState) => {
  try {
    dispatch(markAsRead(notificationId));
    const { readNotifications } = getState().readNotifications;
    await AsyncStorage.setItem(
      'readNotifications',
      JSON.stringify(readNotifications)
    );
  } catch (error) {
    console.error('Error saving read notification', error);
  }
};

export default readNotificationsSlice.reducer;
