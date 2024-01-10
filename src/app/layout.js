import { ToastContainer } from "react-toastify";
import Navbar from "../components/navbar/Navbar";
import { ThemeContextProvider } from "../context/ThemeContext";
import AuthenticationProvider from "../providers/AuthenticationProvider";
import ThemeProvider from "../providers/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import NextAuth from "../utils/NextAuth";
import ShowFooter from "../utils/Footer";

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
              <NextAuth>
                <div className="container">
                  <Navbar />
                  {children}
                  <ShowFooter />
                </div>
              </NextAuth>
              <ToastContainer />
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
