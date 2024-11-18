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
import { SearchContextProvider } from "../context/SearchContext";

export const metadata = {
  title: "Student Support",
  description:
    "Student Support is a Godly foundation raised to help or assist student at all time. It is seasoned through appropriate support systems. The Emerging of the support foundation is Emboided in creating assistance to student through the platform to help in their academic journey",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
                  <SearchContextProvider>
                    <NextAuth>
                      <div className="container">
                        <ShowNavbar />
                        {children}
                        <ShowFooter />
                      </div>
                    </NextAuth>
                    <ToastContainer />
                  </SearchContextProvider>
                </MessagerContextProvider>
              </ThemeProvider>
            </ImageContextProvider>
          </ThemeContextProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
