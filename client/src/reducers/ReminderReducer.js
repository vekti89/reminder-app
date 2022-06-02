const reminderReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'GET_REMINDERS':
      return { ...state, reminders: action.payload, loading: false };
    case 'ADD_REMINDER':
      return { ...state, reminders: [...state.reminders, action.payload] };
    case 'DELETE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.filter((r) => r._id !== action.payload),
      };
    case 'UPDATE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.map((r) =>
          r._id === action.payload.id
            ? {
                ...r,
                ...action.payload,
              }
            : r
        ),
      };
    default:
      return state;
  }
};

export default reminderReducer;
