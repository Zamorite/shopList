import { List } from './../../models/list.model';
import { UtilService } from './../../services/util.service';
import { ListService } from './../../services/list.service';
import { Item } from './../../models/item.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the NewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {

  items: Item[] = [];
  sum: number = 0;
  listName: string;

  list: List = {
    name: '',
    items: [],
    sum: 0
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private listService: ListService,
    private utilService: UtilService
  ) {

    this.newItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPage');
  }

  newItem() {

    var len = this.items.length;

    if (len < 1 || this.items[len - 1].name.trim() != '') {
        
      this.items.push(
        {
          name: '',
          cost: 0.0,
          qty: 1
        }
      );
    } else {
      this.utilService.showToast('Fill current fields first!', 3000);
    }

  }

  updateSum() {
    var tempSum = 0;

    this.items.forEach(item => {
      tempSum += (item.cost * item.qty);
    });

    this.sum = tempSum;
  }

  showPrompt()   {
    const prompt = this.alertCtrl.create({
      title: 'List Title',
      message: "Enter a name for your new list.",
      inputs: [
        {
          name: 'title',
          placeholder: 'Sunday Mall'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Save clicked');
            if (data.title != '') {
              this.list = {name: data.title, items: this.items, sum: this.sum};

              console.log(this.list);
              this.listService.addToList(this.cloneList());

              this.cleanUp();

            } else {
              this.utilService.showToast('Title cannot be empty!', 3000);
              return;
            }
          }
        }
      ]
    });
    prompt.present();
  }

  cloneList() {
    var clone: List = {
      name: '',
      items: [],
      sum: 0
    };
    for( var key in this.list ){
        if(this.list.hasOwnProperty(key)) //ensure not adding inherited props
            clone[key]=this.list[key];
    }
    return clone;
  }

  cleanUp() {
    this.items = [];
    this.newItem();

    this.list = {
      name: '',
      items: [],
      sum: 0
    };

    this.sum = 0;
    this.listName = '';
  }

  trimList() {

    for (const item of this.items) {
      if (item.name.trim() == '') {
        this.utilService.showToast('Items without names are not saved!', 3000);
        break;
      }
    }
      
    this.items = this.items.filter(
      item => {
        return item.name.trim() != '';
      }
    );

    this.updateSum();
  }

  saveList() {

    var len = this.items.length;

    if (len > 1 || (len == 1 && this.items[0].name.trim() != '')) {

      this.trimList();

      this.showPrompt();

    } else {
      this.utilService.showToast('Cannot save an empty list!', 3000);
    }
  }

}
