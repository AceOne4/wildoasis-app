import { Inter } from "next/font/google";
import "@/style/globals.css";
import Header from "@/components/Header";
import { ReservationProvider } from "@/components/ReservationsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxury cabins Hotel , Located in the heart of the italien Dolomite , surrounded by mountains and dark forest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col bg-primary-950 text-primary-100 min-h-screen relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
