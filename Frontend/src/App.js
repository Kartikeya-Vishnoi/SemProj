import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./store/AuthContext";
import { AuthCtx } from "./store/authctx";
import UserHome from "./Entrepreneur/UserHome";
import EntrepreneurLogIn from "./Entrepreneur/Entrepreneur_Login&SignupComponents/EntrepreneurLogin";
import SignUp from "./Entrepreneur/Entrepreneur_Login&SignupComponents/SignUp";
import Home from "./components/Home/Home";
import Chat from "./Chat/Chat";
import Events from "./Event Tracker/Events";
import AllMeetups from "./Event Tracker/Event_Tracker_Pages/AllMeetups";
import NewMeetups from "./Event Tracker/Event_Tracker_Pages/NewMeetup";
import FavouriteMeetups from "./Event Tracker/Event_Tracker_Pages/FavouriteMeetups";
import InvestorList from "./Investor/Investor-list";
import Navigator from "./components/Who_r_u";
import InvestorSignUp from "./Investor/Investor_Login&SignupComponents/InvestorSignup";
import InvestorLogIn from "./Investor/Investor_Login&SignupComponents/InvestorLogin";
import LoginSwitch from "./components/LoginSwitch";
import InvestorHome from "./Investor/InvestorHome";
import EntrepreneurList from "./Entrepreneur/Entrepreneur List/Entrepreneur-list";
import ProposalItemHome from "./Investor/ProposalItemHome";
import About from "./components/About";
import PdfViewer from "./Investor/PdfViewer";
//import { AuthCtx } from "./store/authctx";

function App() {
  const { currentUser } = useContext(AuthCtx);
  const RequireAuth = ({ children }) => {
    return currentUser.currentUser ? children : <Navigate to="/login" />;
  };
  // console.log(currentUser)
  //const authctx = useContext(AuthCtx);

  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route
              path="/entrepreneurhome"
              element={
                <RequireAuth>
                  <UserHome />
                </RequireAuth>
              }
            />
            <Route
              path="/investorhome"
              element={
                <RequireAuth>
                  <InvestorHome />
                </RequireAuth>
              }
            />
            <Route path="/entrepreneursignup" element={<SignUp />} />
            <Route path="/investorsignup" element={<InvestorSignUp />} />
            <Route path="/login" element={<LoginSwitch />} />
            <Route path="/entrepreneurlogin" element={<EntrepreneurLogIn />} />
            <Route path="/investorlogin" element={<InvestorLogIn />} />
            <Route path="/investorhome" element={<InvestorHome />} />
            <Route path="/pdf" element={<PdfViewer />} />
            <Route
              path="/chat"
              element={
                <RequireAuth>
                  <Chat />
                </RequireAuth>
              }
            />
            <Route
              path="/proposalItemHome"
              element={
                <RequireAuth>
                  <ProposalItemHome/>
                </RequireAuth>
              }
            />
            <Route
              path="/events"
              element={
                <RequireAuth>
                  <Events />
                </RequireAuth>
              }
            />
            <Route
              path="/"
              element={
                  <Home />
              }
            />
            <Route
              path="/allmeetups"
              element={
                <RequireAuth>
                  <AllMeetups />
                </RequireAuth>
              }
            />
            <Route
              path="/new-meetup"
              element={
                <RequireAuth>
                  <NewMeetups />
                </RequireAuth>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/vclist" element={<RequireAuth><InvestorList /></RequireAuth>} />
            <Route path="/entlist" element={<RequireAuth><EntrepreneurList /></RequireAuth>} />
            <Route
              path="/favorites"
              element={
                <RequireAuth>
                  <FavouriteMeetups />
                </RequireAuth>
              }
            />
            <Route path="/who_r_u" element={<Navigator />}></Route>
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
