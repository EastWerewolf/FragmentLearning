// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comments;
//
// iOS 桌面组件脚本 @「小件件」
// 开发说明：请从 Widget 类开始编写，注释请勿修改
// https://x.im3x.cn
//

// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
if (typeof require === 'undefined') require = importModule
const { Base,Running } = require("./base")

/**
 * 用户配置区域
 * location 天气预报 定位
 * name 显示名称
 */
const files = FileManager.local()
const lockLocation = false  //是否锁定定位信息
const tencentApiKey = ""   // 腾讯位置服务apiKey，自带官方key，也可以使用自己申请的key
const WeatherKey = '6f556725aa7d4957a69102f01a85c158' //天气预报key
const LOCATION = await getLocation()
const weatherData = await getWeather()
const areaData = await getLocationArea()
const city = areaData.result.address_component.city
const district = areaData.result.address_component.district
async function getWeather() {  // 获取天气数据
    // 设定天气数据缓存路径
    const cachePath = files.joinPath(files.documentsDirectory(), "HFcache-NK")
    // log("彩云缓存："+cachePath)
    const cacheExists = files.fileExists(cachePath)
    const cacheDate = cacheExists ? files.modificationDate(cachePath) : 0
    var data
    // 假设存储器已经存在且距离上次请求时间不足60秒，使用存储器数据
    if (cacheExists && (new Date().getTime() - cacheDate.getTime()) < 60000) {
        log("[+]请求时间间隔过小，使用缓存数据")
        const cache = files.readString(cachePath)
        data = JSON.parse(cache)
        // 否则利用 api 得到新的数据
    } else {

        try {
            const weatherReq = "https://devapi.heweather.net/v7/weather/now?location="+LOCATION +"&key="+ WeatherKey+"&lang=zh-cn"
            const dataToday = await new Request(weatherReq).loadJSON()
            log(JSON.stringify(weatherReq))
            data = dataToday
            files.writeString(cachePath, JSON.stringify(data))
            log("[+]天气信息请求成功")
            console.log(data)
        }
        catch (e) {
            data = JSON.parse(files.readString(cachePath))
            log("[+]天气信息请求失败，使用缓存数据")
        }
    }
    return data
}
async function getLocation() {
    // 设定位置缓存数据路径
    const locationPath = files.joinPath(files.documentsDirectory(), "Mylocation-NK")
    var latitude, longitude
    var locationString
    // 如果位置设定保存且锁定了，从缓存文件读取信息

    if (lockLocation && files.fileExists(locationPath)) {
        locationString = files.readString(locationPath)
        log("[+]位置锁定，使用缓存数据" + locationString)
        // return locationString
        // 否则，从系统获取位置信息
    } else {
        try {
            const location = await Location.current()
            latitude = location.latitude
            longitude = location.longitude
            locationString = longitude + "," + latitude
            files.writeString(locationPath, locationString)
            log("[+]定位成功")
        }
        catch (e) {
            locationString = files.readString(locationPath)
            log("[+]无法定位，使用缓存定位数据")
        }
        locationString = locationString

        //   return locationString
    }
    log("[+]地址" + locationString)
    return locationString
}
async function getLocationArea() {
    // 加个缓存
    let cachePath = files.joinPath(files.documentsDirectory(), "areaCache-NK");
    // 	log("Tencent缓存："+cachePath)
    let cacheExists = files.fileExists(cachePath)
    let cacheDate = cacheExists ? files.modificationDate(cachePath) : 0;
    let data;
    // 假设存储器已经存在且距离上次请求时间不足60秒，使用存储器数据
    if (cacheExists && (new Date().getTime() - cacheDate.getTime()) < 60000) {
        log("[+]腾讯位置API请求时间间隔过小，使用缓存数据");
        return data = JSON.parse(files.readString(cachePath))
    }
    let locationString = await getLocation();
    let locationLs = locationString.split(",");
    let area;
    try {
        // 官方文档的key
        let testKey = "OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
        let apiKey = tencentApiKey == "" ? testKey : tencentApiKey
        let areaReq = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + locationLs[1] + "," + locationLs[0] + "&key=" + apiKey + "&get_poi=0";
        let areaRequest = new Request(areaReq);
        let header = { "Referer": "https://lbs.qq.com/" }
        areaRequest.method = 'GET';
        areaRequest.headers = header;
        area = await areaRequest.loadJSON();
        log("[+]腾讯位置API请求成功：" + areaReq);
        files.writeString(cachePath, JSON.stringify(area))
        // 		log("信息：" + JSON.stringify(area));
    } catch (err) {
        log("[+]getLocationArea出错：" + err.message);
        area = JSON.parse(files.readString(cachePath));
    }
    return area;
}
// @组件代码开始
class Widget extends Base {
    /**
     * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
     * @param {string} arg 自定义参数
     */
    constructor (arg) { // 用户自定义配置区域
        super(arg)
        this.name = '夏天' //名称
        this.colorMode = false // 背景色模式 false是图片模式 true为颜色模式
        this.apiKey = '4598854da33a24616571e2975556017a'  // 接口key https://www.tianapi.com/ account needed 100 times/day
        this.logo = 'https://v3.cn.vuejs.org/images/icons/apple-icon-152x152.png' //logo
        this.APIList = [
            `http://api.tianapi.com/hotreview/index?key=${this.apiKey}`, // 网易云热评接口
            `http://api.tianapi.com/pyqwenan/index?key=${this.apiKey}`, // 朋友圈文章接口
            `http://api.tianapi.com/hsjz/index?key=${this.apiKey}`, // 互删句子
            `http://api.tianapi.com/one/index?key=${this.apiKey}`, // one 文案
        ]
    }
    async renderBackground(w,url){
        if (this.colorMode) {
            const bgColor = new LinearGradient()
            bgColor.colors = [new Color('#2c5364'), new Color('#203a43'), new Color('#0f2027')]
            bgColor.locations = [0.0, 0.5, 1.0]
            w.backgroundColor = bgColor
        } else {
            const img = await this.getImageByUrl(url,false)
            w.backgroundImage = await this.shadowImage(img,'#000000',0.4)
        }
    }
    /**
     * 渲染函数，函数名固定
     * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
     */
    async render () {
        const data = await this.getData()
        console.log(data)
        switch (this.widgetFamily) {
            case 'large':
                return await this.renderLarge(data)
            case 'medium':
                return await this.renderMedium(data)
            default:
                return await this.renderSmall(data)
        }
    }

