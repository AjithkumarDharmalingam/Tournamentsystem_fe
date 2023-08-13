import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import Box from "@mui/material/Box";
import Navbar from "./Components/Navbar/Navbar";
import Addtournament from "./Components/Tournament/Addtournament";
import Viewtournament from "./Components/Tournament/Viewtournament";
import Addparticipant from "./Components/Tournament/Addparticipant";
import Viewparticipant from "./Components/Tournament/Viewparticipant";
import Editparticipant from "./Components/Tournament/Editparticipant";
import Edittournament from "./Components/Tournament/Edittournament";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/tournaments" element={<Viewtournament />} />
        <Route exact path="/participants" element={<Viewparticipant />} />
        <Route exact path="/addtournament" element={<Addtournament />} />
        <Route exact path="/edittournament" element={<Edittournament />} />
        <Route exact path="/addparticipant" element={<Addparticipant />} />
        <Route exact path="/editparticipant" element={<Editparticipant />} />
      </Routes>
    </Box>
  );
}

export default App;
