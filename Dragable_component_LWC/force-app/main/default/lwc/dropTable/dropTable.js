/* eslint-disable no-console */
import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

let data;

const parentList = [ {
                        "firstList" : [{
                                        Id: 1,
                                        Name: 'New',
                                        Title: 'VP of Engineering',
                                    },
                                    {
                                        Id: 2,
                                        Name: 'new12',
                                        Title: 'VP of Sales',
                                    },
                                    {
                                        Id: 3,
                                        Name: 'New123',
                                        Title: 'CEO',
                                    }],
                                },
                    {
                        "secondList" : [{
                                        Id: 1,
                                        Name: 'New',
                                        Title: 'VP of Engineering',
                                    },
                                    {
                                        Id: 2,
                                        Name: 'new12',
                                        Title: 'VP of Sales',
                                    },
                                    {
                                        Id: 3,
                                        Name: 'New123',
                                        Title: 'CEO',
                                    },
                                ]
                            }
                ];

const datalist =[
    {
        Id: 1,
        Name: 'New',
        Title: 'VP of Engineering',
    },
    {
        Id: 2,
        Name: 'new12',
        Title: 'VP of Sales',
    },
    {
        Id: 3,
        Name: 'New123',
        Title: 'CEO',
    },
];
export default class DropTable extends LightningElement {
    


    @wire(CurrentPageReference) pageRef;
    caseInfo;
    @track DroppedcaseNumber = datalist;


    constructor() {
        super();
        //these are two must have events to be listended
        this.template.addEventListener('dragover', this.handleDragOver.bind(this));
        this.template.addEventListener('drop', this.handleDrop.bind(this));        
      }
      connectedCallback() {
        // subscribe to selectedAccountDrop event
        registerListener('selectedCaseDrop', this.handleSelectedCaseDrop, this);
      }
   
    disconnectedCallback() {
        // unsubscribe from selectedAccountDrop event
        unregisterAllListeners(this);
    }
    handleSelectedCaseDrop(caseInfo){
      this.caseInfo = caseInfo;
    }

    handleDrop(event){
        console.log('inside handle drop'); 
        if(event.stopPropagation){
            event.stopPropagation();
        }
        event.preventDefault();
        data = this.caseInfo.Name;
        alert(data);
        console.log('inside handle  data', data); 
        if( data != null){
            this.DroppedcaseNumber.push(this.caseInfo);
         }
      }

    handleDragOver(event){
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();       
    } 

}