import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { TaiwanMapService } from './taiwan-map.service';
@Component({
  selector: 'app-taiwan-map',
  templateUrl: './taiwan-map.component.html',
  styleUrls: ['./taiwan-map.component.scss'],
})
export class TaiwanMaplComponent {
  constructor(private taiwanMapService: TaiwanMapService) {}

  ngOnInit() {
    const that = this;
    let svg = d3
      .select('#canvas')
      .append('svg')
      .style('height', 750)
      .style('width', 800);

    let tooltip = d3.select('#tooltip');

    d3.select('#canvas').on('mousemove', function (e) {
      tooltip.style('left', 20).style('bottom', 35);
    });

    // 讓d3抓GeoJSON檔，並寫入path的路徑
    d3.json('../../assets/dist/taiwan.topojson.json').then((taiwan: any) => {
      const counties = topojson.feature(
        taiwan,
        taiwan.objects.COUNTY_MOI_1090820
      );

      const projection = d3
        .geoMercator()
        .center([123, 24])
        .scale(10000)
        .translate([900, 800 / 2.5]);
      const path = d3.geoPath().projection;

      svg
        .selectAll('.geo-path')
        .data((counties as any).features)
        .join('path')
        .attr('class', 'geo-path')
        .attr('d', path(projection) as any)
        .style('stroke', 'white')
        .on('mouseover', function () {
          d3.select(this)
            .style('fill', '#FFCA28')
            .style('opacity', 0.5)
            .transition()
            .style('transform', 'translateY(-5px)');
          const d: Array<any> = d3.select(this).data();
          tooltip.select('.text1').html(d[0].properties.COUNTYNAME);
          tooltip.select('.text2').html(d[0].properties.COUNTYENG);
          tooltip.style('display', 'block');
        })
        .on('mouseleave', function () {
          d3.select(this)
            .style('fill', 'black')
            .style('opacity', 1)
            .transition()
            .style('transform', 'translateY(0)');
          tooltip.style('display', 'none');
        })
        .on('click', function () {
          const d: Array<any> = d3.select(this).data();
          console.log(d);
          that.taiwanMapService.close();
        });

      // svg
      //   .selectAll('text')
      //   .data((counties as any).features)
      //   .enter()
      //   .append('text')
      //   .attr('x', (d: any) => {
      //     return path(projection).centroid(d)[0];
      //   })
      //   .attr('y', (d: any) => {
      //     return path(projection).centroid(d)[1];
      //   })
      //   .attr('text-anchor', 'middle')
      //   .attr('font-size', '8px')
      //   .text((d: any) => {
      //     return d.properties.COUNTYNAME;
      //   });
    });
  }
}
