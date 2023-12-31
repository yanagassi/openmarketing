import Atrair from "../pages/atrair";
import Converter from "../pages/converter";
import LandingPages from "../pages/converter/landingPages";
import CreateLandingPage from "../pages/converter/landingPages/create";
import ViewLandingPage from "../pages/converter/landingPages/viewLandingPage";
import HomeScreen from "../pages/home";
import Login from "../pages/login";
import EmailPage from "../pages/relacionar/email/index.js";
import EmailEditor from "../pages/relacionar/email/EmailEditor.js";

import LeadScoring from "../pages/relacionar/lead_scoring/index.js";
import Leads from "../pages/relacionar/leads";
import ViewLead from "../pages/relacionar/leads/viewLead";
import Segments from "../pages/relacionar/segments";
import SegmentView from "../pages/relacionar/segments/view.js";

const MENU_ITENS = [
  {
    text: "Início",
    href: "/",
    active: true,
    component: <HomeScreen />,
    private: true,
  },

  {
    text: "Segmentos Visualizar",
    href: "/segments",
    active: true,
    hidden: true,
    hideMenu: true,
    component: <Segments />,
    private: true,
  },

  {
    text: "Segmentos",
    href: "/segments/:id_segment",
    active: true,
    hidden: true,
    hideMenu: true,
    component: <SegmentView />,
    private: true,
  },

  {
    text: "Atrair",
    href: "/atrair",
    active: true,
    component: <Atrair />,
    private: true,
  },
  {
    text: "Converter",
    href: "/converter",
    active: true,
    component: <Converter />,
    private: true,
  },
  {
    text: "Landing Pages",
    href: "/landing-pages",
    active: true,
    hidden: true,
    component: <LandingPages />,
    private: true,
  },
  {
    text: "Email",
    href: "/email",
    active: true,
    hidden: true,
    component: <EmailPage />,
    private: true,
  },

  {
    text: "Email",
    href: "/email/:id_email",
    active: true,
    hidden: true,
    component: <EmailEditor />,
    private: true,
  },

  {
    text: "Leads",
    href: "/leads",
    active: true,
    hidden: true,
    component: <Leads />,
    private: true,
  },

  {
    text: "Lead",
    href: "/leads/:id_lead",
    active: true,
    hidden: true,
    component: <ViewLead />,
    private: true,
  },

  {
    text: "Lead Scoring",
    href: "/lead-scoring",
    active: true,
    hidden: true,
    component: <LeadScoring />,
    private: true,
  },
  {
    text: "Lead Tracking",
    href: "/lead-tracking",
    active: true,
    hidden: true,
    component: <LeadScoring />,
    private: true,
  },
  {
    text: "Landing Pages",
    href: "/landing-pages/create",
    active: true,
    hidden: true,
    component: <CreateLandingPage />,
    private: true,
  },

  {
    text: "Landing Pages",
    href: "/landing-pages/edit/:id_lp",
    active: true,
    hidden: true,
    hideMenu: true,
    component: <CreateLandingPage />,
    private: true,
  },

  {
    text: "Landing Pages",
    href: "/view/:route_lp_view_id",
    active: true,
    hidden: true,
    hideMenu: true,
    component: <ViewLandingPage />,
    private: true,
  },

  {
    text: "Login",
    href: "/users/login",
    active: true,
    hidden: true,
    component: <Login />,
    private: false,
  },
];

export default MENU_ITENS;
