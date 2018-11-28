import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { SteamServices } from '../../services/steamServices/steamServices';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html'
})
export class LibraryPage {

  public gameList : Object[] = [];

  constructor(
    public navCtrl: NavController,
    public steamServices: SteamServices,
    public events: Events
  ) {
    this.steamServices = steamServices;
    events.subscribe('tab:clicked', (root) => {
      this.updatedLibrary();
    });
  }

  updatedLibrary(){
    this.gameList = this.steamServices.getSteamGamesOwned();
  }
}
