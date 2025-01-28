/* Config */

/* Lib */

/* Model */

/* Types */
export type {
  Client,
  ClientWithScopeDetails,
  Scopes,
} from './model/types/client';
export { ClientStatusEnum } from './model/types/client';

/* UI */
export { ClientItem } from './ui/ClientItem/ClientItem';
export { ClientScopes } from './ui/ClientScopes/ClientScopes';
export { ClientNameField } from './ui/Fields/ClientNameField/ClientNameField';
export { ClientRedirectURIField } from './ui/Fields/ClientRedirectURIField/ClientRedirectURIField';
export { ClientEmailField } from './ui/Fields/ClientEmailField/ClientEmailField';
export { ClientStatusAlert } from './ui/ClientStatusAlert/ClientStatusAlert';
export { ClientStatusBadge } from './ui/ClientStatusBadge/ClientStatusBadge';

/* Api */
export {
  useGetClientDataQuery,
  useDeleteClientMutation,
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useLazyGetClientDataQuery,
} from './api/clientApi';
