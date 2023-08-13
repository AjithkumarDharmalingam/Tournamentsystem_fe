import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Participantmodal from "../Modal/participantlist";
import { useDispatch } from "react-redux";
import { getParticipantData } from "../../Reducers/Participant";

export const Home = props => {
  const [data, setdata] = useState([]);
  const [modalstate, setmodalstate] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(props.searchtext);
  useEffect(() => {
    axios.get("https://tournamentsystem.onrender.com/api/gettournamentlist/").then(response => {
      setdata(response.data);
    });
  }, []);

  return (
    <Container sx={{ mt: 5 }} disableGutters>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        TOURNAMENT LIST
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {data.map(e => {
          return (
            <Box sx={{ margin: "30px 10px 0px 0px" }}>
              {e.status != "open"
                ? ""
                : <Card
                    sx={{
                      maxWidth: 245,
                      margin: { lg: "10px", md: "10px", xs: "auto" },
                      mb: { xs: 5 }
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={e.imageUrl}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {e.tournamentName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          start date - {e.startDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          end date - {e.endDate}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {e.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          status - {e.status}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        sx={{ margin: "auto" }}
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
                          setmodalstate(!modalstate);
                        }}
                      >
                        View Participants
                      </Button>
                    </CardActions>
                  </Card>}
            </Box>
          );
        })}
        {modalstate ? <Participantmodal /> : ""}
      </Box>
    </Container>
  );
};
