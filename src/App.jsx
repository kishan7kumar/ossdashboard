import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";
import "antd/dist/reset.css";

function App() {
  return (
    <>
      <div className="w-full h-full">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            exact
            path="/"
            Component={() => {
              return <Navigate to="/home" />;
            }}
          />
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
