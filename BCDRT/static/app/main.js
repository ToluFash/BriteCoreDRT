import {
    Class, Button, ImageButton,
    MultipleSelectDropDown,
    DropDown,
    Legend,
    Label,
    Heading1,
    Anchor,
    Paragraph,
    HWindow,
    Margin,
    Padding,
    Form, Float, Width,
    BackgroundColor, BorderRadius,
    Division, DropDownOption,
    Fieldset, FileInput, Height, HiddenInput, MaxWidth,
    PasswordInput, RadioButton, STYLESHEET, SubmitButton,
    TextAlignment,
    TextArea,
    TextInput,MinWidth,FONT, FontFamily,Border, BORDERWIDTH,FontSize,BORDERSTYLE,HText,DateInput,NumberInput,HImage,Color,Heading4, MinHeight, TEXTALIGNMENT
} from "./AbstractWindowContainer.js";
//Cookie Retrieval
const pathname = window.location.pathname;
const  getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
    };
//Event Functions
const getFields = (target, window,submit) => {
    return function(e){
        target.clearAll();
        if(e.target.options[e.target.selectedIndex].value)
        {
            fetch(pathname +'risks/' + e.target.options[e.target.selectedIndex].value)
            .then((resp) =>resp.json())
            .then(function (data){
                let fieldset = new Fieldset('fieldstype').addComponent(new Legend('').setTextContent(data.title)).addCustomStyle([new Width(90), new Color('#82aab1')]);
                target.addComponent([new Heading4('Hello').setTextContent('Please fill the form below:').addCustomStyle(new Color('#4d7c5b')), fieldset]);
                for (let x in data.fields){
                    let  a = new Division(data.fields[x].slug).addCustomStyle([new Width(100), new FontSize(70)]);
                    a.addComponent([new Heading4('p'+data.fields[x].slug).setTextContent(data.fields[x].title+':').addCustomStyle([new Color('#403f44')])]);
                    if (data.fields[x].field_type === 'Text'){
                        a.addComponent([new TextInput('input'+data.fields[x].slug, data.fields[x].slug)
                            .addEvent('inputChange','click',()=>{
                                document.getElementById('error_' + data.fields[x].slug).textContent = ''

                            })
                            .addCustomStyle([new Color('#325b7a'),new BorderRadius(3),new Width(80), new Height(50), new Padding(1.2)]),
                            new Paragraph('error_'+data.fields[x].slug).addCustomStyle(new Color('#ff0800'))])
                    }

                    if (data.fields[x].field_type === 'Number'){
                        a.addComponent([new NumberInput('input'+data.fields[x].slug, data.fields[x].slug)
                            .addEvent('inputChange','click',()=>{
                                document.getElementById('error_' + data.fields[x].slug).textContent = ''

                            })
                            .addCustomStyle([new Color('#325b7a'),new BorderRadius(3),new Width(80), new Height(50), new Padding(1.2)]),
                            new Paragraph('error_'+data.fields[x].slug).addCustomStyle(new Color('#ff0800'))])
                    }

                    if (data.fields[x].field_type === 'Date'){
                        a.addComponent([new DateInput('input'+data.fields[x].slug, data.fields[x].slug)
                            .addEvent('inputChange','click',()=>{
                                document.getElementById('error_' + data.fields[x].slug).textContent = ''

                            })
                            .addCustomStyle([new Color('#325b7a'),new BorderRadius(3),new Width(80), new Height(50), new Padding(1.2)]),
                            new Paragraph('error_'+data.fields[x].slug).addCustomStyle(new Color('#ff0800'))])
                    }
                    fieldset.addComponent(a);
                }
                if (data.fields)
                    submit.clearAll();

                //Submit Button Init and Event Management
                let button = new Button('submitButton','Submit').setTextContent('Submit');
                    button.addCustomStyle([new Margin(0).setTop(1),new Padding(0).setTop(1), new Float('right'),new BorderRadius(3),new BackgroundColor('#477c46'), new Color('#ffffff')]);
                    button.removeEvent('submitEvent');

                    submit.addComponent(button);

                document.querySelector('body').textContent = '';
                window.updateWindow();document.getElementById('submitButton').addEventListener('click',
                            () => {
                                    document.getElementById('postNotiSuccess').innerText = '';
                                    document.getElementById('postNotiFailure').innerText = '';
                                    let errors = [];
                                    for (let x in data.fields) {
                                        document.getElementById('error_'+data.fields[x].slug).innerText ='';
                                        if(!document.getElementById('input'+data.fields[x].slug).value)
                                            errors.push([data.fields[x].slug,data.fields[x].title]);

                                    }
                                    if (errors.length > 0) {
                                        for (let error in errors) {
                                            document.getElementById('error_' + errors[error][0]).textContent = "Please enter a valid " + errors[error][1].toLowerCase()
                                        }
                                    }
                                    else{

                                       for (let x in data.fields)
                                        {
                                            data.fields[x].value = document.getElementById('input'+data.fields[x].slug).value;
                                        }
                                       let xhr = new XMLHttpRequest();
                                       let url = pathname+ 'risks/';
                                       xhr.open('POST',url);
                                       xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
                                       xhr.onreadystatechange= function () {
                                            if (this.readyState === 4 && this.status === 200) {
                                               document.getElementById('postNotiSuccess').innerText = 'Submission Successful';
                                                document.getElementById('submit').innerHTML ='';

                                            }
                                            else
                                                if (this.readyState === 4)
                                                document.getElementById('postNotiFailure').innerText = 'Network Error, Please Try Again ' + 'Error:' + this.status


                                       };
                                       xhr.send(JSON.stringify(data));

                                    }
                            }

                            );
                document.querySelector('select').value = e.target.options[e.target.selectedIndex].value
            });
        }
        else
        {
            document.querySelector('body').textContent = '';
            submit.clearAll();
            window.updateWindow();


        }

    }
};
const getRisks = (target, window) => {

        fetch(pathname+ 'risks/')
            .then((resp) =>resp.json())
            .then(function(response){
                target.addComponent(new DropDownOption('', '').setTextContent('Select a Risk Type'));
                for(let x in response){
                    target.addComponent(new DropDownOption('selectRisk'+x, response[x].slug).setTextContent(response[x].title));
                }
                document.querySelector('body').textContent = '';
                window.updateWindow();
            });
    };
