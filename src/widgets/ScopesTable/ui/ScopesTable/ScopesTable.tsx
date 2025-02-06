'use client';

import { useState } from 'react';

import { ScopeStatusEnum, useGetScopesListQuery } from '@/entities/Scope';
import { ChangeScopeStatusModal } from '@/features/ChangeScopeStatusModal';
import { ScopeSheet } from '@/features/ScopeSheet';
import {
  EmptyTableRow,
  Table,
  TableRowSkeleton,
} from '@/shared/ui/Table/Table';

import { ScopesTableRow } from '../ScopesTableRow/ScopesTableRow';

import './ScopesTable.css';

export const ScopesTable = () => {
  const [changeStatusModalOpen, setChangeStatusModalOpen] = useState(false);
  const [scopeSheetOpen, setScopeSheetOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState<{
    key: string;
    status: ScopeStatusEnum;
  }>();

  const { data, isLoading, isFetching } = useGetScopesListQuery({
    query: undefined,
  });

  const onOpenExtraContent = (
    key: string,
    status: ScopeStatusEnum,
    action: 'revoke' | 'details',
  ) => {
    if (action === 'details') setScopeSheetOpen(true);
    if (action === 'revoke') setChangeStatusModalOpen(true);
    setSelectedScope({ key, status });
  };

  const getNewScopeStatus = () => {
    if (selectedScope?.status === ScopeStatusEnum.ACTIVE) {
      return ScopeStatusEnum.REVOKED;
    }
    return ScopeStatusEnum.ACTIVE;
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
        onSeeDetails={() =>
          onOpenExtraContent(scope.key, scope.status, 'details')
        }
        onRevokeScope={() =>
          onOpenExtraContent(scope.key, scope.status, 'revoke')
        }
        key={idx}
      />
    ));
  };

  return (
    <>
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
    </>
  );
};
