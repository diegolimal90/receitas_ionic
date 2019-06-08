import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReceitasProvider } from '../../providers/receitas/receita'
import { FormPage } from '../form/form';
import { ViewPage } from '../view/view';
import { Storage } from '@ionic/Storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  receitas: any;

  constructor(public navCtrl: NavController, private provider: ReceitasProvider, private storage: Storage) {
    
  }

  ionViewDidLoad() {
    this.receitas = this.provider.getReceitas();
  }

  ionViewDidEnter(){  
  }

  novaReceita(){
    this.navCtrl.push(FormPage)
  }

  verReceita(receita){
    this.navCtrl.push(ViewPage, {receita: receita});
  }
  resetLocalStorage(){
    this.storage.remove("usuario");
    this.navCtrl.setRoot(LoginPage);
  }
 
}