//Body Init
let body = new HWindow().setHeight(new Height(250));
body.addCustomStyle([new FontFamily(FONT.CALIBRI), new BackgroundColor('#ffffff')]);

// Logo Init
let logo = new Division('logo');
logo.addCustomStyle([ new Width(15), new Height(2),new BorderRadius(3),new Padding(1)],new Float('left'));
logo.addComponent(new HImage('logoimage','https://s3-us-west-2.amazonaws.com/bcdrt-static/app/logo.045977be.png','Logo').addCustomStyle(new Width(120)));
//Header Init
let header= new Heading1('header').setTextContent('BriteCore Insurance Subscription').addCustomStyle(new Color('#6aa8a8'));
//Content Init
let content = new Division ('content');
content.addCustomStyle([new BackgroundColor('#e3f3f6'),new FontFamily(FONT.CALIBRI),new FontSize(150),new Padding(5), new Width(60),new BorderRadius(1), new Border(BORDERWIDTH.THIN,BORDERSTYLE.SOLID), new Margin(0).setTop(5).setRight(10).setLeft(15)]);

//Select Risk Init
let selectRiskDiv =new Fieldset('selectRiskDiv').addComponent([new Legend('').setTextContent('Insurance Risk:')]).addCustomStyle([new Width(80), new Color('#82aab1')]);
let selectRisk = new DropDown('selectRisk','risktype').addCustomStyle([ new BorderRadius(5)]).addCustomStyle([new Color('#325b7a'),new BorderRadius('4'),new Width(50), new Padding(1.2)]);
//Fetch Risks Types
getRisks(selectRisk,body);
//Fields Init
let fields = new Division('fields');


//Submit Init
let submitDiv = new Division('submit');

//Post errors Init
let postError = new Division('postNoti').addComponent([new Paragraph('postNotiSuccess').addCustomStyle(new Color('#0eaf03')), new Paragraph('postNotiFailure').addCustomStyle(new Color('#af0300'))]);
postError.addCustomStyle([new TextAlignment('center'),new BackgroundColor('#e3f3f6'),new FontFamily(FONT.CALIBRI),new FontSize(80),new Padding(0), new Width(70),new BorderRadius(1), new Margin(0).setTop(5).setRight(10).setLeft(15)]);

// Event Management
selectRisk.addEvent('event1','change',getFields(fields,body,submitDiv));




//Painting



selectRiskDiv.addComponent([selectRisk]);
content.addComponent([selectRiskDiv,fields,submitDiv]);
body.addComponent([logo,header,content,postError]);
body.updateWindow();
