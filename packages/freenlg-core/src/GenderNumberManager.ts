import fs = require('fs');


let wordsWithGender: any;

declare var __dirname;

export class GenderNumberManager {

  language: string;
  ref_gender: Map<any, string>;
  ref_number: Map<any, string>;
  wordsWithGender: any;
  spy: Spy;

  constructor(params) {

    this.ref_number = new Map();
    this.ref_gender = new Map();
    this.language = params.language;
  
    if (this.language=='fr_FR' && params.loadDicts!=false) {
      if (wordsWithGender!=null) {
        //console.log('DID NOT RELOAD');
        this.wordsWithGender = wordsWithGender;
      } else {
        //console.log('LOAD');
        this.wordsWithGender = JSON.parse(fs.readFileSync(__dirname + '/../resources_pub/fr_FR/wordsWithGender.json', 'utf8'));
        wordsWithGender = this.wordsWithGender;
      }
    }
  }

  isEmptyObj(obj: any): boolean {
    if (obj==null) return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  setRefGenderNumber(obj: any, gender: string, number: string): void {
    if (this.isEmptyObj(obj)) {
      console.log('ERROR: setRefGenderNumber obj should not be empty!');
      throw new Error("Something unexpected has occurred.");
    }
    // dumpRefMap();
    this.setRefGender(obj, gender);
    this.setRefNumber(obj, number);
    // dumpRefMap();
  }
  
  
  setRefGender(obj: any, gender: string): void {
    if (this.isEmptyObj(obj)) {
      console.log('ERROR: setRefGender obj should not be empty!');
      throw new Error("Something unexpected has occurred.");
    }
    // dumpRefMap();
    // console.log('setRefGender: ' + JSON.stringify(obj).substring(0, 20) + ' => ' + gender);
    this.ref_gender.set(obj, gender);
    // dumpRefMap();
  }
  
  getRefGender(obj: any): string {
    //console.log('getRefGender called on: ' + JSON.stringify(obj));
    
    let inMainMap: string = this.ref_gender.get(obj);
    if (inMainMap!=null) {
      return inMainMap;
    } else if (typeof obj === 'string' && this.language=='fr_FR' && this.wordsWithGender!=null) {
      //console.log("trying to find in wordsWithGender: " + util.wordsWithGender[obj]);
      return this.wordsWithGender[obj];
    }
  
    return null;
  }
  
  registerSubst(root: string, gender: string, number: string): void {
    this.setRefGender(root, gender);
    this.setRefNumber(root, number);
  }
  
  
  getAnonymous(gender: string, number: string): any {
    // console.log("getAnonymous");
    let obj: any = {'isAnonymous': true};
    this.setRefGenderNumber(obj, gender, number);
    return obj;
  }
  
  getRefNumber(obj: any): string {
    return this.ref_number.get(obj);
  }
  
  setRefNumber(obj: any, number: string): void {
    if (this.isEmptyObj(obj)) {
      console.log('ERROR: setRefNumber obj should not be empty!');
      return;
    }
    // dumpRefMap();
    this.ref_number.set(obj, number);
    // dumpRefMap();
  }
      
}