    /**
     * 渲染小尺寸组件
     */
    async renderSmall (data) {
        const w = new ListWidget()
        await this.renderHeader(w, data['logo'], data['title'])
        const t = w.addText(data['content'])
        t.font = Font.lightSystemFont(16)
        w.addSpacer()
        w.url = this.actionUrl('open-url', data['url'])
        return w
    }
    /**
     * 渲染中尺寸组件
     */
    async renderMedium (data) {
        let w = new ListWidget()
        const [{word,wordfrom,imgurl}] = data?.newslist;
        const weather = `[🌤]${city}·${district} ${weatherData.now.text} T:${weatherData.now.temp}°  F:${weatherData.now.feelsLike}° ${weatherData.now.windDir}`
        await this.renderHeader(w, this.logo, weather,new Color('#ffffff'))
        await this.renderBackground(w,imgurl)
        const color = ['#ffffff','#BBD676','#FBD786','#00FF00','#f19c65']
        const Num = Math.floor(Math.random() * 5)
        const t = w.addText(word)
        t.font = Font.lightSystemFont(12)
        t.textColor = new Color(color[Num])
        w.addSpacer()
        const f = w.addText(wordfrom || this.name)
        f.font = Font.lightSystemFont(16)
        f.textColor = new Color('#ffffff')
        return w
    }
    /**
     * 渲染大尺寸组件
     */
    async renderLarge (data) {
        return await this.renderMedium(data)
    }

    /**
     * 获取数据函数，函数名可不固定
     */
    async getData () {
        // const api = 'http://v3.wufazhuce.com:8000/api/channel/one/0/' + this.location
        const api = this.APIList[3]
        console.log(api,'api')
        return await this.httpGet(api, true, false)
    }
    /**
     * 自定义注册点击事件，用 actionUrl 生成一个触发链接，点击后会执行下方对应的 action
     * @param {string} url 打开的链接
     */
    async actionOpenUrl (url) {
        Safari.openInApp(url, false)
    }

}
// @组件代码结束
await Running(Widget)
