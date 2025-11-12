import 'leaflet/dist/leaflet.css';
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="lg:ml-[calc(3rem)] h-screen">{children}</section>;
}
