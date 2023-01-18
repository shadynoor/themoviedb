import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id:any
  actor:any = {}
  theId:any

  constructor(public _activeRouter:ActivatedRoute , public _getData:GetDataService) { }

  ngOnInit(): void {

    this.id = this._activeRouter.params.subscribe((params:Params) => {
      this._getData.getActorById(params['id']).subscribe((data)=> {
        this.actor = data
        console.log(this.actor.also_known_as);

        // this.actor.vote_average = (this.actor.vote_average).toFixed(1)
      })
    })
  }

}
