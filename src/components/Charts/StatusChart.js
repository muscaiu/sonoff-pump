import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
import classNames from "classnames";
import moment from 'moment';

import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

// core components
import { chart_status_options } from "variables/charts";

class StatusChart extends Component {
    static proptypes = {
        statusList: PropTypes.array
    }

    static defaultProps = {
        statusList: [],
    };

    state = {
        chartOption: "week"
    };

    setChartOption = name => {
        this.setState({
            chartOption: name
        });
    };

    getDay = days => moment().subtract(days, 'day').format('dd')
    getDayOfMonth = days => moment().subtract(days, 'day').format('DD')
    getMonth = month => moment().subtract(month, 'month').format('MMM')

    getDailyTotal = (day) => {
        const { statusList } = this.props;
        const trueValues = [];
        const selectedDay = moment().subtract(day, 'day')
        let stopped;

        statusList && statusList.forEach((status, index) => {
            if (status.createdAt && moment(status.createdAt).isSame(selectedDay, 'day')) {
                if (status.value === false) {
                    const started = moment(status.createdAt, "YYYYMMDD HH:mm:ss")
                    trueValues.push(started && started.diff(moment(stopped), "seconds"))
                } else {
                    if (index === statusList.length - 1) {
                        trueValues.push(moment().diff(moment(status.createdAt), "seconds"))
                    } else {
                        stopped = moment(status.createdAt, "YYYYMMDD HH:mm:ss")
                    }
                }
            }
        });
        const total = trueValues.length > 0 && trueValues.reduce((acc, curr) => acc + curr)
        return total ? Math.floor(total / 60) : 0
    }

    render() {
        const { chartOption } = this.state;
        const daysArray = [6, 5, 4, 3, 2, 1, 0]
        const monthArray = [...Array(30).keys()]
        const dayLabels = daysArray.map(day => this.getDay(day))
        const monthLabels = monthArray.reverse().map(day => this.getDayOfMonth(day))
        const lastWeek = daysArray.map(day => this.getDailyTotal(day))
        // const lastMonth = monthArray.map(day => this.getDailyTotal(day))
        const totalLastWeek = (lastWeek.reduce((acc, curr) => acc + curr) / 60).toFixed(1)
        // const totalLastMonth = (lastMonth.reduce((acc, curr) => acc + curr) / 60).toFixed(1)

        return (
            <Card className="card-chart">
                <CardHeader>
                    <Row>
                        <Col className="text-left" sm="6">
                            <h5 className="card-category">{`Total Hours last ${chartOption}`}</h5>
                            <CardTitle tag="h3">
                                <i className="tim-icons icon-chart-pie-36 text-info" />{" "}
                                {chartOption === 'month' ? 0 : totalLastWeek}
                            </CardTitle>
                        </Col>
                        <Col sm="6">
                            <ButtonGroup
                                className="btn-group-toggle float-right"
                                data-toggle="buttons"
                            >
                                <Button
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: chartOption === "week"
                                    })}
                                    color="info"
                                    id="0"
                                    size="sm"
                                    onClick={() => this.setChartOption("week")}
                                >
                                    <span className="d-sm-block d-md-block d-lg-block d-xl-block">
                                        Week
                                    </span>
                                </Button>
                                <Button
                                    color="info"
                                    id="1"
                                    size="sm"
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: chartOption === "month"
                                    })}
                                    onClick={() => this.setChartOption("month")}
                                >
                                    <span className="d-sm-block d-md-block d-lg-block d-xl-block">
                                        Month
                                    </span>
                                </Button>
                            </ButtonGroup>
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
                                        labels: chartOption === 'month' ? monthLabels : dayLabels,
                                        datasets: [
                                            {
                                                label: "minutes",
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
                                                data: chartOption === 'month' ? 0 : lastWeek
                                            }
                                        ]
                                    };
                                }
                            }
                            options={chart_status_options}
                        />
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default StatusChart;



