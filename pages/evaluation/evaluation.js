var util = require('../../utils/util.js');
var Bmob = require('../../utils/bmob.js');

var that;

Page({

  data: {

    environment: {},
  },

  onLoad: function (options) {
    that = this;
    var clinicId = options.clinicId;
    // var clinicId = '吕医生锦利诊所'
    this.setData({
      clinicId: clinicId
    })
    this.checkClinicId(clinicId);
    this.reset();


  },
  imgClinicShow: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src],
    })
  },

  // 查询被评论的诊所
  checkClinicId: function (clinicId) {
    var that = this
    var Clinic = Bmob.Object.extend("clinic");
    var query = new Bmob.Query(Clinic);
    query.equalTo("clinic_name", clinicId)
    // query.equalTo("clinic_name", 吕医生锦利诊所)
    //查询单条数据，第一个参数是这条数据的objectId值
    query.find({
      success: function (results) {
        var clinic = results[0].attributes;
        that.setData({
          clinic: clinic
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },



  /* 初始化
     传参：（封装对象为obj 和评论关键字setKey）
    运行：运算好的obj直接setData
  */
  dataTransfer: function (obj, setKey) {
    var star = util.convertToStarsArray(obj.stars);
    var readyData = {};
    readyData[setKey] = {
      id: setKey,
      evaluationKey: setKey,
      title: obj.title,
      score: obj.score,
      stars: star,
      fourStar: obj.fourStar,
      threeStar: obj.threeStar,
      twoStar: obj.twoStar,
      oneStar: obj.oneStar,
      evaluation: obj.evaluation,
      evaluationText: obj.evaluationText,
    };
    this.setData(readyData)
  },
  /*选择星星个数*/
  changeStar: function (e) {
    var setKey = e.currentTarget.id
    var num = (e.currentTarget.dataset.index + 1) * 10;
    var obj = this.data.environment;
    this.changeStarsData(obj, setKey, num)
  },
  /*改变星星的算法函数
    传参：1、封装对象obj，评论关键字setKey，评星分数
    运行：更改星星分数变更数据
  */
  changeStarsData: function (obj, setKey, star) {
    var stars = util.convertToStarsArray(star);
    var readyData = {};
    readyData[setKey] = {
      id: setKey,
      title: obj.title,
      evaluationKey: setKey,
      score: star,
      stars: stars,
      fourStar: obj.fourStar,
      threeStar: obj.threeStar,
      twoStar: obj.twoStar,
      oneStar: obj.oneStar,
      evaluation: obj.evaluation,
      evaluationText: obj.evaluationText,
    };
    this.setData(readyData)

  },
  // 改变评价选项前获取到的数据
  changeEvaluation: function (e) {
    var setKey = e.currentTarget.id
    var index = e.currentTarget.dataset.index;
    var obj = this.data.environment;
    var evaluation = obj.evaluation;
    var evaluationed = this.changeArry(evaluation, index);
    this.gaiBianXuanXiangPingJia(obj, setKey, evaluationed)
  },
  // 改变评价选项状态
  gaiBianXuanXiangPingJia: function (obj, setKey, evaluationed) {
    var readyData = {};
    readyData[setKey] = {
      id: setKey,
      title: obj.title,
      evaluationKey: setKey,
      score: obj.score,
      stars: obj.stars,
      fourStar: obj.fourStar,
      threeStar: obj.threeStar,
      twoStar: obj.twoStar,
      oneStar: obj.oneStar,
      evaluation: evaluationed,
      evaluationText: obj.evaluationText,
    };
    this.setData(readyData)
  },
  // 获取评论者的头像和微信名
  getUserInformation: function () {
    that = this;
    var en_Ev = this.data.environment
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data.avatarUrl)
        that.setData({
          userAvatarUrl: res.data.avatarUrl,
          userNickName: res.data.nickName
        })
      },
    })
  },
  // 上传数据
  upformData: function () {
    this.sucShowToast();
    var value = wx.getStorageSync('user')
    var userAva = value.avatarUrl;
    var userNickName = value.nickName;
    var evaluation = this.data.environment;
    var text = evaluation.evaluationText
    var score = this.data.environment.score;
    var evaChooes = this.chooesfun(evaluation.evaluation);
    var evaChooesEnvOne = evaChooes[0];
    var evaChooesEnvTwo = evaChooes[1];
    var evaChooesServiceOne = evaChooes[2];
    var evaChooesServiceTwo = evaChooes[3];
    var evaChooesCurOne= evaChooes[4];
    var evaChooesCurTwo = evaChooes[5];
    var nameTypeOne = '环境';
    var nameTypeTwo = '服务';
    var nameTypeThree = '疗效';
    
    // console.log(evaChooes);
    var clinic = this.data.clinicId
    this.upDataToBmob(userAva, userNickName, score, evaChooesEnvOne, evaChooesEnvTwo, clinic, text, nameTypeOne)
    this.upDataToBmob(userAva, userNickName, score, evaChooesServiceOne, evaChooesServiceTwo, clinic, text, nameTypeTwo)
    this.upDataToBmob(userAva, userNickName, score, evaChooesCurOne, evaChooesCurTwo, clinic, text, nameTypeThree)
  },

  upDataToBmob: function (userAva, userNickName, score, chooesOne,chooesTwo, clinic, text,nameType) {
    // console.log(userAva)
    var Eva = Bmob.Object.extend("evaluation");
    var eva = new Eva();
    // 添加数据，第一个入口参数是Json数据
    eva.save({
      userNickName: userNickName,
      userAvatarUrl: userAva,
      clinic_name: clinic,
      score: score,
      text: text,
      eva_type:nameType,
      option_one: chooesOne,
      option_two: chooesTwo,
    }, {
        success: function (result) {
          // 添加成功

          that.backToClinic();
        },
        error: function (result, error) {
          // 添加失败
          wx.showToast({
            title: '评价失败',
            icon: 'none',
            duration: 3000
          })
          console.log('添加失败')
          console.log(result)
          console.log(error)
        }
      });
  },

  backToClinic: function () {
    wx.navigateBack({
      url: 'pages/index/clinic/clinic'
    })

  },

  sucShowToast: function () {
    wx.showToast({
      title: '感谢你的评价',
      icon: 'success',
      duration: 3000
    })
  },


  chooesfun: function (evaluation) {
    var arr = new Array();
    for (let i in evaluation) {
      let ch = evaluation[i].checked
      if (ch) {
        arr.push(evaluation[i].name_one);
      } else {
        arr.push(evaluation[i].name_two)
      }
    }
    return arr;
  },



  /*changeArry函数
    传参：1、点评对象中的选项点评obj，2、选项点评下标index
    运行：返回变更状态后的对象数组
   */
  changeArry: function (obj, index) {
    var arry = obj;
    arry[index].checked = !arry[index].checked;
    return arry;
  },

  /*Initialization函数
    传参：点评对象obj
    运行：更改选中或者非选中状态，变更为初始值，返回状态默认值的对象数组
   */
  Initialization: function (obj) {
    var arry = obj;
    for (let i in arry) {
      obj[i].checked = false;
    }
    return arry;
  },





  textSet: function (e) {
    var setKey = e.target.id;
    var text = e.detail.value;
    var obj = this.data.environment;
    this.changeText(obj, text)
  },
  changeText: function (obj, text) {
    var readyData = {};
    readyData[obj.id] = {
      id: obj.id,
      title: obj.title,
      evaluationKey: obj.evaluationKey,
      score: obj.score,
      stars: obj.stars,
      fourStar: obj.fourStar,
      threeStar: obj.threeStar,
      twoStar: obj.twoStar,
      oneStar: obj.oneStar,
      evaluation: obj.evaluation,
      evaluationText: text,
    };
    this.setData(readyData)
  },
  // 表单重置
  reset: function () {
    var environment = {
      title: '综合评价',
      evaluationKey: 'environment',
      score: 30,
      stars: 30,
      fourStar: '比较满意，不要骄傲',
      threeStar: '略显不足，优点也有',
      twoStar: '缺点较多，多加改正',
      oneStar: '非常糟糕，需要整改',
      evaluation: [
        { name_one: '环境优雅', name_two: '环境乱差', nameType: '环境', value: '0', checked: true },
        { name_one: '陈列整齐', name_two: '陈列混乱', nameType: '环境', value: '1', checked: true },
        { name_one: '态度热情', name_two: '态度冷淡', nameType: '服务', value: '2', checked: true },
        { name_one: '穿刺精准', name_two: '操作马虎', nameType: '服务', value: '3', checked: true },
        { name_one: '疗效良好', name_two: '疗效很慢', nameType: '疗效', value: '4', checked: true },
        { name_one: '用药精准', name_two: '用药老套', nameType: '疗效', value: '0', checked: true },
      ],
      evaluationText: '请写下您的宝贵意见和建议',
    };
    // 医生评价初始值
    this.dataTransfer(environment, 'environment');
  },







})




