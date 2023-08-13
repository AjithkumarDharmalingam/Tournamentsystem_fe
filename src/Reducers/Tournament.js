import { createSlice } from "@reduxjs/toolkit";

const tournamentSlice = createSlice({
  name: "tournament",
  initialState: {
    value: {
      id: "",
      tournamentName: "",
      imageUrl: "",
      description: "",
      startDate: "",
      endDate: "",
      status: ""
    }
  },
  reducers: {
    getTournamentData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getTournamentData } = tournamentSlice.actions;

export default tournamentSlice.reducer;
