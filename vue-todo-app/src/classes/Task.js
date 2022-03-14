export default class Task {
    id= 0;
    name= '';
    content= '';
    status= 0;
    pin= 0;
 
    constructor(cId, cName, cContent, cStatus, cPin) {
        this.id = cId;
        this.name = cName;
        this.content = cContent;
        this.status = cStatus;
        this.pin = cPin;
    } 
}