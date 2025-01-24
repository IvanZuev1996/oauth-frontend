/* Config */

/* Lib */

/* Model */

/* Types */
export type {
  Client,
  ClientWithScopeDetails,
  Scopes,
} from './model/types/client';

/* UI */
export { ClientItem } from './ui/ClientItem/ClientItem';
export { ClientScopes } from './ui/ClientScopes/ClientScopes';
export { ClientNameField } from './ui/Fields/ClientNameField/ClientNameField';
export { ClientRedirectURIField } from './ui/Fields/ClientRedirectURIField/ClientRedirectURIField';
export { ClientEmailField } from './ui/Fields/ClientEmailField/ClientEmailField';

/* Api */
export {
  useGetClientDataQuery,
  useDeleteClientMutation,
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useLazyGetClientDataQuery,
} from './api/clientApi';
