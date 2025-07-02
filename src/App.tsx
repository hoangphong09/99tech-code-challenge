import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppSidebar } from "./components/ui/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { routes } from "@/navigation/routes.tsx";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <BrowserRouter>
        <main className="w-full max-w-screen overflow-x-hidden px-4 mx-auto">
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            <Route path="*" element={<Navigate to="/about" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
