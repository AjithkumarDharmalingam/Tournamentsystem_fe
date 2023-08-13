import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { getParticipantData } from "../../Reducers/Participant";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export default function Viewparticipant() {
  const [data, setdata] = useState([]);
  const [searchtext, setsearchtext] = useState("");
  const tournamentData = useSelector(state => state.tournament.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getParticipants();
  }, []);

  function getParticipants() {
    axios
      .get(API_BASE_URL + "getparticipantlist/", {
        params: {
          tournamentName: tournamentData.tournamentName
        }
      })
      .then(res => {
        console.log(res.data);
        setdata(res.data);
      })
      .catch(err => alert(err));
  }

  return (
    <Box>
      <Container
        sx={{ padding: { lg: "100px", md: "100px", sm: "100px", xs: "30px" } }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            float: "right",
            mb: 2,
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <Typography variant="h6">Search : </Typography>
          <TextField
            size="small"
            label="Search"
            id="fullWidth"
            value={searchtext}
            onChange={e => setsearchtext(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => navigate("/addparticipant")}
          >
            Add
          </Button>
          <Button variant="contained" onClick={() => navigate("/tournaments")}>
            Back
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Id</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">Mobile</StyledTableCell>
                <StyledTableCell align="right">Edit</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter(val => {
                  if (searchtext == "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchtext.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((e, index) =>
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.email}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {e.address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.mobile}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          dispatch(
                            getParticipantData({
                              id: e._id,
                              name: e.name,
                              dob: e.dob,
                              email: e.email,
                              address: e.address,
                              mobile: e.mobile,
                              tournamentName: e.tournamentName
                            })
                          );
                          navigate("/editparticipant");
                        }}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          axios
                            .delete(API_BASE_URL + "deleteparticipant", {
                              params: {
                                name: e.name
                              }
                            })
                            .then(res => {
                              if (res.data.status == 200) {
                                getParticipants();
                              }
                            });
                        }}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
