import Dashboard from "../../backup_views/Dashboard";
import Sidebar from "./layout/Sidebar";
import HomeLink from "../../components/home/HomeLink";
import HeaderNavbar from "../../components/header_navbar/header_navbar"; // 📌 Importa el Header
import RoleRouter from "./dashboard_components/RoleRouter";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile", href: "/profile" },
];

const isAuthenticated = true;
const userName = "John Doe";
const isPremium = false;

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 📌 Cambia `isFixed` a `false` para que empuje el contenido */}
      <HeaderNavbar
        navItems={navItems}
        isAuthenticated={isAuthenticated}
        userName={userName}
        isPremium={isPremium}
        handleLogout={() => console.log("Logout")}
        isFixed={false} // 🔹 Cambia esto según la necesidad
      />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-x-hidden">
          {/* <Dashboard /> */}
          <RoleRouter />  
          </main>
      </div>
    </div>
  );
}

export default Home;
