import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import MENU_ITENS from "../constants/menu";

const RoutesApp = () => {
  return (
    <Router>
      <Switch>
        {MENU_ITENS.filter((e) => e.component).map((e) => (
          <Route path={e.href} element={e.component} />
        ))}
      </Switch>
    </Router>
  );
};

export default RoutesApp;
