import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import MENU_ITEMS from "../constants/menu";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";

const RoutesApp = () => {
  const { isLoggedIn, logout } = useContext(ApiContext);

  return (
    <Router>
      <Routes>
        {MENU_ITEMS.filter((e) => e.component).map((e) => (
          <Route
            key={e.href}
            path={e.href}
            element={
              e.private && !isLoggedIn ? (
                <Navigate to="/users/login" replace={true} />
              ) : (
                e.component
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default RoutesApp;
