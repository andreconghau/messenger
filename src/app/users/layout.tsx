import Sidebar from '../_components/sidebar/SideBar';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
