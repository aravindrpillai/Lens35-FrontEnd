import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "./theme";
import CustomerHome from "./customers/CustomerHome";
import EmployeesHome from "./employees/EmployeesHome";
import EmployeeBookingHistory from "./employees/EmployeeBookingHistory";
import EmployeeProfile from "./employees/profile/EmployeeProfile";
import { EmployeeSignIn } from "./employees/EmployeeSignIn";
import EmployeeNewBooking from "./employees/EmployeeNewBooking";
import { CustomerSignIn } from "./customers/CustomerSignIn";
import CustomerBookingHistory from "./customers/CustomerBookingHistory";
import CustomerNewBooking from "./customers/bookings/CustomerNewBooking";
import CustomerProfile from "./customers/CustomerProfile";
import CustomerSupport from "./customers/CustomerSupport";
import { ContextProvider } from "./contexts/ContextProvider";
import EmployeeCustomerSupport from "./employees/EmployeeCustomerSupport";
import FileUploadPage from "./employees/upload/FileUploadPage";
import EmployeeServices from "./employees/services/EmployeeServices";
import OpenBookings from "./employees/openbookings/OpenBookings";

export default function App() {
  
  const [currentTheme, setCurrentTheme] = useTheme();
  return (
    <React.Fragment>
     
        <ThemeProvider theme={currentTheme}>
              <ContextProvider>
                <Router>
                    <Routes>
                      <Route path="/emp/login" element={<EmployeeSignIn />} /> 
                      <Route path="/emp/profile" element={<EmployeeProfile />} />
                      
                      
                      <Route path="/emp/services" element={<EmployeeServices />} />
                      <Route path="/emp/bookings/open" element={<OpenBookings />} />
                      <Route path="/emp/bookings/active" element={<EmployeeNewBooking />} />
                      <Route path="/emp/bookings/history" element={<EmployeeBookingHistory />} />
                      <Route path="/emp/support" element={<EmployeeCustomerSupport />} />
                      <Route path="/emp/home" element={<EmployeesHome />} />
                      <Route path="/emp/upload" element={<FileUploadPage />} /> 
                    </Routes>
                </Router>
              </ContextProvider>

              <ContextProvider>
                <Router>
                    <Routes>
                      <Route path="/cust/login" element={<CustomerSignIn />} />
                      
                      <Route path="/cust/profile" element={<CustomerProfile />} />
                      <Route path="/cust/bookings" element={<CustomerNewBooking />} />
                      <Route path="/cust/history" element={<CustomerBookingHistory />} />
                      <Route path="/cust/support" element={<CustomerSupport />} />
                      <Route path="/cust/home" element={<CustomerHome />} />
                      
                    </Routes>
                </Router>
              </ContextProvider>
              
        </ThemeProvider>
    </React.Fragment>
  );
}
