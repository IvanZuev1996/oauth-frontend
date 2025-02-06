import { Ban, LaptopMinimal, Pencil, Trash2, Undo2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { ClientWithScopeDetails } from '@/entities/Client';
import { useUserRole } from '@/entities/User';
import { BanClientDialog } from '@/features/BanClientDialog';
import { DeleteClientDialog } from '@/features/DeleteClientDialog';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { getRouteEditClient } from '@/shared/const/router';
import { backendUrl } from '@/shared/const/system';
import { formatDate } from '@/shared/lib/utils/formatDate';
import { Button, buttonVariants } from '@/shared/ui/Button/Button';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

type Props = {
  data?: ClientWithScopeDetails;
};

export const ClientPageHeader: FC<Props> = ({ data }) => {
  const router = useRouter();
  const userRole = useUserRole();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);

  const onDeleteSuccess = () => {
    router.replace(routeConfig.main);
  };

  if (!data) {
    return (
      <VStack className="mb-5 gap-1">
        <Skeleton className="h-[32px] w-[240px]" />
      </VStack>
    );
  }

  return (
    <HStack className="mb-5 flex-wrap gap-5">
      <HStack className="gap-5" max={false}>
        <Image
          src={`${backendUrl}${data.img}`}
          alt="Логотип приложения"
          width={86}
          height={86}
          className="rounded-md object-cover"
        />

        <VStack className="gap-1 overflow-hidden">
          <HStack className="overflow-hidden [&>svg]:min-w-[18px]">
            <h1>{data.name}</h1>
            <LaptopMinimal size={18} className="mt-[10px]" />
          </HStack>
          <Text variant="secondary">Создано: {formatDate(data.createdAt)}</Text>
        </VStack>
      </HStack>

      {userRole === 'user' ? (
        <>
          <HStack className="ml-auto" max={false}>
            <Link
              href={getRouteEditClient(data.clientId)}
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
            >
              <Pencil size={18} />
            </Link>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash2 size={18} />
            </Button>
          </HStack>

          <DeleteClientDialog
            isOpen={isDeleteModalOpen}
            setIsOpen={setIsDeleteModalOpen}
            clientDetails={{ name: data.name, clientId: data.clientId }}
            onDeleteSuccess={onDeleteSuccess}
          />
        </>
      ) : (
        <>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setIsBanModalOpen(true)}
            className="ml-auto"
          >
            {data.isBanned ? <Undo2 size={18} /> : <Ban size={18} />}
            {data.isBanned ? 'Разблокировать' : 'Заблокировать'}
          </Button>

          <BanClientDialog
            isOpen={isBanModalOpen}
            setIsOpen={setIsBanModalOpen}
            clientDetails={{
              name: data.name,
              clientId: data.clientId,
              isBanned: data.isBanned,
            }}
            onBanSuccess={() => {}}
          />
        </>
      )}
    </HStack>
  );
};
