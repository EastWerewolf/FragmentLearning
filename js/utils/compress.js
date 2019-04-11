/**
 * 压缩图片  参数根据需求调整
 * @param file
 * @param type
 * @param fn
 */
function changeFile (file,type,fn) {
    // 压缩图片需要的一些元素和对象 //创建一个img对象
    let reader = new FileReader(), img = new Image();

    reader.readAsDataURL(file);
    // 文件base64化，以便获知图片原始尺寸 顺便预览图片
    reader.onload = function(e) {
        img.src = e.target.result;
    };

    // base64地址图片加载完毕后执行
    img.onload = function () {
        // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        // 图片原始尺寸
        let originWidth = this.width;
        let originHeight = this.height;

        // canvas对图片进行缩放
        canvas.width = originWidth;
        canvas.height = originHeight;
        // 清除画布
        context.clearRect(0, 0, originWidth, originHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, originWidth, originHeight);
        /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

        //压缩后的图片转base64 url
        /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
         * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
        // const newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式
        //也可以把压缩后的图片转blob格式用于上传
        canvas.toBlob((blob)=>{
            fn(blob,type);
            console.log(blob)
            //把blob作为参数传给后端
        }, 'image/jpeg', 0.35)
    };
}
