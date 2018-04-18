import config from 'common/config/config'
/*eslint-disable */
var CryptoAgent = "";

// Create ActiveX object according to the platform
function initCryptoAgent() {
    if (!config.cfcaEnable) return ''
    try {
        var eDiv = document.createElement("div");
        if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0) {
            if (window.navigator.cpuClass == "x86") {
                eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"/static/CryptoKit.Ultimate.x86.cab\" classid=\"clsid:4C588282-7792-4E16-93CB-9744402E4E98\" ></object>";
            }
            else {
                eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"/static/CryptoKit.Ultimate.x64.cab\" classid=\"clsid:B2F2D4D4-D808-43B3-B355-B671C0DE15D4\" ></object>";
            }
        }
        else {
            eDiv.innerHTML = "<embed id=\"CryptoAgent\" type=\"/static/npCryptoKit.Ultimate.x86\" style=\"height: 0px; width: 0px\">";
        }
        document.body.appendChild(eDiv);
        CryptoAgent = document.getElementById("CryptoAgent");
        CryptoAgent.GetLastErrorDesc();
    }
    catch (e) {
    	if (typeof e == 'string') {
    		throw e;
	    } else if (e.name == 'TypeError') {
	    	if (confirm('请下载、安装证书控件，并重启浏览器')) {
	    		if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
	    		if (window.navigator.cpuClass == 'x86') {
	    			window.open('/static/CryptoKit.Ultimate.x86.exe');
	    			} else {
	    				window.open('/static/CryptoKit.Ultimate.x64.exe');
	    			}
	    		} else {
	    			window.open('/static/npCryptoKit.Ultimate.x86.exe');
	    		}
	    	}
	    	return false;
	    } else {
	    	var message = CryptoAgent.CFCA_GetLastErrorDesc();
	    	throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
	    }
    }
}

function setSM2CSPList(cspList){
	var bResult = CryptoAgent.SetSM2CSPList(cspList);
	return bResult;
}

// Select certificate
function selectCert(subjectDNFilter, issuerDNFilter, serialNumFilter, certFilter) {
    if (!config.cfcaEnable) return true
    certFilter = certFilter === false ? false : true
    if (certFilter) {
      // issuerDNFilter = sessionStorage.getItem('issuerDn') || ''
      // serialNumFilter = (sessionStorage.getItem('serialNo') || '').replace(/\D+/g,'')
    }
    try {
        subjectDNFilter  = subjectDNFilter || ''
        issuerDNFilter = issuerDNFilter || ''
        serialNumFilter = serialNumFilter || ''
        var bSelectCertResult = CryptoAgent.SelectCertificate(subjectDNFilter, issuerDNFilter, serialNumFilter);
        // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
        if (!bSelectCertResult) {
            throw CryptoAgent.GetLastErrorDesc();
        }
        return true
    }
    catch (e) {
    	if (typeof e == 'string') {
    		throw e;
	    } else {
	    	var message = CryptoAgent.GetLastErrorDesc();
            alert(message)
	    	throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
	    }
        return false
    }
}

// Get certificate information
function getCertInfo(InfoTypeID) {
    if (!config.cfcaEnable) return ''
    try {
        var InfoContent = "";
        InfoContent = CryptoAgent.GetSignCertInfo(InfoTypeID);
        // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
        if (!InfoContent) {
            throw CryptoAgent.GetLastErrorDesc();
        }
        return InfoContent;
    }
    catch (e) {
    	if (typeof e == 'string') {
    		throw e;
	    } else {
	    	var message = CryptoAgent.GetLastErrorDesc();
            alert(message)
	    	throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
	    }
    }
}

// Get certificate information
function getInfo(InfoTypeID) {
  if (!config.cfcaEnable) {
    return {
        issuerDN: '',
        serialNumber: '',
        subjectDN: '',
        SubjectCN: ''
    }

  }
  const SubjectDN = CFCATools.getCertInfo('SubjectDN')
  const SerialNumber = CFCATools.getCertInfo('SerialNumber')
  const IssuerDN = CFCATools.getCertInfo('IssuerDN')
  const SubjectCN = CFCATools.getCertInfo('SubjectCN')

  return  {
    issuerDN: IssuerDN,
    serialNumber: SerialNumber,
    subjectDN: SubjectDN,
    SubjectCN: SubjectCN
  }
}

