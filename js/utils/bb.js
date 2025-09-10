const press = (str)=>{
  let ret = '';
  if(str.length <= 1 ){
    return str
  }
  for(let i = 0; i < str.length;i++){
    const str2 = str[i]
    if(i === 0){
      ret += `${str2}1`
    } else{
      const lastStr = ret[ret.length - 2];
      const num = Number(ret[ret.length - 1]);
      if(lastStr === str2){
        const StrArray = ret.split('');
        StrArray[StrArray.length - 1] = num + 1
        ret = StrArray.join('')
      } else {
        ret += `${str2}1`
      }
    }
  }
  // ret = ret.replaceAll(/1/g,'')
  // console.log(ret,'返回值')/////
  return ret.replaceAll(/1/g,'')
}
press('aabcccccaaa');
const pressSimple = (str)=>{
  let ret = ''
  const map = new Map();
  for(let i = 0; i < str.length;i++){
    const value = str[i]
    if(!map.has(value)){
      map.set(value,1)
    } else {
      const num = map.get(value)
      map.set(value,1+num)
    }
  }
 map.forEach((value,key)=>{
    console.log(key,value);
    ret +=`${key}${value}`
  })
  console.log(ret,'返回值1')
  return ret
}
pressSimple('aabcccccaaa');