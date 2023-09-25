({
    doInit : function(component, event, helper) {
        var obj ={};
        obj['typeofDefect'] = 'PlatinumPMO__Types_of_Defect__c';
        
        obj['ProjectPhase'] = 'PlatinumPMO__Project_Phase__c';
        obj['DefectPriority'] = 'PlatinumPMO__Priority__c';
        obj['severity'] = 'PlatinumPMO__Severity__c';
        obj['Integration_Impact'] = 'PlatinumPMO__Integration_Impact__c';
        
        var action =component.get("c.doint");
    
          action.setParams({
                obj : obj
            });
        action.setCallback(this, function(response){
                var state = response.getState();
                if(state === "SUCCESS"){
                    var returnValue = response.getReturnValue();
                    console.log(returnValue);
                    component.set("v.typeOfDefects",returnValue.typeofDefect);
                    component.set("v.projectPhases",returnValue.ProjectPhase);
                    component.set("v.defectPriorities",returnValue.DefectPriority);
                    component.set("v.defectSeverities",returnValue.severity);
                    component.set("v.integrationImpacts",returnValue.Integration_Impact);
                }
        });
        $A.enqueueAction(action);                   
    },
    handelSave : function(component, event, helper){
        component.set("v.Spinner", true);
        var recordId=component.get("v.recordId");
        var action = component.get("c.saveDefectLog");
        var isValid = true;
        var currentRecord = component.get("v.defectLog");
        currentRecord.Case__c=recordId;
        
        if(component.find('DefName').get("v.value")!= undefined && component.find('DefName').get("v.value")!= ''){
            var DefName = component.find('DefName').get("v.value");
            currentRecord.Name=DefName; 
        }
        
        else{
            alert("Please Enter a Name");
            isValid = false;
           
        }
        //Organization validation
        console.log(component.get("v.selectedOrganizationLookUpRecord"));
        if(component.get("v.selectedOrganizationLookUpRecord") !== undefined){
            
            component.set("v.currentRecord.PlatinumPMO__Associated_Organization__c", component.get("v.selectedOrganizationLookUpRecord").Id) ;
            currentRecord.PlatinumPMO__Associated_Organization__c=component.get("v.selectedOrganizationLookUpRecord").Id;
        }else{
            alert("Please select Organization");
            isValid=false; 
           
        }
        //Portfolio Data Validation
        if(component.get("v.selectedPortfolioLookUpRecord") !== undefined){
            
            component.set("v.currentRecord.PlatinumPMO__Associated_Portfolio__c", component.get("v.selectedPortfolioLookUpRecord").Id) ;
            currentRecord.PlatinumPMO__Associated_Portfolio__c=component.get("v.selectedPortfolioLookUpRecord").Id;
        }else{
            alert("Please select Portfolio");
            isValid=false; 
            
        }
        // Program Data Validation
        if(component.get("v.selectedProgramLookUpRecord") !== undefined){
            
            component.set("v.currentRecord.PlatinumPMO__Program__c", component.get("v.selectedProgramLookUpRecord").Id) ;
            currentRecord.PlatinumPMO__Program__c=component.get("v.selectedProgramLookUpRecord").Id;
        }else{
            alert("Please select Program");
            isValid=false; 
            
        }
        //Project Data Vaidation
        if(component.get("v.selectedProjectLookUpRecord") !== undefined){
            
            component.set("v.currentRecord.PlatinumPMO__Associated_Project__c", component.get("v.selectedProjectLookUpRecord").Id) ;
            currentRecord.PlatinumPMO__Associated_Project__c=component.get("v.selectedProjectLookUpRecord").Id;
        }else{
            alert("Please select Project");
            isValid=false; 
            
        }
        //Deliverable Data Validation
        //console.log("Deliverabe value: "+component.get("v.selectedDeliverableLookUpRecord").Id);
        if(component.get("v.selectedDeliverableLookUpRecord") !== undefined && component.get("v.selectedDeliverableLookUpRecord") !== null){
            
            component.set("v.currentRecord.PlatinumPMO__Associated_Deliverable__c", component.get("v.selectedDeliverableLookUpRecord").Id) ;
            currentRecord.PlatinumPMO__Associated_Deliverable__c = component.get("v.selectedDeliverableLookUpRecord").Id;
        }else{
            alert("Please Fill Associated Deliverable");
            //component.set("v.errorMessage",'Please Fill Associated Deliverable');
            component.set("v.showError",true);
            
            isValid=false; 
        }
        //System Data Validation
        console.log(component.get("v.selectedSystemLookUpRecord"));
        if(component.get("v.selectedSystemLookUpRecord") !== undefined && component.get("v.selectedSystemLookUpRecord")!== null){
            
            component.set("v.currentRecord.PlatinumPMO__Associated_System__c", component.get("v.selectedSystemLookUpRecord").Id) ;
            currentRecord.PlatinumPMO__Associated_System__c = component.get("v.selectedSystemLookUpRecord").Id;
        }else{
            alert("Please Fill Associated System");
           //component.set("v.errorMessage",'Please Fill Associated System');
            component.set("v.showError",true);
            
            isValid=false; 
        }
        //typeOfDefect Data Validation
        if(component.get("v.typeOfDefect")!== undefined && component.get("v.typeOfDefect")!==''){
            currentRecord.PlatinumPMO__Types_of_Defect__c = component.get("v.typeOfDefect");
        }else{
            alert("Please File Type of Defect");
            //component.set("v.errorMessage",'Please Fill Type Of Defect');
            component.set("v.showError",true);
            
            isValid=false; 
        }
        //priority data validation
        console.log(component.get("v.priority"));
        if(component.get("v.priority")!== undefined && component.get("v.priority")!==''){
            currentRecord.PlatinumPMO__Priority__c = component.get("v.priority");
        }else{
            alert("Please Fill Priority");
           //component.set("v.errorMessage",'Please Fill Priority');
            component.set("v.showError",true);
            
            isValid=false; 
        }
        //severity data validation
        if(component.get("v.severity")!== undefined && component.get("v.severity")!==''){
            currentRecord.PlatinumPMO__Severity__c = component.get("v.severity");
        }else{
            alert("Please Fill Severity");
           //component.set("v.errorMessage",'Please Fill Severity');
            component.set("v.showError",true);
          
            isValid=false; 
        }
        //project phase data validation
        console.log("Project Phase : "+ component.get("v.ProjectPhase"));
        if(component.get("v.ProjectPhase")!== undefined && component.get("v.ProjectPhase")!==''){
            currentRecord.PlatinumPMO__Project_Phase__c = component.get("v.ProjectPhase");
        }else{
            alert("Please Fill Project Phase");
            //component.set("v.errorMessage",'Please Fill Project Phase');
            component.set("v.showError",true);
          
            isValid=false; 
        }
        //business trandaction impacted data validation
         console.log(component.get("v.selectedbusinessTransactionImpactedLookUpRecord"));        
        if(component.get("v.selectedbusinessTransactionImpactedLookUpRecord") !== undefined && component.get("v.selectedbusinessTransactionImpactedLookUpRecord") !== null){
            
            component.set("v.currentRecord.PlatinumPMO__Business_Transactions_Impacted__c", component.get("v.selectedbusinessTransactionImpactedLookUpRecord").Id) ;
            currentRecord.PlatinumPMO__Business_Transactions_Impacted__c = component.get("v.selectedbusinessTransactionImpactedLookUpRecord").Id;
        }else{
            alert("Please Fill Business Transaction Impacted");
           //component.set("v.errorMessage",'Please Fill Business Transaction Impacted');
            component.set("v.showError",true);
            isValid=false; 
        }
        //defect coordinator data validation
        console.log(component.get("v.selecteddefectCoordinatorLookUpRecord"));
        
        if(component.get("v.selecteddefectCoordinatorLookUpRecord") !== undefined && component.get("v.selecteddefectCoordinatorLookUpRecord") !== null){
            
            component.set("v.currentRecord.PlatinumPMO__Defect_Coordinator__c", component.get("v.selecteddefectCoordinatorLookUpRecord").Id) ;
            currentRecord.PlatinumPMO__Defect_Coordinator__c = component.get("v.selecteddefectCoordinatorLookUpRecord").Id;
        }else{
            alert("Please Fill Defect Coordinator");
            //component.set("v.errorMessage",'Please Fill Defect Coordinator');
            component.set("v.showError",true); 
            isValid=false; 
        }
        //integration impacted data validation
        if(component.get("v.integrationImpact")!== undefined && component.get("v.integrationImpact")!==''){
            currentRecord.PlatinumPMO__Integration_Impact__c = component.get("v.integrationImpact");
        }else{
            alert("Please Fill integration Impacted");
            //component.set("v.errorMessage",'Please Fill Integration Impacted');
            component.set("v.showError",true);
            isValid=false; 
        }
             //Historical Comment Validation
        if(component.get("v.historicalComment")!== undefined && component.get("v.historicalComment")!=""){
            currentRecord.PlatinumPMO__Historical_Comments__c = component.get("v.historicalComment");
        }
        else{
            alert("Please Fill Historical Comment");
            //component.set("v.errorMessage",'Please Fill Historical Comment');
            component.set("v.showError",true);
            isValid=false; 
        }
        
        if(component.get("v.dftdecs")!= undefined && component.get("v.dftdecs")!== null)
            currentRecord.PlatinumPMO__Defect_Description__c = component.get("v.dftdecs");
        if(component.get("v.selecteddefectOwnerLookUpRecord")!= undefined && component.get("v.selecteddefectOwnerLookUpRecord")!== null)
            currentRecord.PlatinumPMO__Responsible__c = component.get("v.selecteddefectOwnerLookUpRecord").Id;
        if(component.get("v.selecteddefectResolutionSignoffLookUpRecord")!= undefined && component.get("v.selecteddefectResolutionSignoffLookUpRecord")!== null)
            currentRecord.PlatinumPMO__Accountable__c = component.get("v.selecteddefectResolutionSignoffLookUpRecord").Id;
        if(component.get("v.defectCause")!= undefined && component.get("v.defectCause")!== null)
            currentRecord.PlatinumPMO__What_caused_the_defect__c = component.get("v.defectCause");
        if(component.get("v.proposedResolution")!= undefined && component.get("v.proposedResolution")!== null)
            currentRecord.PlatinumPMO__Proposed_Resolution__c = component.get("v.proposedResolution");
        if(component.get("v.selectedassoTestPlanLookUpRecord")!= undefined && component.get("v.selectedassoTestPlanLookUpRecord")!== null)
            currentRecord.PlatinumPMO__Associated_Test_Plan__c = component.get("v.selectedassoTestPlanLookUpRecord").Id;
        if(component.get("v.exampleUrl")!= undefined && component.get("v.exampleUrl")!== null)
            currentRecord.PlatinumPMO__Example_URL__c = component.get("v.exampleUrl");
        if(component.get("v.testPlanDetailLookUpRecord")!= undefined && component.get("v.testPlanDetailLookUpRecord")!== null)
            currentRecord.PlatinumPMO__Test_Plan_Detail__c = component.get("v.testPlanDetailLookUpRecord").Id;
        if(component.get("v.estimatedEfforts")!= undefined && component.get("v.estimatedEfforts")!== null)
            currentRecord.PlatinumPMO__Estimated_Effort_in_hours__c = component.get("v.estimatedEfforts");
        if(component.get("v.testStep")!= undefined && component.get("v.testStep")!== null)
            currentRecord.PlatinumPMO__Test_Step_ID__c = component.get("v.testStep");
        if(component.get("v.estimatedResolution")!= undefined && component.get("v.estimatedResolution")!== null)
            currentRecord.PlatinumPMO__Estimated_Resolution_Date__c = component.get("v.estimatedResolution");
        if(component.get("v.changeRequest")!= undefined && component.get("v.changeRequest")!== null)
            currentRecord.PlatinumPMO__Change_Request__c = component.get("v.changeRequest");
        
        
        //console.log("Type of defect : "+component.get("v.typeOfDefect"));
        //List Declearation 
        var dlLogList = [];
        dlLogList.push(currentRecord);
        if(isValid){
            action.setParams({
                dl : dlLogList
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state === "SUCCESS"){
                    var returnValue = response.getReturnValue();
                    if(returnValue === "success"){
                        //Success Toast 
                        var resultToast = $A.get("e.force:showToast");
                        resultToast.setParams({
                            "title" : "SUCCESS",
                            "message" : "Successfully Created "+currentRecord.Name,
                            "duration":' 5000',
                            "key": 'info_alt',
                            "type": 'success',
                            "mode": 'pester'
                        });
                        resultToast.fire();
                        $A.get("e.force:closeQuickAction").fire() ;
                        $A.get('e.force:refreshView').fire();
                        console.log("Success insert");
                    }
                    else{
                        //Error toast
                        var resultToast = $A.get("e.force:showToast");
                        resultToast.setParams({
                            "title" : "Error!",
                            "message" :  returnValue ,
                            "duration" :' 5000',
                            "key" : 'info_alt',
                            "type" : 'error',
                            "mode" : 'pester'
                        });
                        resultToast.fire();
                        $A.get("e.force:closeQuickAc*tion").fire() ;
                        $A.get('e.force:refreshView').fire();
                        console.log("Error");
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },
    cancel  :function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
        $A.get('e.force:refreshView').fire();
    },
    hideSpinner : function(component,event,helper){
       component.set("v.Spinner", false);
    },
    orgValueChange :function(component, event, helper){
        var orgId=component.get("v.selectedOrganizationLookUpRecord").Id;
       
        component.set("v.SelectedOrgRecordId",orgId);
        console.log(orgId);
    },
    portfolioValueChange : function (component,event,helper){
        var portId=component.get("v.selectedPortfolioLookUpRecord").Id;   
        component.set("v.SelectedPortRecordId",portId);  
        
    },
    progValueChange : function(component,event,helper){
       var pId=component.get("v.selectedProgramLookUpRecord").Id;
        component.set("v.SelectedProgRecordId",pId);
         
        
    },
    projectValueChange : function(component,event,helper){
       var projectId=component.get("v.selectedProjectLookUpRecord").Id;
        component.set("v.SelectedProjectRecordId",projectId);
         
        
    }
       
})