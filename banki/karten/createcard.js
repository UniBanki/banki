$(document).ready(function() {
    $('#fett').click(function() {
        let old =  $(this).attr("aria-pressed");
        if(old=="false"){
            old="true";
        }else{
            old="false";
        }
        $(this).attr("aria-pressed",old);

    });
});