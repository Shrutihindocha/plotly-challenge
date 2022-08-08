function createHorizontalBarChart(dropDownOption){
    d3.json("././data/samples.json").then(fullDataset => {
        var filteredData = fullDataset.samples
        filteredData.filter((filteredData) => {filteredData.id == dropDownOption});
        var sample_values = filteredData[0].sample_values
        var otu_ids = filteredData[0].otu_ids
        var otu_labels = filteredData[0].otu_labels

        // console.log(sample_values)

        var data = [{
            type: 'bar',
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            orientation: 'h',
        }];
        
        var layout = {
            title: 'Bar Chart',
            autosize: false,
            width: 500,
            height: 500,
        };

        Plotly.newPlot('bar', data, layout);
    });
};

function createBubbleChart(dropDownOption) {
    d3.json("././data/samples.json").then(fullDataset => {
        var filteredData = fullDataset.samples
        filteredData.filter((filteredData) => {filteredData.id == dropDownOption});
        var sample_values = filteredData[0].sample_values
        var otu_ids = filteredData[0].otu_ids
        var otu_labels = filteredData[0].otu_labels

        var data = [
            {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                }
            }
        ];

        var layout = {
            title: "Bacteria Cultures Based on ID",
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
        };
    
        Plotly.newPlot('bubble', data, layout);
    });
};

function Metadata(dropDownOption) {
    d3.json("././data/samples.json").then((fullDataset) => {
      var metadata = fullDataset.metadata;
      var filteredData = metadata.filter(data => data.id == dropDownOption);
  
      d3.select("#sample-metadata").html("")

      Object.entries(filteredData[0]).forEach(([key, value]) => {
        d3.select("#sample-metadata")
            .append("p")
            .text(`${key.toUpperCase()}: ${value}`);
      });
    });
}

function init(){
    d3.json("././data/samples.json").then(fullDataset => {
            var dropDownOptions = fullDataset.names
            dropDownOptions.forEach(option => {
                d3.select("#selDataset")
                    .append("option")
                    .text(option)
                    .property("value", option);
                }
            );
            createHorizontalBarChart(dropDownOptions[0]);
            createBubbleChart(dropDownOptions[0]);
            Metadata(dropDownOptions[0])
        }
    );
}

init()

function optionChanged(dropDownOption){
    createHorizontalBarChart(dropDownOption);
    createBubbleChart(dropDownOption);
    Metadata(dropDownOption)
};


  