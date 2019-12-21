import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core'
import * as d3 from 'd3'
import { DimensPipe } from '../pipes/dimens.pipe';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit, AfterViewInit {
  @Input('id')
  id: string;

  @Input('data')
  data: PieChartSection[];

  @ViewChild('container', { static: true })
  container;

  constructor(private _dimens: DimensPipe) {
  }

  ngOnInit() { }

  ngAfterViewInit() {
    const selector = `#${this.id}`
    const dimens = this._dimens.transform(this.container.nativeElement)
    const colors = ['#7986cb', '#64b5f6', '#4dd0e1', '#4db6ac', '#81c784', '#e0e0e0', '#dce775', '#aed581',]
    const parsedData = this.data
      .map((datum, idx) => ({ ...datum, value: datum.value }))
      .sort((a, b) => a.value < b.value ? 1 : -1)
      .reduce((acc, curr, idx) => {
        const numberOfGraphArcs = 5
        if (idx < numberOfGraphArcs) return [...acc, curr]
        else if (idx > numberOfGraphArcs) {
          const lastElement = acc[acc.length - 1]
          lastElement.value += curr.value
          return [...acc.splice(0, numberOfGraphArcs), lastElement]
        } else {
          return [...acc, { ...curr, label: 'others' }]
        }
      }, [])
      .map((datum, idx) => ({ ...datum, color: colors[idx] }))

    const length = parsedData.length

    const reOrderredData = [parsedData[length - 1], ...parsedData.splice(0, length - 2)]

    this.renderGraph(selector, dimens, reOrderredData.reverse())

  }

  renderGraph = (selector, dimens, parsedData) => {
    const [containerWidth, containerHeight] = dimens
    const get_center_angle = d => (d.startAngle + d.endAngle) / 2
    const convert_polar_to_scaler_cordinates = (radius, angle) => ({ x: radius * Math.cos(angle - Math.PI / 2), y: radius * Math.sin(angle - Math.PI / 2) })

    const determineTextAnchor = angle => {
      if (angle > Math.PI) {
        return "end"
      } else if (angle > 270 * Math.PI / 180) {
        return "middle"
      }
      return "start"
    }

    // set the dimensions and margins of the graph
    var width = containerWidth
    var height = containerHeight
    var margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract 2/3 of margin.
    var radius = Math.min(width, height) / 3

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select(selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style('justify-self', 'center')
      .append("g")
      .attr("transform", "translate(" + width / 2.5 + "," + height / 2 + ")")

    // create 2 data_set
    var data1 = { a: 9, b: 20, c: 30, d: 8, e: 12 }
    var data2 = { a: 6, b: 16, c: 20, d: 14, e: 19, f: 12 }

    // A function that create / update the plot for a given variable:
    function update(data) {

      // Compute the position of each group on the pie:
      const pie = d3.pie()
        .value(function (d) { return d.value; })
        .sort(null)

      const data_ready = pie(data)

      // map to data
      const u = svg.selectAll("path")
        .data(data_ready)

      const enter = u.enter()

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      enter.append('path')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr('fill', function (d) { return d.data.color })
        .attr('stroke-width', 1)
        .attr('stroke', 'white')
        .attr('class', 'arc')
        .style("opacity", 1)

      //add the circles
      enter.append('circle')
        .attr("fill", 'white')
        .attr('stroke', '#eee')
        .attr('stroke-width', 1)
        .attr('r', 5)
        .attr('filter', function (d, i) {
          return `drop-shadow(0 0 4px ${d.data.color})`
        })
        .attr('class', 'small_circle')
        .attr('cx', function (d) {
          const centerAngle = get_center_angle(d)
          return convert_polar_to_scaler_cordinates(radius, centerAngle).x
        })
        .attr('cy', function (d) {
          const centerAngle = get_center_angle(d)
          return convert_polar_to_scaler_cordinates(radius, centerAngle).y
        })

      //add the labels
      enter.append('text')
        .style("font", "bold 13px Roboto")
        .style("fill", '#0f0f0f')
        .attr('x', function (d) {
          const centerAngle = get_center_angle(d)
          return convert_polar_to_scaler_cordinates(radius + 8, centerAngle).x
        })
        .attr('y', function (d) {
          const centerAngle = get_center_angle(d)
          return convert_polar_to_scaler_cordinates(radius + 8, centerAngle).y
        })
        .attr('text-anchor', function (d) {
          const centerAngle = get_center_angle(d)
          return determineTextAnchor(centerAngle)
        })
        .text(function (d) { return d.data.label })

      // remove the group that is not present anymore
      u
        .exit()
        .remove()

    }

    // Initialize the plot with the first dataset
    update(parsedData)
  }


}


export interface PieChartSection {
  value: number;
  label: string;
}