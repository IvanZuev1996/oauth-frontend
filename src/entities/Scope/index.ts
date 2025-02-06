/* Config */

/* Lib */
export { convertScopesToArray, convertTTL } from './lib/utils/scope';

/* Model */

/* Types */
export type { Scope, ScopeShortData, ScopeListItem } from './model/types/scope';
export { ScopeStatusEnum } from './model/types/scope';

/* UI */
export { ScopesDotList } from './ui/ScopesDotList/ScopesDotList';

/* Api */
export {
  useCreateScopeMutation,
  useDeleteScopeMutation,
  useGetScopesListQuery,
  useLazyGetScopesListQuery,
  useGetScopeQuery,
  useUpdateScopeStatusMutation,
} from './api/scopeApi';
