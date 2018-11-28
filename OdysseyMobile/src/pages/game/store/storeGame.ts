import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Import Services
import { CheapSharkServices } from '../../../services/cheapSharkServices/cheapSharkServices';
import { SteamServices } from '../../../services/steamServices/steamServices';

@Component({
  selector: 'store-game',
  templateUrl: 'storeGame.html',
  providers: [
    CheapSharkServices,
    SteamServices
  ]
})

export class  StoreGame {

  private isLoading : boolean = true;
  private gameObject : any = {};
  private steamInformation : any = {};
  private dealsList : Object[] = [];
  private storeList : Object[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cheapSharkServices : CheapSharkServices,
    public steamServices : SteamServices
  ) {
    this.gameObject = this.navParams.get('gameObject');

    let dealListPromise : Promise<any> = this.cheapSharkServices.getGameInformationById(this.gameObject.gameID).then( gameInformation => {
      gameInformation['deals'].forEach( deal => {
        this.dealsList.push(deal);
      });
    });

    let storeListPromise : Promise<any> = this.cheapSharkServices.getStoresInformation().then( storeList => {
      this.storeList = storeList;
    });

    Promise.all([dealListPromise, storeListPromise]).then( () => {
      this.dealsList.forEach(deal => {
        this.storeList.forEach(store => {
          if(deal['storeID'] === store['storeID']){
            deal['storeBanner'] = store['images']['banner'];
          }
        });
      });
    });
  }
}
