import LayoutWrapper from "./components/layout/layoutWrapper";

const App = () => {
  return (
    <div>
      <LayoutWrapper pageTitle="Dashboard">
        <h1>Welcome to the Dashboard</h1>
        <p>This is a sample dashboard layout.</p>
      </LayoutWrapper>
    </div>
  );
};

export default App;
