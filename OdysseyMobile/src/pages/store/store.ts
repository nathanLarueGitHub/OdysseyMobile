import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Import Services
import { CheapSharkServices } from '../../services/cheapSharkServices/cheapSharkServices'

@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
  providers: [
    CheapSharkServices
  ]
})
export class StorePage {

  private searchGameName: string = '';
  private gameList : Object[];
  private isLoading : boolean = false;

  constructor(
    public navCtrl: NavController,
    public cheapSharkServices: CheapSharkServices,
  ) {}

  onInputChange(event){
    if(event.key.toLowerCase() === 'enter'){
      const gameName: string = this.searchGameName;
      this.cheapSharkServices.getExtensiveGameListByName(gameName).then( gameList => {
        this.gameList = gameList;
        this.isLoading = false;
      });
      this.isLoading = true;
    }
  }

}
