// read in samples.json
const samples = "https://raw.githubusercontent.com/sissa81/Belly-Button-Biodiversity/main/Biodiversity/data/samples.json";
// const samples = "samples.json";

// Fetch the JSON data and console log it
d3.json(samples).then(function(data) {
    console.log(data);


// Create Default Horizontal Bar Chart
function barchart () {    
    var bardata = [{
        x: data.samples[0]["sample_values"].slice(0,10).reverse(),
        y: data.samples[0]["otu_ids"].slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h',
        text: data.samples[0]["otu_labels"].slice(0,10).reverse(),
        marker: {
            color: 'rgb(0,65,130)'
        }
    }];
  
    var barlayout = {        
        title: 'Top 10 OTUs',
        hovermode: 'closest',
        yaxis: {
            type: 'category',
            tickprefix: 'OTU '
        },
        height: 600,
        width: 350,
        showlegend: false
    };
  
    Plotly.newPlot('bar', bardata, barlayout);
  };


// Create Default Bubble Chart
function bubblechart() {
    var bubbledata = [{
        x: data.samples[0]["otu_ids"],
        y: data.samples[0]["sample_values"],
        text: data.samples[0]["otu_labels"],
        mode: 'markers',        
        marker: {
            size: data.samples[0]["sample_values"],
            color: data.samples[0]["otu_ids"]
        }
    }];

    var bubblelayout = {        
        title: "Samples",
        xaxis: {
            title: "OTU ID"
        },
        height: 600,
        width: 1600,
        showlegend: false
    };

    Plotly.newPlot('bubble', bubbledata, bubblelayout)
};

// Create Deafult Demographic Info
function demographics() {
    var 
}


// This function is called when a dropdown menu item is selected
function updatePlotly() {    
    var dropdownMenu = d3.select("#selDataset");    
    var dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays
    var x = [];
    var y = [];
  
     
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
  }
  
  barchart();
  bubblechart();
  demographics();
});