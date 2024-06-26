import EmptyState from '@/app/_components/EmptyState';
import Header from './components/Header';
import getConversationById from '@/app/actions/getConversationById';
import Body from './components/Body';
import FormChat from './components/FormChat';
import getMessages from '@/app/actions/getMessages';
import getSession from '@/app/actions/getSession';

export async function generateMetadata({ params }: { params: Iparams }) {
  const conversation = await getConversationById(params.conversationid);
  if (!conversation) {
    return { title: 'Conversation not found' };
  }
  const session = await getSession();
  if (!session) {
    return { title: 'Anonymous' };
  }
  if (conversation.isGroup) {
    return { title: conversation.name || 'Group: No name' };
  }
  const currentUserEmail = session?.user?.email;

  const otherUser = conversation.users.filter((user) => {
    return user.email !== currentUserEmail;
  });

  const otherUserName = otherUser[0].name ?? 'Anonymous';

  return { title: otherUserName || 'Anonymous' };
}

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
