import { LightningElement,wire,track} from 'lwc';
import getItems from '@salesforce/apex/InternalCaseRankingControllerLWC.getData';
//import prepareAccCases from '@salesforce/apex/InternalCaseRankingControllerLWC.prepareAccCases';
//import getLineOfBusinessValues from '@salesforce/apex/InternalCaseRankingControllerLWC.getData';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { registerListener, unregisterAllListeners } from 'c/pubsub';


export default class InternalCaseRankingLWC extends LightningElement {
    getaccounts = [];
    getAccCases;
    @track mapData= [];
    error;
    error1;

   /*@wire(getItems)
    wiredAccounts({ error, data }) {
        if (data) {
            console.log('data--',JSON.stringify(data));
            this.getaccounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.getaccounts = undefined;
        }
    }

   /* @wire(prepareAccCases)
    wiredCaseList({ error, data }) {
        if (data) {
            console.log('data--456',JSON.stringify(data)); 
            this.getAccCases = data;          
        } else if (error) {
            this.error1 = error;            
        }
    }*/
    
  @wire(getItems)
    wiredLineOfBusinessCase(result) {
       // console.log('getLineOfBusinessValues--',JSON.stringify(result.data)); 
        if (result.data) {
            //mapData = [];
            var Lob2Cases = result.data.Lob2Cases;
            var accList = result.data.accList;
            console.log('test=============>',result.data.accList);
            console.log('test=============>',result.data.Lob2Cases);
           // this.getaccounts = result.data;
           this.getaccounts = accList;
          console.log('mapaalist===========',JSON.stringify(this.getaccounts));

           for(var key in Lob2Cases){
                this.mapData.push({value:Lob2Cases[key], key:key}); //Here we are creating the array to show on UI.
             }
        console.log('map=lob==========',JSON.stringify(this.mapData));
        }
    }
    
   
}