import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/@sjmc11/tourguidejs/dist/css/tour.min.css"></link>


      </head>
      <body
        className="h-screen w-screen flex justify-center dark:bg-[#1f2222] bg-[#f4f5f5]"
      >
        {children}
        <script defer src="https://unpkg.com/@sjmc11/tourguidejs/dist/tour.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
      </body>
    </html>
  );
}
