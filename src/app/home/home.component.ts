import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  trendingAll:any = []
  totalPages:any = []
  pageNumber:number = 1;
  nextPages:number = 1



  constructor(private _getData:GetDataService) {
   }

   start(s: number){
    if (s == this.pageNumber) {
      let arr = document.querySelectorAll(".page-link")
      for (let i = 0; i < arr.length; i++) {
        if (+arr[i].innerHTML == this.pageNumber) {
          arr[i].classList.add("active")
        }else{
          arr[i].classList.remove("active")
        }
      }
    }
   }

   next(i:any){
    this.pageNumber = i;
    this._getData.getAll(this.pageNumber).subscribe((data) => {
      this.trendingAll = data.results;
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

    this._getData.getAll(this.pageNumber).subscribe((data) => {
      this.trendingAll = data.results;
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
    this._getData.getAll(this.pageNumber).subscribe((data) => {
      this.trendingAll = data.results;
    })
   }

   search(search:any){
    let x:any = [];
    let test = true;
    this.trendingAll = []
    for (let i = 1; i <= this.totalPages.length; i++) {
      if (test) {
        this._getData.getAll(i).subscribe((data) => {
          x = data.results
          console.log(x);
          for (let i = 0; i < x.length; i++) {
            let naz:string = (x[i].name) || x[i].title
            console.log(naz.toLowerCase());
            if (naz.toLowerCase().includes((search.target.value).toLowerCase())) {
              this.trendingAll.push(x[i])
              this.trendingAll.sort()
              document.querySelector<HTMLElement>('.paginate')!.style.visibility = "hidden";
              test = false
            }
          }
        })
      }else{
        break;
      }

    }
   }

  ngOnInit(): void {
    this._getData.getAll(this.pageNumber).subscribe((data) => {
      for (let i = 1; i < data.total_pages+1; i++) {
        this.totalPages.push(i)
      }
      this.trendingAll = data.results;
    })
  }
}
