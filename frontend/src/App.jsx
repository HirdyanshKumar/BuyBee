import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-6">
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
