import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// We MUST import both the firebase AND firestore modules like so
import * as firebase from 'firebase';
import 'firebase/firestore';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { UserDTO } from '../../models/user.dto';

@Injectable()
export class LoginProvider {
   private PATH = '/usuario';
   private db: any;

   constructor(public http: HttpClient) {
      // Initialise access to the firestore service
      this.db = firebase.firestore();
   }

   getLogin(creds: CredenciaisDTO): Promise<UserDTO> {
      return new Promise((resolve, reject) => {
         this.db.collection(this.PATH)
            .where("email", "==", creds.email)
            .where("senha", "==", creds.senha)
            .get()
            .then((querySnapshot) => {
               // Declare an array which we'll use to store retrieved documents
               let obj: UserDTO = {
                  id: "",
                  email: "",
                  nome: ""
               };
               // Resolve the completed array that contains all of the formatted data
               // from the retrieved documents
               if (querySnapshot) {
                  querySnapshot
                     .forEach((doc: any) => {
                        obj.id = doc.id;
                        obj.email = doc.data().email;
                        obj.nome = doc.data().nome;
                     });
                  if (obj.email == creds.email) {
                     resolve(obj)
                     // this.storage.set("usuario", obj);
                  }
               }
            })
            .catch((error: any) => {
               reject(error);
            });
      });
   }
}
