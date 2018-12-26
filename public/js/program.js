// wait until the DOM before starting buttons
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){

    let table = document.getElementById('table').innerHTML;
    let submit = document.getElementById('submit');

    submit.addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        event.preventDefault();

        switch(table) {
            case 'program':
                let name = document.getElementById('name').value;
                let purpose = document.getElementById('purpose').value;
                let url = document.getElementById('url').value;
                let version = document.getElementById('version').value;
                let license = document.getElementById('license').value;

                req.open('GET', '/insert?table=' + table + '&name= ' + name + '&purpose=' + purpose + '&url=' + url + '&version=' + version + '&license=' + license + '&pid=' + 1, true);
                break;

            case 'author':
                let name = document.getElementById('name').value;
                let url = document.getElementById('url').value;
                req.open('GET', '/insert?table=' + table + '&name= ' + name + '&url=' + url, true);
                break;

            case 'language':
                let name = document.getElementById('name').value;
                let url = document.getElementById('url').value;
                req.open('GET', '/insert?table' + table + '&name= ' + Name + '&url=' + url, true);
                break;

            case 'os':
                let name = document.getElementById('name').value;
                let url = document.getElementById('url').value;
                req.open('GET', '/insert?table' + table + '&name= ' + Name + '&url=' + url, true);
                break;

            case 'src':

                let url = document.getElementById('url').value;
                let type = document.getElementById('type').value;
                let pid = document.getElementById('pid').value;
                console.log('Pid: ', Pid);

                req.open('GET', '/insert' + '?table' + table + 'src' + '&url=' + url + '&type=' + Type + '&pid=' + Pid, true);
                break;

            case 'program_author':
                let pname = document.getElementById('pname').value;
                let aname = document.getElementById('aname').value;
                req.open('GET', '/insert?table' + table + '&pname=' + pname + '&aname=' + aname, true);
                break;

            case 'program_language':
                let pname = document.getElementById('pname').value;
                let lname = document.getElementById('lname').value;
                req.open('GET', '/insert?table' + table + '&pname=' + pname + '&lname=' + lname, true);
                break;

            case 'program_os':
                let pname = document.getElementById('pname').value;
                let oname = document.getElementById('oname').value;
                req.open('GET', '/insert?table' + table + '&pname=' + pname + '&oname=' + oname, true);
                break;
        }

        req.onload = function() {
            let res = req.responseText;
            location.reload();
        }

        event.preventDefault();
        req.send(null);
    });


    // hidden row id
    let buttonsHidden = document.getElementsByClassName('hidden');

    let buttonsDelete = document.getElementsByClassName('buttonDelete');

    for (let i = 0; i < buttonsDelete.length; i++) {
        buttonsDelete[i].addEventListener('click', function(event) {
            event.preventDefault();
            var req = new XMLHttpRequest();
            req.open('GET', '/delete?table=' + table + '&id=' + buttonsHidden[i].value, true);
            req.onload = function() {
                let res = req.responseText;
                location.reload();
            }

            req.send(null);
        });
    };

    let formsEdit = document.getElementsByClassName("formsEdit");
    switch(table) {
        case 'program':
            for (let i = 0; i < formsEdit.length; i++) {
                formsEdit[i].action="/edit-program";
                formsEdit[i].method="get">
            }

            break;

        case 'author':
            for (let i = 0; i < formsEdit.length; i++) {
                formsEdit[i].action="/edit-author";
                formsEdit[i].method="get">
            }

            let name = document.getElementById('name').value;
            let url = document.getElementById('url').value;
            req.open('GET', '/insert?table=' + table + '&name= ' + name + '&url=' + url, true);
            break;

        case 'language':
            for (let i = 0; i < formsEdit.length; i++) {
                formsEdit[i].action="/edit-language";
                formsEdit[i].method="get">
            }

            let name = document.getElementById('name').value;
            let url = document.getElementById('url').value;
            req.open('GET', '/insert?table' + table + '&name= ' + Name + '&url=' + url, true);
            break;

        case 'os':
            for (let i = 0; i < formsEdit.length; i++) {
                formsEdit[i].action="/edit-os";
                formsEdit[i].method="get">
            }
            break;

        case 'src':
            for (let i = 0; i < formsEdit.length; i++) {
                formsEdit[i].action="/edit-src";
                formsEdit[i].method="get">
            }
            break;

        case 'program_author':
            for (let i = 0; i < formsEdit.length; i++) {
                formsEdit[i].action="/edit-program-author";
                formsEdit[i].method="get">
            }
            break;

        case 'program_language':
            for (let i = 0; i < formsEdit.length; i++) {
                formsEdit[i].action="/edit-program-language";
                formsEdit[i].method="get">
            }
            break;

        case 'program_os':
            for (let i = 0; i < formsEdit.length; i++) {
                formsEdit[i].action="/edit-program-os";
                formsEdit[i].method="get">
            }
            break;
    }
}
