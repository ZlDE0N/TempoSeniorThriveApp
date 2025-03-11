import Dashboard from "./dashboard/Dashboard";
import MainLayout from "./layout/MainLayout";
import HomeLink from "./home/HomeLink";

function Home() {
  return (
    <MainLayout>
      <Dashboard />
      <HomeLink />
    </MainLayout>
  );
}

export default Home;
