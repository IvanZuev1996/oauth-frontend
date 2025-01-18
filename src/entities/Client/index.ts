/* Config */

/* Lib */

/* Model */

/* Types */
export type { Client, ClientWithScopeDetails } from './model/types/client';

/* UI */
export { ClientItem } from './ui/ClientItem/ClientItem';
export { ClientScopes } from './ui/ClientScopes/ClientScopes';

/* Api */
export {
  useGetClientDataQuery,
  useDeleteClientQuery,
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
} from './api/clientApi';
