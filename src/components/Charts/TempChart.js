import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
import moment from 'moment';

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";

// core components
import { tempChart } from "variables/charts";

class TempChart extends Component {
  static proptypes = {
    fbTempList: PropTypes.array
  }

  static defaultProps = {
    fbTempList: [],
  };

  getTodayTemp = () => {
    const { fbTempList } = this.props;
    const hoursArray = [...Array(25).keys()].reverse();
    const trueValues = [];

    hoursArray.forEach(hour => {
      const selectedHour = moment().subtract(hour, 'hour')
      fbTempList && fbTempList.forEach(data => {
        if (data.createdAt && moment(data.createdAt.toDate()).isSame(selectedHour, 'hour')) {
          trueValues.push(data.temperature)
        }
      })
    });
    return trueValues
  }

  getTodayHum = () => {
    const { fbTempList } = this.props;
    const hoursArray = [...Array(25).keys()].reverse();
    const trueValues = [];

    hoursArray.forEach(hour => {
      const selectedHour = moment().subtract(hour, 'hour')
      fbTempList && fbTempList.forEach(data => {
        if (data.createdAt && moment(data.createdAt.toDate()).isSame(selectedHour, 'hour')) {
          trueValues.push(data.humidity)
        }
      })
    });
    return trueValues
  }

  getHour = hours => moment().subtract(hours, 'hour').format('HH')

  render() {
    const hoursArray = [...Array(24).keys()].reverse();
    const hoursLabels = hoursArray.map(hour => this.getHour(hour));

    return (
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">Temperature last 24 hours</h5>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="chart-area">
            <Line
              data={
                canvas => {
                  let ctx = canvas.getContext("2d");
                  let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
                  gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
                  gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
                  gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

                  return {
                    labels: hoursLabels,
                    datasets:
                      [{
                        label: "Degrees",
                        // fill: true,
                        lineTension: 0.1,
                        backgroundColor: "#253D62",
                        borderColor: "#1f8ef1", // The main line color
                        borderWidth: 2,
                        borderCapStyle: 'square',
                        borderDash: [], // try [5, 15] for instance
                        borderDashOffset: 0.0,
                        // borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 1,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: "white",
                        pointHoverBorderColor: "white",
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 10,
                        // notice the gap in the data and the spanGaps: true
                        data: this.getTodayTemp(),
                        spanGaps: true,
                      }, {
                        label: "Humidity",
                        lineTension: 0.1,
                        backgroundColor: gradientStroke,
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderCapStyle: 'square',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBorderColor: "black",
                        pointBackgroundColor: "white",
                        pointBorderWidth: 1,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: "white",
                        pointHoverBorderColor: "white",
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        // notice the gap in the data and the spanGaps: false
                        data: this.getTodayHum(),
                        spanGaps: true,
                      }
                      ]
                  };
                }
              }
              options={tempChart.options}
            />
          </div>
        </CardBody>
      </Card>
    )
  }
}

export default TempChart;
