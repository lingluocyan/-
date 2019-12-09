// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCurrent(event) {
      let index = event.currentTarget.dataset.index
      console.log(this.properties.list,'dd')
      let title = this.properties.list[index]
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('tabClick', {
        index: this.data.currentIndex,
        title: title
      })
    }
  }
})