import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

const getConeversations = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) return [];
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessage: 'desc',
      },
      where: {
        usersIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });
    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConeversations;
