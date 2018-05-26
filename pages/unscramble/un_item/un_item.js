var util = require('../../../utils/util.js');
var Bmob = require('../../../utils/bmob.js');
var that
Page({

  data: {
  
  },

  onLoad: function (options) {
    var itemId = options.itemId;
    this.selectItem(itemId);
    // console.log(itemId);

  },
  selectItem:function(itemId){
      var uSP = Bmob.Object.extend("underSeriesPro");
      var query = new Bmob.Query(uSP);
      var arr = new Array();
      that = this;
      // 查询所有数据
      query.equalTo("proOfSeries", itemId);
      query.find({
        success: function (results) {
          // console.log("共查询到 " + results.length + " 条记录");
          // 循环处理查询到的数据
          for (var i = 0; i < results.length; i++) {
            var obj = results[i];
            // console.log(obj)
            arr.push(obj)
          }

          that.setData({
            items: arr
          })
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      }); 
  },


  toItem_cont:function(e){
    console.log(e.currentTarget.dataset.set);
    var itemsName = e.currentTarget.dataset.set;
    wx.navigateTo({
      url: '/pages/unscramble/item_content/item_content?itemName='+itemsName,
    })
  },
  natoApin: function () {
    wx.switchTab({
      url: '/pages/appointment/appointment',
    })
  },
})