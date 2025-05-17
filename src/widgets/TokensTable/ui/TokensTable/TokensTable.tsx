'use client';

import { useState } from 'react';

import { ClientToken, useGetClientTokensQuery } from '@/entities/Token';
import { RevokeTokenModal } from '@/features/RevokeTokenModal';
import { TokensSheet } from '@/features/TokenSheet';
import {
  EmptyTableRow,
  Table,
  TableRowSkeleton,
} from '@/shared/ui/Table/Table';

import { TokensTableRow } from '../TokensTableRow/TokensTableRow';

import './TokensTable.css';

export const TokensTable = () => {
  const [isTokenSheetOpen, setIsTokenSheetOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<ClientToken>();

  const { data, isLoading, isFetching } = useGetClientTokensQuery();

  const onOpenExtraContent = (token: ClientToken) => {
    setSelectedToken(token);
    setIsTokenSheetOpen(true);
  };

  const onRevokeToken = (token: ClientToken) => {
    setSelectedToken(token);
    setIsRevokeModalOpen(true);
  };

  const renderRows = () => {
    if (isLoading || isFetching) {
      return Array.from({ length: 10 }, (_, i) => i).map((i) => (
        <TableRowSkeleton key={i} />
      ));
    }

    if (!data || data.rows.length === 0) {
      return <EmptyTableRow text="Токены не найдены" />;
    }

    return data.rows.map((token, idx) => (
      <TokensTableRow
        isHeader={false}
        data={token}
        onSeeDetails={() => onOpenExtraContent(token)}
        onRevokeToken={() => onRevokeToken(token)}
        key={idx}
      />
    ));
  };

  return (
    <>
      <Table header={<TokensTableRow isHeader={true} />}>{renderRows()}</Table>
      {selectedToken && (
        <>
          <TokensSheet
            isOpen={isTokenSheetOpen}
            setIsOpen={setIsTokenSheetOpen}
            tokenData={selectedToken}
          />
          <RevokeTokenModal
            isOpen={isRevokeModalOpen}
            setIsOpen={setIsRevokeModalOpen}
            clientId={selectedToken.clientId}
            tokenId={selectedToken.tokenId}
          />
        </>
      )}
    </>
  );
};
