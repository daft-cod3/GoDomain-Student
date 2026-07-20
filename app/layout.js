import "./globals.css";

export const metadata = {
  title: "GoDomain Student",
  description: "Student learning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
