import { Ban, Check, Ellipsis, Settings } from 'lucide-react';
import { FC, useState } from 'react';

import { ClientToken } from '@/entities/Token';
import { formatDate } from '@/shared/lib/utils/formatDate';
import { Button } from '@/shared/ui/Button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/DropdownMenu/DropdownMenu';
import { HStack } from '@/shared/ui/Stack';
import { TableCell, TableRow } from '@/shared/ui/Table/Table';

import './TokensTableRow.css';

type HeaderProps = {
  isHeader: true;
};
type DataProps = {
  isHeader: false;
  data: ClientToken;
  onSeeDetails: () => void;
  onRevokeToken: () => void;
};

type Props = DataProps | HeaderProps;

export const TokensTableRow: FC<Props> = (props) => {
  const { isHeader } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isHeader) {
    return (
      <TableRow data-header={isHeader}>
        <TableCell className="!w-[50px] !flex-none"></TableCell>
        <TableCell>ID токена</TableCell>
        <TableCell>Приложение</TableCell>
        <TableCell>Юзер</TableCell>
        <TableCell>Истекает</TableCell>
        <TableCell className="!min-w-[80px] !max-w-[100px]"></TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow
      className="!border-b-0"
      data-focused={isMenuOpen}
      data-error={props.data.isRevoked}
      title={props.data.isRevoked ? 'Токен отозван' : 'Токен активен'}
    >
      <TableCell className="!w-[50px] !flex-none">
        {props.data.isRevoked ? (
          <Ban size={18} className="text-red-600" />
        ) : (
          <Check size={18} className="text-green-600" />
        )}
      </TableCell>
      <TableCell>{props.data.tokenId}</TableCell>
      <TableCell>{props.data.client?.name || '-'}</TableCell>
      <TableCell>{props.data.user?.name || '-'}</TableCell>
      <TableCell>{formatDate(props.data.expiresAt)}</TableCell>

      <TableCell className="!min-w-[80px] !max-w-[100px]">
        <DropdownMenu
          open={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          modal={false}
        >
          <DropdownMenuTrigger asChild>
            <HStack className="justify-end pr-5 [&>button]:min-w-[40px]">
              <Button size="icon" variant="secondary">
                <Ellipsis size={18} />
              </Button>
            </HStack>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            alignOffset={20}
            className="tokens-table-dropdown__content"
          >
            <DropdownMenuLabel>Меню</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={props.onSeeDetails}>
              <Settings size={18} />
              Подробнее
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={props.onRevokeToken}
              disabled={props.data.isRevoked}
            >
              <Ban size={18} />
              Отозвать
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
