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
import { MessagerContextProvider } from "../context/MessangeUserContext";

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
                <MessagerContextProvider>
                  <NextAuth>
                    <div className="container">
                      <ShowNavbar />
                      {children}
                      <ShowFooter />
                    </div>
                  </NextAuth>
                  <ToastContainer />
                </MessagerContextProvider>
              </ThemeProvider>
            </ImageContextProvider>
          </ThemeContextProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
