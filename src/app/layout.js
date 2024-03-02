import { ToastContainer } from "react-toastify";
import { ThemeContextProvider } from "../context/ThemeContext";
import AuthenticationProvider from "../providers/AuthenticationProvider";
import ThemeProvider from "../providers/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import NextAuth from "../utils/NextAuth";
import ShowFooter from "../utils/Footer";
import { ImageContextProvider } from "../context/ImageContext";
import ShowNavbar from "../utils/Navbar";

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
            <ImageContextProvider>
              <ThemeProvider>
                <NextAuth>
                  <div className="container">
                    <ShowNavbar />
                    {children}
                    <ShowFooter />
                  </div>
                </NextAuth>
                <ToastContainer />
              </ThemeProvider>
            </ImageContextProvider>
          </ThemeContextProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
