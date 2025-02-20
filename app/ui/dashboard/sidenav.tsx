import Link from 'next/link';
import NavLinks from '@ui/dashboard/nav-links';
import AcmeLogo from '@ui/acme-logo';
import { Logout } from '../logout-button';

export default function SideNav() {
  const { ROL } = process.env as any;

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks rol={ROL} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div>
          <Logout />
        </div>
      </div>
    </div>
  );
}