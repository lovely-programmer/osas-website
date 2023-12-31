import { ToastContainer } from "react-toastify";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { ThemeContextProvider } from "../context/ThemeContext";
import AuthenticationProvider from "../providers/AuthenticationProvider";
import ThemeProvider from "../providers/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";

export const metadata = {
  title: "Student Support",
  description: "This is My App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AuthenticationProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <Navbar />
                {children}
                <Footer />
              </div>
              <ToastContainer />
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
