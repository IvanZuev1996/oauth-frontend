/* Config */

/* Lib */

/* Model */

/* Types */
export type { Client, ClientWithScopeDetails } from './model/types/client';

/* UI */
export { ClientItem } from './ui/ClientItem/ClientItem';
export { ClientScopes } from './ui/ClientScopes/ClientScopes';
export { ClientNameField } from './ui/ClientNameField/ClientNameField';
export { ClientRedirectURIField } from './ui/ClientRedirectURIField/ClientRedirectURIField';
export { ClientEmailField } from './ui/ClientEmailField/ClientEmailField';

/* Api */
export {
  useGetClientDataQuery,
  useDeleteClientQuery,
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useLazyGetClientDataQuery,
} from './api/clientApi';
