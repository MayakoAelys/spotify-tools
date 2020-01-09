import { TestPageComponent } from './test-page/test-page.component';
import { RoutesPath } from './../constants/RoutesPath';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingPageComponent } from './loading-page/loading-page.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RemoveDuplicatePageComponent } from './remove-duplicate-page/remove-duplicate-page.component';
import { ImportPlaylistPageComponent } from './import-playlist-page/import-playlist-page.component';

const routes: Routes = [
  { path: RoutesPath.Root.Path, component: LoadingPageComponent },
  { path: RoutesPath.Login.Path, component: LoginPageComponent },
  { path: RoutesPath.Index.Path, component: IndexPageComponent },
  { path: RoutesPath.RemoveDuplicate.Path, component: RemoveDuplicatePageComponent },
  { path: RoutesPath.ImportPlaylist.Path, component: ImportPlaylistPageComponent },
  { path: RoutesPath.Test.Path, component: TestPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
