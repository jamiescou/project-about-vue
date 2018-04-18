/*eslint-disable */
import cookieTools from 'common/javascript/tools/cookieTools'

var bShowToolbar = true;
 var bShowSaveAs = true;
 var bShowPrint = true;
 var bEnableCueBanner = false;
 var nEnableSidebar = 0;
 var gSigAppearanceType = "";
 var gWritingImage = "";
 var gPngSealImage = ''

       // Create PDFCtrl according to IE architecture

       function addSign(eleId) {
           try {
               var PDFCtrlPlaceHolder = document.getElementById(eleId);

               if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0) {
                   if (window.navigator.cpuClass == "x86") {
                       PDFCtrlPlaceHolder.innerHTML = "<object id=\"PDFCtrl\" codebase=\"/static/TrustSignPDFPlugin.Standard.x86.cab#version=3,2,1,0\" classid=\"clsid:6F60FE31-F827-4295-8AC4-775EF7478A6A\" width=\"100%\" height=\"100%\"><param name=\"showToolbar\" value=true></object>";
                   }
                   else {
                       PDFCtrlPlaceHolder.innerHTML = "<object id=\"PDFCtrl\" codebase=\"/static/TrustSignPDFPlugin.Standard.x64.cab#version=3,2,1,0\" classid=\"clsid:6F60FE31-F827-4295-8AC4-775EF7478A6A\" width=\"100%\" height=\"100%\"><param name=\"showToolbar\" value=true></object>";
                   }
               }
               else {
                   alert("请使用 IE 浏览器！");
               }
           }
           catch (e) {
               alert(e);
               return;
           }
       }

       // PDF Control Ready Event

       function OnCtrlReady() {
           var pfxCert = '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';
           var pfxPwd = "111111";
           PDFCtrl.GetVersion();
           PDFCtrl.SetSignCert(pfxCert, pfxPwd);
           PDFCtrl.SetPKCS11Module("UlanPKCS11.dll|CFCA_UKEY_P11.dll");
           PDFCtrl.SetTimestampServer("http://210.74.41.195/timestamp");
       }


       /* PDF Control Method */

       // Control appearance

       function ToggleToolbar() {
           bShowToolbar = !bShowToolbar;
           try {
               PDFCtrl.ToggleToolbar(bShowToolbar);
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function ToggleButton_SaveAs() {
           bShowSaveAs = !bShowSaveAs;
           try {
               PDFCtrl.ToggleButton_SaveAs(bShowSaveAs);
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function ToggleButton_Print() {
           bShowPrint = !bShowPrint;
           try {
               PDFCtrl.ToggleButton_Print(bShowPrint);
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function EnableSidebar() {
           nEnableSidebar = nEnableSidebar == 0 ? 2 : 0;
           try {
               PDFCtrl.EnableSidebar(nEnableSidebar);
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function EnableCueBanner() {
           bEnableCueBanner = !bEnableCueBanner;
           try {
               PDFCtrl.EnableCueBanner(bEnableCueBanner);
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }


       // File operations

       function OpenLocalFile() {
           try {
               PDFCtrl.OpenLocalFile("D:\\testfile.pdf");
           }
           catch (e) {
               if (e.number == -2147024894)//0x80070002
                   alert("测试文件不存在！\n请先放置文件 D:\\testfile.pdf");
               else {
                   var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
                   alert(LastErrorDesc);
               }
           }
       }

       function OpenWebFile(url, sessionid) {
           try {
               PDFCtrl.OpenWebFile(url, cookieTools.urlSession(sessionid));
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
              alert(LastErrorDesc);
           }
       }

       function UploadCurrentFile(url, sessionid) {
           try {
              //  alert("演示此功能需要一个配套的Web服务器.\n如果您需要演示此功能，请和我们联系.\n谢谢！");
              //  return;
               var response = null
               response = PDFCtrl.UploadCurrentFile(url, cookieTools.urlSession(sessionid));
               return response
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
              //  alert(LastErrorDesc);
           }
       }

       function CloseFile() {
           try {
               PDFCtrl.CloseFile();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }


       // Page operations

       function GoToFirstPage() {
           try {
               PDFCtrl.GoToFirstPage();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function GoToLastPage() {
           try {
               PDFCtrl.GoToLastPage();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function GoToPrevPage() {
           try {
               PDFCtrl.GoToPrevPage();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function GoToNextPage() {
           try {
               PDFCtrl.GoToNextPage();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function GetPageNo() {
           var result = {

           }
           try {
               result.pageNo = PDFCtrl.GetCurrentPageNo();
               result.pageCount = PDFCtrl.GetPageCount();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function GoToPage() {
           try {
               var pageNo = document.getElementById("PageNo").value;
               if ("" == pageNo) {
                   alert("请输入页码！");
                   return;
               }
               PDFCtrl.GoToPage(pageNo);
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function GoToBookmark() {
           try {
               var bookmark = document.getElementById("Bookmark").value;
               if ("1" == bookmark) {
                   alert("请输入书签名！");
                   return;
               }
               PDFCtrl.GoToBookmark(bookmark);
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }


       // Zoom operations

       function ZoomTo(factor) {
           try {
               PDFCtrl.ZoomTo(factor);
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function ZoomOut() {
           try {
               PDFCtrl.ZoomOut();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function ZoomIn() {
           try {
               PDFCtrl.ZoomIn();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function ZoomValue() {
           try {
               var zoom = PDFCtrl.ZoomValue();
               alert("当前缩放率: " + zoom + "%");
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }


       // Print operations

       function GetDefaultPrinter() {
           try {
               var printerName = PDFCtrl.GetDefaultPrinter();

               document.getElementById("PrinterName").value = printerName;
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }


       function PrintFile() {
           try {
               var printerName = document.getElementById("PrinterName").value;
               var printOptions = document.getElementById("PrintOptions").value;

               PDFCtrl.PrintFile(printerName, printOptions);
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }


       // Extend screen operations

       function DuplicateToExtendScreen() {
           try {
               PDFCtrl.DuplicateDocToExtendScreen();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function CloseExtendScreen() {
           try {
               PDFCtrl.RemoveDocOnExtendScreen();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }


       // Certificate operations

       function SelectSignCert(subjectDN,issuerDN,certSN) {
            // issuerDN = sessionStorage.getItem('issuerDn')
            // certSN = sessionStorage.getItem('serialNo')
           try {
              subjectDN = subjectDN||''
              issuerDN = issuerDN||''
              certSN = certSN||''

              const result = PDFCtrl.SelectSignCert(subjectDN, issuerDN, certSN, "");
              return true
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
               return false
           }
       }

       function GetSignCertInfo() {
           try {
               var certInfo = "证书持有者CN:\t"     + PDFCtrl.GetSignCertInfo("SubjectCN")
                            + "\n证书持有者DN:\t"   + PDFCtrl.GetSignCertInfo("SubjectDN")
                            + "\n证书颁发者DN:\t"   + PDFCtrl.GetSignCertInfo("IssuerDN")
                            + "\n证书序列号:\t"     + PDFCtrl.GetSignCertInfo("SerialNumber")
                            + "\n起始有效期:\t"     + PDFCtrl.GetSignCertInfo("ValidFrom")
                            + "\n截止有效期:\t"     + PDFCtrl.GetSignCertInfo("ValidTo")
                            + "\n起始有效期UTC:\t"  + PDFCtrl.GetSignCertInfo("UTCValidFrom")
                            + "\n截止有效期UTC:\t"  + PDFCtrl.GetSignCertInfo("UTCValidTo")
                            + "\n证书算法:\t\t"     + PDFCtrl.GetSignCertInfo("CertAlgorithm")
                            + "\n证书内容:\t"       + PDFCtrl.GetSignCertInfo("CertContent");

               alert(certInfo);
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }


       // Trigger place signature

       function TriggerPlaceSignature( imgBase64,signType) {
           PDFCtrl.SetSignatureHashAlg('SHA256')
           if(!imgBase64) {
              imgBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjhDRDVBRjk1QTU4MTFFN0JEQzc5NTM1NEFGNTZFMDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjhDRDVBRkE1QTU4MTFFN0JEQzc5NTM1NEFGNTZFMDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OENENUFGNzVBNTgxMUU3QkRDNzk1MzU0QUY1NkUwMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2OENENUFGODVBNTgxMUU3QkRDNzk1MzU0QUY1NkUwMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqM+RnUAAACkSURBVHja7NEBDQAACMMwwL/nY4OQTsLaSUp3GguACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiAABEQAQEiIEAE5HsrwAD7zQPFE3oDHgAAAABJRU5ErkJggg=='
           }
           try {
               gSigAppearanceType = signType || 'serverImage';
               gPngSealImage = imgBase64
               if ("handwriting" == gSigAppearanceType) {
                   var width  = PDFCtrl.GetExtendScreenWidth();
                   var height = PDFCtrl.GetExtendScreenHeight();
                   PDFCtrl.SetHandwritingDialogPosition(width - 550, height - 350, 500, 300);
                   PDFCtrl.SetHandwritingDialogTransparent(80);
                   gWritingImage = PDFCtrl.OpenHandwritingDialog(7);
                   PDFCtrl.ClickToPlaceSignature(gWritingImage);
               }
               else if ("serverImage" == gSigAppearanceType) {
                   PDFCtrl.ClickToPlaceSignature(gPngSealImage);
               }
               else if ("keyImage" == gSigAppearanceType) {
                   PDFCtrl.ClickToPlaceSignature();
               }
               else if ("singleText" == gSigAppearanceType || "dualText" == gSigAppearanceType) {
                   PDFCtrl.DragToPlaceSignature();
               }
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function ResetMouseAction() {
           try {
               PDFCtrl.ResetMouseAction();
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }


       /* PDF Control Event Handler */

       // Sign file

       function OnClickPoint(nPageNo, x, y, signType) {
           try {

               gSigAppearanceType = signType || 'serverImage';

               if ("handwriting" == gSigAppearanceType) {
                   PDFCtrl.SignFile_Image(nPageNo, x, y, gWritingImage);
               }
               else if ("serverImage" == gSigAppearanceType) {
                 PDFCtrl.SignFile_Image(nPageNo, x, y, gPngSealImage);
               }
               else if ("keyImage" == gSigAppearanceType) {
                   PDFCtrl.SignFile_KeyImage(nPageNo, x, y);
               }
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function OnDragRect(nPageNo, x0, y0, x1, y1) {
           try {
               if ("singleText" == gSigAppearanceType) {
                   PDFCtrl.SignFile_Text(nPageNo, x0, y0, x1, y1, "CFCA");
               }
               else if ("dualText" == gSigAppearanceType) {
                   PDFCtrl.SignFile_Text(nPageNo, x0, y0, x1, y1, "李小明", "中国金融认证中心");
               }
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }


       // Sign blank field

       function OnClickFeild(strFieldName) {
           try {
               var appearanceType = GetRadioValue("FieldAppearance");

               if ("handwriting" == appearanceType) {
                   var writingImage = PDFCtrl.OpenHandwritingDialog(5);
                   var writingData  = PDFCtrl.GetHandwritingData();
                   PDFCtrl.SignField_Image(strFieldName, writingImage);
               }
               else if ("singleText" == appearanceType) {
                   PDFCtrl.SignField_Text(strFieldName, "中国金融认证中心");
               }
               else if ("dualText" == appearanceType) {
                   PDFCtrl.SignField_Text(strFieldName, "李小明", "中国金融认证中心");
               }
           else if ("serverImage" == appearanceType) {
               PDFCtrl.SignField_Image(strFieldName, gPngSealImage);
               }
               else if ("keyImage" == appearanceType) {
                   PDFCtrl.SignField_KeyImage(strFieldName);
               }
               else {
                   alert("Unsupported!");
           }
           }
           catch (e) {
               var LastErrorDesc = PDFCtrl.GetLastErrorDesc();
               alert(LastErrorDesc);
           }
       }

       function GetRadioValue(name) {
           var value;
           var radios = document.getElementsByName(name);

           for (var i = 0, len = radios.length; i < len; i++) {
               if (radios[i].checked) {
                   value = radios[i].value;
                   break;
               }
           }
           return value;
       }


const signTools = {
  addSign: addSign,
  OpenWebFile: OpenWebFile,
  CloseFile: CloseFile,
  TriggerPlaceSignature: TriggerPlaceSignature,
  GetPageNo: GetPageNo,
  OnClickPoint: OnClickPoint,
  SelectSignCert: SelectSignCert,
  UploadCurrentFile: UploadCurrentFile
}

export default signTools
