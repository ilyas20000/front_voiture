import Register from "./pages/authentification/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/authentification/Login";
import Application from "./Application";
import HomePage from './pages/admin/HomePage'
import CarForm from "./pages/admin/components/cars/CarForm";
import Client from "./pages/admin/components/clients/Client";
import ClientForm from "./pages/admin/components/clients/ClientForm";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/register" Component={Register} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/application" Component={Application} />
        <Route exact path="/home" Component={HomePage} />
        <Route exact path="/carForm" Component={CarForm} />
        <Route exact path="/client" Component={Client} />
        <Route exact path="/clientForm" Component={ClientForm} />

      </Routes>
    </div>


  );
}

export default App;