// Sign message
function sign(selectedAlg, source, signType) {
    if (!config.cfcaEnable) return ''
    try {
        var signature = "";

        if ("Attach" == signType) {
            // PKCS#7 Attach
            signature = CryptoAgent.SignMsgPKCS7(source, selectedAlg, true);
        }
        else if ("Detach" == signType) {
            // PKCS#7 Detach
            signature = CryptoAgent.SignMsgPKCS7(source, selectedAlg, false);
        }
        else {
            // PKCS#1
            signature = CryptoAgent.SignMsgPKCS1(source, selectedAlg);
        }
        if (!signature) {
            throw CryptoAgent.GetLastErrorDesc();
        }
        return signature;
    } catch (e) {
    	if (typeof e == 'string') {
    		throw e;
	    } else {
	    	var message = CryptoAgent.GetLastErrorDesc();
            alert(message)
	    	throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
	    }
    }
}

function verifyPKCS7(signature, signaturetype) {
    try {
    	var bResult = false;
        bResult = CryptoAgent.VerifyMsgSignaturePKCS7Attached(signature, signaturetype);
        if (!bResult) {
            throw CryptoAgent.GetLastErrorDesc();
        }
		// Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
        if (!signature) {
            throw CryptoAgent.GetLastErrorDesc();
        }
        return bResult;
    } catch (e) {
    	if (typeof e == 'string') {
    		throw e;
	    } else {
	    	var message = CryptoAgent.GetLastErrorDesc();
	    	throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
	    }
    }
}

function verifyPKCS7Detached(signature, signaturetype, source) {
    try {
    	var bResult = false;
        bResult = CryptoAgent.VerifyMsgSignaturePKCS7Detached(signature, signaturetype, source);
        if (!bResult) {
            throw CryptoAgent.GetLastErrorDesc();
        }
        return bResult;
    }
    catch (e) {
    	if (typeof e == 'string') {
    		throw e;
	    } else {
	    	var message = CryptoAgent.GetLastErrorDesc();
	    	throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
	    }
    }
    return bResult;
}

function verifyPKCS1(signatureAlg, signature, source, base64cert, hashAlg) {
    try {
    	var bResult = false;
        var bWithZValue = true;

        bResult = CryptoAgent.VerifyMsgSignaturePKCS1(signature, signatureAlg, source, hashAlg, base64cert);
        if (!bResult) {
            throw CryptoAgent.GetLastErrorDesc();
        }
        return bResult;
    } catch (e) {
    	if (typeof e == 'string') {
    		throw e;
	    } else {
	    	var message = CryptoAgent.GetLastErrorDesc();
	    	throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
	    }
    }
}

function initRadio(rName,rValue){
    var rObj = document.getElementsByName(rName);

    for(var i = 0;i < rObj.length;i++){
        if(rObj[i].value == rValue){
            rObj[i].checked =  'checked';
        }
    }
}

function getSelectedItemValue(itemName) {
    var ele = document.getElementsByName(itemName);
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            return ele[i].value;
        }
    }
}

function getSelectedItemIndex(itemName) {
    var ele = document.getElementsByName(itemName);
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            return i;
        }
    }
}

function defaultSign (source, selectedAlg, signType) {
  signType = signType || 'Detach'
  selectedAlg = selectedAlg || 'SHA-256'
  console.log(source)
  let sign1 = sign(selectedAlg, source, signType)
  console.log(sign1)
  return sign1.replace(/\+/g, '-')
  // return encodeURI(sign1)
}

const CFCATools = {
  initCryptoAgent: initCryptoAgent,
  setSM2CSPList: setSM2CSPList,
  selectCert: selectCert,
  getCertInfo: getCertInfo,
  sign: sign,
  defaultSign: defaultSign,
  verifyPKCS7: verifyPKCS7,
  // verifyPKCS7Detached: verifyPKCS7Detached,
  verifyPKCS1: verifyPKCS1,
  initRadio: initRadio,
  getSelectedItemValue: getSelectedItemValue,
  getSelectedItemIndex: getSelectedItemIndex,
  getInfo: getInfo,
  verifyPKCS7Detached: verifyPKCS7Detached
}

export default CFCATools
