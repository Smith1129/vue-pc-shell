import {get,post} from './index.js'
// //GET数据
// export const apiData = data => get('freeApi/api.php',data)
// //POST数据
// export const postData = data => post('freeApi/api.php',data)
//登录
export const login = data => get('apiNew/login',data);
//退出登录
export const loginOut = data => get('apiNew/loginOut',data);
//用户信息
export const userInfo = data => get('apiNew/userInfo',data);
//用户注册
export const register = data => get('apiNew/register',data);
// 首页试玩棋牌列表
export const gameList = data => get('apiNew/gameList',data);
// 首页公告列表
export const noticeList = data => get('apiNew/notice',data);
// 首页其他内容
export const indexDetail = data => get('apiNew/indexDetail',data);
// 首页奖励人数
export const everyOnePlay = data => get('apiNew/everyOnePlay',data);
// 排行榜
export const gameRank = data => get('apiNew/gameRank',data);
// 首页轮播
export const slide =data => get('apiNew/slide',data);
//试玩游戏列表
export const tryGameList =data =>get('apiNew/TryGameList',data)
//试玩游戏我的试玩
export const getMyTryGame =data =>get('apiNew/GetMyTryGame',data)
//试玩游戏进度
export const tryTask = data => get('apiNew/TryTask',data)
//试玩预告
export const tryNotice = data =>get('apiNew/TryNotice',data)
//昨日最大领奖棋牌
export const YesterdayMostCard = data =>get('apiNew/YesterdayMostCard',data)  
//棋牌上方推荐位
export const CardRecommend = data =>get('apiNew/CardRecommend',data)
//娱乐大厅
export const funGames = data =>get('apiNew/games',data)
//VIP列表
export const vip = data =>get('apiNewVip/list',data)
//领取工资
export const getSalary = data =>get('apiNew/getSalary',data)
//抽奖中心
export const lotteryList = data =>get('apiNew/lotteryList',data)
//抽奖
export const lottery =data =>get('apiNew/lottery',data)
//福利卡抽奖
export const lottery2 =data =>get('apiNew/lottery2',data)
//个人中心
export const userGame =data =>get('apiNew/UserGame',data)
//我的奖品
export const userAward =data =>get('apiNew/userAward',data)
//金猪账户
export const accountDetail =data =>get('apiNew/accountDetail',data)
//银猪账户
export const coinBeanList =data =>get('apiNew/coinBeanList',data)
//兑换记录
export const withdrawRecord =data =>get('apiNew/withdrawRecord',data)
//支付宝绑定
export const alipayUpdate =data =>get('apiNew/alipayUpdate',data)
//兑换账户
export const applicationWithdraw =data =>get('apiNew/applicationWithdraw',data)
//兑换操作
export const applicationWithdrawDoing =data =>get('apiNew/applicationWithdrawDoing',data)
//银猪存款箱
export const userDepositDoing =data =>get('apiNew/userDepositDoing',data)
//查看卡密
// export const getCardSecret =data =>get('apiNew/getCardSecret',data)
//提取多个卡密
export const getCardSecret =data =>get('apiNewPerson/getCardSecret',data)
//取消兑奖
export const cancelAward =data =>get('apiNew/cancelAward',data)
//VIP管理
export const userVip =data =>get('apiNew/userVip',data)
//绑定身份证
export const bindIdCard =data =>get('apiNew/BindIdCard',data)
//修改登录密码
export const passwordUpdate =data =>get('apiNew/passwordUpdate',data)
//获取手机验证码
export const getVerify =data =>get('apiNew/getVerify',data)
//修改手机号码
export const updateCellphoneBind =data =>get('apiNew/updateCellphoneBind',data)
//修改金融密码
export const financePassword =data =>get('apiNew/financePassword',data)
//安全中心
export const securityCenter =data =>get('apiNew/SecurityCenter',data)
//修改地址
export const updateAddress =data =>get('apiNew/updateAddress',data)
//试玩操作
export const editGameLog =data =>get('apiNew/EditGameLog',data)
//设置默认兑换账户
export const setDefault =data =>get('apiNew/setDefault',data)
//收货地址
export const addressList =data =>get('apiNew/addressList',data)
//试玩详情
export const gameDetail =data =>get('apiNew/GameDetail',data)
//棋牌详情
export const cardGameDetail =data =>get('apiNew/CardGameDetail',data)
//棋牌详情日周月排行
export const cardWinRankingList =data =>get('ApiNew/CardWinRankingList',data)
//棋牌老用户激活
export const oldUserActive =data =>get('ApiNew/OldUserActive',data)
//收入月榜
export const gameMonthRank =data =>get('apiNew/gameMonthRank',data)
//等级排行榜
export const gameRankingList =data =>get('apiNew/gameRankingList',data)
//领取试玩奖励
export const getAward =data =>get('apiNew/GetAward',data)
//领取冲级奖励
export const getChongJiAward =data =>get('apiNew/GetChongJiAward',data)
//试玩用户信息
export const refesh =data =>get('apiNew/refesh',data)
//棋牌用户信息
export const cardRefesh =data =>get('ApiNew/CardRefesh',data)
//获取第一次注册链接
export const centerGo =data =>get('apiNew/centerGo',data)
//新人任务
export const taskCenter =data =>get('apiNew/taskCenter',data)
//忘记密码
export const forgetPassword =data =>get('apiNew/forgetPassword',data)
//商品页
export const goodsDetail =data =>get('apiNew/goodsDetail',data)
//兑换商品
export const exchangeGoods =data =>get('apiNew/exchangeGoods',data)
//招募好友
export const inviteFriend =data =>get('apiNew/inviteFriend',data)
//号码走势
export const trend =data =>get('ApiNewLuck/trend',data)
//28首页列表
export const indexList =data =>get('ApiNewLuck/indexList',data)
//服务器时间
export const systemTime =data =>get('ApiNewLuck/systemTime',data)
//当前猜数字信息
export const lotteryInfo =data =>get('ApiNewLuck/lotteryInfo',data)
// 参与模式列表
export const model =data =>get('ApiNewLuck/model',data)
//参与模式增删改查
export const doingModel =data =>get('ApiNewLuck/doingModel',data)
//参与模式首页
export const modelIndex =data =>get('ApiNewLuck/modelIndex',data)
//我的参与
export const myList =data =>get('ApiNewLuck/myList',data)
//手动参与
export const doingLottery =data =>get('ApiNewLuck/doingLottery',data)
//我的参与详情
export const detail =data =>get('ApiNewLuck/detail',data)
//自动参与首页
export const autoPlayIndex =data =>get('ApiNewLuck/autoPlayIndex',data)
//自动参与开始/停止
export const doingAutoPlay =data =>get('ApiNewLuck/doingAutoPlay',data)
//28达人榜
export const luckRank =data =>get('ApiNewLuck/luckRank',data)
//上期参与
export const funcModel =data =>get('ApiNewLuck/funcModel',data)
//签到
export const signIn =data =>get('apiNew/signIn',data)
//签到状态
export const signInfo =data =>get('apiNew/signInfo',data)
//备注内容
export const updateRemark =data =>get('apiNew/updateRemark',data)
//轮查绑定微信
export const searchWechatRes =data =>get('apiNew/searchWechatRes',data)
//领取救济银猪
export const getHelpBean =data =>get('apiNewLuck/getHelpBean',data)
//28获奖名单
export const winList =data =>get('ApiNewLuck/winList',data)
//28月榜
export const monthLuckRank =data =>get('apiNewRank/monthLuckRank',data)
//公告列表
export const notice =data =>get('apiNew/notice',data)
//公告详情
export const noticeInfo =data =>get('apiNew/noticeInfo',data)
//公告推荐
export const noticeCateList =data =>get('apiNew/noticeCateList',data)
//领取新人奖励
export const taskGetAward =data =>get('apiNew/taskGetAward',data)
//试玩返利月榜
export const chargeGameRank =data =>get('apiNewRank/chargeGameRank',data)
//试玩月榜
export const monthGameRank =data =>get('apiNewRank/monthGameRank',data)
//棋牌日榜
export const dayChessRank =data =>get('apiNewRank/dayChessRank',data)
//试玩日榜
export const dayGameRank =data =>get('apiNewRank/dayGameRank',data)
//月榜
export const rank =data =>get('apiNewRank/rank',data)
//推广达人榜
export const monthInviteRank =data =>get('apiNewRank/monthInviteRank',data)
//棋牌月榜
export const monthChessRank =data =>get('apiNewRank/monthChessRank',data)
//金猪兑换银猪
export const conversionCoinBean =data =>get('ApiNew/conversionCoinBean',data)
//支付VIP
export const buyVip =data =>get('apiNewVip/buyVip',data)
//订单状态
export const checkOrderIsDeal =data =>get('apiNewVip/checkOrderIsDeal',data)
//游戏充值
export const gameRechargeList =data =>get('ApiNew/gameRechargeList',data)
//注册绑定账号
export const goGameRecharage =data =>get('ApiNew/goGameRecharage',data)
//刷新游戏账号
export const getgameRechargeUser =data =>get('ApiNew/getgameRechargeUser',data)
//帮助中心列表
export const index =data =>get('apiNewHelp/index',data)
//帮助中心详情
export const helpDetail =data =>get('apiNewHelp/detail',data)
//福利卡提取
export const getFreecaDetail =data =>get('apiNewPerson/getCardSecret',data)
//福利卡兑换
export const useFuLiCard =data =>get('apiNew/useFuLiCard',data)
//头像列表
export const avatarList =data =>get('ApiNewPerson/avatarList',data)
//修改头像
export const avatarUpdate =data =>get('ApiNewPerson/avatarUpdate',data)
//娱乐工资
export const wages =data =>get('apiNewLuck/wages',data)
//新人专区tipss
export const UserExchangeList =data =>get('apiNew/UserExchangeList',data)
//好友明细
export const friendInfo =data =>get('apiNewFriend/friendList',data)
//QQKEFU
export const kefuInfo =data =>get('apiNew/kefuInfo',data)
//用户任务信息
export const userTaskInfo =data =>get('ActVipqu/stepList',data)
//用户领取钥匙信息
export const userKeyInfo =data =>get('ActVipqu/getActKey',data)
//用户开启宝箱信息
export const userBoxInfo =data =>get('ActVipqu/openBox',data)
//抽凤羽次数
export const activityTimes =data =>get('ActApril/index',data)
//抽凤羽接口
export const activityLottery =data =>get('ActApril/lottery',data)
//-批量黄豆福利卡兑换 
export const batchUseFuLiCard =data =>get('apiNew/batchUseFuLiCard',data)
//每日工资详情
export const daySalaryInfo = data => get('ApiNewVip/SalaryList',data)
//批量黄豆福利卡查询
export const batchFuLiCardStatus =data =>get('apiNew/batchFuLiCardStatus',data)
//友情链接
export const friendUrlList =data =>get('apiNew/friendUrlList',data)
//宝箱
export const boxInfo = data => get('actApril/baoxiang',data)
//宝箱分页，排行榜信息
export const boxRankInfo = data => get('actApril/Rank',data)
//金宝箱状态和活跃度数据
export const boxStatusInfo = data => get('actApril/Active',data)
//开启宝箱
export const openBox = data => get('actApril/Award',data)
//获取验证码cookies
export const getConnectCookie = data => get('ApiNew/getConnectCookie',data)
//获取验证码
export const verifyExt = data => get('ApiNew/verifyExt',data)
//qq wechat任务信息
export const allTasksInfo = data => get('ActApril/missionList',data)
//上传图片
export const upload = data => get('ActApril/submitMssion',data)
//28页面协议弹窗
export const luck28Modal = data => get('apiNewLuck/luck28Modal',data)
//批量隐藏游戏
export const hideGames = data => get('ApiNewPerson/batchEditGameLog',data)
//修改昵称
export const updateNickname = data => get('apiNewPerson/updateNickname',data)
//游戏棋牌试玩一键领奖
export const getGameOrCardAward = data => get('ApiNew/getGameAllAward',data)
//活动奖池
export const poolAwardUrl = data => get('apiNewFriend/Pool',data)
//推广页面的轮播
export const tgSlide = data => get('apiNewFriend/notice',data)
// 抽奖页面信息
export const drawInfo = data => get('apiNewLottery/info',data)
// 特权道具兑换接口
export const drawExchange  = data => get('apiNewLottery/exchange',data)
// 抽奖接口
export const drawLottery  = data => get('apiNewLottery/lottery',data)
// 用户碎片信息接口
export const drawChipsInfo   = data => get('apiNewLottery/chipsInfo',data)
//合成列表接口
export const drawComposeList   = data => get('apiNewLottery/composeList',data)
//虚拟商品合成接口
export const drawCompose   = data => get('apiNewLottery/compose',data)
//虚拟商品合成接口
export const drawAnimalCompose    = data => get('apiNewLottery/animalCompose',data)
// 影视首页推荐位
export const filmRecommendList    = data => get('apiNewFilm/filmRecommendList',data)
// 影视首页列表
export const filmList    = data => get('apiNewFilm/filmList',data)
// 影视热播榜
export const hotFilm    = data => get('apiNewFilm/hotFilm',data)
// 影视详情页
export const videoDetail    = data => get('apiNewFilm/detail',data)
// 影视详情页 - 领奖
export const videoAward    = data => get('apiNewFilm/award',data)
//中秋活动任务
export const autumnUrl = data => get('ActZhongqiu/info',data)
//中秋活动三重天
export const autumnWeekAward = data => get('ActZhongqiu/weekInfo',data)
//中秋领奖pop
export const getAutumnAward = data => get('ActZhongqiu/complete',data)
//中秋活动每周福利
export const autumnWelfare = data => get('ActZhongqiu/getWeekAward',data)
//中秋排行榜
export const autumnRank = data => get('ActZhongqiu/rank',data)
//中秋弹窗pop
export const autumnPopRank = data => get('ActZhongqiu/log2',data)
//修改装扮背景 
export const updateInfoBg = data => get('apiNewPerson/updateBackground',data)
//修改头像框
export const updateInfoAvatar = data => get('apiNewPerson/updateIframe',data)
//锻造日志
export const forgeLog = data => get('apiNewPerson/forgeLog',data)
//锻造水晶
export const forgePebble = data => get('apiNewPerson/freecaForge',data)
//锻造水晶多个
export const freecaForgeBatch = data => get('apiNewPerson/freecaForgeBatch',data)
//抽福利卡
export const forgeGetCard = data => get('apiNewPerson/forgeFreeca',data)
//影视达人榜
export const filmDayRank = data => get('apiNewRank/FilmDayRank',data)
//每日有赏活动
export const dayRewardData = data => get('actGame/getInfo',data)
//每日有赏活动领奖
export const dayRewardGetReward = data => get('actGame/getAward',data)
//每日有赏活动列表数据
export const dayRewardAwardList = data => get('actGame/getAwardList',data)
// 整点抢福利卡
export const ActStatus = data => get('ActSendFulika/ActStatus',data)
// 抢福利卡
export const fuLiKaFetch = data => get('ActSendFulika/fuLiKaFetch',data)
// 试玩领取4倍
export const getFourthAward = data => get('apiNew/GetFourthAward',data)
//老用户回归
export const oldFriendData = data => get('ActOldMan/detail',data)
//领取游戏美团红包奖励
export const getFoodAward = data => get('ActOldMan/gameAward',data)
//领取宝箱美团红包奖励
export const getBoxFoodAward = data => get('ActOldMan/sendLuckAward',data)
//领取拼图奖励
export const getPuzzleAward = data => get('ActOldMan/sendChipsAward',data)
//划开拼图
export const gashPuzzle = data => get('/ActOldMan/setChips',data)
//老用户回归首页弹窗信息
export const getOldIndexData = data => get('ActOldMan/login',data)
//老用户首页领奖
export const getIndexAward = data => get('ActOldMan/loginAward',data)
//进入注册游戏页面是否需要验证码
export const goGameCodeCheck = data => get('apiNewGame/CenterStatus',data)
//领奖弹窗活动
export const getPacketAward = data => get('ActLuckWelfare/GetLuckWelfareAward',data)
//推荐好友金猪银猪明细
export const friendAwardList = data => get('apiNewFriend/AwardList',data)
//宝箱活动宝箱info
export const openBoxInfo = data => get('ActVipBox/info',data)
//宝箱活动宝箱detail
export const openBoxDetail = data => get('ActVipBox/actDetailShow',data)
//宝箱活动开启宝箱
export const openBoxAward = data => get('ActVipBox/openBox',data)
//远古活动
export const ancientAct = data => get('actLuckWelfare/ActGodList',data)
//远古活动弹窗
export const ancientFrame = data => get('actLuckWelfare/ActGodAward',data)
//获取极验图片and密钥
export const pictures = data => get('//captcha.ttz.com/captcha/pictures',data)
//极验验证接口
export const validate = data => get('//captcha.ttz.com/captcha/validate',data)

