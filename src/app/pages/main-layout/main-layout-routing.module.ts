import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./main-layout.component";
import { AuthGuardService } from "../../services/auth-guard/auth-guard.service";
import { MsalRedirectComponent } from "@azure/msal-angular";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        data: {
          title: "home",
          status: true,
        },
        loadChildren: () => import('../home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: "auth",
        component: MsalRedirectComponent,
      },
      {
        path: "dash",
        data: {
          title: "Dashboard",
          status: true,
        },
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../dashboard-page/dashboard-page.module").then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: "login",
        loadChildren: () =>
          import("../login-page/login-page.module").then(
            (m) => m.LoginPageModule
          ),
      },
      {
        path: "view-profile",
        data: {
          title: "Profile",
          status: true,
        },
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../view-profile-page/view-profile-page.module").then(
            (m) => m.ViewProfilePageModule
          ),
      },
      {
        path: "tracker",
        data: {
          title: "Apple Tracker",
          status: true,
        },
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../tracker-page/tracker-page.module").then(
            (m) => m.TrackerPageModule
          ),
      },
      {
        path: "ers",
        data: {
          title: "Election Reporting System (ERS)",
          status: true,
        },
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import(
            "../election-reporting-system-page/election-reporting-system-page.module"
          ).then((m) => m.ElectionReportingSystemPageModule),
      },
      {
        path: "users",
        data: {
          title: "User Management",
          status: true,
        },
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../user-management-page/user-management-page.module").then(
            (m) => m.UserManagementPageModule
          ),
      },
      {
        path: "manageERS",
        data: {
          title: "Manage ERS",
          status: true,
        },
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../manage-ers/manage-ers-page.module").then(
            (m) => m.ManageERSPageModule
          ),
      },/*
      {
        path: "manage-settings",
        data: {
          title: "Manage Settings",
          status: true,
        },
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import(
            "../manage-ers/manage-settings/manage-settings-page.module"
          ).then((m) => m.ManageSettingsPageModule),
      },
      {
        path: "manage-ridings",
        data: {
          title: "Manage Ridings",
          status: true,
        },
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import(
            "../manage-ers/manage-ridings/manage-ridings-page.module"
          ).then((m) => m.ManageRidingsPageModule),
      },*/
      {
        path: "publisher",
        data: {
          title: "Photo Publisher",
          status: true,
        },
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../publisher-page/publisher-page.module").then(
            (m) => m.PublisherPageModule
          ),
      },
      {
        path: "support",
        data: {
          title: "support",
          status: true,
        },
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("../support-page/support-page.module").then(
            (m) => m.SupportPageModule
          ),
      },
    ],
  },
  {
    path: 'home',
    data: {
      title: "home",
      status: true,
    },
    loadChildren: () => import('../home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'salon-details', loadChildren: () => import('../salon-details-page/salon-details-page.module').then(m => m.SalonDetailsPageModule) },
  { path: 'service-booking', loadChildren: () => import('../services-bookings-page/services-bookings-page.module').then(m => m.ServicesBookingsPageModule) },
  { path: 'search', loadChildren: () => import('../search-salons-page/search-salons-page.module').then(m => m.SearchSalonsPageModule) },
  { path: 'for-business', loadChildren: () => import('../for-business-page/for-business-page.module').then(m => m.ForBusinessPageModule) },
  { path: 'sales', loadChildren: () => import('../sales-page/sales-page.module').then(m => m.SalesPageModule) },
  { path: 'catlog', loadChildren: () => import('../catlog-page/catlog-page.module').then(m => m.CatlogPageModule) },
  { path: 'dashboard', loadChildren: () => import('../dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule) },
  { path: 'new-dashboard', loadChildren: () => import('../new-dashboard-page/new-dashboard-page.module').then(m => m.NewDashboardPageModule) },
  { path: 'edit', loadChildren: () => import('../edit-service-page/edit-service-page.module').then(m => m.EditServicePageModule) },
  { path: 'business-details', loadChildren: () => import('../business-details-page/business-details-page.module').then(m => m.BusinessDetailsPageModule) },
  { path: 'business-setup', loadChildren: () => import('../business-setup-page/business-setup-page.module').then(m => m.BusinessSetupPageModule) },
  { path: 'sales-appointment', loadChildren: () => import('../sales-appointment-page/sales-appointment-page.module').then(m => m.SalesAppointmentPageModule) },
  { path: 'settings', loadChildren: () => import('../settings-page/settings-page.module').then(m => m.SettingsPageModule) },
  { path: 'team-members', loadChildren: () => import('../team-members-page/team-members-page.module').then(m => m.TeamMembersPageModule) },
  { path: 'add-team', loadChildren: () => import('../addteam-members-page/addteam-members-page.module').then(m => m.AddteamMembersPageModule) },
  { path: 'payments', loadChildren: () => import('../payments-page/payments-page.module').then(m => m.PaymentsPageModule) },
  { path: 'navigation', loadChildren: () => import('../navigation-menu-page/navigation-menu-page.module').then(m => m.NavigationMenuPageModule) },
  { path: 'catalog-membership', loadChildren: () => import('../catalog-memberships-page/catalog-memberships-page.module').then(m => m.CatalogMembershipsPageModule) },
  { path: 'catalog-products', loadChildren: () => import('../catalog-products-page/catalog-products-page.module').then(m => m.CatalogProductsPageModule) },
  { path: 'scheduled-shift', loadChildren: () => import('../scheduled-shift-page/scheduled-shift-page.module').then(m => m.ScheduledShiftPageModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class MainLayoutRoutingModule {}
