import { useRoutes } from "react-router-dom";
import { routes } from "../../routes/routes";
import ErrorBoundary from "../../components/ErrorBoundary";

const App = () => {
  const content = useRoutes(routes);
  return (
    <div>
      <ErrorBoundary>{content}</ErrorBoundary>
    </div>
  );
};
export default App;
