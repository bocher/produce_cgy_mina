// pages/my/my.js
var userApi = require('../../http/userApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    // isAuthUserinfo: false, // wxml无法直接使用getApp().globalData.isAuthUserinfo
    list: [{
        text: '设置',
        url: '/pages/set/set',
        num: 0
      },
      //  {
      //   text: '历史订单',
      //   url: '/pages/historyOrder/historyOrder',
      //   num: 0
      // }, 
      {
        text: '客服',
        url: '',
        // url: '/pages/service/service',
        num: 0
      }, {
        text: '关于我们',
        url: '',
        // url: '/pages/aboutUS/aboutUS',
        num: 0
      },
    ]
  },

  navigateTo: function(e) {
    let {
      url,
      text
    } = e.currentTarget.dataset;
    if (url) {
      wx.navigateTo({
        url: url,
      })
    } else {
      wx.showToast({
        title: '暂无设计' + text + '页面',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let sj_userId = wx.getStorageSync('sj_userId')
    if (sj_userId) {
      this.pageInit();
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
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

  // 页面初始化
  pageInit: function() {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
  },

  // 弹框式授权用户信息
  getUserInfo: function(e) {
    var _this = this;
    console.log(e.detail)
    let {
      errMsg,
      userInfo
    } = e.detail;
    switch (errMsg) {
      case 'getUserInfo:fail auth deny':
      case 'getUserInfo:fail:cancel to confirm login':
        break;
      default:
        // 必须是在用户已经授权的情况下调用
        wx.getUserInfo({
          success(res) {
            console.log('用户信息', res)
            // let params = Object.assign({}, res);
            // delete params['userInfo'];
            // delete params['errMsg'];
            // userApi.getUserInfo(params)
            //   .then((res2) => {
            getApp().getUserinfoSetting();
            getApp().saveUserinfo(res.userInfo);
            _this.setData({
              isAuthUserinfo: true
            })
            // })
            // .catch((error2) => {
            //   console.log(error2);
            // })
          },
          fail(error) {
            wx.showToast({
              title: '授权用户信息失败，请重试',
              icon: 'none'
            });
          }
        });
        break;
    }
  },
})