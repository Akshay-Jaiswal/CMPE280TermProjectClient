// Step 1 - Including react
import React from "react";
import axios from "axios";

// Step 2 - Including the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Including the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Including the map renderer
import FusionMaps from "fusioncharts/fusioncharts.maps";

// Step 5 - Including the map definition file
// import World from "fusioncharts/maps/fusioncharts.world";

import USA from "fusioncharts/maps/fusioncharts.usa";

// Step 6 - Including the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 7 - Adding the map as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionMaps, USA, FusionTheme);

// Step 8 - Creating the JSON object to store the map configurations

// componentDid;

// data = [];

// Step 8 - Creating the DOM element to pass the react-fusioncharts component
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.showPlotValue = this.showPlotValue.bind(this);
  }
  state = {
    result: [],
    stateLabel: ""
  };
  tempState = {};
  chartConfigs = {
    type: "usa",
    width: "100%",
    // height: "370",
    dataFormat: "json",
    dataSource: {
      // Map Configuration
      chart: {
        showToolTip: "1",
        //subcaption: " 2016",
        numbersuffix: "",
        // includevalueinlabels: "0",
        labelsepchar: "",
        entityFillHoverColor: "#FFF9C4",
        entityFillColor: "#64d9db",
        theme: "fusion"
      },
      // Aesthetics; ranges synced with the slider
      // colorrange: {
      //   minvalue: "0",
      //   // code: "#088ab2",
      //   code: "#64d9db",
      //   gradient: "110",
      //   color: [
      //     {
      //       minvalue: "0",
      //       maxvalue: "1",
      //       // color: "#32c2ef"
      //       color: "#64d9db"
      //     }
      //   ]
      // },
      // Source data as JSON --> id represents countries of world.
      data: []
    }
  };
  temp = [];
  loadData = () => {
    for (var i = 0, l = this.state.result.length; i < l; i++) {
      if(!this.state.result[i].online_reg){
        this.temp.push({
          id: this.state.result[i].state_abbv,
          color: "#64d9db",
          showLabel: 0
        });
      }
      else{
        this.temp.push({
          id: this.state.result[i].state_abbv,
          color: "#64d9db",
          showLabel: 0,
        });
      }
    }
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/elections/year/2016")
      .then(response => {
        // console.log(response.data);
        this.setState({ result: response.data });
        this.tempState = this.state;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  showPlotValue(evt, data) {
    // console.log("State : " + this.state);
    // alert("You have clicked on " + data.shortLabel + ".");
    this.setState({ stateLabel: data.shortLabel });
    this.props.action(this.state.stateLabel);
  }

  render() {
    this.loadData();
    this.chartConfigs.dataSource.data = this.temp;
    return (
      <ReactFC
        {...this.chartConfigs}
        fcEvent-entityClick={this.showPlotValue}
        // onClick={() => this.props.action(this.state.stateLabel)}
      />
    );
  }
}

// export default Map;
