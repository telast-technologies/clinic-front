import "./App.css";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import Login from "./Pages/Login/Login";
import "react-phone-number-input/style.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContext } from "./shared/AppContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddPatient from "./Pages/AddPatient/AddPatient";
import AddStaff from "./Pages/AddStaff/AddStaff";
import "react-toastify/dist/ReactToastify.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import ViewPatient from "./Pages/ViewPatient/ViewPatient";
import ViewSupplies from "./Pages/ViewSupplies/ViewSupplies";
import AddSupplies from "./Pages/AddSupplies/AddSupplies";
import ViewService from "./Pages/ViewService/ViewService";
import AddService from "./Pages/AddService/AddService";
import Timeslot from "./Pages/Timeslot/Timeslot";
import AddTimeSlot from "./Pages/AddTimeSlot/AddTimeSlot";
import AddVisit from "./Pages/AddAppoientment/AddVisit";
import ViewVisit from "./Pages/ViewVisit/ViewVisit";
import Invoice from "./Pages/Invoice/Invoice";
import Charge from "./Pages/Charge/Charge";
import UpdateCharge from "./Pages/UpdateCharge/UpdateCharge";
import AddChargeItem from "./Pages/AddChargeItem/AddChargeItem";
import AddChargeService from "./Pages/AddChargeService/AddChargeService";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SchedulerPage from "./Pages/SchedulerPage/SchedulerPage";
import SchedulerSessions from "./Pages/SchedulerPage/SchedulerSessions";
import Profile from "./Pages/Profile/Profile";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import "tippy.js/dist/tippy.css"; // optional
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/forgetpassword", element: <ForgetPassword /> },
  { path: "/addpatient", element: <AddPatient /> },
  { path: "/addstaff", element: <AddStaff /> },
  { path: "/viewpatient", element: <ViewPatient /> },
  { path: "/viewsup", element: <ViewSupplies /> },
  { path: "/addsup", element: <AddSupplies /> },
  { path: "/viewservices", element: <ViewService /> },
  { path: "/addservices", element: <AddService /> },
  { path: "/timeslot", element: <Timeslot /> },
  { path: "/addtimeslot", element: <AddTimeSlot /> },
  { path: "/addvisit", element: <AddVisit /> },
  { path: "/viewvisit", element: <ViewVisit /> },
  { path: "/invoice/:value", element: <Invoice /> },
  { path: "/invoice", element: <Charge /> },
  { path: "/updateCharge/:uid", element: <UpdateCharge /> },
  { path: "/addchargeitem/:id", element: <AddChargeItem /> },
  { path: "/addchargeService/:id", element: <AddChargeService /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/scheduler", element: <SchedulerPage /> },
  { path: "/schedulerslots", element: <SchedulerSessions /> },
  { path: "/profile", element: <Profile /> },
  { path: "/resetPassword", element: <ResetPassword /> },
]);
export const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState("omar nero");

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ token: token, setToken: setToken }}>
        <RouterProvider router={router} />;
        <ToastContainer />
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
