// let obj1 = [{aName:"aaa"},{aName:"bbb"},{aName:"ccc"},{aName:"ddd"},{aName:"eee"}]
// let obj2 = [{aName:"bbb"},{aName:"ddd"},{aName:"eee"}]
// //
// // 实现这两个对象的交集，如果形成交集，则添加对象属性active为true，否则添加属性为false
// // 最终形成：
// // obj3 = [{aName:"aaa",active:"false"},{aName:"bbb",active:"true"},{aName:"ccc",active:"false"},{aName:"ddd",active:"true"},{aName:"eee",active:"true"}]
// const obj3 = [...obj1,...obj2].map(i => ({aName: i.aName, active: false}))
// const objSet = {}
// for (let i = obj3.length -1; i >= 0; i--) {
//     const {aName} = obj3[i]
//     if (!objSet[aName]) {
//         objSet[aName] = true
//     } else {
//         // 删除相同的元素
//         obj3.splice(i,1)
//         // 将另一个相同元素active设为true
//         obj3.forEach(j => {
//             if (j.aName === aName) {
//                 j.active = true
//             }
//         })
//     }
// }
// console.log(obj3)


const str = '<!DOCTYPE html>\n' +
    '<html xmlns:wb="http://open.weibo.com/wb">\n' +
    '\n' +
    '<head>\n' +
    '\n' +
    '\t<link rel="apple-touch-icon" href="http://image.wufazhuce.com/apple-touch-icon.png">\n' +
    '\t<link rel="shortcut icon" type="image/x-icon" href="http://image.wufazhuce.com/favicon.ico">\n' +
    '\t<link rel="icon" type="image/x-icon" href="http://image.wufazhuce.com/favicon.ico">\n' +
    '\t<link rel="bookmark" href="http://image.wufazhuce.com/favicon.ico" type="image/x-icon" />\n' +
    '\n' +
    '\t<title>图文 - 「ONE ·\n' +
    '\t\t一个」</title>\n' +
    '\t<meta charset="UTF-8" />\n' +
    '\t<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />\n' +
    '\t<meta property="wb:webmaster" content="8e339239b6b0dbd3" />\n' +
    '\t<meta property="qc:admins" content="1457203232561205356375" />\n' +
    '\t<meta name="baidu-site-verification" content="a7UUQhifPn" />\n' +
    '\t<meta name="sogou_site_verification" content="MtWIYzBAwe" />\n' +
    '\t<meta name="360-site-verification" content="1c86ebd3407b175d4cb0ac4bc7efa88b" />\n' +
    '\t<meta name="format-detection" content="telephone=no" />\n' +
    '\t<meta name="viewport"\n' +
    '\t\tcontent="width=device-width, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1, user-scalable=no" />\n' +
    '\t<meta name="apple-mobile-web-app-capable" content="yes" />\n' +
    '\t<meta name="apple-touch-fullscreen" content="yes" />\n' +
    '\t<meta name="mobile-web-app-capable" content="yes" />\n' +
    '\t<meta name="apple-mobile-web-app-status-bar-style" content="default" />\n' +
    '\t<meta name="apple-mobile-web-app-title" content="「ONE · 一个」" />\n' +
    '\t<meta name="author" content="韩寒" />\n' +
    '\t<meta name="keywords" content="ONE,一个,ONE一个,yige,文章,问题,东西,金句,文艺,阅读" />\n' +
    '\t<meta property="og:image" content="http://image.wufazhuce.com/apple-touch-icon.png" />\n' +
    '\n' +
    '\t<script src="http://resource.wufazhuce.com/jquery-2.1.3.min.js"></script>\n' +
    '\t<link rel="stylesheet" href="http://resource.wufazhuce.com/jquery.mobile-1.4.5.min.css" />\n' +
    '\n' +
    '\t<link rel="stylesheet" href="http://resource.wufazhuce.com/m.wufazhuce.com.css?v=4.3.0.1">\n' +
    '\t<script src="http://resource.wufazhuce.com/m.wufazhuce.com.js?v=4.3.0.1"></script>\n' +
    '\t<link rel="stylesheet" href="http://resource.wufazhuce.com/one.css?v=4.3.0.1">\n' +
    '\t<script src="http://resource.wufazhuce.com/one-zepto.min.js"></script>\n' +
    '\t<script src="http://resource.wufazhuce.com/one-vue.min.js"></script>\n' +
    '\t<script src="http://resource.wufazhuce.com/one-webview.js?v=4.3.0.1"></script>\n' +
    '\t<script src="http://resource.wufazhuce.com/jquery.mobile-1.4.5.min.js"></script>\n' +
    '\n' +
    '\t<script>\n' +
    '\t\tvar ONEGLOBAL = {staturl: "http://analytical.wufazhuce.com:81/"};\n' +
    '\t</script>\n' +
    '\t<script>\n' +
    '\t\tvar _hmt = _hmt || [];\n' +
    '\n' +
    '            (function () {\n' +
    '                var hm = document.createElement("script");\n' +
    '                hm.src = "//hm.baidu.com/hm.js?c945a8c1ead2ed7539596f4ded541ec1";\n' +
    '                var s = document.getElementsByTagName("script")[0];\n' +
    '                s.parentNode.insertBefore(hm, s);\n' +
    '            })();\n' +
    '\n' +
    '            (function (i, s, o, g, r, a, m) {\n' +
    '                i[\'GoogleAnalyticsObject\'] = r;\n' +
    '                i[r] = i[r] || function () {\n' +
    '                        (i[r].q = i[r].q || []).push(arguments)\n' +
    '                    }, i[r].l = 1 * new Date();\n' +
    '                a = s.createElement(o),\n' +
    '                    m = s.getElementsByTagName(o)[0];\n' +
    '                a.async = 1;\n' +
    '                a.src = g;\n' +
    '                m.parentNode.insertBefore(a, m)\n' +
    '            })(window, document, \'script\', \'//www.google-analytics.com/analytics.js\', \'ga\');\n' +
    '\n' +
    '            ga(\'create\', \'UA-66027336-1\', \'auto\');\n' +
    '            ga(\'send\', \'pageview\');\n' +
    '\n' +
    '\t</script>\n' +
    '\t<style>\n' +
    '\t\t.onem-author-follow-btn {\n' +
    '\t\t\tfont-size: 12px;\n' +
    '\t\t\tline-height: 18px;\n' +
    '\t\t\tpadding: 6px 0px 6px 0px;\n' +
    '\t\t\twidth: 44px;\n' +
    '\t\t\ttext-align: center;\n' +
    '\t\t\tcolor: #808080;\n' +
    '\t\t\tdisplay: inline-block;\n' +
    '\t\t\tborder-radius: 2px;\n' +
    '\t\t\tborder: 1px solid rgba(128, 128, 128, .6);\n' +
    '\t\t\tbackground-color: white;\n' +
    '\t\t}\n' +
    '\t</style>\n' +
    '\t<!--  -->\n' +
    '\n' +
    '\n' +
    '\t<!-- <link rel="apple-touch-icon-precomposed" href="http://image.wufazhuce.com/apple-touch-icon.png" /> -->\n' +
    '\t<!-- <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png"> -->\n' +
    '\t<!-- <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png"> -->\n' +
    '\t<!-- <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png"> -->\n' +
    '\t<!-- <link rel="apple-touch-icon" sizes="180x180" href="/path/to/icons/apple-touch-icon-180x180.png"> -->\n' +
    '\n' +
    '\n' +
    '\t<!-- STARTUP IMAGES -->\n' +
    '\n' +
    '\t<!-- iPad retina portrait startup image -->\n' +
    '\t<!--     <link href="apple-touch-startup-image-1536x2008.png" -->\n' +
    '\t<!--           media="(device-width: 768px) and (device-height: 1024px) -->\n' +
    '\t<!--                  and (-webkit-device-pixel-ratio: 2) -->\n' +
    '\t<!--                  and (orientation: portrait)" -->\n' +
    '\t<!--           rel="apple-touch-startup-image"> -->\n' +
    '\n' +
    '\t<!-- iPad retina landscape startup image -->\n' +
    '\t<!--     <link href="apple-touch-startup-image-1496x2048.png" -->\n' +
    '\t<!--           media="(device-width: 768px) and (device-height: 1024px) -->\n' +
    '\t<!--                  and (-webkit-device-pixel-ratio: 2) -->\n' +
    '\t<!--                  and (orientation: landscape)" -->\n' +
    '\t<!--           rel="apple-touch-startup-image"> -->\n' +
    '\n' +
    '\n' +
    '\t<!-- iPhone 6 Plus portrait startup image -->\n' +
    '\t<link href="http://image.wufazhuce.com/m.wufazhuce.com-startup-iPhone6P.png" media="(device-width: 414px) and (device-height: 736px)\n' +
    '                 and (-webkit-device-pixel-ratio: 3)\n' +
    '                 and (orientation: portrait)" rel="apple-touch-startup-image">\n' +
    '\n' +
    '\t<!-- iPhone 6 Plus landscape startup image -->\n' +
    '\t<!--     <link href="apple-touch-startup-image-1182x2208.png" -->\n' +
    '\t<!--           media="(device-width: 414px) and (device-height: 736px) -->\n' +
    '\t<!--                  and (-webkit-device-pixel-ratio: 3) -->\n' +
    '\t<!--                  and (orientation: landscape)" -->\n' +
    '\t<!--           rel="apple-touch-startup-image"> -->\n' +
    '\n' +
    '\t<!-- iPhone 6 startup image -->\n' +
    '\t<link href="http://image.wufazhuce.com/m.wufazhuce.com-startup-iPhone6.png" media="(device-width: 375px) and (device-height: 667px)\n' +
    '                 and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">\n' +
    '\n' +
    '\t<!-- iPhone 5 startup image -->\n' +
    '\t<link href="http://image.wufazhuce.com/m.wufazhuce.com-startup-iPhone5.png" media="(device-width: 320px) and (device-height: 568px)\n' +
    '                 and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">\n' +
    '\n' +
    '\t<!-- iPhone < 5 retina startup image -->\n' +
    '\t<!-- <link -->\n' +
    '\t<!-- \thref="http://image.wufazhuce.com/m.wufazhuce.com-startup-iPhone.png" -->\n' +
    '\t<!-- \tmedia="(device-width: 320px) and (device-height: 480px) -->\n' +
    '\t<!--                   and (-webkit-device-pixel-ratio: 2)" -->\n' +
    '\t<!-- \trel="apple-touch-startup-image"> -->\n' +
    '\n' +
    '\t<!-- iPhone < 5 non-retina startup image -->\n' +
    '\t<!--     <link href="apple-touch-startup-image-320x460.png" -->\n' +
    '\t<!--           media="(device-width: 320px) and (device-height: 480px) -->\n' +
    '\t<!--                  and (-webkit-device-pixel-ratio: 1)" -->\n' +
    '\t<!--           rel="apple-touch-startup-image"> -->\n' +
    '\n' +
    '\t<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=7bc6109fa984"></script>\n' +
    '\n' +
    '\t<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>\n' +
    '</head>\n' +
    '\n' +
    '<body id="angOne_index" class="one-wapsite">\n' +
    '\n' +
    '\n' +
    '\t<div data-role="page" id="myPage_angOne_index" style="background:transparent;">\n' +
    '\n' +
    '\n' +
    '\n' +
    '\t\t<div data-role="popup" id="searchPopup_angOne_index" data-theme="a" data-history="false" data-overlay-theme="b"\n' +
    '\t\t\tdata-corners="false" data-shadow="false" data-tolerance="0,0,0,0" class="ui-content searchPopup">\n' +
    '\n' +
    '\n' +
    '\t\t\t<div class="search_bar">\n' +
    '\t\t\t\t<table>\n' +
    '\t\t\t\t\t<tr>\n' +
    '\t\t\t\t\t\t<td>\n' +
    '\t\t\t\t\t\t\t<form action="http://m.wufazhuce.com/search?fromUrl=http%3A%2F%2Fm.wufazhuce.com%2Fone"\n' +
    '\t\t\t\t\t\t\t\tid="search_form" style="background:clear">\n' +
    '\t\t\t\t\t\t\t\t<input type="text" data-clear-btn="false" type="search" name="searchString" id="search_string_angOne_index" class="search_string"\n' +
    '\t\tvalue="" placeholder="输入作者或标题关键字" required="required"/>\n' +
    '</form>\n' +
    '\t\t\t\t\t\t</td>\n' +
    '\n' +
    '\t\t\t\t\t\t<td class="search_td search_btn" id="search_btn_angOne_index" align="center" valign="center">\n' +
    '\t\t\t\t\t\t\t<i class="one-icon one-icon-search wap-icon wap-icon-search"></i>\n' +
    '\t\t\t\t\t\t</td>\n' +
    '\n' +
    '\t\t\t\t\t\t<td class="search_td cancel_btn" id="cancel_btn_angOne_index" align="center" valign="center">\n' +
    '\t\t\t\t\t\t\t<i class="one-icon one-icon-close wap-icon"></i>\n' +
    '\t\t\t\t\t\t</td>\n' +
    '\n' +
    '\t\t\t\t\t</tr>\n' +
    '\n' +
    '\t\t\t\t</table>\n' +
    '\n' +
    '\t\t\t\t \n' +
    '\t\t\t</div>\n' +
    '\n' +
    '\t\t</div>\n' +
    '\t\t<script>\n' +
    '\t\t\t$(document).ready(function(){\n' +
    '\t\n' +
    '\tvar searchUrl="http://m.wufazhuce.com/search?fromUrl=http%3A%2F%2Fm.wufazhuce.com%2Fone&searchString=";\n' +
    '\tvar action="angOne_index"\n' +
    '\tloadSearchBar(searchUrl,action);\n' +
    '\t\t\n' +
    '})\n' +
    '\t\t</script>\n' +
    '\t\t<div class="header">\n' +
    '\n' +
    '\t\t\t<table>\n' +
    '\t\t\t\t<tr>\n' +
    '\n' +
    '\t\t\t\t\t<td><a href="#left-panel"><i class="one-icon one-icon-menu menu"></i></a></td>\n' +
    '\t\t\t\t\t<td align="center"><span class="text-header text">\n' +
    '\t\t 一个图文\t\t </span></td>\n' +
    '\n' +
    '\t\t\t\t\t<td>\n' +
    '\t\t\t\t\t\t<a id="header_search_btn_angOne_index">\n' +
    '\t\t\t\t\t\t\t<i class="one-icon one-icon-search search"></i>\n' +
    '\t\t\t\t\t\t</a>\n' +
    '\t\t\t\t\t</td>\n' +
    '\t\t\t\t</tr>\n' +
    '\t\t\t</table>\n' +
    '\n' +
    '\n' +
    '\t\t\t        \n' +
    '\t\t</div>\n' +
    '\n' +
    '\n' +
    '\t\t<div data-role="panel" id="left-panel" data-position="left" data-display="overlay" data-theme="b">\n' +
    '\t\t\t        \n' +
    '\t\t\t<ul data-role="listview" data-hide-dividers="true">\n' +
    '\t\t\t\t<li data-icon="false">\n' +
    '\t\t\t\t\t<a href="http://m.wufazhuce.com/one" data-ajax="false">\n' +
    '\t\t\t\t\t\t<span class="list-text">图文</span>\n' +
    '\t\t\t\t\t</a>\n' +
    '\t\t\t\t</li>\n' +
    '\t\t\t\t<li data-icon="false">\n' +
    '\t\t\t\t\t<a href="http://m.wufazhuce.com/article" data-ajax="false">\n' +
    '\t\t\t\t\t\t<span class="list-text">阅读</span>\n' +
    '\t\t\t\t\t</a>\n' +
    '\t\t\t\t</li>\n' +
    '\t\t\t\t<li data-icon="false">\n' +
    '\t\t\t\t\t<a href="http://m.wufazhuce.com/music" data-ajax="false">\n' +
    '\t\t\t\t\t\t<span class="list-text">音乐</span>\n' +
    '\t\t\t\t\t</a>\n' +
    '\t\t\t\t</li>\n' +
    '\t\t\t\t<li data-icon="false">\n' +
    '\t\t\t\t\t<a href="http://m.wufazhuce.com/movie" data-ajax="false">\n' +
    '\t\t\t\t\t\t<span class="list-text">影视</span>\n' +
    '\t\t\t\t\t</a>\n' +
    '\t\t\t\t</li>\n' +
    '\t\t\t\t<li data-icon="false"><a href="http://m.wufazhuce.com/apps" data-ajax="false">\n' +
    '\t\t\t\t\t\t<span class="list-text">App下载</span></a>\n' +
    '\t\t\t\t</li>\n' +
    '\t\t\t\t<li data-icon="false"><a href="http://m.wufazhuce.com/about" data-ajax="false"> <span class="list-text">关\n' +
    '\t\t\t\t\t于</span></a></li>\n' +
    '\n' +
    '\t\t\t</ul>\n' +
    '\t\t\t    \n' +
    '\t\t</div>\n' +
    '\t\t<!-- /panel -->\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\t\t<div class="ui-content" role="main">\n' +
    '\n' +
    '\n' +
    '\n' +
    '\t\t\t<div class="content-list-wrapper">\n' +
    '\t\t\t\t<div class="content-list item-list"></div>\n' +
    '\t\t\t\t<div class="content-list-loading" style="display: none">\n' +
    '\t\t\t\t\t<span class="ui-icon-loading">正在加载中...</span>\n' +
    '\t\t\t\t</div>\n' +
    '\t\t\t</div>\n' +
    '\n' +
    '\t\t\t<script>\n' +
    '\t\t\t\tOne.token = \'e14111cc753dc18a23d6456d990c62eed87ddf5f\';\n' +
    '    $(function () {\n' +
    '        var page = $(\'#myPage_angOne_index\');\n' +
    '        One.listPage.init(page, \'http://m.wufazhuce.com/one/ajaxlist/\');\n' +
    '    });\n' +
    '\t\t\t</script>\n' +
    '\n' +
    '\t\t</div>\n' +
    '\n' +
    '\n' +
    '\t\t<script>\n' +
    '\t\t\tfunction configShare(datasource, shareList) {\n' +
    '\n' +
    '            //wx share\n' +
    '            var getSignPackageUrl = "http://m.wufazhuce.com/share/sign?url=http%3A%2F%2Fm.wufazhuce.com%2Fone";\n' +
    '            $.get(getSignPackageUrl, function (data) {\n' +
    '                var dataObj = eval("(" + data + ")");\n' +
    '                wx.config({\n' +
    '                    debug: false,\n' +
    '                    appId: dataObj.appId,\n' +
    '                    timestamp: dataObj.timestamp,\n' +
    '                    nonceStr: dataObj.nonceStr,\n' +
    '                    signature: dataObj.signature,\n' +
    '                    jsApiList: ["onMenuShareTimeline",\n' +
    '                        "onMenuShareAppMessage",\n' +
    '                        "onMenuShareQQ",\n' +
    '                        "onMenuShareQZone"\n' +
    '                    ]\n' +
    '                    // 所有要调用的 API 都要加到这个列表中\n' +
    '                });\n' +
    '            });\n' +
    '\n' +
    '            wx.ready(function () {\n' +
    '\n' +
    '                document.getElementById(\'wxshare\').onclick=function () {\n' +
    '                    $( "#share-btn" ).popup( "close" );\n' +
    '                    $(\'#weixinTip\').show();\n' +
    '\n' +
    '                    $(\'#weixinTip\').click(function () {\n' +
    '                        $(this).hide();\n' +
    '                    });\n' +
    '                };\n' +
    '                if (shareList){\n' +
    '                    wxShare("", "", "", "", shareList);\n' +
    '                }else{\n' +
    '                    var dataSource = JSON.stringify(datasource);\n' +
    '                    var dataSource = eval("(" + dataSource + ")");\n' +
    '\n' +
    '                    var link = dataSource.url ? dataSource.url : "http://m.wufazhuce.com/";\n' +
    '                    var title = dataSource.title;\n' +
    '                    var desc = dataSource.summary;\n' +
    '                    var imageUrl = dataSource.image_url ? dataSource.image_url\n' +
    '                        : "http://image.wufazhuce.com/icon_4.0.png";\n' +
    '                    wxShare(link, title, desc, imageUrl, shareList);\n' +
    '                }\n' +
    '            });\n' +
    '            wx.error(function (res) {\n' +
    '                console.log(\'wx config error:\' + JSON.stringify(res));\n' +
    '            });\n' +
    '            // 在这里调用 API\n' +
    '        }\n' +
    '\t\t</script>\n' +
    '\n' +
    '</body>\n' +
    '\n' +
    '</html>'
const reg = /[a-z0-9]{40}/g
const res = str.match(reg)
