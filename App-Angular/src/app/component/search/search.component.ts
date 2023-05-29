import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  valueInput:string = ""
  constructor(){}
  searchInput(e:any){
   this.valueInput = e.target.value
   console.log(this.valueInput);   
  }
}
