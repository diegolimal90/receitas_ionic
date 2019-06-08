import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReceitaDTO } from '../../models/receita.dto';
import { ReceitasProvider } from '../../providers/receitas/receita';
import { HomePage } from '../home/home';
import { storage } from 'firebase';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  receita: ReceitaDTO = {
    id: "",
    nome: "",
    ingredientes: "",
    preparo: "",
    urlFoto: ""
  };
  nativePath: string;
  fileName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private receitaProvider: ReceitasProvider,
    private camera: Camera, private file: File, private filePath: FilePath, private fileChooser: FileChooser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  salvar() {
    this.receitaProvider.salvarReceitas(this.receita);
    this.navCtrl.setRoot(HomePage)
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 600,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      const pictures = storage().ref("fotos")
      pictures.putString(base64Image, 'data_url').then((r) => {
        this.receita.urlFoto = r.downloadURL
      });
    }, (err) => {
      console.log("falha de envio " + err)
    });
  }

  enviarArquivo() {
    this.fileChooser.open().then((fileUri) => {
      this.filePath.resolveNativePath(fileUri).then((result) => {
        this.nativePath = result;
        this.file.resolveLocalFilesystemUrl(this.nativePath).then((res) => {

          let dirPath = res.nativeURL;
          let dirPathSeguiment = dirPath.split('/');
          dirPathSeguiment.pop();
          dirPath = dirPathSeguiment.join('/');
          this.fileName = res.name
          this.file.readAsArrayBuffer(dirPath, this.fileName).then((buffer) => {
            let blob = new Blob([buffer], { type: "image/jpeg" });

            const pictures = storage().ref("fotos/" + name)
            pictures.put(blob).then((r) => {
              this.receita.urlFoto = r.downloadURL
            });
          })
        })
      })
    })
  }
}
