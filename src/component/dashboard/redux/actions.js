export const MINI_SIDEBAR = "[SIDEBAR] CHANGE_TO_MINI_SIDEBAR";
export function switchToMiniSidebar(status) {
  return { type: MINI_SIDEBAR, payload: status };
}
