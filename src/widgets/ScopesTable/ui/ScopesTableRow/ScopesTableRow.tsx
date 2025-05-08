import {
  Ban,
  Check,
  Ellipsis,
  Pencil,
  Settings,
  Trash2,
  Undo2,
} from 'lucide-react';
import { FC, useState } from 'react';

import { convertTTL, Scope, ScopeStatusEnum } from '@/entities/Scope';
import { cn } from '@/shared/lib/utils/cn';
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

import './ScopesTableRow.css';

type HeaderProps = {
  isHeader: true;
};
type DataProps = {
  isHeader: false;
  data: Scope;
  onEdit: () => void;
  onSeeDetails: () => void;
  onDelete: () => void;
  onRevokeScope: () => void;
};

type Props = DataProps | HeaderProps;

export const ScopesTableRow: FC<Props> = (props) => {
  const { isHeader } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isHeader) {
    return (
      <TableRow data-header={isHeader}>
        <TableCell className="!w-[50px] !flex-none"></TableCell>
        <TableCell>Ключ</TableCell>
        <TableCell>Название</TableCell>
        <TableCell>Время жизни (мин.)</TableCell>
        <TableCell>Обязательное подтверждение</TableCell>
        <TableCell className="!min-w-[80px] !max-w-[100px]"></TableCell>
      </TableRow>
    );
  }

  const isRevoked = props.data.status === ScopeStatusEnum.REVOKED;

  return (
    <TableRow
      className="!border-b-0"
      data-focused={isMenuOpen}
      data-error={isRevoked}
    >
      <TableCell className="!w-[50px] !flex-none">
        {isRevoked ? (
          <Ban size={18} className="text-red-600" />
        ) : (
          <Check size={18} className="text-green-600" />
        )}
      </TableCell>
      <TableCell>{props.data.key}</TableCell>
      <TableCell>{props.data.title}</TableCell>
      <TableCell>{convertTTL(props.data.ttl)}</TableCell>
      <TableCell>{props.data.requiresApproval ? 'Да' : 'Нет'}</TableCell>

      <TableCell className="!min-w-[80px] !max-w-[100px]">
        <DropdownMenu
          open={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          modal={false}
        >
          <DropdownMenuTrigger asChild>
            <HStack className="justify-end pr-5 [&>button]:min-w-[40px]">
              <Button
                size="icon"
                variant="secondary"
                className={cn(isRevoked && 'shadow-md')}
              >
                <Ellipsis size={18} />
              </Button>
            </HStack>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            alignOffset={20}
            className="scopes-table-dropdown__content"
          >
            <DropdownMenuLabel>Меню</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={props.onEdit}>
              <Pencil size={18} />
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem onClick={props.onSeeDetails}>
              <Settings size={18} />
              Подробнее
            </DropdownMenuItem>

            <DropdownMenuItem onClick={props.onRevokeScope}>
              {isRevoked ? <Undo2 size={18} /> : <Ban size={18} />}
              {isRevoked ? 'Вернуть доступ' : 'Отозвать доступ'}
            </DropdownMenuItem>

            <DropdownMenuItem
              className="scopes-table-scope__delete"
              onClick={props.onDelete}
            >
              <Trash2 size={18} />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
