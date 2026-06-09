import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import OverseasRecruitmentProcess from "./pages/OverseasRecruitmentProcess";

import UserLayout from "./components/layout/userLayout";
import ClientsPage from "./pages/Client";
import Industries from "./pages/Industries";
import RequestManpowerPage from "./pages/Requestmanpowerpage";
import GetFreeQuotePage from "./pages/Getquotepage";
import Blog from "./pages/Blog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        {/* Only Overseas page uses UserLayout */}
        <Route element={<UserLayout />}>
          <Route
            path="/services/overseas"
            element={<OverseasRecruitmentProcess />}
          />

          <Route path="/clients" element={<ClientsPage/>}/>
          <Route path="/industries" element={<Industries/>}/>
          <Route path="/Request" element={<RequestManpowerPage/>}/>
          <Route path="/quote" element={<GetFreeQuotePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}