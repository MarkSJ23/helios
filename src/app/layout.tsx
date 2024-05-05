import "~/styles/globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Navbar from "~/components/navbar";
import SignUpPage from "~/components/signuppage";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`min-w-screen flex min-h-screen flex-col font-sans ${inter.variable}`}
        >
          <Navbar />
          <SignedIn>{children}</SignedIn>
          <SignedOut>
            <SignUpPage />
          </SignedOut>
          <footer className="grow-0 bg-black p-24 text-4xl text-white">
            <div> Helios: Elevate Your</div>
            <div>Fitness Journey</div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
