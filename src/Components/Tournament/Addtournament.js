import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Addtournament = () => {
  const [tournamentDetails, settournamentDetails] = useState({
    tournamentName: "",
    imageUrl: "",
    description: "",
    startDate: "",
    endDate: "",
    status: ""
  });
  const [error, seterror] = useState({
    tournamentName: false,
    imageUrl: false,
    description: false,
    startDate: false,
    endDate: false,
    status: false
  });
  const navigate = useNavigate();
  const handleChange = e => {
    if (e.target.name == "tournamentName")
      if (!e.target.value) error.tournamentName = true;
      else error.tournamentName = false;
    else if (e.target.name == "imageUrl")
      if (!e.target.value) error.imageUrl = true;
      else error.imageUrl = false;
    else if (e.target.name == "description")
      if (!e.target.value) error.description = true;
      else error.description = false;
    else if (e.target.name == "status")
      if (!e.target.value) error.status = true;
      else error.status = false;
    settournamentDetails({
      ...tournamentDetails,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (
      !tournamentDetails.tournamentName ||
      !tournamentDetails.imageUrl ||
      !tournamentDetails.description ||
      !tournamentDetails.status
    ) {
      seterror({
        tournamentName: true,
        imageUrl: true,
        description: true,
        status: true
      });
    } else {
      axios
        .post(API_BASE_URL + "addtournament", tournamentDetails)
        .then(res => {
          if (res.data.status == 200) {
            navigate("/tournaments");
          }
        });
    }
  };
  return (
    <Box>
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            ADD TOURNAMENT
          </Typography>

          <TextField
            fullWidth
            label="Tournament Name"
            id="fullWidth"
            name="tournamentName"
            value={tournamentDetails.tournamentName}
            onChange={handleChange}
            helperText={
              error.tournamentName ? "Please fill tournament name." : ""
            }
            error={error.tournamentName}
          />
          <TextField
            fullWidth
            label="Image Url"
            id="fullWidth"
            value={tournamentDetails.imageUrl}
            name="imageUrl"
            onChange={handleChange}
            helperText={error.imageUrl ? "Please fill image url." : ""}
            error={error.imageUrl}
          />
          <TextField
            fullWidth
            label="Description"
            id="fullWidth"
            value={tournamentDetails.description}
            name="description"
            onChange={handleChange}
            helperText={error.description ? "Please fill description." : ""}
            error={error.description}
          />
          <TextField
            fullWidth
            type="date"
            id="fullWidth"
            value={tournamentDetails.startDate}
            name="startDate"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            type="date"
            id="fullWidth"
            value={tournamentDetails.endDate}
            name="endDate"
            onChange={handleChange}
          />

          <FormControl sx={{ m: 2, minWidth: "35ch" }}>
            <InputLabel id="demo-simple-select-helper-label">
              Tournament Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Tournament Status"
              value={tournamentDetails.status}
              onChange={handleChange}
              name="status"
              helperText={error.status ? "Please fill status." : ""}
              error={error.status}
            >
              <MenuItem>
                <em>None</em>
              </MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="close">Close</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Addtournament;
