'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import {
  Scope,
  ScopeStatusEnum,
  useGetScopesListQuery,
} from '@/entities/Scope';
import { ChangeScopeStatusModal } from '@/features/ChangeScopeStatusModal';
import { DeleteScopeDialog } from '@/features/DeleteScopeDialog';
import { EditableScopeModal } from '@/features/EditableScopeModal';
import { ScopeSheet } from '@/features/ScopeSheet';
import { timeout } from '@/shared/lib/utils/timeout';
import { Button } from '@/shared/ui/Button/Button';
import { VStack } from '@/shared/ui/Stack';
import {
  EmptyTableRow,
  Table,
  TableRowSkeleton,
} from '@/shared/ui/Table/Table';

import { ScopesTableRow } from '../ScopesTableRow/ScopesTableRow';

import './ScopesTable.css';

export const ScopesTable = () => {
  const [scopeDeleteModalOpen, setScopeDeleteModalOpen] = useState(false);
  const [scopeEditModalOpen, setScopeEditModalOpen] = useState(false);
  const [changeStatusModalOpen, setChangeStatusModalOpen] = useState(false);
  const [scopeSheetOpen, setScopeSheetOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState<Scope>();

  const { data, isLoading, isFetching } = useGetScopesListQuery({
    query: undefined,
  });

  const onOpenExtraContent = (
    scope: Scope,
    action: 'revoke' | 'details' | 'edit' | 'delete',
  ) => {
    if (action === 'details') setScopeSheetOpen(true);
    if (action === 'revoke') setChangeStatusModalOpen(true);
    if (action === 'edit') setScopeEditModalOpen(true);
    if (action === 'delete') setScopeDeleteModalOpen(true);
    setSelectedScope(scope);
  };

  const getNewScopeStatus = () => {
    if (selectedScope?.status === ScopeStatusEnum.ACTIVE) {
      return ScopeStatusEnum.REVOKED;
    }
    return ScopeStatusEnum.ACTIVE;
  };

  const onCloseEditModal = async () => {
    setScopeEditModalOpen(false);
    await timeout(100);
    setSelectedScope(undefined);
  };

  const renderRows = () => {
    if (isLoading || isFetching) {
      return Array.from({ length: 10 }, (_, i) => i).map((i) => (
        <TableRowSkeleton key={i} />
      ));
    }

    if (!data) {
      return <EmptyTableRow text="Права доступа не найдены" />;
    }

    return data.rows.map((scope, idx) => (
      <ScopesTableRow
        isHeader={false}
        data={scope}
        onEdit={() => onOpenExtraContent(scope, 'edit')}
        onDelete={() => onOpenExtraContent(scope, 'delete')}
        onSeeDetails={() => onOpenExtraContent(scope, 'details')}
        onRevokeScope={() => onOpenExtraContent(scope, 'revoke')}
        key={idx}
      />
    ));
  };

  return (
    <VStack>
      <Button className="mb-5 px-5" onClick={() => setScopeEditModalOpen(true)}>
        Добавить scope <Plus size={16} />
      </Button>

      <Table header={<ScopesTableRow isHeader={true} />}>{renderRows()}</Table>

      {selectedScope && (
        <>
          <ScopeSheet
            isOpen={scopeSheetOpen}
            setIsOpen={setScopeSheetOpen}
            scopeKey={selectedScope.key}
          />
          <ChangeScopeStatusModal
            newStatus={getNewScopeStatus()}
            isOpen={changeStatusModalOpen}
            setIsOpen={setChangeStatusModalOpen}
            scopeKey={selectedScope.key}
          />
        </>
      )}

      <EditableScopeModal
        isOpen={scopeEditModalOpen}
        scopeData={selectedScope}
        onOpenChange={onCloseEditModal}
      />

      {selectedScope?.key && (
        <DeleteScopeDialog
          isOpen={scopeDeleteModalOpen}
          onOpenChange={setScopeDeleteModalOpen}
          scopeKey={selectedScope?.key}
        />
      )}
    </VStack>
  );
};
