import "./globals.css";

export const metadata = {
  title: "My Students Dashboard",
  description: "Student activity and progress dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
