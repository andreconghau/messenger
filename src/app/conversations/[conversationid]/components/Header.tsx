'use client';

import Avatar from '@/app/_components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useMemo } from 'react';
import { HiChevronLeft } from 'react-icons/hi';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  console.log('otherUser', otherUser);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return 'Active';
  }, [conversation]);

  return (
    <div className="flex w-full items-center justify-between border-b-[1px] bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
          href="/conservations"
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
        </div>
      </div>
    </div>
  );
};
export default Header;
