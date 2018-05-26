var util = require('../../utils/util.js');
var Bmob = require('../../utils/bmob.js');
var that
Page({

  data: {


  },


  onLoad: function (options) {
    this.showItem();
  },

  toUnItem: function (e) {
    var itemId = e.currentTarget.dataset.set;
    // console.log(itemId);
    
    wx.navigateTo({
      url: '/pages/unscramble/un_item/un_item?itemId='+itemId,
    })
  },

  showItem: function () {
    var inIT = Bmob.Object.extend("inspection_item");
    var query = new Bmob.Query(inIT);
    var arr = new Array();
    that = this;
    // 查询所有数据
    query.find({
      success: function (results) {
        // console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          var obj = results[i];
          // console.log(obj.id + ' - ' + objt.get('seriesIcon'));
          // console.log(obj.id + ' - ' + obj.get('seriesName'));
          arr.push(obj)
        }
        
        that.setData({
          item: arr
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },
  natoApin:function(){
    wx.switchTab({
      url: '/pages/appointment/appointment',
    })
  }

})