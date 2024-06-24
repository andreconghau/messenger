import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
// import { pusherServer } from '@/app/libs/pusher';
interface IParams {
  conversationid?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {
    const { conversationid } = params;
    const currentUser = await getCurrentUser();
    console.log(conversationid, 'conversationid');
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationid,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationid,
        usersIds: { hasSome: [currentUser.id] },
      },
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        // pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log(error, 'ERROR_CONVERSATION_DELETE');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
