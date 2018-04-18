/*eslint-disable */
function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
/**
*检测cookie的中是否存在
*/
function checkCookie(name,value)
{
  var value=getCookie(name);
  if (value!="")
  {
    alert("Welcome again " + user);
  }
  else
  {
    setCookie(name,value,365);
  }
}

/**
*删除制定名称的deleteCookie
*/
function deleteCookie(name){
  var date=new Date();
  date.setTime(date.getTime()-10000); //设定一个过去的时间即可
  document.cookie=name+"=v; expires="+date.toGMTString();
}

// cfca上传下载文件需要携带参数SESSION（tomcat下为JSESSIONID）
function urlSession(sessionid) {
  return document.cookie + '; SESSION='+sessionid + '; JSESSIONID='+sessionid
}
const cookieTools = {
  setCookie: setCookie,
  getCookie: getCookie,
  deleteCookie: deleteCookie,
  urlSession: urlSession
}
export default cookieTools
