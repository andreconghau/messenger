import Sidebar from '../_components/sidebar/SideBar';
import getConeversations from '../actions/getConversations';
import ConversationList from './components/ConversationList';

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConeversations();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
