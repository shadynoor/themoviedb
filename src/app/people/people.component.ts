import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  trendingActors:Array<any> = []
  totalPages:Array<any> = []
  pageNumber:number = 1;
  nextPages:number = 1


  constructor(private _getData:GetDataService) {
    _getData.getActors(this.pageNumber).subscribe((data) => {
      this.trendingActors = data.results
      for (let i = 1; i <= data.total_pages; i++) {
        this.totalPages.push(i)
      }
    })
   }

   next(i:any){
    this.pageNumber = i;
    this._getData.getActors(this.pageNumber).subscribe((data) => {
      this.trendingActors = data.results;
    })
   }

   nextPagination(){
    this.nextPages++
    if (this.nextPages > 100) {
      this.nextPages = 1
    }
    this.pageNumber= this.pageNumber + 10
    if (this.pageNumber > 1000) {
      this.pageNumber = 1
    }
    console.log(this.pageNumber);

    this._getData.getActors(this.pageNumber).subscribe((data) => {
      this.trendingActors = data.results;
    })
   }

   prevPagination(){
    this.nextPages--
    if (this.nextPages == 0) {
      this.nextPages+= 100
    }
    this.pageNumber = this.pageNumber - 10
    if (this.pageNumber <= 0) {
      this.pageNumber = 1000
    }
    console.log(this.pageNumber);

    this._getData.getActors(this.pageNumber).subscribe((data) => {
      this.trendingActors = data.results;
    })
   }

   getId(id:any){
    this._getData.getActorById(id).subscribe(data => {
      console.log(data);
    })

   }

  ngOnInit(): void {
  }

}
