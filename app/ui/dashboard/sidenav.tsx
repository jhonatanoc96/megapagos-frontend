import Link from 'next/link';
import NavLinks from '@ui/dashboard/nav-links';
import Logo from '@ui/acme-logo';
import { Logout } from '../logout-button';

export default function SideNav() {
  const { ROL } = process.env as any;

  return (
    <div className="flex h-full flex-col px-3 md:px-2 padding">
      <div
        className="div_sidenav mb-2 flex h-20 items-end justify-start primary_bg primary_color md:h-40"
      >
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </div>
      <div className="div_logout flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks rol={ROL} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div>
          <Logout />
        </div>
      </div>
    </div>
  );
}