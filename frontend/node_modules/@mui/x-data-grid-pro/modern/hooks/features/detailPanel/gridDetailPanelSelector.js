import { createSelectorMemoized } from '@mui/x-data-grid/internals';
export const gridDetailPanelExpandedRowIdsSelector = state => state.detailPanel.expandedRowIds;
export const gridDetailPanelExpandedRowsContentCacheSelector = state => state.detailPanel.contentCache;
export const gridDetailPanelRawHeightCacheSelector = state => state.detailPanel.heightCache;

// TODO v6: Make this selector return the full object, including the autoHeight flag
export const gridDetailPanelExpandedRowsHeightCacheSelector = createSelectorMemoized(gridDetailPanelRawHeightCacheSelector, heightCache => Object.entries(heightCache).reduce((acc, [id, {
  height
}]) => {
  acc[id] = height || 0;
  return acc;
}, {}));