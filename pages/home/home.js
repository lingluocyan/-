// pages/home/home.js
import {
  getMultData,
  getGoodsList
} from '../../service/home.js'
const TOP_DISTANCE = 1000;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner: '',
    recommend: '',
    tabList: ['流行', '精选', '新款'],
    currentType: 'pop',
    scrollVal: 0,
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0,
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.data.list = getMultData()
    this._getMultData()
    this._getGoodsList(this.data.currentType)
  },
  tabClick(data) {
    console.log(data, '返回数据')
    let newType = data.detail.index === 0 ? 'pop' : data.detail.index === 1 ? 'new' : data.detail.index === 2 ? 'sell' : ''
    console.log(newType, 'new')
    this.setData({
      currentType: newType
    })
    this._getGoodsList(this.data.currentType)
  },
  // ----------获取轮播图和精品推荐数据-------
  _getMultData() {
    getMultData().then((res => {
      const data = res.data.data
      this.setData({
        banner: data.banner.list,
        recommend: data.recommend.list
      })
      console.log(res, '数据')
    })).catch((err) => {
      console.log(err, 'err')
    })
  },
  // --------获取tab栏数据
  _getGoodsList(type) {
    wx.showLoading({
      title: '加载中',
    })
    // 动态获取页码
    let pagesize = this.data.goods[type].page + 1
    // 发送请求
    getGoodsList(type, pagesize).then(res => {
      console.log(res, 'tab数据')
      console.log(type, 'type数据')
      const list = res.data.data.list
      // 动态修改数据，展开运算符，每次把新数据放到后面类似push
      let oldList = [...this.data.goods[type].list, ...list]
      // 不能再setData中用模板字符串因此拿出来用
      let typeKey = `goods.${type}.list`
      let pageKey = `goods.${type}.page`
      console.log(typeKey, 'tab数据')
      this.setData({
        // 如果不加这个【】就会变成修改typeKey,加上之后才识别为变量
        [typeKey]: oldList,
        [pageKey]: pagesize
      })

    })
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onReachBottom() {
    // Do something when page reach bottom.
    console.log('============')
    this._getGoodsList(this.data.currentType)
  },
  onPageScroll(options) {
    // 1.取出scrollTop
    const scrollTop = options.scrollTop;
    // console.log(scrollTop)

    // 2.修改showBackTop属性
    // 官方: 不要再滚动的函数回调中频繁的调用this.setData
    // 滚动大于1000为true
    const flag1 = scrollTop >= TOP_DISTANCE;
    if (flag1 !== this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }
    // const flag1 = scrollTop >= TOP_DISTANCE;
    // console.log(flag1,'flag1')
    // // 大于1000触发
    // if (flag1 != this.data.showBackTop) {
    //   this.setData({
    //     showBackTop: flag1
    //   })
    // }

    // 3.修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop;
    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  },
  // onPageScroll(option) {
  //   let flag = true
  //   this.setData({
  //     scrollVal: option.scrollTop
  //   })
  // },
  loadOk() {
    wx.createSelectorQuery().select('#tab-Conrtol').boundingClientRect(rect => {
      this.setData({
        tabScrollTop: rect.top
      })
      // this.data.tabScrollTop = rect.top
    }).exec()
    console.log('dddddddd')
  }
})