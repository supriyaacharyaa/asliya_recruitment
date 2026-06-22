// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";
// import OverseasRecruitmentProcess from "./pages/OverseasRecruitmentProcess";
// import MassRecruitmentPage from "./pages/MassRecruitment";

// import UserLayout from "./components/layout/userLayout";

// import ClientsPage from "./pages/Client";
// import Industries from "./pages/Industries";
// import RequestManpowerPage from "./pages/Requestmanpowerpage";
// import GetFreeQuotePage from "./pages/Getquotepage";
// import GlobalNetwork from "./components/sections/GlobalNetwork";
// import BlogPage from "./pages/Blog";
// import BlogDetailPage from "./pages/Blogdetails";
// import JobsPage from "./pages/JobsPage"
// import JobsDetailPage from "./pages/JobsDetailPage";
// import ScrollToTop from "./components/ui/ScrollToTop";

// export default function App() {
//   return (
//     <BrowserRouter>
//     <ScrollToTop/>
//       <Routes>
//         {/* Public pages (no layout) */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Pages using UserLayout */}
//         <Route element={<UserLayout />}>
//           <Route
//             path="/services/overseas"
//             element={<OverseasRecruitmentProcess />}
//           />

//           <Route
//             path="/services/mass"
//             element={<MassRecruitmentPage />}
//           />

//           <Route path="/clients" element={<ClientsPage />} />
//           <Route path="/industries" element={<Industries />} />
//           <Route path="/Request" element={<RequestManpowerPage />} />
//           <Route path="/quote" element={<GetFreeQuotePage />} />
//           <Route path="/networks" element={<GlobalNetwork />} />
//           <Route path="/blog" element={<BlogPage />} />
//           <Route path="/jobs" element={<JobsPage/>}/>
//          <Route path="/jobs/:slugOrId" element={<JobsDetailPage />} />

//            <Route path="/blog/:slug" element={<BlogDetailPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }import React, { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import OverseasRecruitmentProcess from "./pages/OverseasRecruitmentProcess";
import MassRecruitmentPage from "./pages/MassRecruitment";

import UserLayout from "./components/layout/userLayout";

import ClientsPage from "./pages/Client";
import Industries from "./pages/Industries";
import RequestManpowerPage from "./pages/Requestmanpowerpage";
import GetFreeQuotePage from "./pages/Getquotepage";
import GlobalNetwork from "./components/sections/GlobalNetwork";
import BlogPage from "./pages/Blog";
import BlogDetailPage from "./pages/Blogdetails";
import JobsPage from "./pages/JobsPage";
import JobsDetailPage from "./pages/JobsDetailPage";
import ScrollToTop from "./components/ui/ScrollToTop";

import { ChatProvider } from "./context/ChatContext.jsx";
import ChatbotWidget from "./components/chat/ChatbotWidget.jsx";

import api from "./Axios/Axios";
import { useEffect } from "react";

// Every route path actually defined below.
// Keep this in sync if you add/remove routes.
const APP_ROUTES = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/services/overseas",
  "/services/mass",
  "/clients",
  "/industries",
  "/Request",
  "/quote",
  "/networks",
  "/blog",
  "/blog/:slug",
  "/jobs",
  "/jobs/:slugOrId",
];

function AppContent() {
  const location = useLocation();

  const isKnownRoute = APP_ROUTES.some((pattern) =>
    matchPath({ path: pattern, end: true }, location.pathname)
  );

  // ── Visit tracking ──────────────────────────────────────────────────────
  // Fires once on initial load and again on every route change, but only
  // for routes we actually define above (skips 404s / unknown paths).
  // Failures are swallowed so a tracking hiccup never breaks navigation.
  useEffect(() => {
    if (!isKnownRoute) return;

    api.post("/visits", { path: location.pathname }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public pages (no layout) */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Pages using UserLayout */}
        <Route element={<UserLayout />}>
          <Route
            path="/services/overseas"
            element={<OverseasRecruitmentProcess />}
          />

          <Route path="/services/mass" element={<MassRecruitmentPage />} />

          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/Request" element={<RequestManpowerPage />} />
          <Route path="/quote" element={<GetFreeQuotePage />} />
          <Route path="/networks" element={<GlobalNetwork />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:slugOrId" element={<JobsDetailPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Route>
      </Routes>

      {isKnownRoute && <ChatbotWidget />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </BrowserRouter>
  );
}