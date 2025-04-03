import "@/styles/globals.css";
import { clsx } from "clsx";

import { fontSans } from "@/config/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "font-sans antialiased",
          fontSans.variable
        )}
      >
          <main className="">
            {children}
          </main>
      </body>
    </html>
  );
}
