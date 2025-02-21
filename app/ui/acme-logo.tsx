import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center justify-center leading-none text-white h-full`}
    >
      <p className="text-[44px]">MP</p>
    </div>
  );
}
