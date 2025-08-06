import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import PrivateRoutes from "./components/PrivateRoutes";
// import { GetContentContextProvider } from "./context/GetContentContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route
            path='/*'
            element={
              <PrivateRoutes>
                {/* <GetContentContextProvider>
                  <Dashboard />
                </GetContentContextProvider> */}
              </PrivateRoutes>
            }
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
