import F2 from '@antv/f2';

const PieLabel = require('@antv/f2/lib/plugin/pie-label');

function wrapEvent(e) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function() {};
  }
  return e;
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    init: {
      type: 'Function',
      value: () => {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready() {
    console.log('F2', typeof(this.data.init));

    const query = wx.createSelectorQuery().in(this);
    query.select('.f2-canvas')
      .fields({
        node: true,
        size: true
      })
      .exec(res => {
        const { node, width, height } = res[0];
        const context = node.getContext('2d');
        const pixelRatio = wx.getSystemInfoSync().pixelRatio;
        // 高清设置
        node.width = width * pixelRatio;
        node.height = height * pixelRatio;

        const config = { context, width, height, pixelRatio, plugins: PieLabel };
        const chart = this.data.init(F2, config);
        console.log('chart', this.data, chart);

        if (chart) {
          this.chart = chart;
          this.canvasEl = chart.get('el');
        }
      });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchstart', wrapEvent(e));
    },
    touchMove(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchmove', wrapEvent(e));
    },
    touchEnd(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchend', wrapEvent(e));
    }
  }
});
