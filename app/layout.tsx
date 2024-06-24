import "./globals.css";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen Cache",
  description: "Stock Smart, Eat Well",
  icons: {
    icon: "/pantry.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Sacramento&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="flex justify-around items-center py-6 bg-customBlue text-white">
          <Link
            href="/wiki"
            className="font-comfortaa-light hover:scale-110 trasition-transform active:font-bold"
          >
            HOW TO USE
          </Link>
          <Link
            href="/pantry"
            className="font-comfortaa-light hover:scale-110 trasition-transform active:font-bold"
          >
            PANTRY
          </Link>
          <Link
            href="/recipes"
            className="font-comfortaa-light hover:scale-110 trasition-transform active:font-bold"
          >
            RECIPES
          </Link>
          <Link
            href="/saved"
            className="font-comfortaa-light hover:scale-110 trasition-transform active:font-bold"
          >
            SAVED IDEAS
          </Link>
          <Link
            href="/groceries"
            className="font-comfortaa-light hover:scale-110 trasition-transform active:font-bold"
          >
            GROCERIES
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
