import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CheapSharkServices {

  public allContacts: any

  constructor(
    private http: Http
  ) {}

  getExtensiveGameListByName(name: string) : any {

    let gameList: Object[];
    let GameListPromise : Promise<any> = this.getGameListByName(name).then(gamelist => {
      gameList = gamelist;
    });

    return GameListPromise.then(() => {
      if(gameList){

        let dealPromises = [];

        gameList.forEach( game => {
          const dealPromise : Promise<any> = this.getDealInformationById(game['cheapestDealID']).then( response => {
            game['retailPrice'] = response.gameInfo.retailPrice;
            game['salePrice'] = response.gameInfo.salePrice;
            game['storeID'] = response.gameInfo.storeID;

            if(game['thumb'] === 'http://www.cheapshark.com/img/default_box_art.png'){
              game['thumb'] = 'https://www.cal-sailing.org/components/com_easyblog/themes/wireframe/images/placeholder-image.png';
            }

            return game;
          });

          dealPromises.push(dealPromise);
        });

        return Promise.all(dealPromises);

      }else{
        return [];
      }
    })
  }

  getGameListByName(name: string): Promise<any> {
    if(name !== ''){
      const url = "http://www.cheapshark.com/api/1.0/games?title=" + name.toString();
      return this.http.get(url).toPromise()
        .then( response => {
          return JSON.parse(response['_body']);
        }).catch(error => {
          console.log('An error occured while fetching the game(s) (' + name + ') from CheapShark: \n' + error);
          return Promise.reject;
        });;
    }else{
      return Promise.resolve();
    }
  }

  getDealInformationById(id: string): Promise<any> {
    if(id !== ''){
      const url = "http://www.cheapshark.com/api/1.0/deals?id=" + id.toString();
      return this.http.get(url).toPromise()
        .then( response => {
          return JSON.parse(response['_body']);
        }).catch(error => {
          console.log('An error occured while fetching the a deal (' + id + ') from CheapShark: \n' + error);
          return Promise.reject;
        });
    }else{
      return Promise.resolve();
    }
  }

  getGameInformationById(id: string): Promise<any> {
    if(id !== ''){
      const url = "http://www.cheapshark.com/api/1.0/games?id=" + id;
      return this.http.get(url).toPromise()
        .then( response => {
          return JSON.parse(response['_body']);
        }).catch(error => {
          console.log('An error occured while fetching the a deal (' + id + ') from CheapShark: \n' + error);
          return Promise.reject;
        });
    }else{
      return Promise.resolve();
    }
  }

  getGameDealsList(external: string): Promise<any> {
    if(external !== ''){
      const url = "http://www.cheapshark.com/api/1.0/deals?title=" + external + "&exact=true";
      return this.http.get(url).toPromise()
        .then( response => {
          return JSON.parse(response['_body']);
        }).catch(error => {
          console.log('An error occured while fetching the a deals for ' + external + ' from CheapShark: \n' + error);
          return Promise.reject;
        });
    }else{
      return Promise.resolve();
    }
  }

  getStoresInformation(): Promise<any> {
    const url = "http://www.cheapshark.com/api/1.0/stores";
    return this.http.get(url).toPromise()
      .then( response => {
        return JSON.parse(response['_body']);
      }).catch(error => {
        console.log('An error occured while fetching the game(s) (' + name + ') from CheapShark: \n' + error);
        return Promise.reject;
      });
  }
}
