import MenuBar from "./components/LP";
import { ApiProvider } from "./context/ApiContext";
import RoutesApp from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ApiProvider>
      <MenuBar />

      <div className="main-application" style={{ zIndex: 9 }}>
        <RoutesApp />
      </div>
      <ToastContainer theme="light" />
    </ApiProvider>
  );
};

export default App;
