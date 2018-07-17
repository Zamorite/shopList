import { List } from './../models/list.model';
import { Injectable } from "@angular/core";


@Injectable()
export class ListService {
    private lists: List[] = [];

    addToList(list: List) {
        this.lists.push(list);
    }

    getLists() {
        return this.lists;
    }
}