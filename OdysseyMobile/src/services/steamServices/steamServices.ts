import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

//import { Observable } from 'rxjs/Rx';

@Injectable()
export class steamServices {

  constructor(private http: Http){}

  //Uses 64bit Steam ID to perform SteamAPI calls.
  //Returns object list with user-id's game library list: each entry has an appid and playtime_forever.
  getSteamUserLibraryById(steamID: string) : any {
    let gameListResponse: Object;
    let gameList: Object[];
    let gameListObj: {};

    let gameListPromise: Promise<any> =
      this.getSteamGamesOwnedById(steamID).then(gameListObj => {
        gameListObj = gameListObj;
        gameList = gameListObj.response.games;
        //console.log(gameListObj.response.games);
      });
    return gameList;
  }

  //Uses 64bit Steam ID to perform SteamAPI calls.
  //Returns a Promise containing the steam API call's response.
  getSteamGamesOwnedById(steamID: string): Promise<any>{
    let steamAPIKey = '';
    if(steamID){
      const url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/"
          + "v0001/?key=" + steamAPIKey + "&steamid=" + steamID + "&format=json";
      return this.http.get(url).toPromise()
        .then( response => {
          return JSON.parse(response['_body']);
        }).catch(error => {
          console.log("(steam ID " + steamID + "): " + error.message);
          return Promise.reject;
        })
    }else{
      return Promise.resolve();
    }
  }
}
