import { Item } from './item.model';


export interface List {
    name: string,
    items: Item[],
    sum: number
}