<template>
  <div class="111">
    <div class="Echarts">
      <div id="main" style="width: 100%; height: 800px"></div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import dateFormat from '../utils/date-format'
// 引入 ECharts 主模块
import echarts from "echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
// 引入扇形图
import "echarts/src/chart/pie";
import { fetchPieList } from "@/api/site";

export default {
  data() {
    return {
      myChart: {},
      option: {},
      oldata: [
        { value: 20, name: "rose 1" },
        { value: 30, name: "rose 2" },
        { value: 50, name: "rose 3" },
      ], //ajax返回的数据
    };
  },
  created() {
    this.fetchPieList();
  },
  watch: {
    oldata: {
      immediate: true,
      handler() {
        this.updateEcharts();
      },
    },
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("main"));
    this.updateEcharts();
  },
  methods: {
    async fetchPieList() {
      let ret = await fetchPieList();
      this.oldata = ret.data;
    },
    updateEcharts() {
      // 指定图表的配置项和数据
      this.option = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 12,
            },
            //重点
            label: {
              normal: {
                formatter: "{b}:\n{d}%",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 18,
                },
              },
            },
            data: this.oldata,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(this.option);
    },
  },
};
</script>
