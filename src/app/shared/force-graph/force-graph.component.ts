import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DimensPipe } from '../pipes/dimens.pipe';
import * as d3 from 'd3'
import { nodesAndLinks } from './../../../app/services/store/nodes'
import { StoreService } from 'src/app/services/store/store.service';


@Component({
  selector: 'app-force-graph',
  templateUrl: './force-graph.component.html',
  styleUrls: ['./force-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForceGraphComponent implements OnInit, AfterViewInit, OnDestroy {

  // @Input('id')
  id: string = 'ioiowe';

  @Input('data')
  data: any[]

  @ViewChild('container', { static: false })
  container: any;

  stopSimulation = false;

  constructor(private readonly dimens_pipe: DimensPipe, private readonly _store_service: StoreService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let dimens = this._store_service.dimens
    if (dimens[0] === 0) {
      dimens = this.dimens_pipe.transform(this.container.nativeElement)
      this._store_service.dimens = dimens
    }
    this.renderGraph(nodesAndLinks, dimens, `#${this.id}`)
  }

  ngOnDestroy() {
    // this.stopSimulation = true
  }

  renderGraph(nodesAndLinks, dimens: number[], ref) {

    let width = dimens[0];
    let height = dimens[1];
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let label = {
      'nodes': [],
      'links': []
    };

    nodesAndLinks.nodes.forEach(function (d, i) {
      label.nodes.push({ node: d });
      label.nodes.push({ node: d });
      label.links.push({
        source: i * 2,
        target: i * 2 + 1
      });
    });

    let labelLayout = d3.forceSimulation(label.nodes)
      .force("charge", d3.forceManyBody().strength(-50))
      .force("link", d3.forceLink(label.links).distance(0).strength(2));

    let graphLayout = d3.forceSimulation(nodesAndLinks.nodes)
      .force("charge", d3.forceManyBody().strength(-3000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(1))
      .force("y", d3.forceY(height / 2).strength(1))
      .force("link", d3.forceLink(nodesAndLinks.links).id(function (d) { return d.id; }).distance(50).strength(1))
      .on("tick", ticked);


    let adjlist = [];

    nodesAndLinks.links.forEach(function (d) {
      adjlist[d.source.index + "-" + d.target.index] = true;
      adjlist[d.target.index + "-" + d.source.index] = true;
    });

    function neigh(a, b) {
      return a == b || adjlist[a + "-" + b];
    }


    let svg = d3.select(ref)
      .append('svg')
      .attr("width", width)
      .attr("height", height)

    let container = svg.append("g");

    svg.call(
      d3.zoom()
        .scaleExtent([.1, 4])
        .on("zoom", function () { container.attr("transform", d3.event.transform); })
    );

    let link = container.append("g").attr("class", "links")
      .selectAll("line")
      .data(nodesAndLinks.links)
      .enter()
      .append("line")

      .attr("stroke", "#aaa")
      .attr("stroke-width", "1px");

    let node = container.append("g").attr("class", "nodes")
      .selectAll("g")
      .data(nodesAndLinks.nodes)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("fill", function (d) { return color(d.group); })

    node.on("mouseover", focus).on("mouseout", unfocus);

    node.call(
      d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    var labelNode = container.append("g").attr("class", "labelNodes")
      .selectAll("text")
      .data(label.nodes)
      .enter()
      .append("text")
      .text(function (d, i) { return i % 2 == 0 ? "" : d.node.id; })
      .style("fill", "#555")
      .style("font-family", "Arial")
      .style("font-size", 12)
      .style("pointer-events", "none"); // to prevent mouseover/drag capture

    node.on("mouseover", focus).on("mouseout", unfocus);

    function ticked() {
      if (this.stopSimulation) {
        graphLayout.stop()
        labelLayout.stop()
        return
      }

      node.call(updateNode);
      link.call(updateLink);

      labelLayout = labelLayout.alphaTarget(0.3).restart() || labelLayout;
      labelNode.each(function (d, i) {
        if (i % 2 == 0) {
          d.x = d.node.x;
          d.y = d.node.y;
        } else {
          var b = this.getBBox();

          var diffX = d.x - d.node.x;
          var diffY = d.y - d.node.y;

          var dist = Math.sqrt(diffX * diffX + diffY * diffY);

          var shiftX = b.width * (diffX - dist) / (dist * 2);
          shiftX = Math.max(-b.width, Math.min(0, shiftX));
          var shiftY = 16;
          this.setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
        }
      });
      labelNode.call(updateNode);

    }
    function fixna(x) {
      if (isFinite(x)) return x;
      return 0;
    }

    function focus(d) {
      var index = d3.select(d3.event.target).datum().index;
      node.style("opacity", function (o) {
        return neigh(index, o.index) ? 1 : 0.1;
      });
      labelNode.attr("display", function (o) {
        return neigh(index, o.node.index) ? "block" : "none";
      });
      link.style("opacity", function (o) {
        return o.source.index == index || o.target.index == index ? 1 : 0.1;
      });
    }

    function unfocus() {
      labelNode.attr("display", "block");
      node.style("opacity", 1);
      link.style("opacity", 1);
    }

    function updateLink(link) {
      link.attr("x1", function (d) { return fixna(d.source.x); })
        .attr("y1", function (d) { return fixna(d.source.y); })
        .attr("x2", function (d) { return fixna(d.target.x); })
        .attr("y2", function (d) { return fixna(d.target.y); });
    }

    function updateNode(node) {
      node.attr("transform", function (d) {
        return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
      });
    }

    function dragstarted(d) {
      d3.event.sourceEvent.stopPropagation();
      if (!d3.event.active) graphLayout = graphLayout.alphaTarget(0.3).restart() || graphLayout;
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) graphLayout.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }


}
