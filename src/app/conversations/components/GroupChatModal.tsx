'use client';

import ButtonCustom from '@/app/_components/ButtonCustom';
import Modal from '@/app/_components/Modal';
import Input from '@/app/_components/input/Input';
import Select from '@/app/_components/input/Select';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: FC<GroupChatModalProps> = ({ isOpen, onClose, users }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/conversations', {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast('Something went wrong'))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-10">
            <h2
              className="
                text-base
                font-semibold
                leading-7
                text-gray-900
              "
            >
              Create a group chat
            </h2>
            <p>Create a chat with more than 2 people.</p>
            <div
              className="
                mt-10
                flex flex-col
                gap-y-8
              "
            >
              <Input id="name" label="Name" disabled={isLoading} required register={register} errors={errors} />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value: any) => setValue('members', value, { shouldValidate: true })}
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <ButtonCustom disabled={isLoading} onClick={onClose} type="button" secondary>
            Cancel
          </ButtonCustom>
          <ButtonCustom disabled={isLoading} type="submit">
            Create
          </ButtonCustom>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
