'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarProps {
  user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-11 md:w-11">
        <Image src={user?.image || '/images/placeholder.jpg'} alt="avatar" width={64} height={64} />
      </div>
    </div>
  );
};
export default Avatar;
