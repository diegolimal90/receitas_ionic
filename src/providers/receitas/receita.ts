import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceitaDTO } from '../../models/receita.dto';
import * as firebase from 'firebase';

/*
  Generated class for the ReceitasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReceitasProvider {
  PATH = "receitas";
  db: any;

  constructor(public http: HttpClient) {
    // Initialise access to the firestore service
    this.db = firebase.firestore();
  }

  getReceitas(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.collection(this.PATH)
        .get()
        .then((querySnapshot) => {
          let array: any = [];
          
          if (querySnapshot) {
            querySnapshot
              .forEach((doc: any) => {
                array.push({
                  id: doc.id,
                  nome: doc.data().nome,
                  ingredientes: doc.data().ingredientes,
                  preparo: doc.data().preparo,
                  urlFoto: doc.data().urlFoto
                })

              });
            resolve(array)
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getReceita(receita: ReceitaDTO): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.collection(this.PATH)
        .doc(receita.id)
        .get()
        .then((querySnapshot) => {
          let array: any = [];
          
          if (querySnapshot) {
            querySnapshot
              .forEach((doc: any) => {
                array.push({
                  id: doc.id,
                  nome: doc.data().nome,
                  ingredientes: doc.data().ingredientes,
                  preparo: doc.data().preparo,
                  urlFoto: doc.data().urlFoto
                })

              });
            resolve(array)
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  salvarReceitas(receita: ReceitaDTO) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection(this.PATH).add({
        nome: receita.nome,
        ingredientes: receita.ingredientes,
        preparo: receita.preparo,
        urlFoto: receita.urlFoto
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    });
  }

  atualizarReceitas(receita: ReceitaDTO) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection(this.PATH).doc(receita.id).set({
        nome: receita.nome,
        ingredientes: receita.ingredientes,
        preparo: receita.preparo,
        urlFoto: receita.urlFoto
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    });
  }

  excluirReceita(receita: ReceitaDTO) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection(this.PATH).doc(receita.id).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        )
    });
  }
}
