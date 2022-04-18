import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonSegmentButton } from '@ionic/angular';
import { Article } from '../interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  //@ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business','entertainment','general','health','science','sports','technology'];
  noticias : Article [] = [];
  
  constructor( private noticiasService : NoticiasService){

  }

  ngOnInit(){
    //this.segment.value = this.categorias[0];
    this.cargarNoticiass( this.categorias[0]);
       
 }

 cambioCategoria( event ){
  this.noticias = [];
  console.log(event.detail.value);
  this.cargarNoticiass(event.detail.value);
}

cargarNoticiass( categoria : string, event? ){

    this.noticiasService.getTopHeadlinesCategorias( categoria)
  .subscribe( resp => {
  console.log(resp);
  this.noticias.push( ...resp.articles );

  if (event){
    event.target.complete();
  }
  });
}

loadData( event ){
this.cargarNoticiass(this.categorias[0], event);
}

}
