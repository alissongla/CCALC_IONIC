import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public textoIntroducao = "Bem vindo ao aplicativo. Para começar aperte a tela e depois diga abrir calculadora";
  public comandoAbrir = "";
  constructor(public tts: TextToSpeech, private speechRecognition: SpeechRecognition, public rota: Router, public platform: Platform){

  }
  //Função para realizar a leitura do texto inicial
  ngOnInit() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {

        if (!hasPermission) {
        this.speechRecognition.requestPermission()
          .then(
            () => console.log('Granted'),
            () => console.log('Denied')
          )
        }

    });
    this.tts.speak({
      text: this.textoIntroducao,
      locale: "pt-BR",
      rate: 1.0
    });

  }
  //Função para reconhecer a tela que irá abrir
  abrirTela(){
    this.speechRecognition.startListening({
      language : "pt-BR",
      matches : 1
    })
      .subscribe((_matches)=>{
      if(_matches && _matches.length > 0){
        this.comandoAbrir = _matches[0];
        if(_matches[0] == "Abrir calculadora" || _matches[0] == "abrir calculadora"){
          this.rota.navigateByUrl('/calculadora');
        }
      }
    },(_e)=>{
        this.comandoAbrir = "Abrir calculadora";
        if(this.comandoAbrir == "Abrir calculadora" || this.comandoAbrir == "abrir calculadora"){
          this.rota.navigateByUrl('/calculadora');
        }
    });
    //this.speechRecognition.stopListening();
  }
}
