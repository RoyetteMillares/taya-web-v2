export default {
  login: "/api/v1/user/login", // 登录
  getSportToken: "/api/v1/bet/getSportToken", // 取得三方體育登入用的 token
  checkOpenGoogleCode: "/api/v1/user/checkOpenGoogleCode", // 校验是否需要谷歌验证器
  register: "/api/v1/user/register", // 注册
  profile: "/api/v1/user/userProfile", // 获取用户详情
  logout: "/api/v1/user/logout", // 登出
  notice: "/api/v1/home/notice", // 公告
  createGoogleCode: "/api/v1/user/createGoogleCode", // 获取验证器
  bindGoogleCode: "/api/v1/user/bindGoogleCode", // 绑定谷歌验证码
  openOrCloseGoogleCode: "/api/v1/user/openOrCloseGoogleCode", // 开启或者关闭Google验证器
  forgotPassword: "/api/v1/user/forgotPassword", // 重置密码
  resetMobile: "/api/v1/user/resetMobile", // 修改手机号
  updateUserProfile: "/api/v1/user/updateUserProfile", // 更新用户信息
  getWithdrawalPlat: "/api/v1/wallet/getWithdrawalPlat", // 获取币种提款平台
  withdrawalAddressList: "/api/v1/wallet/withdrawalAddressList", // 提款地址列表
  getPlatConfigList: "/api/v1/wallet/getPlatConfigList", // 获取支付平台列表
  addWithdrawalAddress: "/api/v1/wallet/addWithdrawalAddress", // 新增提款地址
  deleteWithdrawalAddress: "/api/v1/wallet/deleteWithdrawalAddress", // 删除提款地址
  updateWithdrawalAddress: "/api/v1/wallet/updateWithdrawalAddress", // 设置默认提款地址
  getDictionary: "/api/v1/dictionary/getDictionary", // 获取字典
  gameList: "/api/v1/platform/gameList", // gameList
  slotGameList: "/api/v1/platform/slotGameList", // 游戏列表
  gameFavorite: "/api/v1/platform/gameFavorite", // 游戏收藏/取消
  platList: "/api/v1/platform/platList", // 平台列表
  helpTypes: "/api/v1/help/pageHelpType", // 帮助类型
  helpContent: "/api/v1/help/pageHelpInfo", // 帮助类型下的内容
  helpDetail: "/api/v1/help/helpInfoById", // 帮助内容详情
  blog: "/api/v1/blog/list", // 博客列表
  blogRecommend: "/api/v1/blog/recommend", // 博客推荐
  init: "/api/v1/home/init", // 初始化接口
  getCurrencyCoin: "/api/v1/wallet/getCurrencyCoin", // 获取钱包余额
  getDepositRecord: "/api/v1/wallet/getDepositRecord", // 获取充值记录
  getDepositPlats: "/api/v1/wallet/getDepositPlat", // 获取充值渠道列表
  startGame: "/api/v1/platform/startGame", // 获取游戏启动url
  getDepositAddress: "/payment/v1/pay/deposit", //获取充值二维码地址
  queryMyBets: "/api/v1/bet/queryMyBets", //我的注单
  getSportRecords: "/api/v1/bet/queryMySportBets", // 體育遊戲的注单
  updateMainWallet: "/api/v1/wallet/updateMainWallet", // 设置主钱包
  getMessageList: "/api/v1/notice/getMessageList",
  getNoticeCount: "/api/v1/notice/getNoticeCount", // 每个类型消息数量
  updateMessageStatus: "/api/v1/notice/updateMessageStatus", // 修改消息状态
  deleteMessageStatus: "/api/v1/notice/deleteMessageStatus", // 删除全部消息
  getCoinLogList: "/api/v1/wallet/getCoinLogList", // 获取帐变记录
  getLampList: "/api/v1/notice/getLampList", // 跑马灯信息
  getPromoteList: "/api/v1/promotions/promotionsList", // 优惠活动列表
  applyPromotion: "/api/v1/promotions/promotionsInfo", // 申请活动
  coinTransfer: "/api/v1/agent/coinTransfer", // 转账
  commissionRecords: "/api/v1/agent/commissionRecords", // 佣金流水
  subordinateDetails: "/api/v1/agent/subordinateDetails", // 佣金明细
  teamBenefits: "/api/v1/agent/teamBenefits", // TeamBenefits
  casinoList: "/api/v1/platform/casinoList", // casino列表
  memberShipDetails: "/api/v1/vip/memberShipDetails", // vip中心-MemberShip
  memberShipLevelDetails: "/api/v1/vip/memberShipLevelDetails", // vip中心-MemberShip Level
  getWithdrawalRecord: "/api/v1/wallet/getWithdrawalRecord", // 提款记录
  withdrawal: "/api/v1/wallet/withdrawal", // 在线提款
  details: "/api/v1/platform/details", // 游戏详情
  sendSesCode: "/api/v1/user/sendSesCode", // 获取邮箱验证码
  resetEmail: "/api/v1/user/resetEmail", // 重置邮箱地址
  resetPassword: "/api/v1/user/resetPassword",
  teamReport: "v1/agent/report/teamReport", // 用户报表
  commissionList: "v1/player/report/team/commissionv2/list",
  blogSearch: "/api/v1/blog/search", //博客搜索
  listLevel: "/api/v1/user/listLevel",
  commissionRateList: "/api/v1/agent/commissionRateList",
  getChannelList: "/api/v1/wallet/getChannelList",
  getWithdrawalChannelList: "/api/v1/wallet/getWithdrawalChannelList",
  checkDeposit: "/api/v1/wallet/checkDeposit", // 检查充值
  getDepositChannelList: "/api/v1/wallet/getDepositChannelList",
  getWithdrawalAddressType: "/api/v1/wallet/getWithdrawalAddressType", // 获取提款地址类型
  getBannerList: "/api/v1/home/getBannerList",
  betLists: "/api/v1/bet/betList",
  getJackpotAndPayout: "/api/v1/home/getJackpotAndPayout", //
  rankingList: "/api/v1/home/rankingList", // 排行榜
  hotGameList: "/api/v1/platform/hotGameList",
  sendSmsCode: "/api/v1/user/sendSmsCode", // 发送手机验证码
  getCap: "api/captcha/get",
  promotionsApplyAgain: "/api/v1/promotions/promotionsApplyAgain",
  sendSnsCode: "api/v1/user/sendSnsCode",
};
