import Atrair from "../pages/atrair";
import Converter from "../pages/converter";
import LandingPages from "../pages/converter/landingPages";
import CreateLandingPage from "../pages/converter/landingPages/create";
import HomeScreen from "../pages/home";

const MENU_ITENS = [
  {
    text: "Início",
    href: "/",
    active: true,
    component: <HomeScreen />,
  },
  {
    text: "Atrair",
    href: "/atrair",
    active: true,
    component: <Atrair />,
  },
  {
    text: "Converter",
    href: "/converter",
    active: true,
    component: <Converter />,
  },
  {
    text: "Landing Pages",
    href: "/landing-pages",
    active: true,
    hidden: true,
    component: <LandingPages />,
  },

  {
    text: "Landing Pages",
    href: "/landing-pages/create",
    active: true,
    hidden: true,
    component: <CreateLandingPage />,
  },
  {
    text: "Relacionar",
    href: "/relacionar",
    active: false,
  },
  {
    text: "Analisar",
    href: "/analisar",
    active: false,
  },
  {
    text: "Vender",
    href: "/vender",
    active: false,
  },
];

export default MENU_ITENS;
