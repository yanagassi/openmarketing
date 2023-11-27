import Atrair from "../pages/atrair";
import Converter from "../pages/converter";
import LandingPages from "../pages/converter/landingPages";
import CreateLandingPage from "../pages/converter/landingPages/create";
import ViewLandingPage from "../pages/converter/landingPages/viewLandingPage";
import HomeScreen from "../pages/home";
import Login from "../pages/login";
import Leads from "../pages/relacionar/leads";

const MENU_ITENS = [
  {
    text: "Início",
    href: "/",
    active: true,
    component: <HomeScreen />,
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
    text: "Landing Pages",
    href: "/leads",
    active: true,
    hidden: true,
    component: <Leads />,
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
    private: false,
  },

  {
    text: "Landing Pages",
    href: "/view/:route_lp_view_id",
    active: true,
    hidden: true,
    hideMenu: true,
    component: <ViewLandingPage />,
    private: false,
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
