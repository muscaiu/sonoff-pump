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

  getTemp = () => {
    const { fbTempList } = this.props;
    const hoursArray = [...Array(24).keys()]
    const trueValues = [];
    trueValues.length = 24;
    trueValues.fill(0)

    hoursArray.forEach((hour, index) => {
      fbTempList && fbTempList.forEach((temp, i) => {
        if (temp.createdAt && parseInt(moment(temp.createdAt.toDate()).format('HH'), 10) === hour) {
          trueValues[index] = temp.temperature
        }
      })
    });
    return trueValues
  }

  render() {
    const hoursLabels = [...Array(24).keys()]

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
                    datasets: [
                      {
                        label: "°C",
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: this.getTemp()
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
