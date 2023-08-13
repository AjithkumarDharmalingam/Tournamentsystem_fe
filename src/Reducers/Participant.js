import { createSlice } from "@reduxjs/toolkit";

const participantSlice = createSlice({
  name: "participant",
  initialState: {
    value: {
      id: "",
      name: "",
      dob: "",
      email: "",
      address: "",
      mobile: "",
      tournamentName: ""
    }
  },
  reducers: {
    getParticipantData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getParticipantData } = participantSlice.actions;

export default participantSlice.reducer;
