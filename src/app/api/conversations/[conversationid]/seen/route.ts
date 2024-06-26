import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

interface Iparams {
  conversationid?: string;
}
export async function POST(request: Request, { params }: { params: Iparams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationid } = params;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationid,
      },
      include: { messages: { include: { seen: true } }, users: true },
    });
    if (!conversation) {
      return new NextResponse('Not Found Conversation', { status: 404 });
    }
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: { seen: true, sender: true },
      data: {
        seen: { connect: { id: currentUser.id } },
      },
    });

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationid,
      messages: [updatedMessage],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(conversationid!, 'message:update', updatedMessage);

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.error('Error POST conversationId', error.message);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
