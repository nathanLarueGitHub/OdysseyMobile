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

// Import Injectables
import { CheapSharkServices } from '../services/cheapSharkServices/cheapSharkServices'

// Angular Services
import { HttpModule } from "@angular/http";

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
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
