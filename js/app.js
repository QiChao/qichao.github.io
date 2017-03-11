var xmlhttp;//创建xmlhttp对象
function createxmlHttp(){
  if (window.XMLHttpRequest) 
      xmlhttp=new XMLHttpRequest(); 
  else 
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 createxmlHttp();
var api = window.location.origin;//'http://127.0.0.1:8000' || 'https://qichao.github.io';
var stateBox={
   navState:function(){
    stateBox.homeState();
    return true;
   },
   homeState:function(){
    homeFun(window,document,xmlhttp);
   },
   personalState:function(){

   },
   workState:function(){

   },
   worksState:function(){
    
   }
};
function getJsonPage(i){
    if(i==0){
        stateBox.homeState();
    }else if(i==1){
        stateBox.personalState();
    }else if(i==2){
        stateBox.workState();
    }else if(i==3){
        stateBox.worksState();
    }
};
function getNum(text){
        var value = parseFloat(text) ;
        return value;
    };
function css (t){
        var s;
        if(document.getElementsByTagName('style').length==0){
            s=document.createElement('style');
            s.innerText=t;
            document.body.appendChild(s);
        }else{

            s=document.getElementsByTagName('style');
            //s[0].innerText='';
            s[0].innerText=t;
        }
    };
function motion(starting,end,b){
        if (b) {
            return parseInt(starting)-(end-parseInt(starting))/30;
        }else{
            return parseInt(starting)+(end-parseInt(starting))/60;
        };
    };
(function (win,doc,xmlhttp){
    
    var Navs = doc.getElementsByTagName('nav');
    function getY(NavData){
        for (var i = 0;i<NavData.length ;  i++) {
            var Spans = doc.createElement('span');
            var A =doc.createElement('a');
            A.appendChild(doc.createTextNode(NavData[i].name));
            //A.href=NavData[i].Url;
            Spans.appendChild(A);
            Spans.index=i;
            Navs[0].appendChild(Spans);
        };
        var NavSpan = Navs[0].getElementsByTagName('span')
        for (var i = NavSpan.length - 1; i >= 0; i--) {
            NavSpan[i].onclick=function(){
                for (var j = NavSpan.length - 1; j >= 0; j--) {
                    NavSpan[j].className='';
                };
                contentText(this.index,NavData);

            }

        };
        contentText(0,NavData);
    }
    
    
    function contentText(i,NavData){
        getJsonPage(i);
        Navs[0].getElementsByTagName('span')[i].className='state';
        var Content = doc.getElementById('content')
        var BDBlur = doc.getElementById('bd_blur')
        css('#bd_blur::after{background-image:url(\' ' + NavData[i].image + ' \')}');

        Content.style.backgroundImage='url('+NavData[i].image+')';
        BDBlur.style.backgroundImage='url('+NavData[i].image+')';
        //doc.getElementById('content_show').innerHTML=NavData[i].name+ "--------------" + "内容"
        navShowFun();
    }
    
    Navs[0].style.left='0px';
    
    
    //nav  button  
    function navShowFun(){
        var navStyle = Navs[0].style
        if (navStyle.left=='0px') {
            //navStyle.left= -120+'px';
            doc.getElementById('navShowButton').innerHTML='>>';
            function LeftStyle (){

                 navStyle.left =   motion(getNum(navStyle.left),120,true)+'px';
                 if (getNum(navStyle.left)<=-120) {
                    navStyle.left = -120+'px';
                    clearInterval(s)
                 };
            }
            var s = setInterval(LeftStyle,10)
        }else{
            doc.getElementById('navShowButton').innerHTML='<<';
            function LeftStyletow (){
                 navStyle.left =   motion(getNum(navStyle.left),120,false)+'px';
                 if (getNum(navStyle.left)>=0) {
                    navStyle.left = 0+'px';
                    clearInterval(s)
                 };
            }
            var s = setInterval(LeftStyletow,10)
        };
        
    };
    doc.getElementById('navShowButton').addEventListener('click',navShowFun);
    

var obj = {
    url:api +'/json/json.json',
    type:"GET",
    success:function(data){
        var NavData = eval('(' + data + ')');
        getY(NavData)
        stateBox.navState()
    }
}
 AjaxLQC(obj);
 

})(window,document,xmlhttp);



function AjaxLQC(obj){
    obj = obj || {};
    obj.url = obj.url||'';
    obj.data = obj.data||null;
    obj.async = obj.async || true;
    obj.success = obj.success||function(){};
    if(obj.type==="GET"){
        xmlhttp.open('get',obj.url,obj.async);     //发送ajax
         xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         xmlhttp.send(null);  //get时data为null
    }
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
          {
            obj.success(xmlhttp.responseText);
          }
    }

/*
    function createRequest(){
         //xmlhttp.onreadystatechange=callbacksuccess    //回调函数
         xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
          {
             // 成功后执行的代码
             //doc.getElementById("navShowButton").innerHTML = xmlhttp.responseText;  //服务器返回数据为xmlhttp.responseText
             var NavData = eval('(' + xmlhttp.responseText + ')');
             createRequest.success = NavData;
             console.log(this)
             //console.log(createRequest()())
             //return this;
              //console.log(eval('(' + NavData + ')'))
             getY(NavData)
             stateBox.navState()
             //console.log(eval('(' + NavData + ')'))
             
          }
         }
         xmlhttp.open('get','http://127.0.0.1:8000/json/json.json',true);     //发送ajax
         xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         xmlhttp.send(null);  //get时data为null
         //return xmlhttp.onreadystatechange
        
     }
     function callbacksuccess()
     {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
          {
             // 成功后执行的代码
             //doc.getElementById("navShowButton").innerHTML = xmlhttp.responseText;  //服务器返回数据为xmlhttp.responseText
             var NavData = eval('(' + xmlhttp.responseText + ')');
             createRequest.success = NavData;
             this
             //console.log(createRequest()())
             //return this;
              //console.log(eval('(' + NavData + ')'))
             //getY(NavData)
             //stateBox.navState()
             //console.log(eval('(' + NavData + ')'))
             
          }
     }
     */
}
