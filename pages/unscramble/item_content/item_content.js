var util = require('../../../utils/util.js');
var Bmob = require('../../../utils/bmob.js');
var that
Page({

  data: {
  
  },

  onLoad: function (options) {
    // console.log(options.itemName)
    var itemProName = options.itemName;
    this.selectItemCon(itemProName);
    this.selectItemThreePro(itemProName);
  },

  selectItemCon:function(itemName){
    var miniitem = Bmob.Object.extend("miniItems");
    var query = new Bmob.Query(miniitem);
    that = this;
    // 查询所有数据
    query.equalTo("itemProName", itemName);
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          var obj = results[i];
          // console.log(obj)
        }
        that.setData({
          miniitems: obj
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    }); 
  },
  selectItemThreePro:function(itemProName){
    var uSP = Bmob.Object.extend("underSeriesPro");
    var query = new Bmob.Query(uSP);
    that = this;
    // 查询所有数据
    query.equalTo("proName", itemProName);
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          var obj = results[i];
          console.log(obj)
        }
        that.setData({
          proItem: obj
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    }); 
  },

})