import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


import { LoginProvider } from '../../providers/login/login';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { UserDTO, User } from '../../models/user.dto';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/Storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  messageEmail = ""
  messagePassword = "";
  errorEmail = false;
  errorPassword = false;
  user: UserDTO;
  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }
  usrLogado: UserDTO[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private provider: LoginProvider, private storage: Storage) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
    });
  }

  ionViewDidLoad() {
    this.getUsuario().then((user) => {
      console.log(user);
      this.usrLogado = user;

      if (this.usrLogado.length > 0) {
        console.log(this.usrLogado[0]);
        this.navCtrl.setRoot(HomePage);
      }
    })
  }

  getUsuario() {
    let user1: UserDTO[] = [];

    return this.storage.forEach((value: UserDTO) => {
      let usr = new User();
      usr.id = value.id;
      usr.nome = value.nome;
      usr.email = value.email;
      user1.push(usr);
    })
      .then(() => {
        return Promise.resolve(user1);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  login() {
    if (this.creds.email !== "" && this.creds.senha !== "") {
      this.provider.getLogin(this.creds).then((data) => {
        this.user = data
        this.storage.set("usuario", this.user);
        this.navCtrl.setRoot(HomePage);
      }).catch((error) => {
        console.log(error)
      });
    }
  }


}