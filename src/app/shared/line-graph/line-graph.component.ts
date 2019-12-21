import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import * as d3 from 'd3'
import { DimensPipe } from '../pipes/dimens.pipe';

interface LineData {
  x: number;
  y: number;
}

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit, AfterViewInit {

  @Input()
  data: LineData[];

  @Input()
  id = 'line_chart';

  @Input('color')
  color = 'teal'

  @ViewChild('line_chart', { static: false })
  line_chart: any;

  constructor(private readonly dimens_pipe: DimensPipe) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const dimens = this.dimens_pipe.transform(this.line_chart.nativeElement)
    this.render(
      dimens,
      this.data,
      this.id,
      this.color,
    )

  }


  render = (
    dimens: number[],
    data: LineData[],
    id: string,
    color: string,
  ) => {
    const margin = { top: 16, right: 16, bottom: 20, left: 50 },
      width = dimens[0] - margin.left - margin.right,
      height = dimens[1] - margin.top - margin.bottom;

    let selector = `#${id}`;

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    //scales, axis, domains and ranges.
    const xScale = d3.scalePoint()
      .domain(months)
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max([...data], function (d) { return d.y; }) + 10])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale)

    function make_y_gridlines() {
      return d3
        .axisLeft(yScale)
        .ticks(8)
    }

    //Area generator
    const areaGenerator = d3.area()
      .curve(d3.curveMonotoneX) //smoothing of the curve here
      .x(function (d) { return xScale(d.x); })
      .y0(height)
      .y1(function (d) { return yScale(d.y); });

    //Line generator 
    var lineGenerator = d3.line()
      .x(function (d) { return xScale(d.x); }) // set the x values for the line generator
      .y(function (d) { return yScale(d.y); }) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

    d3.select(selector)
      .selectAll('*')
      .remove();

    let svg = d3
      .selectAll(selector)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.bottom + margin.top)
      .style('justify-self', 'center')
      .append('g')
      .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")")


    //Append the gridlines before the y axis. hint why: z-index
    svg.append("g")
      .attr("class", "horizontal_grid_line")
      .call(
        make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      );

    //draw area
    svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", areaGenerator)
      .attr("fill", this.generateGradientAndAddtoGraph(svg, 'weioskjsd', color))


    //draw lines above area
    svg.append("path")
      .datum(data) // 10. Binds data to the line 
      .attr("class", "line") // Assign a class for styling 
      .attr("d", lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1)

    //Append the y/x-axis after the gridlines. hint why: z-index
    svg.append("g")
      .attr("class", "y_axis")
      .call(yAxis);

    svg.append("g")
      .attr("class", "x_axis")
      .attr("transform", "translate(0," + height + ")")
      .call(
        xAxis
        // .tickFormat(val => months[val - 1])
      );

  }


  generateGradientAndAddtoGraph = (svg, id, gradientColor) => {
    var defs = svg.append("defs");
    var selector = `${id}_gradient_id`
    var gradient = defs.append("linearGradient")
      .attr("id", selector)
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    //First color.
    gradient.append("stop")
      .attr('class', 'start')
      .attr("offset", "0%")
      .attr("stop-color", gradientColor)
      .attr("stop-opacity", 0.4)

    gradient.append("stop")
      .attr('class', 'end')
      .attr("offset", "100%")
      .attr("stop-color", gradientColor)
      .attr("stop-opacity", 0.0)

    return `url(#${selector})`
  }

}
