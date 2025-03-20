import Dashboard from "./dashboard/Dashboard";
import Sidebar from "./dashboard/layout/Sidebar";
import HomeLink from "./home/HomeLink";
import HeaderNavbar from "../components/header_navbar/header_navbar"; // 📌 Importa el Header

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
        <div className="flex-1 p-6">
          <Dashboard />
          <HomeLink />
        </div>
      </div>
    </div>
  );
}

export default Home;
