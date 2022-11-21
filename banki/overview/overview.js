$(document).ready(function() {
    $('#btnNew').click(function() {
        const stackname = prompt("Name des neuen Stapels:");
        if(stackname!=null && stackname!==""){
            const existingstacks =$('#stacks').html();

            const newstack=`
            <div>
                `+stackname+`<button>Karten erstellen</button><button>Lernen</button>
            </div>
            `
            $('#stacks').html(existingstacks+newstack);
        }
    });
});