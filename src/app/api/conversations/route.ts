import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;
    if (!currentUser?.email || !currentUser?.id) {
      return new NextResponse('You must be logged in to create a conversation.', { status: 401 });
    }

    if (isGroup && (!members || members.legnth < 2 || !name)) {
      return new NextResponse('You must provide a name and at least two members for a group conversation.', {
        status: 400,
      });
    }
    // Create a conversation with the current user and the selected user.
    if (isGroup) {
      const conversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [...members.map((member: { value: string }) => ({ id: member.value })), { id: currentUser.id }],
          },
        },
        include: {
          users: true,
        },
      });
      return new NextResponse(JSON.stringify(conversation), { status: 201 });
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [{ userIds: { equals: [currentUser.id, userId] } }, { userIds: { equals: [userId, currentUser.id] } }],
      },
    });

    // If a conversation already exists between the two users, return it.
    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation, { status: 200 });
    }

    // Otherwise, create a new conversation.
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(newConversation, { status: 200 });
  } catch (error: any) {
    return new NextResponse('An error occurred while fetching the current user.', { status: 500 });
  }
}
