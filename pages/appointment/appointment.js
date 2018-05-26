
Page({

  data: {
  
  },

  onLoad: function (options) {
  
  },
  makeTelCall:function(){
    wx.makePhoneCall({
      phoneNumber: '02884263120',
    })
  },
})