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

        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Rick and Morty</title>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        />


      </head>
      <body
        className="h-screen w-screen flex justify-center dark:bg-[#1f2222] bg-[#f4f5f5] "
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        {children}
        <script defer src="https://unpkg.com/@sjmc11/tourguidejs/dist/tour.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
      </body>
    </html>
  );
}
