import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationid) {
      return '';
    }
    return params?.conversationid as string;
  }, [params?.conversationid]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);
  return useMemo(() => ({ conversationId, isOpen }), [conversationId, isOpen]);
};

export default useConversation;
