import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  win:any
  deviceprinter:any;
  constructor(public navCtrl: NavController) {
   this.win = window;
    this.deviceprinter = [];

    setTimeout(() => {
      this.listBluetoothDevices().then(() => {
      })
      },3000);

  }
  async testPrint() {
 

 

    let printStr01 = "";
    printStr01 += "{br}";
    printStr01 += "{reset}{center}VALE NUMERO    10{br}";
    printStr01 += "{reset}{left}FECHA: 22/03/2019 09:15{br}";
    printStr01 += "{reset}{left}ENTREGADO A: TRABAJADOR X{br}";

    printStr01 += "--------------------------------";
    await this.printText("{br}{br}");
    await this.printText(printStr01);

    printStr01 = "";
    printStr01 += "{br}";
    printStr01 += "{reset}Cod ";
    printStr01 += this.pad("Nombre", 18, ' ');
    printStr01 += " Un ";
    printStr01 += "Cant{br}";
    printStr01 += "--------------------------------";

    await this.printText(printStr01);
    var prod = [
      { code: '94949', nombre: 'producto demo', unidad: 'un', cantidad: 10 },
      { code: '94943', nombre: 'producto demo 2', unidad: 'un', cantidad: 100 },
      { code: '94949', nombre: 'producto demo 3', unidad: 'un', cantidad: 1000 },
      { code: '94949', nombre: 'producto demo 3', unidad: 'un', cantidad: 1000 },
      { code: '94949', nombre: 'producto demo 3', unidad: 'un', cantidad: 1000 },
      { code: '94949', nombre: 'producto demo 3', unidad: 'un', cantidad: 1000 }
    ];
    for (let index = 0; index < prod.length; index++) {
      printStr01 = "";
      printStr01 += prod[index].code + ' ';
      printStr01 += this.pad(prod[index].nombre, 18, ' ');
      printStr01 += ' ' + prod[index].unidad;
      printStr01 += ' ' + prod[index].cantidad + "{br}";
      await this.printText(printStr01);

    }
    await this.printText("{br}{br}{br}");

    printStr01 = "";
    printStr01 += "{br}";
    printStr01 += "{reset}{center}Firma Trabajador {br}{br}{br}{br}";

    printStr01 += "--------------------------------";

    await this.printText(printStr01);
    await this.printText("{br}{br}{br}");

    this.feedPaper(10);
  }
  pad(input, length, padding) {
    var str = input + "";
    return (length <= str.length) ? str : this.pad(str + padding, length, padding);
  }
  feedPaper(lines: Number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.win.DatecsPrinter.feedPaper(lines, (success) => resolve(success), (error) => reject(error));
    });
  }
  printText(text: string, charset: string = 'UTF-8'): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      this.win.DatecsPrinter.printText(text, charset, (success) => resolve(success), (error) => reject(error));
     
    });
  }
  connect(deviceAddress: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => this.win.DatecsPrinter.connect(deviceAddress, (success) => resolve(success), (error) => alert(JSON.stringify(error))), 100);
    });
  }

  listBluetoothDevices() {
    return new Promise<any>((resolve, reject) => {
      this.win.DatecsPrinter.listBluetoothDevices((success) => { this.deviceprinter = success; resolve(success) }, (error) => alert(JSON.stringify(error)));
    });
  }

}
