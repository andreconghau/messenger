'use client';

import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPhoto } from 'react-icons/hi2';

const FormChat = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setValue('message', '', { shouldValidate: true });
    axios.post(`/api/messages`, {
      ...data,
      conversationId,
    });
  };

  return (
    <div className="w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-4">
      <HiPhoto size={30} className="text-sky-500" />
      <form
        className="flex w-full items-center gap-2 lg:gap-4"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      ></form>
    </div>
  );
};
export default FormChat;
