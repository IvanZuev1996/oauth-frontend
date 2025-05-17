import { FC } from 'react';

import { useDeleteScopeMutation } from '@/entities/Scope';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { getErrorToastData } from '@/shared/lib/utils/getErrorToastData';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog/ConfirmDialog';

type Props = {
  isOpen: boolean;
  scopeKey: string;
  onOpenChange: (open: boolean) => void;
};

export const DeleteScopeDialog: FC<Props> = (props) => {
  const { isOpen, scopeKey, onOpenChange } = props;
  const { toast } = useToast();
  const [deleteScope, { isLoading }] = useDeleteScopeMutation();

  const onDelete = async () => {
    const res = await deleteScope({ scopeKey });
    if (!res || res.error) {
      return toast(getErrorToastData(res.error));
    }
    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      action="delete"
      open={isOpen}
      onOpenChange={onOpenChange}
      onConfirm={onDelete}
      isLoading={isLoading}
      title="Удалить скоуп?"
      description="Вы действительно хотите удалить скоуп?"
    />
  );
};
