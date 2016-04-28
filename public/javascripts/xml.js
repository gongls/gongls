var xmlHelper={
    loadXML:function(xmlFile){
        var xmlDoc;
        if (window.ActiveXObject) {
            xmlDoc = new ActiveXObject('Microsoft.XMLDOM');//IE�����
            xmlDoc.async = false;
            xmlDoc.load(xmlFile);
        }
        else if (isFirefox=navigator.userAgent.indexOf("Firefox")>0) { //��������
            //else if (document.implementation && document.implementation.createDocument) {//������Ҫ�ǶԹȸ���������д���
            xmlDoc = document.implementation.createDocument('', '', null);
            xmlDoc.load(xmlFile);
        }
        else{ //�ȸ������
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET",xmlFile,false);
            xmlhttp.send(null);
            if(xmlhttp.readyState == 4){
                xmlDoc = xmlhttp.responseXML.documentElement;
            }
        }

        return xmlDoc;
    },
    makeXML:function(xmlString){
        var xmlDoc=null;
        //�ж������������
        //֧��IE�����
        if(!window.DOMParser && window.ActiveXObject){   //window.DOMParser �ж��Ƿ��Ƿ�ie�����
            var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
            for(var i=0;i<xmlDomVersions.length;i++){
                try{
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString); //loadXML��������xml�ַ���
                    break;
                }catch(e){
                }
            }
        }
        //֧��Mozilla�����
        else if(window.DOMParser && document.implementation && document.implementation.createDocument){
            try{
                /* DOMParser ������� XML �ı�������һ�� XML Document ����
                 * Ҫʹ�� DOMParser��ʹ�ò��������Ĺ��캯����ʵ��������Ȼ������� parseFromString() ����
                 * parseFromString(text, contentType) ����text:Ҫ������ XML ��� ����contentType�ı�����������
                 * ������ "text/xml" ��"application/xml" �� "application/xhtml+xml" �е�һ����ע�⣬��֧�� "text/html"��
                 */
                domParser = new  DOMParser();
                xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
            }catch(e){
            }
        }
        else{
            return null;
        }

        return xmlDoc;
    }
}