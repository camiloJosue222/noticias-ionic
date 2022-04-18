import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../pages/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias : Article[] = [] ;

  constructor(private storage : Storage,
              public toastCtrl : ToastController) {
    this.storage.create();
    this.cargarFavoritos();
   }

  async presenToast( message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }
  
  guardarNoticia( noticia:Article )
  {
    const existe = this.noticias.find( noti => noti.title === noticia.title);
            if ( !existe ){
      this.noticias.unshift( noticia );
      this.storage.set( 'favoritos', this.noticias);
    }
      this.presenToast( 'Agregado a Favoritos' );

  } 

  async cargarFavoritos(){
    
    const favoritos = await this.storage.get('favoritos');
   if ( favoritos ){
    this.noticias = favoritos;
   }
    
}

  borrarNoticia(noticia : Article){  
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this.storage.set( 'favoritos', this.noticias);
    this.presenToast( 'Se ha eliminado la noticia' );
}



}
