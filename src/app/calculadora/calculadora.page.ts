import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage {
  private textoIntroducao = "Para usar a calculadora fale o numero; em seguida a operação e depois o outro número. Para soma fale 'mais', subtração fale 'menos', multiplicação fale 'vezes' e divisão fale 'dividido'";
  private frase;
  private resultado;
  private informacaoTela;
  private operador;
  constructor(public tts: TextToSpeech, private speechRecognition: SpeechRecognition, public platform: Platform) {
    platform.ready().then( () => {
      setInterval( () => {
        this.resultado;
        this.informacaoTela;
      },500);
    });
   }

   ngOnInit() {
    this.tts.speak({
      text: this.textoIntroducao,
      locale: "pt-BR",
      rate: 1.0
    });
  }
  receberFrase(){
    this.tts.stop;
    this.speechRecognition.startListening({
      language : "pt-BR",
      matches : 1
    })
      .subscribe((_matches)=>{
      if(_matches && _matches.length > 0){
        this.frase = _matches[0].split(" ");
        this.operador = this.frase[1];
          if(this.operador == "+" || this.operador == "mais"){
            this.informacaoTela = this.frase[0] + " + " + this.frase[2];
            this.resultado = parseInt(this.frase[0]) + parseInt(this.frase[2]);
          }else if(this.operador == "-" || this.operador == "menos"){
            this.informacaoTela = this.frase[0] + " - " + this.frase[2];
            this.resultado = this.frase[0] - this.frase[2];
          }else if(this.operador == "x" || this.operador == "X" || this.operador == "vezes"){
            this.informacaoTela = this.frase[0] + " x " + this.frase[2];
            this.resultado = this.frase[0] * this.frase[2];
          }else if(this.operador == "dividido"){
            this.informacaoTela = this.frase[0] + " / " + this.frase[2];
            this.resultado = this.resultado[0] / this.resultado[2];
          } 
      }
    },(_e)=>{
        this.frase = "525 + 131";
       this.realizaCalculo(this.frase);
    });
  }
  realizaCalculo(frase){
    this.frase = frase.split(" ");
    this.operador = this.frase[1];
      if(this.operador == "+" || this.operador == "mais"){
        this.informacaoTela = this.frase[0] + " + " + this.frase[2];
        this.resultado = parseInt(this.frase[0]) + parseInt(this.frase[2]);
      }else if(this.operador == "-" || this.operador == "menos"){
        this.informacaoTela = this.frase[0] + " - " + this.frase[2];
        this.resultado = this.frase[0] - this.frase[2];
      }else if(this.operador == "x" || this.operador == "X" || this.operador == "vezes"){
        this.informacaoTela = this.frase[0] + " x " + this.frase[2];
        this.resultado = this.frase[0] * this.frase[2];
      }else if(this.operador == "dividido"){
        this.informacaoTela = this.frase[0] + " / " + this.frase[2];
        this.resultado = this.frase[0] / this.frase[2];
      }
  }
  get _resultado(){
    return this.resultado;
  }

  get _calculo(){
    return this.informacaoTela;
  }

}
