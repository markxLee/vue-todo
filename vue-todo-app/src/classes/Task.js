export default class Task {
    id= String;
    name= String;
    content= String;
    status= Number;
    pin= Number;
 
    constructor(cId, cName, cContent, cStatus, cPin) {
        this.id = cId;
        this.name = cName;
        this.content = cContent;
        this.status = cStatus;
        this.pin = cPin;
    } 
}