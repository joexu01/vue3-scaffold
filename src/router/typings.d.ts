import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
        roles?: string[]; // Controls roles that have access to the page
        requiresAuth: boolean; // Whether login is required to access the current page (every route must declare)
        locale?: string; // The locale name show in side menu and breadcrumb
        hideChildrenInMenu?: boolean; // if set true, the children are not displayed in the side menu
    }
}
