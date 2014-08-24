;(function($){
  $.fn.myWF = function(opts){
    var defaults = {
      rowNum: 3,
      itemHeight: 180
    };

    var options = $.extend(defaults, opts);
      var $wfElement = $(this),
          $wfItems = $wfElement.find(".item"),
          wArray = [],
          maxWidth,
          iHeight = options.itemHeight + 20;

      //初始化CSS样式
      $wfElement.css({"position": "relative"});
      $wfItems.css({"position": "absolute"});

      for (var i = 0; i < $wfItems.length; i++) {
          var iWidth = $wfItems[i].offsetWidth,
              iLeft,
              iTop,
              minWArray,
              minID;

          //第一列位置
          if(i < options.rowNum){   
            wArray[i] = iWidth;
            iLeft = 0;
            iTop = i * iHeight + "px";

          //后面列位置
          }else{
            minWArray = Math.min.apply(null, wArray);   //获取数组最小值
            minID = getArrayID(wArray, minWArray);   //获取最小值对应位置
            wArray[minID] += iWidth + 20;
     
            iTop = iHeight * minID + "px"; 
            iLeft = minWArray + 20 + "px";

            console.log(minID +"___"+ wArray)
          }

          $wfItems.eq(i).addClass("itFadein").css({
              "left": iLeft,
              "top": iTop
          });  
      };

      //设置容器宽度
      maxWidth = Math.max.apply(null, wArray);
      $wfElement.css({"width": maxWidth + "px"});
      $("#header, #main, #footer").css({"width": maxWidth + "px"});

      //获取数组值对应位置
      function getArrayID(s, v){
        for(var ids in s){
          if(s[ids] == v) {return ids;}
        }
      }

      };
})(jQuery);