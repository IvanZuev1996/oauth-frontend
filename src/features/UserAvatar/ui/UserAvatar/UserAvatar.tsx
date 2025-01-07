import { BadgePlus, LayoutDashboard, X } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { MdLogout } from 'react-icons/md';

import { User } from '@/entities/User';
import { routeConfig } from '@/shared/config/router/routeConfig';
import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button } from '@/shared/ui/Button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/ui/DropdownMenu/DropdownMenu';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import './UserAvatar.css';

type DefaultAvatarProps = PropsWithClassName & {
  userData?: User;
  onLogout: () => void;
};

export const UserAvatar: FC<DefaultAvatarProps> = (props) => {
  const { onLogout, className } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userData: User = {
    id: 1,
    name: 'Зуев Иван',
    login: 'login',
    telegram: 'grubinsky1604',
    email: 'ivan-zuev-97@mail.ru',
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 1,
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <Avatar login={userData?.login} isLoading={Boolean(!userData)} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn('min-w-[280px]', className)}
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>
          <VStack className="mb-3 items-center justify-center pt-4">
            <Avatar login={userData?.login} />
            <VStack className="items-center justify-center gap-0">
              <Text as="span" weight="medium" className="text-center text-lg">
                {userData.name}
              </Text>
              <HStack className="justify-center gap-1">
                <Text className="text-foreground/50" weight="normal">
                  @{userData.telegram}
                </Text>
                <Text as="span" className="text-foreground/50" weight="normal">
                  ·
                </Text>
                <Text as="span" className="text-foreground/50" weight="normal">
                  {userData?.login}
                </Text>
              </HStack>
            </VStack>
          </VStack>

          <Button
            variant="ghost"
            className="absolute right-3 top-3 aspect-square rounded-full p-1"
            size="icon_lg"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </Button>
        </DropdownMenuLabel>

        <DropdownMenuItem className="user-avatar__item-link">
          <Link href={routeConfig.main} onClick={() => setIsOpen(false)}>
            <LayoutDashboard size={18} /> Мои приложения
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="user-avatar__item-link">
          <Link href={routeConfig.newClient} onClick={() => setIsOpen(false)}>
            <BadgePlus size={18} /> Создать приложение
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={onLogout} className="user-avatar__item">
          <MdLogout size={18} /> Выход
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
