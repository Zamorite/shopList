import { ListService } from './../../services/list.service';
import { List } from './../../models/list.model';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage implements OnInit {

  lists: List[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private listService: ListService) {
      
  }

  ngOnInit() {
    this.lists = this.listService.getLists();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsPage');
  }

}
