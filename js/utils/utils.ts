const MINEType = {
  ".doc":"application/msword",
  '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls':'application/vnd.ms-excel',
  '.xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.pdf':'application/pdf',
  '.zip':'application/x-zip-compressed',
  '.rar':'application/x-rar-compressed',
  '.txt':'text/plain',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg',
  '.gif':'image/gif',
  '.bmp':'image/bmp',
  '.html':'text/html',
  '.htm':'text/html',
  '.css':'text/css',
  '.js':'application/x-javascript',
  '.json':'application/json',
  '.mp3':'audio/mp3',
  '.mp4':'video/mp4',
  '.wav':'audio/wav',
  '.wma':'audio/wma',
  '.wmv':'video/x-ms-wmv',
  '.avi':'video/avi',
  '.swf':'application/x-shockwave-flash',
  '.rm':'application/vnd.rn-realmedia',
  '.rmvb':'application/vnd.rn-realmedia-vbr',
  '.mid':'audio/mid',
  '.midi':'audio/mid',
  '.mov':'video/quicktime',
  '.mpg':'video/mpeg',
  '.mpeg':'video/mpeg',
  '.qt':'video/quicktime',
  '.m4v':'video/x-m4v',
  '.3gp':'video/3gpp',
  '.3gpp':'video/3gpp',
  '.3g2':'video/3gpp2',
  '.3gpp2':'video/3gpp2',
  '.aac':'audio/aac',
  '.aif':'audio/x-aiff',
  '.aiff':'audio/x-aiff',
  '.m3u':'audio/x-mpegurl',
  '.ram':'audio/x-pn-realaudio',
  '.ra':'audio/x-realaudio',
  '.wax':'audio/x-ms-wax',
  '.wm':'audio/x-ms-wm'
}



/**
 * 由于跨域  暂未使用 支持所有格式
 * @param url 文件地址
 */
 export async function getImage(url: string) {
  const { data } = await axios.get<any>(url,{responseType: 'blob'});
  return data;
}
export const downloadPreview = (url:string,name?:string) =>{
  const suffix = url.substring(url.lastIndexOf('.'));
  const type = MINEType[suffix];
  getImage(url).then(res => {
    const fileName = (name || '下载文件') + suffix;
    const myBlob = new Blob([res], { type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(myBlob);
    link.download = fileName;
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  })
}