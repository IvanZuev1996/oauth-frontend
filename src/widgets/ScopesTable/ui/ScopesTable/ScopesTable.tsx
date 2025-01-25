'use client';

import { useState } from 'react';

import { Scope, useGetScopesListQuery } from '@/entities/Scope';
import { RevokeScopeModal } from '@/features/RevokeScopeModal';
import { ScopeSheet } from '@/features/ScopeSheet';
import {
  EmptyTableRow,
  Table,
  TableRowSkeleton,
} from '@/shared/ui/Table/Table';

import { ScopesTableRow } from '../ScopesTableRow/ScopesTableRow';

import './ScopesTable.css';

export const ScopesTable = () => {
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [scopeSheetOpen, setScopeSheetOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState<Scope>();

  const { data, isLoading, isFetching } = useGetScopesListQuery({
    query: undefined,
  });

  const onOpenExtraContent = (scope: Scope, action: 'revoke' | 'details') => {
    if (action === 'details') setScopeSheetOpen(true);
    if (action === 'revoke') setRevokeModalOpen(true);
    setSelectedScope(scope);
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
        onSeeDetails={() => onOpenExtraContent(scope, 'details')}
        onRevokeScope={() => onOpenExtraContent(scope, 'revoke')}
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
            scopeData={selectedScope}
          />
          <RevokeScopeModal
            isOpen={revokeModalOpen}
            setIsOpen={setRevokeModalOpen}
            scopeKey={selectedScope.key}
          />
        </>
      )}
    </>
  );
};
