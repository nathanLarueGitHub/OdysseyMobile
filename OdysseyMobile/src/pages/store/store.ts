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

  constructor(
    public navCtrl: NavController,
    public cheapSharkServices: CheapSharkServices,
  ) {
  }

  ngOnInit(){

    // This is how you fetch a list of games with all the different values:
    let testGameName = 'Borderlands';
    this.cheapSharkServices.getExtensiveGameListByName(testGameName).then( gameList => {

      // Work with the game list in here once it's returned
      console.log(gameList);
    });


  }

}
