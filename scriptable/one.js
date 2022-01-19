// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comments;

// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
if (typeof require === 'undefined') require = importModule
const { Base,Running } = require("./base")

// @组件代码开始
class Widget extends Base {
    /**
     * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
     * @param {string} arg 自定义参数
     */
    constructor (arg) { // 用户自定义配置区域
        super(arg)
        this.name = '夏天' //名称 作者为空时显示此名称
        this.randomShow = false // 是否随机显示最近10条 false 显示最新的一条 true随机显示最新的10条
        this.colorMode = false // 背景色模式 false是图片模式 true为颜色模式
        this.colorfulFont = true // 渐变色文字
        this.fontColor = ['#ffffff','#BBD676','#FBD786','#00FF00','#f19c65',
            '#e54d42','#f37b1d','#fbbd08','#8dc63f','#39b54a','#1cbbb4',
            '#0081ff','#6739b6','#9c26b0','#e03997','#a5673f','#8799a3'
        ] // 显示的文字颜色
        this.logo = 'http://image.wufazhuce.com/favicon.ico' //logo
    }
    async renderBackground(w,url){
        if (this.colorMode) {
            const bgColor = new LinearGradient()
            bgColor.colors = [new Color('#2c5364'), new Color('#203a43'), new Color('#0f2027')]
            bgColor.locations = [0.0, 0.5, 1.0]
            w.backgroundGradient = bgColor
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
        const title = '「ONE · 一个」'
        await this.renderHeader(w, this.logo, title,new Color('#ffffff'))
        const listContent = data?.data?.map(({date,img_url,content,text_authors})=>({date,img_url,content,text_authors}))
        const Num = this.randomShow ? this.randomNum(9) : 0
        const {date,img_url,content,text_authors} = listContent[Num]
        const t = w.addText(content)
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
        const listContent = data?.data?.map(({date,img_url,content,text_authors})=>({date,img_url,content,text_authors}))
        const Num = this.randomShow ? this.randomNum(9) : 0
        const {img_url,content,text_authors} = listContent[Num]
        const {date} = listContent[0]
        const title = '「ONE · 一个」' +'  '+ date
        await this.renderHeader(w, this.logo, title,new Color('#ffffff'))
        await this.renderBackground(w,img_url)
        const randomColorIndex = this.randomNum(16)
        if (this.colorfulFont) { // 渐变色字体
            this.renderColorFont(w,content,this.fontColor[randomColorIndex])
        } else {
            const t = w.addText(content)
            t.font = Font.lightSystemFont(12)
            t.textColor = new Color(this.fontColor[randomColorIndex])
        }
        w.addSpacer()
        const text = '———————— by' + (text_authors || this.name)
        const f = w.addText(text)
        f.font = Font.lightSystemFont(14)
        f.textColor = new Color('#ffffff')
        f.rightAlignText()
        return w
    }

    /**
     * 渐变色字体
     * @param w
     * @param content
     * @param ImageColor
     */
    renderColorFont(w,content,ImageColor){
        const count = 24
        const colorList = this.getColorList(ImageColor,count)
        let row = w.addStack()
        content.split('').forEach((i,d) => {
            const fontColorIndex = d % count
            if (fontColorIndex === 0 && d !== 0) {
                row = w.addStack()
            }
            const cell = row.addStack()
            const t = cell.addText(i)
            t.font = Font.lightSystemFont(12)
            t.textColor = new Color(colorList[fontColorIndex])
        })
    }
    /**
     * 渲染大尺寸组件
     */
    async renderLarge (data) {
        return await this.renderMedium(data)
    }
    randomNum(max,min = 0){
        return Math.floor(Math.random() * (max - min + 1))
    }
    /**
     * 获取数据函数，函数名可不固定
     */
    async getData () {
        const [key] = await this.getKey()
        const api = `http://m.wufazhuce.com/one/ajaxlist/0?_token=${key}`
        console.log(api,'api')
        return await this.httpGet(api, true, false)
    }
    async getKey () {
        const api = 'http://m.wufazhuce.com/one'
        const res = await this.httpGet(api, false, false)
        const reg = /[a-z0-9]{40}/g
        return res.match(reg)
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
