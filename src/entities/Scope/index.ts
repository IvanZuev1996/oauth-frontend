/* Config */

/* Lib */
export { convertScopesToArray } from './lib/utils/scope';

/* Model */

/* Types */
export type { Scope, ScopeShortData } from './model/types/scope';

/* UI */
export { ScopesDotList } from './ui/ScopesDotList/ScopesDotList';

/* Api */
export {
  useCreateScopeMutation,
  useDeleteScopeMutation,
  useGetScopesListQuery,
  useLazyGetScopesListQuery,
} from './api/scopeApi';
