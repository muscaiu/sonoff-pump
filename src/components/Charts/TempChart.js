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

import { chart_temp_options } from "variables/charts";
import withFetching from 'hocs/withFetching';

class TempChart extends Component {
  static proptypes = {
    fbTempList: PropTypes.array
  }

  static defaultProps = {
    fbTempList: [],
  };

  getTodayTemp = () => {
    const { fbTempList } = this.props;
    const hoursArray = [...Array(26).keys()].reverse();
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
    const hoursArray = [...Array(26).keys()].reverse();
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
    const { temperature } = this.state;

    console.log(this.props)
    return (
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">Temperature & Humidity ({temperature})</h5>
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
                        label: "Temperature",
                        lineTension: 0.1,
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: "#d048b6",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#d048b6",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#d048b6",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        // notice t`he gap in the data and the spanGaps: true
                        data: this.getTodayTemp(),
                        spanGaps: true,
                      }, {
                        hidden: true,
                        label: "Humidity",
                        lineTension: 0.1,
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: "#00d6b4",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#00d6b4",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#00d6b4",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        // notice the gap in the data and the spanGaps: false
                        data: this.getTodayHum(),
                        spanGaps: true,
                      }
                      ]
                  };
                }
              }
              options={chart_temp_options}
            />
          </div>
        </CardBody>
      </Card>
    )
  }
}

export default withFetching('http://cassusa.go.ro:3001/api/statuspompa')(TempChart);
