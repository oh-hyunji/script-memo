var memoContArr = [];
var memoJs = memoJs || (function () {
    // 메모입력 evt
    function ins() {
        var memoWriteVal = $('.memo_write').val();
        var memoLen = memoContArr.length;

        if(!memoWriteVal){
            alert('메모를 입력해 주세요.');
            $('.memo_write').focus();
            return;
        }

        var d = new Date();
        var currentDate = d.getFullYear() + "/" + ( d.getMonth() + 1 ) + "/" + d.getDate();
        var currentTime = d.getHours() + ":" + d.getMinutes();
        
        $('#content').prepend('<div id="memoNo'+memoLen+'" class="memo_section"><p class="memo_text">'+ memoWriteVal + ' - ' + currentDate+ ' ' + currentTime + '&nbsp;&nbsp;&nbsp;<i class="fas fa-backspace icon_del"></i></p>');
        $('#memoNo'+memoLen).fadeIn(1000);
        $('.counter span').html(0);
        memoContArr[memoLen] = memoWriteVal;

        $('.memo_write').val('');
    }

    return {
        ins : ins
    }
})();

$(function() {
    // 동적 태그 추가시 이벤트 동작
    // memNo가 포함된 아이디 가져오기 : [id^="memoNo"]
    $(document).on('click', '[id^="memoNo"]', function(){
        var $this = $(this);
        var memoId = '#'+$this.attr('id');
        var memoText = $(memoId+' .memo_text').text();

        $(memoId).fadeOut(1000);
        setTimeout(function(){$(memoId).remove();},1000);
        memoContArr.splice(memoContArr.indexOf(memoText),1);
    });

    // 텍스트 입력시 글자 counter
    $('.memo_write').keyup(function(e){
        var content = $(this).val();
        $('.counter span').html(content.length);
    });
    $('#content').keyup();

    $('.memo_write').keydown(function(e) {
        if (e.keyCode == 13) {
            memoJs.ins();
            $('.memo_write').blur();
        }
    });
});