Vue.component('logo', {
    template: '<div id="logo" class="logo">' +
        '<img id="logoimage" ' +
        'src="https://s3-us-west-2.amazonaws.com/bcdrt-static/app/logo.045977be.png" ' +
        'alt="Logo" ' +
        'class="logoimage">' +
        '</div>'
});
Vue.component('appheader', {
    template: '<h1 id="header" class="header">BriteCore Insurance Subscription</h1>'
});
Vue.component('appcontent', {
    props: [],
    template: '<div class="content">' +
        '<fieldset id="selectRiskDiv" class="selectRiskDiv">' +
        '<legend id="">Insurance Risk:</legend>' +
        '<select v-on:change = "$emit(\'getfields\', )" id="selectRisk" name="risktype" class="selectRisk">' +
        '<option id="" value="" selected>Select a Risk Type</option>' +
        '<slot></slot>'+
        '</select>' +
        '</fieldset>' +
        '</div>',
});
Vue.component('riskoption', {
    props: ['risk'],
    template:
        '<option v-bind:value=risk.slug v-bind:key = risk.id>{{risk.title}}</option>'
});

Vue.component('risktype', {
    props: ['risktype'],
    template:
        '<div v-if=\'risktype\' class="fields">' +
        '<fieldset id="selectRiskDiv" class="selectRiskDiv">' +
        '<legend id="">{{risktype.title}}</legend>' +
        '<slot></slot>' +
        '<button class="prev" v-on:click = "$emit(\'moveprevious\', )">Prev</button>'+
        '</fieldset>' +
        '</div>'
    });

Vue.component('field', {
    props: ['field','index'],
    template:
        '<div class="input">' +
        '<label v-bind:for=field.slug>{{field.title}}:</label>' +
        '<br>' +
        '<input v-bind:id=field.slug v-model = field.value  v-bind:type = field.field_type v-bind:key = field.id v-on:input ="$emit(\'clearerror\', index)" >' +
        '<div>' +
        '<p class="error">{{field.error}}</p>' +
        '</div>'+
        '</div>'
});

Vue.component('transitioner', {
    props: [],
    template:
        '<transition name="slide-fade">' +
        '<slot></slot>'+
        '</transition>'
});

Vue.component('submitrisk', {
    props: [],
    template:
        '<div>' +
        '<button class="submitButton" v-on:click = "$emit(\'submitfields\', )"> Submit</button>' +
        '</div>'
});

Vue.component('submiterror', {
    props: ['error'],
    template:
        '<div class="error submiterror">' +
        '<p> {{ error}}</p>' +
        '</div>'
});

Vue.component('submitsuccess', {
    props: [],
    template:
        '<div class="submitsuccess">' +
        '<p>Submission Successful</p>' +
        '<button class="rehome" v-on:click = "$emit(\'gohome\', )">Return to Home</button>'+
        '</div>'
});

var app = new Vue({
    el : '#app',
    template:' <div>' +
        '<logo></logo>\n' +
        '    <appheader></appheader>\n' +
        '    <transitioner>\n' +
        '        <appcontent v-if="state  == 1" v-on:getfields = \'getfields\'>' +
        '<template v-for=\'risk in risks\'>\n' +
        '                <riskoption v-bind:risk ="risk"></riskoption>\n' +
        '            </template>\n' +
        '        </appcontent>' +
        '</transitioner>\n' +
        '    <transitioner>\n' +
        '        <risktype  v-if="state == 2" v-bind:risktype= \'risktype\' v-on:moveprevious = \'moveprevious\'>\n' +
        '            <template v-if =\'risktype.fields\'>\n' +
        '                <template v-for =\'(field,index) in risktype.fields\'>\n' +
        '                    <field v-bind:field="field" v-bind:index="index" v-on:clearerror = \'clearerror\'>\n' +
        '                    </field>\n' +
        '                </template>\n' +
        '                <submitrisk v-on:submitfields = \'submitfields\'></submitrisk>\n' +
        '            </template>\n' +
        '        </risktype>\n' +
        '    </transitioner>\n' +
        '    <transitioner>' +
        '<submitsuccess v-if="state == 3" v-on:gohome = \'gohome\'>\n' +
        '\n' +
        '        </submitsuccess>\n' +
        '    </transitioner>\n' +
        '        <submiterror v-bind:error = \'submiterror\'>\n' +
        '\n' +
        '        </submiterror>' +
        '</div>',
    data : {
        pathname: window.location.pathname.length > 1 ? window.location.pathname : '',
        risks: [],
        risktype:'',
        submiterror: '',
        submitsuccess: false,
        state: 1,
    },
    created: function(){
        fetch(this.pathname+ '/risks/')
        .then((resp) =>resp.json())
        .then((response)=> {
            this.risks = response;
        })},
    methods: {
        getcookie: function(name){
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
        },
        getfields: function () {
            e= document.getElementById('selectRisk');
            if (e.options[e.selectedIndex].value !== ''){
                fetch(this.pathname+ '/risks/' + e.options[e.selectedIndex].value+'/')
                    .then((resp) =>resp.json())
                    .then((data) => {
                        for (x in data.fields)
                            data.fields[x].error ='';
                        this.risktype = data;
                        this.state = 2
                    })
            }
            else this.risktype = '';
        },
        clearerror: function (index) {
            this.risktype.fields[index].error = '';
        },
        submitfields: function(e){
            this.submiterror ='';
            let errors = [];
            for (let x in this.risktype.fields) {
                  if(!this.risktype.fields[x].value){
                      errors.push([this.risktype.fields[x].slug, this.risktype.fields[x].title]);
                      this.risktype.fields[x].error = 'Please enter a valid ' + this.risktype.fields[x].title;
                  }


            }
            if (errors.length === 0) {
                objekt = this;
                let xhr = new XMLHttpRequest();
                let url = this.pathname+ '/risks/';
                xhr.open('POST',url);
                xhr.setRequestHeader('X-CSRFToken', this.getcookie('csrftoken'));
                xhr.onreadystatechange=  function()  {
                    if (this.readyState === 4 && this.status === 200) {
                        objekt.submitsuccess = true;
                        objekt.state = 3;
                    }
                    else
                    if (this.readyState === 4){
                        objekt.submiterror = 'Network Error, Please Try Again ' + 'Error:' + this.status
                    }
                };
                xhr.send(JSON.stringify(this.risktype));

            }




        },
        moveprevious: function(){
            this.state -= 1;
            this.submiterror =''

        },
       gohome: function(){
            this.state = 1;
            this.submiterror =''

        }
    },

});