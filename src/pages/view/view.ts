import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReceitaDTO } from '../../models/receita.dto';
import { EditPage } from '../edit/edit';
import { ReceitasProvider } from '../../providers/receitas/receita';
import { HomePage } from '../home/home';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  receita: ReceitaDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private provider: ReceitasProvider) {
    this.receita = navParams.get("receita");
  }

  ionViewDidLoad() {
  }

  editar(){
    this.navCtrl.push(EditPage, {receita: this.receita})
  }

  excluir(){
    this.provider.excluirReceita(this.receita)
    this.navCtrl.setRoot(HomePage)
  }
}
