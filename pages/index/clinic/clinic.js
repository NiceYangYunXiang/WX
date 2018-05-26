var util = require('../../../utils/util.js');
var Bmob = require('../../../utils/bmob.js');
var that;
Page({

  data: {
    clinic: [],
    mylat: [],
    mylng: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    var cN = options.clinicName
    var town = options.town
    if (cN != null) {
     this.showClinic(cN);
    }else if(town!=null){
      this.showClinicTown(town)
    }

  },
  getDistance: function (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;
    var value = Math.round(r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2))))
    if ((value - 300) >= 1000) {
      return Math.round(value / 1000) + 'km'
    } else {
      return value - 300 + 'm';
    }
  },

  showClinic: function (clinicName) {
    var mylat = wx.getStorageSync('mylat');
    var mylng = wx.getStorageSync('mylng')
    var Clinic = Bmob.Object.extend("clinic");
    var query = new Bmob.Query(Clinic);
    that = this;
    // 查询所有数据
    query.equalTo("clinic_name", clinicName);
    query.find({
      success: function (results) {
        var arr = new Array();
        for (var i = 0; i < results.length; i++) {
          let ob = results[i].attributes;
          var lat = ob.latitude;
          var lon = ob.longitude;
          var km = that.getDistance(mylat, mylng, lat, lon);
          // 插入代码>>>>>>>>>计算距离函数
          ob.juli = km
          // console.log(ob)
          arr.push(ob)
        }
        that.setData({
          clinic: arr
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },

  // onClinicTap: function (e) {
  //   // console.log(e);
  //   var clinicId = e.currentTarget.dataset.cilinc.clinic_name
  //   wx.navigateTo({
  //     url: '/pages/clinic/clinicTemplate/clinicTemplate?clinicId=' + clinicId,
  //   })
  // },
  pingJia: function (e) {
    var clinicId = e.currentTarget.dataset.cilinc.clinic_name
    wx.navigateTo({
      url: '/pages/evaluation/evaluation?clinicId=' + clinicId,
    })
  },

  clinicGPS: function (e) {
    // console.log(e);
    var name = e.currentTarget.dataset.cilinc.clinic_name;
    var lat = parseFloat(e.currentTarget.dataset.cilinc.latitude);
    var lon = parseFloat(e.currentTarget.dataset.cilinc.longitude);
    var address = e.currentTarget.dataset.cilinc.poi_address;
    wx.openLocation({
      name: name,
      address: address,
      latitude: lat,
      longitude: lon,
    })

  },
  showClinicTown:function(town){
    var mylat = wx.getStorageSync('mylat');
    var mylng = wx.getStorageSync('mylng')
    var Clinic = Bmob.Object.extend("clinic");
    var query = new Bmob.Query(Clinic);
    that = this;
    // 查询所有数据
    query.equalTo("town", town);
    query.find({
      success: function (results) {
        var arr = new Array();
        for (var i = 0; i < results.length; i++) {
          let ob = results[i].attributes;
          var lat = ob.latitude;
          var lon = ob.longitude;
          var km = that.getDistance(mylat, mylng, lat, lon);
          // 插入代码>>>>>>>>>计算距离函数
          ob.juli = km
          // console.log(ob)
          arr.push(ob)
        }
        that.setData({
          clinic: arr
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },
  makeTelCall:function(e){
    // console.log(e);
    var a = 'a';
    console.log(a);
    
    var phone = e.currentTarget.dataset.cilinc.phone
    wx.makePhoneCall(
      {phoneNumber:phone}
    )
  },


})