import { Navbar, Sidebar } from "./components";
import Main from "./pages/main";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <Main />
      </div>
    </div>
  );
};

export default App;
