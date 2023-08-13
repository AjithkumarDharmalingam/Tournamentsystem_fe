import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { useSelector } from "react-redux";

const Addparticipant = () => {
  const tournamentData = useSelector(state => state.tournament.value);
  const [participantDetails, setparticipantDetails] = useState({
    name: "",
    dob: "",
    email: "",
    address: "",
    mobile: "",
    tournamentName: tournamentData.tournamentName
  });
  const [error, seterror] = useState({
    name: false,
    dob: false,
    email: false,
    address: false,
    mobile: false
  });
  const navigate = useNavigate();
  const handleChange = e => {
    if (e.target.name == "name")
      if (!e.target.value) error.name = true;
      else error.tournamentName = false;
    else if (e.target.name == "email")
      if (!e.target.value) error.email = true;
      else error.imageUrl = false;
    else if (e.target.name == "address")
      if (!e.target.value) error.address = true;
      else error.description = false;
    else if (e.target.name == "mobile")
      if (!e.target.value) error.mobile = true;
      else error.status = false;
    setparticipantDetails({
      ...participantDetails,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (
      !participantDetails.name ||
      !participantDetails.email ||
      !participantDetails.address ||
      !participantDetails.mobile
    ) {
      seterror({ name: true, email: true, address: true, mobile: true });
    } else {
      axios
        .post(API_BASE_URL + "addparticipant", participantDetails)
        .then(res => {
          if (res.data.status == 200) {
            navigate("/participants");
          }
        });
    }
  };
  return (
    <Box>
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            ADD PARTICIPANT
          </Typography>

          <TextField
            fullWidth
            label="Name"
            id="fullWidth"
            name="name"
            value={participantDetails.name}
            onChange={handleChange}
            helperText={error.name ? "Please fill name." : ""}
            error={error.name}
          />
          <TextField
            fullWidth
            type="date"
            id="fullWidth"
            value={participantDetails.dob}
            name="dob"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            id="fullWidth"
            value={participantDetails.email}
            name="email"
            onChange={handleChange}
            helperText={error.email ? "Please fill email." : ""}
            error={error.email}
          />

          <TextField
            fullWidth
            label="Address"
            id="fullWidth"
            value={participantDetails.address}
            name="address"
            onChange={handleChange}
            helperText={error.address ? "Please fill address." : ""}
            error={error.address}
          />

          <TextField
            fullWidth
            label="Mobile"
            id="fullWidth"
            value={participantDetails.mobile}
            name="mobile"
            onChange={handleChange}
            helperText={error.mobile ? "Please fill mobile." : ""}
            error={error.mobile}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Addparticipant;
