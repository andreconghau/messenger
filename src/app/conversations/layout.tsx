import Sidebar from '../_components/sidebar/SideBar';
import getConeversations from '../actions/getConversations';
import getUsers from '../actions/getUsers';
import ConversationList from './components/ConversationList';

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConeversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
