import authOptions from '@/app/libs/configs/authOptions';
import { getServerSession } from 'next-auth';

export default async function getSession() {
  return await getServerSession(authOptions);
}
