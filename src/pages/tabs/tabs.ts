import { Component } from '@angular/core';

import { ListsPage } from './../lists/lists';
import { NewPage } from './../new/new';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewPage;
  tab2Root = ListsPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
