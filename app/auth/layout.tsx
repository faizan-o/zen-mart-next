export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full justify-center items-center from-sky-400 to-blue-800">
      {children}
    </div>
  );
}
