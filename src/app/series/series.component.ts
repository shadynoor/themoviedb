import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  trendingSeries:Array<any> = []
  totalPages:Array<any> = []
  pageNumber:number = 1;
  nextPages:number = 1


  constructor(private _getData:GetDataService) {
    _getData.getSeries(this.pageNumber).subscribe((data) => {
      this.trendingSeries = data.results
      for (let i = 1; i <= data.total_pages; i++) {
        this.totalPages.push(i)
      }
    })
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
    this._getData.getSeries(this.pageNumber).subscribe((data) => {
      this.trendingSeries = data.results;
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

    this._getData.getSeries(this.pageNumber).subscribe((data) => {
      this.trendingSeries = data.results;
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

    this._getData.getSeries(this.pageNumber).subscribe((data) => {
      this.trendingSeries = data.results;
    })
   }

   search(search:any){
    let total:any = [];
    let test = true;
    this.trendingSeries = []
    for (let i = 1; i <= this.totalPages.length; i++) {
        this._getData.getSeries(i).subscribe((data) => {
          total = data.results
          for (let i = 0; i < total.length; i++) {
            let naz:string = total[i].name || total[i].title
            if (naz.toLowerCase().includes((search.target.value).toLowerCase())) {
              if (this.trendingSeries.length <10) {
                this.trendingSeries.push(total[i])
                this.trendingSeries.sort()
              }
              document.querySelector<HTMLElement>('.pagination')!.style.visibility = "hidden";
            }
          }
        })
    }
   }

  ngOnInit(): void {
  }

}
