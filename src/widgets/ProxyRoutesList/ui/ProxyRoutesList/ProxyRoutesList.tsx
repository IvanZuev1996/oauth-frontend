'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import {
  ProxyRoute,
  ProxyRouteCard,
  useGetProxyRoutesListQuery,
} from '@/entities/ProxyRoute';
import { CreateProxyRoutesModal } from '@/features/CreateProxyRoutesModal';
import { Button } from '@/shared/ui/Button/Button';
import { Loader } from '@/shared/ui/Loader/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';

import './ProxyRoutesList.css';

export const ProxyRoutesList = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<ProxyRoute>();

  const { data, isLoading, isFetching } = useGetProxyRoutesListQuery();

  if (isLoading || isFetching) {
    return (
      <HStack className="h-[300px] justify-center">
        <Loader />
      </HStack>
    );
  }

  return (
    <VStack>
      <Button className="px-5" onClick={() => setIsCreateModalOpen(true)}>
        Добавить маршруты <Plus size={16} />
      </Button>

      <div className="mt-5 grid w-full grid-cols-2 gap-3">
        {data?.rows.map((route) => (
          <ProxyRouteCard key={route.id} proxyRoute={route} />
        ))}
      </div>

      {!selectedRoute && (
        <>
          <CreateProxyRoutesModal
            isOpen={isCreateModalOpen}
            onOpenChange={setIsCreateModalOpen}
          />
        </>
      )}
    </VStack>
  );
};
