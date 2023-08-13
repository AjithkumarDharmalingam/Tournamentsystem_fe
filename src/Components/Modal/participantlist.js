import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px"
};

function Participantmodal() {
  const [open, setOpen] = React.useState(true);
  const [data, setdata] = useState([]);
  const participantData = useSelector(state => state.participant.value);
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    axios
      .get(API_BASE_URL + "getparticipantlist/", { 
        params: {
          tournamentName: participantData.tournamentName
        }
      })
      .then(res => {
        console.log(res.data);
        setdata(res.data);
      })
      .catch(err => alert(err));
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ClearOutlinedIcon
            sx={{ marginLeft: "auto" }}
            onClick={handleClose}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#333", fontSize: "18px" }}
          >
            {participantData.tournamentName} Participants
          </Typography>

          <Box>
            {data.map((e, index) => {
              return (
                <Typography variant="h6">
                  {index + 1} . {e.name}
                </Typography>
              );
            })}
          </Box>
          <Button
            variant="contained"
            sx={{ background: "black", textTransform: "capitalize" }}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export default Participantmodal;
