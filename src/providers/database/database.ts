
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/Rx';
import { Platform } from 'ionic-angular/platform/platform';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface Stud {
  id: number,
  name: string,
  occupation: string,
  email: string,
  phone: string

}
 
@Injectable()
export class DatabaseProvider {
  
  db: SQLiteObject;

  private databaseReady: BehaviorSubject<boolean>;

  constructor( private sqlite: SQLite, private platform: Platform) {
    console.log('Hello DatabaseProvider Provider');
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.openOrCreate();
    })
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  openOrCreate() {
    console.log('Open/Create DB')
    return this.sqlite.create({
      name: 'student_data.db',
      location: 'default',

    }).then((db: SQLiteObject) => {
      this.db = db;
      return this.db.sqlBatch([
        'CREATE TABLE IF NOT EXISTS class(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32))',
        'CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32), email VARCHAR(32), occupation VARCHAR(32), phone VARCHAR(32))'
      ]).then((data) => {
        console.log('After Batch')
        this.databaseReady.next(true);
        return data;
      });
    })
  }

  addStudents(name, email, occupation, phone){
    return this.db.executeSql('INSERT INTO student (name, email, occupation, phone) VALUES (?,?,?,?)', [name, email, occupation, phone]);
  }

updateStudent(stud: Stud){
  // let data = [stud.name];
  return this.db.executeSql(`UPDATE student SET name=?, occupation=?, email=?, phone=? WHERE id = ${stud.id}`, [stud.name, stud.occupation, stud.email, stud.phone])
}

  getStudents(){
    return this.db.executeSql('SELECT * FROM student', null).then((data) => {
      let results = [];
      for (let i = 0; i < data.rows.length; i++){
        results.push({name: data.rows.item(i).name,email: data.rows.item(i).email,occupation: data.rows.item(i).occupation,phone: data.rows.item(i).phone, id: data.rows.item(i).id})
      }
      return results;
    });
  }
  delete_byID(id){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("DELETE FROM student WHERE id=? ",[id])
  .then(res=>resolve(res))
  .catch(err=>reject(err));
    })
  }

get_dataByid(id): Promise<Stud> {

return  this.db.executeSql('SELECT * FROM student WHERE id=?',[id]).then(data => {
 
  return {
    id: data.rows.item(0).id,
    name: data.rows.item(0).name, 
    occupation: data.rows.item(0).occupation,
    phone: data.rows.item(0).phone,
    email: data.rows.item(0).email
  }
});
}
  addClass(data){
    return this.db.executeSql('INSERT INTO class (name) VALUES (?)', [data]);
  }

  getCsass(){
    return this.db.executeSql('SELECT * FROM class', null).then((data) => {
      let results = [];
      for (let i = 0; i < data.rows.length; i++){
        results.push({name: data.rows.item(i).name, id: data.rows.item(i).id})
      }
      return results;
    }, err => {
      console.log("ERROR", err);
      return [];
    });
  }

  }


