

function buildMetadata(sample) {
  
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let meta_id= d3.select("#sample-metadata");

    d3.json(`/metadata/${sample}`).then((sample) => {
      sample_metadata.forEach((sample) => {
        console.log(sample);
          
      
    // Use `.html("") to clear any existing metadata
        meta_id.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sample).forEach(([key, value]) => {
      console.log(key, value);
      var row = meta_id.append('tr');
  });
});
              

    

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {
  
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data
    let bubble_id= d3.select("#bubble");
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    data.slice(0,11);
    // otu_ids, and labels (10 each).----SC note: Sliced on app.py before data variable created
    let pie_id= d3.select("#pie");
    // OR let pieChart = document.querySelector('#pie');
        d3.json(`/samples/${sample}`).then((data)=>{
          let x_axis= data.otu_ids
          let y_axis= data.sample_values
          let text=data.otu_labels
          let layout = {
                title: "Belly button"}
            Plotly.plot("pie", data, layout);
        });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
