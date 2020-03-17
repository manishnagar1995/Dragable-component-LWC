/* eslint-disable no-console */
import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

let data = '';
let returnData;

let i=0;
let caseIds; //store id from the div
let indexs;
let index1;
let index2;
let temp;

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
    allowDrop(event){
        event.preventDefault();
    }

    handleDragStart(event) {
        event.dataTransfer.dropEffect = 'move';
        caseIds = event.target.dataset.item;
        indexs = event.target.dataset.index;
        event.dataTransfer.setData("text", caseIds)
        
     }
    handleDrop(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }
        
        var data1 = event.dataTransfer.getData("text");
        console.log('dsdsf',data1);
        var tar = event.currentTarget.dataset.item;
        console.log('cloest id',tar);
        for(i=0; i< this.DroppedcaseNumber.length; i++) {
            if(this.DroppedcaseNumber[i].Id==data1) index1 = i; 
            if(this.DroppedcaseNumber[i].Id==tar) index2 = i;
        }
        
        console.log('index11',index1);
        console.log('index22',index2);
        if(index1<index2) {
            // Lower index to higher index; we move the lower index first, then remove it.
            this.DroppedcaseNumber.splice(index2+1, 0, this.DroppedcaseNumber[index1]);
            this.DroppedcaseNumber.splice(index1, 1);
        } else {
            // Higher index to lower index; we remove the higher index, then add it to the lower index.
            temp = this.DroppedcaseNumber.splice(index1, 1)[0];
            this.DroppedcaseNumber.splice(index2, 0, temp);
        }
    
        data = this.caseInfo.Name;
        console.log('inside handle  data'); 
        console.log('tweset if data',data != null );
        console.log('tweset if',data1 != null);
        if( data != null){
            returnData = this.caseInfo.Id;
            console.log('returndata',returnData);
            this.DroppedcaseNumber.splice(tar, 0, this.caseInfo);
            data =null;
            this.caseInfo = null;
        //   this.DroppedcaseNumber.splice(data1, 1);
            fireEvent(this.pageRef, 'returnDataSend', returnData);  
         }
        event.preventDefault();

      }

    handleDragOver(event){
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();       
    } 

}