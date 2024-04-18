import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-full bg-white p-5">
      <Outlet />
    </div>
  );
};

export default Home;
