// read in samples.json
const samples = "https://raw.githubusercontent.com/sissa81/Belly-Button-Biodiversity/main/samples.json";
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
        width: 1400,
        showlegend: false
    };

    Plotly.newPlot('bubble', bubbledata, bubblelayout)
};

// Create Deafult Demographic Info
function demographics() {                
    // Select panel-body element
    var panel = d3.select(".panel-body");
    // Append default data to panel-body element
    Object.entries(data.metadata[0]).forEach(([key, value]) => {
        panel.append("panel-body").text(`${key}: ${value}`)
        panel.append("br")});
};

// Populate dropdown menu with names
function assignOptions() {
    var dropdownMenu = document.getElementById("selDataset");
    var list = data.names;
    for (var i = 0; i < list.length; i++) {
        var currentOption = document.createElement("option");
        currentOption.text = list[i];
        dropdownMenu.appendChild(currentOption);
    };
};

// Update Charts When Dropdown Changes
d3.selectAll("#selDataset").on("change", updateCharts);
function updateCharts() {
    var ddMenu = d3.select("#selDataset");
    var selected = ddMenu.property("value");
    // Make sure it's pulling a value
    console.log(selected);    
}

  barchart();
  bubblechart();
  demographics();
  assignOptions();  
  updateCharts();
});
