var quillQuestion;
var quillAnswer; 

function createContent(){
    quillQuestion = new Quill('#contentQuestion', {
        modules: {
            toolbar: false 
          },
          theme: 'snow', 
          readOnly: true
    });

    quillAnswer = new Quill('#contentAnswer', {
        modules: {
            toolbar: false 
          },
          theme: 'snow',
          readOnly: true
    });

    quillQuestion.blur();
    quillAnswer.blur();
}