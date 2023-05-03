import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import NotesPage from "./Pages/NotesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Index from "./Components/Index";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import { NotesState } from "./Contexts/Context";
import AddNote from "./Components/Content/AddNote";
import UpdateProfile from "./Components/Authentication/UpdateProfile";

function App() {
  return (
    <BrowserRouter>
      <NotesState>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Index />} index />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="addNote" element={<AddNote />} />
            <Route path="updateProfile" element={<UpdateProfile />} />
          </Route>
        </Routes>
      </NotesState>
    </BrowserRouter>
  );
}

export default App;
