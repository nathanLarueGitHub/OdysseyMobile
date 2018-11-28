import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';

// Import Services
import { CheapSharkServices } from '../../services/cheapSharkServices/cheapSharkServices'
import { SteamServices } from '../../services/steamServices/steamServices';

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
  private ownedGameList : Object[] = [];
  private gameList : Object[];
  private storeList : Object[];
  private isLoading : boolean = false;

  constructor(
    public navCtrl: NavController,
    public cheapSharkServices: CheapSharkServices,
    public steamServices: SteamServices,
    public modalCtrl: ModalController,
    public events: Events,
  ) {
    events.subscribe('tab:clicked', (root) => {
      this.updateGameOwned();
    });
  }

  ngOnInit(){
    this.isLoading = true;
    this.updateGameOwned();
    this.cheapSharkServices.getStoresInformation().then( storeList => {
      this.storeList = storeList;
      this.isLoading = false;
    });
  }

  updateGameOwned(){
    this.ownedGameList = this.steamServices.getSteamGamesOwned();
  }

  onInputChange(event){
    if(event.key.toLowerCase() === 'enter'){
      const gameName: string = this.searchGameName;
      this.cheapSharkServices.getExtensiveGameListByName(gameName).then( gameList => {
        let gameListDealsPromises : Object[] = [];
        gameList.forEach( game => {
          game['storesList'] = [];
          let gamePromise = this.cheapSharkServices.getGameInformationById(game.gameID).then( gameInformation => {
            this.storeList.forEach( store => {
              let storeFound = false;
              gameInformation['deals'].forEach( deal => {
                  if(deal['storeID'] === store['storeID'] && !storeFound){
                    game['storesList'].push(store);
                    storeFound = true;
                  }
              });
            });
          });
          gameListDealsPromises.push(gamePromise);
        });

        Promise.all(gameListDealsPromises).then(response => {
          gameList.forEach( game => {
            game['isInLibrary'] = false;
            this.ownedGameList.forEach( gameOwned => {
              if(gameOwned['appid'] == game['steamAppID']){
                game['isInLibrary'] = true;
              }
            });
          });
          this.gameList = gameList;
          this.isLoading = false;
        });
      });
      this.isLoading = true;
    }
  }

  onClickGameCard(gameObject : any){
    let profileModal = this.modalCtrl.create(StoreGame, { gameObject : gameObject }, { cssClass : 'full-screen-modal' });
    profileModal.present();
  }

}
