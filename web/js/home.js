function homeFun(win ,doc,xmlhttp){
    var contentBox =doc.getElementById('content_show');
    //清空 contentBox
    contentBox.innerHTML='';
    //创建头像
    function HeadPortrait(){
        var divImg = doc.createElement('div');
        var Div = doc.createElement('div');
            Div.className='ImgBox';
            divImg.style.backgroundImage='url(../image/P60814-101921.jpg)';
            divImg.className='homeImg';
            Div.appendChild(divImg)
        contentBox.appendChild(Div)
    }

    HeadPortrait()

};