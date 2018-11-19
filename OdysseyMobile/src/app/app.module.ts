import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LibraryPage } from '../pages/library/library';
import { AccountPage } from '../pages/account/account';
import { StorePage } from '../pages/store/store';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// InAppBrowser for redirecting user to a platform's login service while in-app
import { InAppBrowser } from '@ionic-native/in-app-browser';

// Import Injectables
import { CheapSharkServices } from '../services/cheapSharkServices/cheapSharkServices';
import { steamServices } from '../services/steamServices/steamServices';

// Angular Services
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';

// Import modules
import { StoreGame } from '../pages/game/store/storeGame';

@NgModule({
  declarations: [
    MyApp,
    LibraryPage,
    AccountPage,
    StorePage,
    StoreGame,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    LibraryPage,
    AccountPage,
    StorePage,
    StoreGame,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CheapSharkServices,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    steamServices
  ]
})
export class AppModule {}
