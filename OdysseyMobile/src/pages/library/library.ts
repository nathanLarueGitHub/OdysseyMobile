import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { steamServices } from '../../services/steamServices/steamServices';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html'
})
export class LibraryPage {

  constructor(
    public navCtrl: NavController//){}
    ,public steamServices: steamServices) {}

}
