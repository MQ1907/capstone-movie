import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/home/Home";
import Details from "./modules/Details/Details";
import NotFound from "./components/NotFound";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Signin from "./modules/Auth/pages/Signin/Signin";
import Signup from "./modules/Auth/pages/Signup/Signup";
import useProvider from "./contexts/UserContext/UserContext";
import UserProvider from "./contexts/UserContext/UserContext";
import ProtectedRoute from "./routers/ProtectedRoute/ProtectedRoute";
import AdminMovie from "./modules/AdminMovie/AdminMovie";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="movies/:movieId" element={<Details />} />

            <Route element={<ProtectedRoute />}>
              <Route
                path="tickets/:showtimeId"
                element={<div>Ticket Page</div>}
              />
            </Route>

            {/* Admin */}

            <Route path="/admin/movies" element={<AdminMovie />} />
          </Route>

          {/* Admin */}
          {/* <Route element={<AdminProtectedMovieRoute />} />> */}
          <Route path="/admin" /*element={<div>Đây là AdminLayout</div>}*/>
            <Route path="movies" element={<AdminMovie />} />
          </Route>
          {/* <Route /> */}
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
