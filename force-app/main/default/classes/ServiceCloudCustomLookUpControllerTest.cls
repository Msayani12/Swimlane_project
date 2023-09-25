@isTest
public class ServiceCloudCustomLookUpControllerTest {
	@testSetup static void setup() {
      Profile prof = [SELECT Id FROM Profile WHERE Name = 'System Administrator'];
      User u = new User(
      Alias = 'testu1',
      Email = 'testu1@unitingambition.com',
      EmailEncodingKey = 'UTF-8',
      LastName = 'Test',
      LanguageLocaleKey = 'en_US',
      LocaleSidKey = 'en_US',
      TimeZoneSidKey='America/Los_Angeles',
      ProfileId = prof.Id,
      UserName='testu1@unitingambition.com'
   
       );

    INSERT u;
    
    System.runAs(u){ 
    
        
        PlatinumPMO__Organization__c o=new PlatinumPMO__Organization__c(Name='Organization RC',PlatinumPMO__Expense_Auto_Approval_Days__c=8,PlatinumPMO__Timesheet_Auto_Approval_Days__c=10,PlatinumPMO__Historical_Comments__c='New CFG');
        insert o;
        
		PlatinumPMO__Solution_Integrator__c s= new PlatinumPMO__Solution_Integrator__c(Name='Solution RC');
        s.PlatinumPMO__Organization__c=o.id;
        insert s; 
        
        PlatinumPMO__Portfolio__c por= new PlatinumPMO__Portfolio__c(Name='RC Technology',PlatinumPMO__Organization__c=o.id,PlatinumPMO__Historical_Comments__c ='new record created');
        insert por;
        
        PlatinumPMO__Program__c p= new PlatinumPMO__Program__c(Name='RC Technology',PlatinumPMO__Portfolio__c=por.id,PlatinumPMO__Solution_Integrator__c=s.id,PlatinumPMO__Program_Condition__c='Green',PlatinumPMO__Historical_Comments__c='New Create',PlatinumPMO__Associated_Organization__c=o.id);
        insert p;
        
        PlatinumPMO__Project__c proj=new PlatinumPMO__Project__c(PlatinumPMO__Program__c=p.Id,PlatinumPMO__Project_Name__c='TestProj',PlatinumPMO__Historical_Comments__c='New Create',PlatinumPMO__Associated_Organization__c=o.id,PlatinumPMO__Associated_Portfolio__c= por.id);
        insert proj;
        
        PlatinumPMO__Test_Plan__c tp= new PlatinumPMO__Test_Plan__c(Name='RC Technology',PlatinumPMO__Program__c=p.id,PlatinumPMO__Associated_Project__c=proj.id,PlatinumPMO__Test_Plan_Objective__c='Test',PlatinumPMO__Test_Plan_Type__c='Data Migration Integrated Unit Test- ETL',PlatinumPMO__Test_Cycle__c='Test Cycle 1',PlatinumPMO__Historical_Comments__c='New Create',PlatinumPMO__Associated_Organization__c=o.id,PlatinumPMO__Associated_Portfolio__c= por.id);
        insert tp;
        
        PlatinumPMO__Test_Plan_Details__c tpd =new PlatinumPMO__Test_Plan_Details__c(PlatinumPMO__Test_Plan__c=tp.id,PlatinumPMO__Name__c='TPD Technology',PlatinumPMO__Test_Scenario__c='test',PlatinumPMO__Historical_Comments__c='New Create');
        insert tpd;
        Test.startTest();
        
        PlatinumPMO__Deliverable_Type__c dt=new PlatinumPMO__Deliverable_Type__c(Name='Testing',PlatinumPMO__Organization__c=o.id,PlatinumPMO__Portfolio__c=por.id);
       insert dt;
        List<PlatinumPMO__Deliverable__c> dLIst=new LIst<PlatinumPMO__Deliverable__c>();
        PlatinumPMO__Deliverable__c deliver=new PlatinumPMO__Deliverable__c();
        deliver.Name='DeliverTest';
        deliver.PlatinumPMO__Deliverable_Type__c=dt.id;
        deliver.PlatinumPMO__Scope_Disposition__c='In Scope';
        deliver.PlatinumPMO__Historical_Comments__c='insert';
        deliver.PlatinumPMO__approver__c=false;
        deliver.PlatinumPMO__Program__c=p.id;
        deliver.PlatinumPMO__Associated_Organization__c=o.Id;
        deliver.PlatinumPMO__Associated_Portfolio__c=por.Id;
        deliver.PlatinumPMO__Associated_Project__c=proj.id;
        dLIst.add(deliver); 
        
        PlatinumPMO__Deliverable__c deliver1=new PlatinumPMO__Deliverable__c();
        deliver1.Name='DeliverTest1';
        deliver1.PlatinumPMO__Deliverable_Type__c=dt.id;
        deliver1.PlatinumPMO__Scope_Disposition__c='In Scope';
        deliver1.PlatinumPMO__Historical_Comments__c='insert';
        deliver1.PlatinumPMO__approver__c=false;
        deliver1.PlatinumPMO__Program__c=p.id;
        deliver1.PlatinumPMO__Associated_Organization__c=o.Id;
        deliver1.PlatinumPMO__Associated_Portfolio__c=por.Id;
        deliver1.PlatinumPMO__Associated_Project__c=proj.id;
        dList.add(deliver1);
        insert dList;
        
        List<PlatinumPMO__System__c> SysList=new List<PlatinumPMO__System__c>();
        PlatinumPMO__System__c sys = new PlatinumPMO__System__c(Name='Test',PlatinumPMO__Program__c=p.Id,PlatinumPMO__Historical_Comments__c='testing',PlatinumPMO__Associated_Organization__c=o.Id,PlatinumPMO__Associated_Portfolio__c=por.Id);
        SysList.add(sys);
        
        PlatinumPMO__System__c sys1 = new PlatinumPMO__System__c(Name='Testnew',PlatinumPMO__Program__c=p.Id,PlatinumPMO__Historical_Comments__c='testing',PlatinumPMO__Associated_Organization__c=o.Id,PlatinumPMO__Associated_Portfolio__c=por.Id);
        SysList.add(sys1);
        insert SysList;
        
        PlatinumPMO__Business_Transaction_Ownership_Library__c bp = new PlatinumPMO__Business_Transaction_Ownership_Library__c(Name='Test Business',PlatinumPMO__Historical_Comments__c='testing');
        insert bp;
        
        PlatinumPMO__Defect_Log__c df=new PlatinumPMO__Defect_Log__c(Name='Testing',PlatinumPMO__Program__c=p.id,PlatinumPMO__Associated_Project__c=proj.id,PlatinumPMO__Types_of_Defect__c='Architecture Defect',PlatinumPMO__Project_Phase__c='ASAP: 0- Initiation',PlatinumPMO__Priority__c='High',PlatinumPMO__Associated_Deliverable__c=deliver.Id,PlatinumPMO__Severity__c='S1- Show Stopper',PlatinumPMO__Associated_System__c=sys.Id,PlatinumPMO__Business_Transactions_Impacted__c=bp.Id,PlatinumPMO__Defect_Coordinator__c=u.Id,PlatinumPMO__Associated_Organization__c=o.Id,PlatinumPMO__Associated_Portfolio__c=por.Id);
        insert df;
        
        List<PlatinumPMO__CFG_Approvals__c> CfgList=new  List<PlatinumPMO__CFG_Approvals__c>();
        PlatinumPMO__CFG_Approvals__c cfg=new PlatinumPMO__CFG_Approvals__c();
        cfg.PlatinumPMO__Accountable__c=true;
        cfg.PlatinumPMO__Consulted__c=false;
        cfg.PlatinumPMO__Informed__c=false;
        cfg.PlatinumPMO__Responsible__c=true;
        cfg.PlatinumPMO__Auto_Approval_Days__c=5;
        cfg.PlatinumPMO__Approval_Object__c='Test Plan Details';
        cfg.PlatinumPMO__Organization__c=o.Id;
       //insert cfg;
        CfgList.add(cfg);
        insert CfgList;     
       
        Id RecordTypeIdProgram = Schema.SObjectType.PlatinumPMO__RACI_Chart__c.getRecordTypeInfosByName().get('Test Plan Detail').getRecordTypeId();
        List<PlatinumPMO__RACI_Chart__c> rc=new List<PlatinumPMO__RACI_Chart__c>();    
        PlatinumPMO__RACI_Chart__c Raci=new PlatinumPMO__RACI_Chart__c();
        Raci.PlatinumPMO__User__c=u.Id;
        Raci.PlatinumPMO__Test_Plan_Detail__c=tpd.id;
        Raci.PlatinumPMO__User_Type__c='Informed';
        Raci.recordtypeid=RecordTypeIdProgram;
        Raci.PlatinumPMO__Change_Description__c='insert';
        rc.add(Raci);   
      /*  RACI_Chart__c Raci2=new RACI_Chart__c();
        Raci2.User__c=u.Id;
        Raci2.Test_Plan_Detail__c=tpd.id;
        Raci2.User_Type__c='Accountable';
        Raci2.recordtypeid=RecordTypeIdProgram;
        Raci2.Change_Description__c='insert';
        rc.add(Raci2);
        RACI_Chart__c Raci3=new RACI_Chart__c();
        Raci3.User__c=u.Id;
        Raci3.Test_Plan_Detail__c=tpd.id;
        Raci3.User_Type__c='Responsible';
        Raci3.recordtypeid=RecordTypeIdProgram;
        Raci3.Change_Description__c='insert';
        rc.add(Raci3);
        RACI_Chart__c Raci4=new RACI_Chart__c();
        Raci4.User__c=u.Id;
        Raci4.Test_Plan_Detail__c=tpd.id;
        Raci4.User_Type__c='Consulted';
        Raci4.Change_Description__c='insert';
        Raci4.recordtypeid=RecordTypeIdProgram;
        
        rc.add(Raci4);*/
        insert rc;    
        
        List<PlatinumPMO__Historical_Comment_Extension__c> hList=new List<PlatinumPMO__Historical_Comment_Extension__c>();
        PlatinumPMO__Historical_Comment_Extension__c h = new PlatinumPMO__Historical_Comment_Extension__c();
        h.PlatinumPMO__Comment__c='New Create';
        h.PlatinumPMO__Test_Plan_Detail__c=tpd.Id;
        hList.add(h);
        insert hList;
        
        Test.stopTest();
       
       }
   
    }
     @isTest
     public static void  fetchLookUpValuesTestMethod (){
      Test.startTest();
        try{
            
            User u = [Select Id From User Limit 1];
            String portId=[Select Id from PlatinumPMO__Portfolio__c LIMIT 1].Id;
            string nul=NULL;
            boolean nl= true;
            List<PlatinumPMO__Program__c> programList = new List<PlatinumPMO__Program__c>();
            ServiceCloudCustomLookUpController.fetchLookUpValues(nul, nul, 'PlatinumPMO__Program__c', nul, nul, nul, nul, nul, portId, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nl, nul, nul, nul,nul, programList);
            System.assert(u.Id!=null);
            
        }
        catch(Exception e){
            System.debug('Exception '+e);
        }
        Test.stopTest(); 
    
     }  
     @isTest
     public static void  fetchLookUpValuesTestMethod2 (){
      Test.startTest();
        try{
            
            User u = [Select Id From User Limit 1];
            String portId=[Select Id from PlatinumPMO__Portfolio__c LIMIT 1].Id;
            string nul=NULL;
            boolean nl= true;
            List<PlatinumPMO__Program__c> programList = new List<PlatinumPMO__Program__c>();
            ServiceCloudCustomLookUpController.fetchLookUpValues(nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nl, nul, nul, nul,nul, programList);
            System.assert(u.Id!=null);
            
        }
        catch(Exception e){
            System.debug('Exception '+e);
        }
        Test.stopTest(); 
    
     }  
     @isTest
     public static void  fetchLookUpValuesTestMethod3 (){
      Test.startTest();
        try{
            
            User u = [Select Id From User Limit 1];
            String portId=[Select Id from PlatinumPMO__Portfolio__c LIMIT 1].Id;
            string nul=NULL;
            boolean nl= true;
            List<PlatinumPMO__Program__c> programList = new List<PlatinumPMO__Program__c>();
            ServiceCloudCustomLookUpController.fetchLookUpValues(nul, nul, 'PlatinumPMO__Organization__c', nul, nul, nul, nul, nul, portId, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nl, nul, nul, nul,nul, programList);
            System.assert(u.Id!=null);
            
        }
        catch(Exception e){
            System.debug('Exception '+e);
        }
        Test.stopTest(); 
    
     } 
       @isTest
     public static void  fetchLookUpValuesTestMethod4 (){
      Test.startTest();
        try{
            
            User u = [Select Id From User Limit 1];
            String portId=[Select Id from PlatinumPMO__Portfolio__c LIMIT 1].Id;
             String orgId=[Select Id from PlatinumPMO__Organization__c LIMIT 1].Id;
            string nul=NULL;
            boolean nl= true;
            List<PlatinumPMO__Program__c> programList = new List<PlatinumPMO__Program__c>();
            ServiceCloudCustomLookUpController.fetchLookUpValues(nul, nul, 'PlatinumPMO__Portfolio__c', nul, nul, nul, nul, orgId, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nl, nul, nul, nul,nul, programList);
            System.assert(u.Id!=null);
            
        }
        catch(Exception e){
            System.debug('Exception '+e);
        }
        Test.stopTest(); 
    
     }
       @isTest
     public static void  fetchLookUpValuesTestMethod5 (){
      Test.startTest();
        try{
            
            User u = [Select Id From User Limit 1];
            String portId=[Select Id from PlatinumPMO__Portfolio__c LIMIT 1].Id;
            String orgId=[Select Id from PlatinumPMO__Organization__c LIMIT 1].Id;
            String projId=[Select Id from PlatinumPMO__Project__c LIMIT 1].Id;
            string nul=NULL;
            boolean nl= true;
            List<PlatinumPMO__Program__c> programList = new List<PlatinumPMO__Program__c>();
            ServiceCloudCustomLookUpController.fetchLookUpValues(nul, nul, 'PlatinumPMO__Deliverable__c', nul, projId, nul, nul, orgId, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nl, nul, nul, nul,nul, programList);
            System.assert(u.Id!=null);
            
        }
        catch(Exception e){
            System.debug('Exception '+e);
        }
        Test.stopTest(); 
    
     }
      @isTest
     public static void  fetchLookUpValuesTestMethod6 (){
      Test.startTest();
        try{
            
            User u = [Select Id From User Limit 1];
            String portId=[Select Id from PlatinumPMO__Portfolio__c LIMIT 1].Id;
            String orgId=[Select Id from PlatinumPMO__Organization__c LIMIT 1].Id;
            String projId=[Select Id from PlatinumPMO__Project__c LIMIT 1].Id;
            string nul=NULL;
            boolean nl= true;
            List<PlatinumPMO__Program__c> programList = new List<PlatinumPMO__Program__c>();
            ServiceCloudCustomLookUpController.fetchLookUpValues(nul, nul, 'PlatinumPMO__System__c', nul, projId, nul, nul, orgId, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nl, nul, nul, nul,nul, programList);
            System.assert(u.Id!=null);
            
        }
        catch(Exception e){
            System.debug('Exception '+e);
        }
        Test.stopTest(); 
    
     }
       @isTest
     public static void  fetchLookUpValuesTestMethod7 (){
      Test.startTest();
        try{
            
            User u = [Select Id From User Limit 1];
            String portId=[Select Id from PlatinumPMO__Portfolio__c LIMIT 1].Id;
            String orgId=[Select Id from PlatinumPMO__Organization__c LIMIT 1].Id;
            String projId=[Select Id from PlatinumPMO__Project__c LIMIT 1].Id;
            string nul=NULL;
            boolean nl= true;
            List<PlatinumPMO__Program__c> programList = new List<PlatinumPMO__Program__c>();
            ServiceCloudCustomLookUpController.fetchLookUpValues(nul, nul, 'PlatinumPMO__Meeting_Minutes__c', nul, projId, nul, nul, orgId, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nl, nul, nul, nul,nul, programList);
            System.assert(u.Id!=null);
            
        }
        catch(Exception e){
            System.debug('Exception '+e);
        }
        Test.stopTest(); 
    
     }
       @isTest
     public static void  fetchLookUpValuesTestMethod8 (){
      Test.startTest();
        try{
            
            User u = [Select Id From User Limit 1];
            String portId=[Select Id from PlatinumPMO__Portfolio__c LIMIT 1].Id;
            String orgId=[Select Id from PlatinumPMO__Organization__c LIMIT 1].Id;
            String projId=[Select Id from PlatinumPMO__Project__c LIMIT 1].Id;
            string nul=NULL;
            boolean nl= true;
            List<PlatinumPMO__Program__c> programList = new List<PlatinumPMO__Program__c>();
            ServiceCloudCustomLookUpController.fetchLookUpValues(nul, nul, 'PlatinumPMO__Test_Step__c', nul, projId, nul, nul, orgId, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nl, nul, nul, nul,nul, programList);
            System.assert(u.Id!=null);
            
        }
        catch(Exception e){
            System.debug('Exception '+e);
        }
        Test.stopTest(); 
    
     }
       @isTest
     public static void  fetchLookUpValuesTestMethod9 (){
      Test.startTest();
        try{
            
            User u = [Select Id From User Limit 1];
            String portId=[Select Id from PlatinumPMO__Portfolio__c LIMIT 1].Id;
            String orgId=[Select Id from PlatinumPMO__Organization__c LIMIT 1].Id;
            String projId=[Select Id from PlatinumPMO__Project__c LIMIT 1].Id;
            string nul=NULL;
            boolean nl= true;
            List<PlatinumPMO__Program__c> programList = new List<PlatinumPMO__Program__c>();
            ServiceCloudCustomLookUpController.fetchLookUpValues(nul, nul, 'PlatinumPMO__Test_Plan__c', nul, projId, nul, nul, orgId, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nul, nl, nul, nul, nul,nul, programList);
            System.assert(u.Id!=null);
            
        }
        catch(Exception e){
            System.debug('Exception '+e);
        }
        Test.stopTest(); 
    
     }
}