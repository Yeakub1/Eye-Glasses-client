import Dashbord from "./layout/Dashboard";
import ProtectedRoute from "./layout/ProtectedRoute";

const App = () => {
  return (
    <div>
      <ProtectedRoute>
        <Dashbord />
      </ProtectedRoute>
    </div>
  );
};

export default App;