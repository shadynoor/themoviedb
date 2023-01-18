import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  trendingMovies:any = []
  totalPages:Array<any> = []
  pageNumber:number = 1;
  nextPages:number = 1
  x: number = 1;


  constructor(private _getData:GetDataService , private transfer:TransferService) {


    _getData.getMovies(this.pageNumber).subscribe((data) => {
      for (let i = 1; i <= data.total_pages; i++) {
        this.totalPages.push(i)
      }
    })

    this.getMoviesFromService(this.pageNumber)
   }

   getMoviesFromService(page:number){
    this._getData.getMovies(page).subscribe((data) => {
      this.trendingMovies = data.results
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
    this.getMoviesFromService(this.pageNumber)
    this.start(this.pageNumber)
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

    this.getMoviesFromService(this.pageNumber)
    this.start(this.pageNumber)

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
    this.getMoviesFromService(this.pageNumber)
    this.start(this.pageNumber)
   }

   search(search:any){
    let total:any = [];
    let test = true;
    this.trendingMovies = []
    for (let i = 1; i <= this.totalPages.length; i++) {
        this._getData.getMovies(i).subscribe((data) => {
          total = data.results
          for (let i = 0; i < total.length; i++) {
            let naz:string = (total[i].name) || total[i].title
            if (naz.toLowerCase().includes((search.target.value).toLowerCase())) {
              if (this.trendingMovies.length <10) {
                this.trendingMovies.push(total[i])
                this.trendingMovies.sort()
              }
              document.querySelector<HTMLElement>('.paginate')!.style.visibility = "hidden";
            }
          }
        })
    }
   }

  ngOnInit(): void {
  }

}
