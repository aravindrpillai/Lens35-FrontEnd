import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "./theme";
import CustomerHome from "./customers/CustomerHome";
import EmployeesHome from "./employees/EmployeesHome";
import EmployeeProfile from "./employees/profile/EmployeeProfile";
import { EmployeeSignIn } from "./employees/EmployeeSignIn";
import { CustomerSignIn } from "./customers/CustomerSignIn";
import CustomerProfile from "./customers/profile/CustomerProfile";
import CustomerSupport from "./customers/CustomerSupport";
import { ContextProvider } from "./contexts/ContextProvider";
import EmployeeCustomerSupport from "./employees/EmployeeCustomerSupport";
import FileUploadPage from "./employees/upload/FileUploadPage";
import OpenBookings from "./employees/openbookings/OpenBookings";
import CustomerBookings from "./customers/bookings/CustomerBookings";
import { Welcome } from "./common/Welcome";
import EmailVerified from "./common/EmailVerified";
import MyBookings from "./employees/mybookings/MyBookings";
import EmployeesWallet from "./employees/wallet/EmployeesWallet";
import CustomerBooking from "./customers/bookings/booking/CustomerBooking";

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
                      <Route path="/emp/upload" element={<FileUploadPage />} />
                      <Route path="/emp/bookings/open" element={<OpenBookings />} />
                      <Route path="/emp/bookings/my" element={<MyBookings />} />
                      <Route path="/emp/wallet" element={<EmployeesWallet />} />

                      
                      
                      
                      <Route path="/emp/support" element={<EmployeeCustomerSupport />} />
                      <Route path="/emp/home" element={<EmployeesHome />} />
           

                      <Route path="/cust/login" element={<CustomerSignIn />} />
                      <Route path="/cust/booking/:bookingId" element={<CustomerBooking />} />
                      <Route path="/cust/bookings" element={<CustomerBookings />} />
                      <Route path="/cust/profile" element={<CustomerProfile />} />
                      
                      <Route path="/cust/home" element={<CustomerHome />} />
                      <Route path="/cust/support" element={<CustomerSupport />} />
                      
                      <Route path="/verify/email" element={<EmailVerified />} /> 
                      <Route path="" element={<Welcome />} /> 
                    </Routes>
                </Router>
              </ContextProvider>
        </ThemeProvider>
    </React.Fragment>
  );
}
