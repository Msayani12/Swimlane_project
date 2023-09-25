import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import dhtmlxDiagramResource from '@salesforce/resourceUrl/DHTMLXSwimlane'; 
import cdnDHTMLXjs from '@salesforce/resourceUrl/cdnDHTMLXjs'; 
import cdnDHTMLXcss from '@salesforce/resourceUrl/cdnDHTMLXcss'; 


export default class DhtmlxDiagram extends LightningElement {
  connectedCallback() {
    console.log("Under Connected Callback");
    Promise.all([
      loadScript(this, cdnDHTMLXjs),
      loadStyle(this, cdnDHTMLXcss),
    ])
      .then(() => {
        console.log("Under Promise Resolve state");
        const diagramContainer = this.template.querySelector('.diagram-container');
        const diagram = new dhx.Diagram(diagramContainer, {
          type:"swimlanes"
        });

        diagram.data.parse(this.getSwimlaneData()); 
      })
      .catch((error) => {
        console.error('Error loading DHTMLX Diagram:', error);
      });
  }
  getSwimlaneData() {
    return {
        data: [
            { id: 'lane1', text: 'Lane 1' },
            { id: 'lane2', text: 'Lane 2' },
        ],
        lanes: [
            { id: 'lane1', parent: 'root' },
            { id: 'lane2', parent: 'root' }
        ],
        shapes: [
            { id: 'node1', text: 'Node 1', lane: 'lane1' },
            { id: 'node2', text: 'Node 2', lane: 'lane1' },
            { id: 'node3', text: 'Node 3', lane: 'lane2' }
        ],
        connectors: []
    }
  }
}