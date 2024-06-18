'use client';

import { FullMessageType } from '@/types';

interface BodyProps {
  initialMessages: FullMessageType[] | [];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  console.log('initialMessages', initialMessages);
  return <div className="flex-1 overflow-y-auto">body</div>;
};

export default Body;
