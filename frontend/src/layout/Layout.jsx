import Navbar from "@/global/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 min-h-screen">
      <div>
        <Navbar />
      </div>
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
