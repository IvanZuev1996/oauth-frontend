import { Ban, Ellipsis, Settings, Unplug } from 'lucide-react';
import { FC, useState } from 'react';

import { convertTTL, Scope } from '@/entities/Scope';
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
  onSeeDetails: () => void;
  onRevokeScope: () => void;
};

type Props = DataProps | HeaderProps;

export const ScopesTableRow: FC<Props> = (props) => {
  const { isHeader } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isHeader) {
    return (
      <TableRow data-header={isHeader}>
        <TableCell>Ключ</TableCell>
        <TableCell>Название</TableCell>
        <TableCell>Время жизни (мин.)</TableCell>
        <TableCell>Кол-во приложений</TableCell>
        <TableCell className="!min-w-[80px] !max-w-[100px]"></TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow className="!border-b-0" data-focused={isMenuOpen}>
      <TableCell>{props.data.key}</TableCell>
      <TableCell>{props.data.title}</TableCell>
      <TableCell>{convertTTL(props.data.ttl)}</TableCell>
      <TableCell>{200}</TableCell>

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
            className="scopes-table-dropdown__content"
          >
            <DropdownMenuLabel>Меню</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={props.onSeeDetails}>
              <Settings size={18} />
              Подробнее
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Unplug size={18} />
              Приложения
            </DropdownMenuItem>
            <DropdownMenuItem onClick={props.onRevokeScope}>
              <Ban size={18} />
              Отозвать доступ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
