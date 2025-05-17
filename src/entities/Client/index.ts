/* Config */
export { scopesOptionsConfig } from './config/clientScopesConfig';

/* Lib */

/* Model */

/* Types */
export type {
  Client,
  ClientWithScopeDetails,
  Scopes,
  ClientScopesOptions,
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
export { ClientScopeLimit } from './ui/ClientScopeLimit/ClientScopeLimit';

/* Api */
export {
  useGetClientDataQuery,
  useDeleteClientMutation,
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useLazyGetClientDataQuery,
  useUpdateClientStatusMutation,
  useBanClientMutation,
} from './api/clientApi';
