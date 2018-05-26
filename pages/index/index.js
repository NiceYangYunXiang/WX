//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
          
      'http://bmob-cdn-10658.b0.upaiyun.com/2018/05/09/e38245aa4083b82f8004a1a3a88d4898.jpeg',
       'http://bmob-cdn-10658.b0.upaiyun.com/2018/05/09/a5fb2bd64049472e806c26d46df3b2e8.jpg',
      'http://bmob-cdn-10658.b0.upaiyun.com/2018/05/18/c7cc46b8408a4a228063c85a750ef135.png',  
      'http://bmob-cdn-10658.b0.upaiyun.com/2018/05/09/867c7544403d3b56804ca0cfb81448ab.jpg',
      'http://bmob-cdn-10658.b0.upaiyun.com/2018/05/09/e83f9d13406a19a7802777f71ffe6806.jpg',
      'http://bmob-cdn-10658.b0.upaiyun.com/2018/05/09/b42f1c99404e4c928049f0cc417bd325.jpg',
      'http://bmob-cdn-10658.b0.upaiyun.com/2018/05/10/e1a49b7040ca7202802aaa5b1e2406f1.jpg',
      
      
],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    motto: '传递健康与关爱',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toClinicPage: function (e) {
    var clinicName = e.detail.value;
    wx.navigateTo({
      url: '/pages/index/clinic/clinic?clinicName=' + clinicName,
    })
  },
  getgaoxinClinic: function () {
    wx.navigateTo({
      url: '/pages/index/clinic/clinic?town=高新区',
    })
  },
  gettianfuClinic:function(){
    wx.navigateTo({
      url: '/pages/index/clinic/clinic?town=天府新区',
    })
  },
  getshuangliuClinic:function(){
    wx.navigateTo({
      url: '/pages/index/clinic/clinic?town=双流区',
    })
  },
  getjinjiangClinic:function(){
    wx.navigateTo({
      url: '/pages/index/clinic/clinic?town=锦江区',
    })
  },
  showWord:function(res){
    var value = res.detail.value;
    return value;
  }
})
