import { LightningElement } from 'lwc';
import jointJs from '@salesforce/resourceUrl/JointJSLibrary' 
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
export default class SwimLaneDaigram extends LightningElement {

    connectedCallback(){
       Promise.all([
        loadStyle(this, jointJs+'/jointJs/joint.css'),
        loadScript(this, jointJs+'/jointJs/jquery.js'),
        loadScript(this, jointJs+'/jointJs/lodash.js'),
        loadScript(this, jointJs+'/jointJs/backbone.js'),
        loadScript(this, jointJs+'/jointJs/joint.js')

       ]).then(()=>{
        this.buildChart();
       }).catch((error)=>{
            console.error(error.message);
       });
    }

    buildChart(){
        try{
            var namespace = joint.shapes;

            var graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    
            var paper = new joint.dia.Paper({
                el: document.getElementById('myholder'),
                model: graph,
                width: 600,
                height: 100,
                gridSize: 1,
                cellViewNamespace: namespace
            });
    
            var rect = new joint.shapes.standard.Rectangle();
            rect.position(100, 30);
            rect.resize(100, 40);
            rect.attr({
                body: {
                    fill: 'blue'
                },
                label: {
                    text: 'Hello',
                    fill: 'white'
                }
            });
            rect.addTo(graph);
    
            var rect2 = rect.clone();
            rect2.translate(300, 0);
            rect2.attr('label/text', 'World!');
            rect2.addTo(graph);
    
            var link = new joint.shapes.standard.Link();
            link.source(rect);
            link.target(rect2);
            link.addTo(graph); 
        }
        catch(error){
            console.error(error.message);
        }
    }
}