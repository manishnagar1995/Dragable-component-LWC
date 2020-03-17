/* eslint-disable no-console */
import { LightningElement, wire, track} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import getcase from '@salesforce/apex/AccountHelper.getAccountLocations';

let i=0;
let caseIds; //store id from the div
let indexs;
let datare;
let selectedcase; //store selected account

let datalist =[
    {
        Id: 5,
        Name: 'Amy Taylor',
        Title: 'VP of Engineering',
    },
    {
        Id: 6,
        Name: 'Michael Jones',
        Title: 'VP of Sales',
    },
    {
        Id: 7,
        Name: 'Jennifer Wu',
        Title: 'CEO',
    },
];

export default class DragableTable extends LightningElement {
    @track record =  datalist;
     //get page reference
     @wire(CurrentPageReference) pageRef;
     returnInfo;
     constructor() {
         super();
         //register dragover event to the template
         this.template.addEventListener('dragover', this.handleDragOver.bind(this));
     }
   
     connectedCallback() {
        // subscribe to selectedAccountDrop event
        registerListener('returnDataSend', this.handlereturnDataSend, this);
      }
   
    disconnectedCallback() {
        // unsubscribe from selectedAccountDrop event
        unregisterAllListeners(this);
    }
    handlereturnDataSend(returnInfo){
        this.returnInfo = returnInfo;
        console.log('=====test here ==============',this.returnInfo);
        for(i=0; i< this.record.length; i++) {
            if( this.returnInfo == this.record[i].Id  &&  this.returnInfo != null ){
                console.log('=====test here2 ==============',indexs); 
                this.record.splice(indexs, 1);   
            }    
          }
      }

    

    handleDragStart(event) {
        event.dataTransfer.dropEffect = 'move';
        caseIds = event.target.dataset.item;
        indexs = event.target.dataset.index;
        console.log('event.target.dataset.item=' ,event.target.dataset.item);
        console.log('event.target.dataset.index=' ,event.target.dataset.index);
 
        console.log('length=:' + this.record.length);
        for(i=0; i< this.record.length; i++) {
           if(caseIds == this.record[i].Id  && caseIds != null ){
            
            selectedcase =this.record[i];  
           console.log('test==============>',JSON.stringify(selectedcase));
           fireEvent(this.pageRef, 'selectedCaseDrop', selectedcase); 
           }    
         }
     }

    handleDragOver(event){
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();    
     //   this.record.splice(indexs, 1);     
    } 

}