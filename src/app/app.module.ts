import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { RemoveDuplicatePageComponent } from './remove-duplicate-page/remove-duplicate-page.component';
import { ImportPlaylistPageComponent } from './import-playlist-page/import-playlist-page.component';
import { StSelectComponent } from './st-select/st-select.component';
import { TestPageComponent } from './test-page/test-page.component';
import { FormsModule } from '@angular/forms';
import { StPlaylistCardComponent } from './st-playlist-card/st-playlist-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    NavbarComponent,
    FooterComponent,
    IndexPageComponent,
    MenuCardComponent,
    LoadingPageComponent,
    RemoveDuplicatePageComponent,
    ImportPlaylistPageComponent,
    StSelectComponent,
    TestPageComponent,
    StPlaylistCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
