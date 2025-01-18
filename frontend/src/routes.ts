import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  GENERATE: 'generate',
  SEARCH: 'search',
  LISTFRIEND: 'listFriend',
  INFOPROJECT: 'infoproject',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.GENERATE, `/${DEFAULT_VIEW_PANELS.GENERATE}`, []),
      createPanel(DEFAULT_VIEW_PANELS.LISTFRIEND, `/${DEFAULT_VIEW_PANELS.LISTFRIEND}`, []),
      createPanel(DEFAULT_VIEW_PANELS.INFOPROJECT, `/${DEFAULT_VIEW_PANELS.INFOPROJECT}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
