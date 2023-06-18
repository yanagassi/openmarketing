import MenuBar from "./components/LP";
import RoutesApp from "./routes";

const App = () => {
  return (
    <>
      <MenuBar />
      <div className="main-application">
        <RoutesApp />
      </div>
    </>
  );
};

export default App;
