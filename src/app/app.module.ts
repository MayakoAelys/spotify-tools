import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { LoadingPageComponent } from './pages/loading-page/loading-page.component';
import { RemoveDuplicatePageComponent } from './pages/remove-duplicate-page/remove-duplicate-page.component';
import { ImportPlaylistPageComponent } from './pages/import-playlist-page/import-playlist-page.component';
import { StSelectComponent } from './components/st-select/st-select.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { FormsModule } from '@angular/forms';
import { StPlaylistCardComponent } from './components/st-playlist-card/st-playlist-card.component';

@NgModule({
  declarations: [
    AppComponent,
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
