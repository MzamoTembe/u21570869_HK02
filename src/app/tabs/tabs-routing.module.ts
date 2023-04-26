import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'restaurants',
        loadChildren: () => import('../restaurants/restaurants.module').then(m => m.RestaurantsPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/restaurants',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/restaurants',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
