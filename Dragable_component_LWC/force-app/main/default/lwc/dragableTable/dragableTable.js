/* eslint-disable no-console */
import { LightningElement, wire, track} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import getcase from '@salesforce/apex/AccountHelper.getAccountLocations';

let i=0;
let caseIds; //store id from the div
let indexs;
let selectedcase; //store selected account

let datalist =[
    {
        Id: 1,
        Name: 'Amy Taylor',
        Title: 'VP of Engineering',
    },
    {
        Id: 2,
        Name: 'Michael Jones',
        Title: 'VP of Sales',
    },
    {
        Id: 3,
        Name: 'Jennifer Wu',
        Title: 'CEO',
    },
];

export default class DragableTable extends LightningElement {
    @track record =  datalist;
     //get page reference
     @wire(CurrentPageReference) pageRef;
     constructor() {
         super();
         //register dragover event to the template
         this.template.addEventListener('dragover', this.handleDragOver.bind(this));
     }
   
    

    handleDragStart(event) {
        event.dataTransfer.dropEffect = 'move';
      
        caseIds = event.target.dataset.item;
        indexs = event.target.dataset.index;
        console.log('event.target.dataset.item=' + event.target.dataset.item);
 
        console.log('length=:' + this.record.length);
        for(i=0; i< this.record.length; i++) {
           if(caseIds == this.record[i].Id  && caseIds != null ){
            
            selectedcase =this.record[i];  
          //  record.splice(indexs, i);
            console.log('test==============>',JSON.stringify(selectedcase));
           }    
                                                              
        } 
     
       fireEvent(this.pageRef, 'selectedCaseDrop', selectedcase);   
     }

    handleDragOver(event){
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();       
    } 

}