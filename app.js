Income = function(name,amount) {
    this.name = name;
    this.amount = amount;
}

Expense = function(name,amount) {
    this.name = name;
    this.amount = amount;
}

var incomes = [];
var expenses = [];
var list_inc = document.querySelector('.income__list');
var list_exp = document.querySelector('.expenses__list');
var inc = document.querySelector('.budget__income--value');
var exp = document.querySelector('.budget__expenses--value');
var net = document.querySelector('.budget__value');

function new_element(x,sign){
    let div1 = document.createElement('div');
    div1.setAttribute('class', 'item clearfix')

    //description
    let desc = document.createElement('div');
    desc.setAttribute('class', 'item__description');

    let div2 = document.createElement('div');
    div2.setAttribute('class', 'right clearfix')

    let val = document.createElement('div');
    val.setAttribute('class', 'item__value');

    let div3 = document.createElement('div');
    div3.setAttribute('class', 'item__delete')

    let del_btn = document.createElement('button');
    del_btn.setAttribute('class','item__delete--btn');
    del_btn.addEventListener('click', function(){ 
        if( sign === 'inc'){
            list_inc.removeChild(div1);
            inc.textContent = parseInt(inc.textContent, 10) - parseInt(x.amount,10);
            net.textContent = parseInt(net.textContent, 10) - parseInt(x.amount,10);
        }
        else{
            list_exp.removeChild(div1);
            exp.textContent = parseInt(exp.textContent, 10) - parseInt(x.amount,10);
            net.textContent = parseInt(net.textContent, 10) + parseInt(x.amount,10);
        }
    })

    let i = document.createElement('i')
    i.setAttribute('class','ion-ios-close-outline');

    desc.textContent = x.name;

    del_btn.appendChild(i);
    div2.appendChild(val);
    div2.appendChild(del_btn);
    div1.appendChild(desc);
    div1.appendChild(div2);

    if( sign === 'inc'){
        list_inc.appendChild(div1);
        val.textContent = '+ ' + x.amount;
    }
    else{
        list_exp.appendChild(div1);
        val.textContent = '- ' + x.amount;
    }

}

function update (sign) {

    let i;

    if(sign  === 'inc'){
        i = incomes.length-1;
        inc.textContent = parseInt(inc.textContent, 10) + parseInt(incomes[i].amount,10);
    }   
    else {
        i = expenses.length-1;
        exp.textContent = parseInt(exp.textContent, 10) + parseInt(expenses[i].amount, 10);
    }

    net.textContent = parseInt(inc.textContent, 10) - parseInt(exp.textContent,10);
}

document.querySelector('.add__btn').addEventListener('click', function(){
    var sign = document.querySelector('.add__type').value;
    var description = document.querySelector('.add__description').value;
    var value = document.querySelector('.add__value').value;
    
    if(sign === 'inc'){
        var x = new Income(description,value);
        incomes.push(x); 
        new_element(x,sign);
    }
    else{
        var x = new Expense(description,value);
        expenses.push(x);
        new_element(x,sign);
    }

    update(sign);

})