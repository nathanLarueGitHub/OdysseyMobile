import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

// Import Services
import { CheapSharkServices } from '../../services/cheapSharkServices/cheapSharkServices'

// Store game modal
import { StoreGame } from '../../pages/game/store/storeGame';

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
    public modalCtrl: ModalController,
  ) {}

  onInputChange(event){
    if(event.key.toLowerCase() === 'enter'){
      const gameName: string = this.searchGameName;
      this.cheapSharkServices.getExtensiveGameListByName(gameName).then( gameList => {
        this.gameList = gameList;
        this.isLoading = false;
        console.log(this.gameList);
      });
      this.isLoading = true;
    }
  }

  onClickGameCard(gameObject : any){
    console.log(gameObject);
    let profileModal = this.modalCtrl.create(StoreGame, { gameObject : gameObject }, { cssClass : 'full-screen-modal' });
    profileModal.present();
  }

}
