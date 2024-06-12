'use client';

import { FullConversationType } from '@/types';

interface ConversationBoxProps {
  data: FullConversationType;
  selected: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
  return <div>conservation box</div>;
};
export default ConversationBox;
