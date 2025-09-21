import { Paper, rem, Title } from "@mantine/core";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full viewport height
        padding: rem(20),
        backgroundColor: "#f5f5f5", // optional light background
      }}
    >
      {children}
    </div>
  );
}
