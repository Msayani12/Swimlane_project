import { LightningElement,api } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import orgChartJSF from '@salesforce/resourceUrl/orgChart_js';
export default class Org_chart extends LightningElement {
error;
chart;
initialized = false;
contactsArray = [];
myList ={};

renderedCallback() {
    if (this.initialized) return;
    this.initialized = true;

    Promise.all([
            loadScript(this, orgChartJSF),
        ])
            .then(response=> {
                this.intialize();
            })
            .catch((error) => {
                this.error = error; 
                console.error('OUTPUT: '+ this.error);
            });        
}

intialize() {
        

        let canvas = this.template.querySelector('[data-id="tree"]');
        let context = canvas;
        this.chart = new OrgChart(context, {
            template: "olivia",
            enableSearch: false,
            
            nodeBinding: {
                field_0: "name",
                field_1: "title",
                field_2:"description"
                
                
            },
            tags: {
                "group": {
                    template: "group",
                },
                "Customer Supply": {
                    subTreeConfig: {
                        columns: 4
                    }
                },
                "Shipping Specialist": {
                    subTreeConfig: {
                        columns: 1
                    }
                },
                 "Billing clerk": {
                    subTreeConfig: {
                        columns: 1
                    }
                },
       
            },
            
            nodes: [
                { id: 1, name: "Sell from Stock (BD9)", title: "Level 3", description : 'Business Process'},
                //Predecessor business Process
                // { id: 2, pid:1,  name: "Sales Quotation (BDG)", title: "Predecessor",description:'Predecessor Business Process', tags: ['left-partner']},
                // { id: 3, pid:1,  name: "Basic Credit Management (BD6)", title: "Predecessor", description:'Predecessor Business Process',tags: ['left-partner']},
                // { id: 4, pid:1,  name: "Delivery Insights enabled by IoT (4IH)", title: "Predecessor",description:'Predecessor Business Process', tags: ['left-partner']},
                // { id: 6, pid:1,  name: "Digital Payments - Sales (1Z1)", title: "Predecessor",description:'Predecessor Business Process', tags: ['left-partner']},
                // { id: 7, pid:1,  name: "Digital Payments - Sales (1Z1)", title: "Predecessor", description:'Predecessor Business Process',tags: ['left-partner']},
                // { id: 8, pid:1,  name: "Sales Inquiry (1IQ)", title: "Predecessor", description:'Predecessor Business Process', tags: ['left-partner']},
                // { id: 9, pid:1,  name: "Sales Commissions - External Sales Representative (2TT)", description:'Predecessor Business Process', title: "Predecessor", tags: ['left-partner']},
                // { id: 10, pid:1,  name: "Dangerous Goods in Sales (3G8)", title: "Predecessor",description:'Predecessor Business Process', tags: ['left-partner']},
                // // Successor Business Process
                // { id: 11, pid:1,  name: "Advanced Available-to-Promise Processing (1JW)", title: "Successor", description:'Successor Business Process',tags: ['right-partner']},
                // { id: 12, pid:1,  name: "Sales Order Fulfillment Monitoring (BKK)", title: "Successor",description:'Successor Business Process', tags: ['right-partner']},
                // { id: 13, pid:1,  name: "Accounts Receivable (J59)", title: "Successor",description:'Successor Business Process', tags: ['right-partner']},
                // { id: 14, pid:1,  name: "Accelerated Customer Returns (BKP)", title: "Successor",description:'Successor Business Process', tags: ['right-partner']},
                // { id: 15, pid:1,  name: "Convergent Billing (1MC)", title: "Successor", description:'Successor Business Process', tags: ['right-partner']},
                // { id: 16, pid:1,  name: "Sales Rebate Processing (1B6)", title: "Successor", description:'Successor Business Process', tags: ['right-partner']},
                // { id: 17, pid:1,  name: "Customer Payments (1S0)", title: "Successor", description:'Successor Business Process', tags: ['right-partner']},
                // { id: 18, pid:1,  name: "External Customer Payments (2M0))", title: "Successor", description:'Successor Business Process', tags: ['right-partner']},
                // { id: 19, pid:1,  name: "Debit Memo Processing (1F1)", title: "Successor", description:'Successor Business Process', tags: ['right-partner']},
                
                //child business Process start
                { id:20, pid: 1, name: "Post Goods Issue", title: "Level 4" ,description:'Child Business Process' , tags: ["Customer Supply", "group"],},
                { id: 21, pid: 1, name: "Create Billing Document", title: "Level 4" ,description:'Child Business Process', tags: ["Customer Supply", "group"]},
                { id: 22, pid: 1, name: "Create Sales Order", title: "Level 4" ,description:'Child Business Process'},
                { id: 23, pid: 21, name: "Execute Picking", title: "Level 4" ,description:'Child Business Process'},
                { id: 24, pid: 21, name: "Proof of Delivery (Optional)", title: "Level 4" ,description:'Child Business Process'},
                { id: 25, pid: 21, name: "Approval Workflow (Optional)", title: "Level 4" ,description:'Child Business Process'},
                { id: 26, pid: 22, name: "Create Delivery", title: "Level 4" ,description:'Child Business Process'},
                { id: 27, pid: 23, name: "Check Batches (Optional)", title: "Level 4" ,description:'Child Business Process'},
                { id: 28, pid: 24, name: "Add Freight Costs (Optional)", title: "Level 4" ,description:'Child Business Process'},
                { id: 29, pid: 25, name: "Split Outbound Delivery (Optional)", title: "Level 4" ,description:'Child Business Process'},
                { id: 30, pid: 26, name: "Start Process-Sell from stock(BD9)", title: "Level 4" ,description:'Child Business Process'},
                { id: 31, pid: 27, name: "End Process-sell from stock(BD9)", title: "Level 4" ,description:'Child Business Process'},
                { id: 30, pid: 28, name: "Start Process-Sell from stock(BD9)", title: "Level 4" ,description:'Child Business Process'},
                { id: 31, pid: 29, name: "End Process-sell from stock(BD9)", title: "Level 4" ,description:'Child Business Process'},
                
                { id: 30, pid: 1, name: "Start Process-Sell from stock(BD9)", title: "Level 4" ,description:'Child Business Process'},
                { id: 31, pid: 1, name: "End Process-sell from stock(BD9)", title: "Level 4" ,description:'Child Business Process'}
            ],
            

        });
        
        window.OrgChart = OrgChart;

    }
}