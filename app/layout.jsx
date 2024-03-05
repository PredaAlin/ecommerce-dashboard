import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import Nav from "@/components/Nav";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce Dashboard",
  description: "Admin Dashboard for eShop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body> <Provider>
        <Layout>
          {children}
        </Layout>
      </Provider>
      </body>
    </html>
  );
}
