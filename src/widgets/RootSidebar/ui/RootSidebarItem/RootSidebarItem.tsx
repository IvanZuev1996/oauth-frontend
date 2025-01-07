import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/shared/ui/Sidebar/Sidebar';

import { RootSidebarItemType } from '../../model/types/rootSidebar';

type Props = {
  item: RootSidebarItemType;
  active?: boolean;
};

export const RootSidebarItem: FC<Props> = ({ item, active }) => {
  return (
    <div key={item.title}>
      {item.withSeparator && <SidebarSeparator className="my-2" />}

      <SidebarMenuItem>
        <SidebarMenuButton
          variant="primary"
          size="lg"
          className={cn(active && 'text-primary ring-1 ring-primary/40')}
          tooltip={{
            children: <p className="text-sm">{item.title}</p>,
          }}
          asChild
        >
          <Link href={item.url}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>

        {active && (
          <SidebarMenuBadge>
            <ChevronRight size={18} className="text-primary" />
          </SidebarMenuBadge>
        )}
      </SidebarMenuItem>
    </div>
  );
};
