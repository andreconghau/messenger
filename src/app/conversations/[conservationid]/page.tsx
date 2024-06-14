import EmptyState from '@/app/_components/EmptyState';

import Header from './components/Header';
import getConversationById from '@/app/actions/getConversationById';

interface ConversationIdProps {
  conversationid: string;
}
const conversationId = async ({ params }: { params: ConversationIdProps }) => {
  const conversation = await getConversationById(params.conversationid);
  console.log('conver', conversation);
  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col">
        <Header conversation={conversation} />
      </div>
    </div>
  );
};
export default conversationId;
