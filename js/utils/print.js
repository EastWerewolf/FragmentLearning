// 打印类属性、方法定义
// 用法：Print('#app') / new Print(document.getElementById('app'), { noPrint: '.no-print' })
// 也支持传 Vue 实例：Print(this)
const PRINT_IFRAME_ID = 'print-iframe';

const Print = function (dom, options) {
  if (!(this instanceof Print)) return new Print(dom, options);

  this.options = Object.assign({ noPrint: '.no-print' }, options);

  if (typeof dom === 'string') {
    this.dom = document.querySelector(dom);
    if (!this.dom) throw new Error('Print: 找不到元素 ' + dom);
  } else if (this.isDOM(dom)) {
    this.dom = dom;
  } else if (dom && dom.$el) {
    // 传入的是 Vue 实例，取它的根元素
    this.dom = dom.$el;
  } else {
    throw new Error('Print: 打印目标必须是选择器、DOM 元素或 Vue 实例');
  }

  this.init();
};

Print.prototype = {
  // 直接给 prototype 赋值会丢掉 constructor 指向，补回来
  constructor: Print,

  init: function () {
    this.writeIframe(this.getStyle() + this.getHtml());
  },

  getStyle: function () {
    var str = '';
    // 只复制样式表，避免把 icon 之类的 link 也带进 iframe
    var styles = document.querySelectorAll('style, link[rel~="stylesheet"]');
    styles.forEach(function (el) {
      str += el.outerHTML;
    });
    if (this.options.noPrint) {
      str += '<style>' + this.options.noPrint + '{opacity:0 !important;}</style>';
    }
    return str;
  },

  getHtml: function () {
    var root = this.wrapperRefDom(this.dom);

    // 用页面上的实时值同步到副本上（原实现是直接改原页面的 DOM，属于副作用）
    this.syncFormValue(this.dom, root);
    // 副本里不执行脚本，否则 doc.write 会把页面的 script 再跑一遍
    root.querySelectorAll('script').forEach(function (el) {
      el.remove();
    });
    // 通过 classList 合并 class，原来的字符串 replace 在 <html> 已有 class 时会产出重复的 class 属性
    if (root.nodeName === 'HTML') root.classList.add('printLayout');

    return root.outerHTML;
  },

  // 把表单元素的实时状态同步到打印副本上，两者在文档顺序上一一对应
  syncFormValue: function (sourceRoot, cloneRoot) {
    var source = sourceRoot.querySelectorAll('input, textarea, select');
    cloneRoot.querySelectorAll('input, textarea, select').forEach(function (el, i) {
      var src = source[i];
      if (!src || src.nodeName !== el.nodeName) return;

      if (el.nodeName === 'TEXTAREA') {
        // 用 textContent，避免把用户输入当成 HTML 解析
        el.textContent = src.value;
      } else if (el.nodeName === 'SELECT') {
        var srcOptions = src.options;
        el.options.forEach(function (option, j) {
          option.toggleAttribute('selected', !!(srcOptions[j] && srcOptions[j].selected));
        });
      } else if (el.type === 'checkbox' || el.type === 'radio') {
        el.toggleAttribute('checked', src.checked);
      } else {
        el.setAttribute('value', src.value);
      }
    });
  },

  // 向父级元素循环，包裹当前需要打印的元素
  // 防止根级别开头的 css 选择器不生效
  wrapperRefDom: function (refDom) {
    // 不在 body 中（如隐藏的模板节点），直接克隆一份返回，不要动原节点
    if (!this.isInBody(refDom)) return refDom.cloneNode(true);

    var prevDom = null;
    var currDom = refDom;

    while (currDom) {
      if (prevDom) {
        // 只克隆自身属性和层级，不复制兄弟节点
        var element = currDom.cloneNode(false);
        element.appendChild(prevDom);
        prevDom = element;
      } else {
        prevDom = currDom.cloneNode(true);
      }

      currDom = currDom.parentElement;
    }

    return prevDom;
  },

  writeIframe: function (content) {
    // 先清掉上一次残留的 iframe，否则会产生重复 id
    var prev = document.getElementById(PRINT_IFRAME_ID);
    if (prev) prev.remove();

    var iframe = document.createElement('iframe');
    iframe.id = PRINT_IFRAME_ID;
    iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-10px;left:-10px;border:0;');
    document.body.appendChild(iframe);

    var self = this;
    var w = iframe.contentWindow;
    var doc = iframe.contentDocument || w.document;
    var printed = false;

    // onload 必须在 write 之前挂上：doc.close() 之后 load 可能已经触发，事后再挂就漏掉了
    iframe.onload = function () {
      if (printed) return;
      printed = true;
      self.toPrint(w, iframe);
    };

    doc.open();
    doc.write(content);
    doc.close();
  },

  toPrint: function (frameWindow, iframe) {
    if (!frameWindow) return;

    var destroy = function () {
      if (iframe.parentNode) iframe.remove();
    };

    // 打印对话框关闭后再移除 iframe。
    // 原来的 100ms 固定延时在 Chrome 上会在对话框还开着时就把 iframe 删掉，打印出来是空白页
    frameWindow.onafterprint = destroy;
    // 兜底：afterprint 没触发时别让 iframe 一直留在页面上
    setTimeout(destroy, 60 * 1000);

    setTimeout(function () {
      try {
        frameWindow.focus();
        frameWindow.print();
      } catch (err) {
        console.error('Print: 调起打印失败', err);
      }
    }, 10);
  },

  // 检查一个元素是否是 body 元素的后代元素且非 body 元素本身
  isInBody: function (node) {
    return node !== document.body && document.body.contains(node);
  },

  // 判断是不是 DOM 元素。用 nodeType 判断，SVG 元素也能覆盖（instanceof HTMLElement 会漏掉 SVG）
  isDOM: function (obj) {
    return !!obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }
};

// 需要挂到 Vue 上的话：Vue.use(PrintPlugin)
export const PrintPlugin = {
  install: function (Vue) {
    Vue.prototype.$print = Print;
  }
};

export default Print;
