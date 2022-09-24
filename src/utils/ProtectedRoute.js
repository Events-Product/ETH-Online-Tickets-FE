import React from "react";
import { Navigate } from "react-router-dom";
import ErrorPage from "../Components/ErrorPage";

const ProtectedRoute = ({ permit, children }) => {
  if (!permit) {
    return (
      <>
        <ErrorPage text={"Only Organizer Access"} />
        <a href="/">Go to Main page</a>
        {/* <Navigate to="/" replace /> */}
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
