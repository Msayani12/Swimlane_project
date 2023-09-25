({
	searchHelper : function(component,event,getInputkeyWord) {
      var action = component.get("c.fetchLookUpValues");  
      var orgId='';  
      console.log(component.get("v.SelectedOrgRecordId"));
      orgId=component.get("v.SelectedOrgRecordId");
     
      console.log(orgId);  
      var portfolioId=component.get("v.SelectedPortfolioRecordId");
      var SprogramId=component.get("v.SelectedProgramRecordId");
      var SprojectId=component.get("v.SelectedProjectRecordId");
      var SDeliverableId=component.get("v.SelectedDeliverableRecordId");
      var onObjectName=component.get("v.onObjectName");
      console.log(portfolioId); 
      console.log(SprogramId); 
      console.log(orgId); 
        
    console.log('here'); 
        action.setParams({
            'searchKeyWord': getInputkeyWord,
            'ObjectName' : component.get("v.objectAPIName"),
            'ParentObj' : component.get("v.ParentObjectName"),
            'ProgId' : SprogramId,
            'ProjId' : SprojectId,
            'OrgId':orgId,
            'portfolioId':portfolioId,
            'onObjectName':onObjectName
           
          });

         component.set("v.Spinner",true);
         // set a callBack
        action.setCallback(this, function(response) {
          $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            console.log(state);
            
            if (state === "SUCCESS") {
               component.set("v.Spinner",false);
                var storeResponse = response.getReturnValue();
              // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                  /*  var obj=component.get("v.objectAPIName");
                    if(obj=='PlatinumPMO__Work_Package__c'){
                    component.set("v.Message", 'Create New Record');
                    }else{*/
                    component.set("v.Message", 'No Result Founds, Please Contact your Administrator');
					component.set("v.Spinner",false);
                   // }
                    component.set("v.listOfSearchRecords", null );
                    var forclose = component.find("searchRes");
                  //  $A.util.addClass(forclose, 'slds-is-close');
                //    $A.util.removeClass(forclose, 'slds-is-open');

                    // console.log("hello response");
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfSearchRecords", storeResponse);

            }

        });
      // enqueue the Action
        $A.enqueueAction(action);

	},
  
})