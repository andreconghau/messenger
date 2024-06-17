'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface MobileItemProps {
  label: string;
  href: string;
  active?: boolean;
  icon: any;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({ label, href, icon: Icon, active, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
        hiver:bg-gray-100
        group
        flex
        w-full
        justify-center
        gap-x-3
        p-4
        text-sm
        font-semibold
        leading-6
        text-gray-500
        hover:text-black
      `,
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
