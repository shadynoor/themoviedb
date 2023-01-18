import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-seriesdetails',
  templateUrl: './seriesdetails.component.html',
  styleUrls: ['./seriesdetails.component.scss']
})
export class SeriesdetailsComponent implements OnInit {

  id:any
  series:any = {}
  theId:any


  constructor(public _activeRouter:ActivatedRoute , public _getData:GetDataService) {}

  ngOnInit(): void {
    this.id = this._activeRouter.params.subscribe((params:Params) => {
      this._getData.getSeriesById(params['id']).subscribe((data)=> {
        this.series = data

        this.series.vote_average = (this.series.vote_average).toFixed(1)
        this._getData.getTheTrailer(this.series.name).subscribe((data) => {
          this.theId = data.items[0].id.videoId
        })
      })
    })
  }



}
