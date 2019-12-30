import { RoutesPath } from './../constants/RoutesPath';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingPageComponent } from './loading-page/loading-page.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: RoutesPath.Root.Path, component: LoadingPageComponent },
  { path: RoutesPath.Login.Path, component: LoginPageComponent },
  { path: RoutesPath.Index.Path, component: IndexPageComponent },
  // { path: RoutesPath.Authorize.Path, component: AuthorizePageComponent },
  // { path: RoutesPath.RemoveDuplicate.Path, component: RemoveDuplicatePageComponent },
  // { path: RoutesPath.ImportPlaylist.Path, component: ImportPlaylistPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
