import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Standard & Legacy Imports
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import HomeRedirectRoute from "./routes/HomeRedirectRoute";
import AdminDashboardLegacy from "./pages/AdminDashboard";
import Register from "./pages/Register";
import MyComplaints from "./pages/MyComplaints";
import HomePage from "./Home";

// Visitor Imports
import Home from "./visitor/Home";
import Services from "./visitor/Services";
import About from "./visitor/About";
import { ComplaintCategories, FAQs, PublicNotices, ContactUs, HelpPage } from "./visitor/VisitorMisc";

// Citizen Imports
import CitizenLogin from "./citizen/Login";
import CitizenRegister from "./citizen/Register";
import CitizenDashboard from "./citizen/CitizenDashboard";
import ComplaintRegister from "./citizen/ComplaintRegister";
import TrackComplaint from "./citizen/TrackComplaint";
import ComplaintHistory from "./citizen/ComplaintHistory";
import SubmitFeedback from "./citizen/SubmitFeedback";
import Profile from "./citizen/Profile";
import ChangePassword from "./citizen/ChangePassword";

// Admin Imports
import AdminLogin from "./admin/Login";
import AdminDashboard from "./admin/Dashboard";
import { ManageUsers, ManageDepartment, ManageComplaintCategory } from "./admin/AdminLists";
import { ViewAllComplaints, AssignComplaint, UpdateComplaintStatus } from "./admin/AdminComplaintActions";
import { GenerateReport, ViewFeedback, SystemSettings } from "./admin/AdminMisc";

// Authority Imports
import { AuthorityLogin, AuthorityDashboard } from "./authority/AuthorityMain";
import { ViewAssignedComplaints, UpdateComplaintProgress, CloseComplaint, RespondToCitizen } from "./authority/AuthorityTasks";

function App() {
  return (
    <div>  
      <Router>
        <Routes>
          {/* Legacy & Shared Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/HomePage" element={<HomePage />} /> 
          <Route path="/" element={<HomeRedirectRoute />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin-legacy" element={<PrivateRoute><AdminDashboardLegacy /></PrivateRoute>} />
          <Route path="/my-complaints" element={<PrivateRoute><MyComplaints /></PrivateRoute>} />

          {/* Visitor Routes */}
          <Route path="/services-information" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/complaint-categories" element={<ComplaintCategories />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/public-notices" element={<PublicNotices />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Citizen Routes */}
          <Route path="/citizen-login" element={<CitizenLogin />} />
          <Route path="/citizen-register" element={<CitizenRegister />} />
          <Route path="/citizen-dashboard" element={<PrivateRoute><CitizenDashboard /></PrivateRoute>} />
          <Route path="/create-complaint" element={<PrivateRoute><ComplaintRegister /></PrivateRoute>} />
          <Route path="/track-complaint" element={<PrivateRoute><TrackComplaint /></PrivateRoute>} />
          <Route path="/complaint-history" element={<PrivateRoute><ComplaintHistory /></PrivateRoute>} />
          <Route path="/submit-feedback" element={<PrivateRoute><SubmitFeedback /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/manage-users" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
          <Route path="/admin/manage-departments" element={<PrivateRoute><ManageDepartment /></PrivateRoute>} />
          <Route path="/admin/manage-categories" element={<PrivateRoute><ManageComplaintCategory /></PrivateRoute>} />
          <Route path="/admin/view-complaints" element={<PrivateRoute><ViewAllComplaints /></PrivateRoute>} />
          <Route path="/admin/assign-complaints" element={<PrivateRoute><AssignComplaint /></PrivateRoute>} />
          <Route path="/admin/update-status" element={<PrivateRoute><UpdateComplaintStatus /></PrivateRoute>} />
          <Route path="/admin/generate-reports" element={<PrivateRoute><GenerateReport /></PrivateRoute>} />
          <Route path="/admin/view-feedback" element={<PrivateRoute><ViewFeedback /></PrivateRoute>} />
          <Route path="/admin/settings" element={<PrivateRoute><SystemSettings /></PrivateRoute>} />

          {/* Authority Routes */}
          <Route path="/authority/login" element={<AuthorityLogin />} />
          <Route path="/authority/dashboard" element={<PrivateRoute><AuthorityDashboard /></PrivateRoute>} />
          <Route path="/authority/assigned" element={<PrivateRoute><ViewAssignedComplaints /></PrivateRoute>} />
          <Route path="/authority/update-progress" element={<PrivateRoute><UpdateComplaintProgress /></PrivateRoute>} />
          <Route path="/authority/close" element={<PrivateRoute><CloseComplaint /></PrivateRoute>} />
          <Route path="/authority/respond" element={<PrivateRoute><RespondToCitizen /></PrivateRoute>} />
          <Route path="/authority/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
