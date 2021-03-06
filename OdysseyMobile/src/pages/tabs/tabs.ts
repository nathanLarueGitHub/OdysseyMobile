import { Component } from '@angular/core';

import { LibraryPage } from '../library/library';
import { AccountPage } from '../account/account';
import { StorePage } from '../store/store';

@Component({
  selector: 'tabs-component',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StorePage;
  tab2Root = LibraryPage;
  tab3Root = AccountPage;

  constructor() {

  }
}
