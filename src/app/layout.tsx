export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a> | <a href="/courses">Courses</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
