import MenuBar from "./components/LP";
import { ApiProvider } from "./context/ApiContext";
import RoutesApp from "./routes";

const App = () => {
  return (
    <ApiProvider>
      <MenuBar />
      <div className="main-application">
        <RoutesApp />
      </div>
    </ApiProvider>
  );
};

export default App;
