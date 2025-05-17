import {
  ArrowRightLeft,
  CalendarCheck,
  CalendarRange,
  Clock,
  ListCheck,
  ListX,
  LucideIcon,
  MapPinCheckInside,
  MapPinXInside,
} from 'lucide-react';

import { ClientScopesOptions } from '../model/types/client';

export const scopesOptionsConfig: Record<
  keyof ClientScopesOptions,
  {
    name: string;
    description: string;
    icon: LucideIcon;
  }
> = {
  workingDaysOnly: {
    icon: CalendarCheck,
    name: 'Только рабочие дни',
    description:
      'Приложение сможет получать доступ к сервису только в рабочие дни',
  },
  timeOfDay: {
    icon: Clock,
    name: 'Определенное время дня',
    description:
      'Приложение сможет получать доступ к сервису только в указанное время дня',
  },
  dayOfWeek: {
    icon: CalendarRange,
    name: 'Определенные дни недели',
    description:
      'Приложение сможет получать доступ к сервису только в указанные дни недели',
  },
  requestsPerMinute: {
    icon: ArrowRightLeft,
    name: 'Кол-во запросов в минуту',
    description:
      'На приложение будет наложено ограничение по количеству запросов в минуту',
  },
  // dependentScopes: {
  //   icon: Clock,
  //   name: 'Дополнительные права',
  //   description:
  //     'Приложение сможет получать доступ к сервису только в том случае если будет обладать указанными правами',
  // },
  ipWhitelist: {
    icon: ListCheck,
    name: 'Белый список IP',
    description:
      'Только пользователи с указанными IP смогут получать доступ к сервису',
  },
  ipBlacklist: {
    icon: ListX,
    name: 'Черный список IP',
    description:
      'Пользователи с указанными IP не смогут получать доступ к сервису',
  },
  geoWhitelist: {
    icon: MapPinCheckInside,
    name: 'Белый список геолокаций',
    description:
      'Пользователи только с указанными странами смогут получать доступ к сервису',
  },
  geoBlacklist: {
    icon: MapPinXInside,
    name: 'Черный список геолокаций',
    description:
      'Пользователи с указанными странами не смогут получать доступ к сервису',
  },
};
