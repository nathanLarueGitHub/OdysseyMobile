import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SteamServices } from '../../services/steamServices/steamServices';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  private steamUserId = '76561198057436359';

  constructor(
    public navCtrl: NavController,
    public steamServices: SteamServices,
  ) {
    this.steamServices = steamServices;
  }

  onSteamIdConfirmed(){
    this.steamServices.updateGameOwned(this.steamUserId);
  }

  onSteamInputChange(event){
    if(event.key.toLowerCase() === 'enter'){
      this.onSteamIdConfirmed();
    }
  }
}
