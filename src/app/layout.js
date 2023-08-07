import "./globals.css";
import { Roboto, Raleway } from "next/font/google";
import Footer from "@/components/Footer/footer";
import ProviderAuth from "@/contexts/AuthProvider";
import SidebarProvider from "@/contexts/SideBarProvider";
import CartProvider from "@/contexts/CartProvider";

const raleway = Raleway({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <ProviderAuth>
          <CartProvider>
            <SidebarProvider>
              <div className="flex flex-col justify-center">
                <div>{children}</div>
                <Footer />
              </div>
            </SidebarProvider>
          </CartProvider>
        </ProviderAuth>
      </body>
    </html>
  );
}
