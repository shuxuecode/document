
	$("#myFile").fileupload({    
            url: 'uploadDemo/doUpload',    
            limitConcurrentUploads: 1,  
            sequentialUploads: true,  
            progressInterval: 100,  
            maxChunkSize: 100000,   //设置上传片段大小，不设置则为整个文件上传  
            dataType: "json"  
              
        }).bind('fileuploadprogress', function (e, data) {    
            var progress = parseInt(data.loaded / data.total * 100, 10)-1;    
            $("#weixin_progress").css('width',progress + '%');    
            $("#weixin_progress").html(progress + '%');    
        }).bind('fileuploaddone', function (e, data) {    
              $("#weixin_progress").css('width',100 + '%');    
              $("#weixin_progress").html(100 + '%');    
	/*             $("#weixin_show").attr("src","resource/"+data.result);    
	 */            $("#weixin_upload").css({display:"none"});    
               $("#weixin_cancle").css({display:""});    
        }).bind('fileuploadpaste', function (e, data) {alert("aaa");});    


----- 

```


$(function () {
          $('#fileupload').fileupload({
              dataType: "json",
              url: "/api/upload",
              limitConcurrentUploads: 1,
              sequentialUploads: true,
              progressInterval: 100,
              maxChunkSize: 10000,
              add: function (e, data) {
                  $('#filelistholder').removeClass('hide');
                  data.context = $('<div />').text(data.files[0].name).appendTo('#filelistholder');
                  $('</div><div class="progress"><div class="bar" style="width:0%"></div></div>').appendTo(data.context);
                  $('#btnUploadAll').click(function () {
                      data.submit();
                  });
              },
              done: function (e, data) {
                  data.context.text(data.files[0].name + '... Completed');
                  $('</div><div class="progress"><div class="bar" style="width:100%"></div></div>').appendTo(data.context);
              },
              progressall: function (e, data) {
                  var progress = parseInt(data.loaded / data.total * 100, 10);
                  $('#overallbar').css('width', progress + '%');
              },
              progress: function (e, data) {
                  var progress = parseInt(data.loaded / data.total * 100, 10);
                  data.context.find('.bar').css('width', progress + '%');
              }
          });
      });
 

```


