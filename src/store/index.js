import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";
import sidebarSlice from "./sidebar/sidebarSlice";

import notificationsSlice from "./notifications/notificationsSlice";
// dashboard slices
import statisticsSlice from "./dashboard/statisticsSlice";
import patientsSlice from "./patients/patientsSlice";

export default configureStore({
  reducer: {
    sidebar: sidebarSlice,
    notifications: notificationsSlice,
    statistics: statisticsSlice,
    auth: authSlice,
    patients: patientsSlice,
  },
});
