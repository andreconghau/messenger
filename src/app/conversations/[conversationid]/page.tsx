import EmptyState from '@/app/_components/EmptyState';

import Header from './components/Header';
import getConversationById from '@/app/actions/getConversationById';
import Body from './components/Body';
import FormChat from './components/FormChat';
import getMessages from '@/app/actions/getMessages';

interface Iparams {
  conversationid: string;
}
const conversationId = async ({ params }: { params: Iparams }) => {
  const conversation = await getConversationById(params.conversationid);
  const messages = await getMessages(params.conversationid);

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
        <Body initialMessages={messages} />
        <FormChat />
      </div>
    </div>
  );
};
export default conversationId;
