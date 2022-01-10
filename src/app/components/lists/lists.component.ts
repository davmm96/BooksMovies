import { Component, OnInit, Input } from '@angular/core';
import { List } from 'src/app/interfaces/interfacesBookAll';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @Input() lists: List[] = [];
  constructor() { }

  ngOnInit() {}

}
