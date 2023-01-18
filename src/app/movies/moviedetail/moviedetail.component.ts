import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.scss']
})
export class MoviedetailComponent implements OnInit {

  id:any
  movie:any = {}
  theId:any

  constructor(public _activeRouter:ActivatedRoute , public _getData:GetDataService) {

   }

  ngOnInit(): void {
    this.id = this._activeRouter.params.subscribe((params:Params) => {
      this._getData.getMovieById(params['id']).subscribe((data)=> {
        this.movie = data
        this.movie.vote_average = (this.movie.vote_average).toFixed(1)
        this._getData.getTheTrailer(this.movie.title).subscribe((data) => {
          this.theId = data.items[0].id.videoId
          console.log(this.theId);
        })
      })
    })



  }

}
