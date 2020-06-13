/* IIFE(instant implement function expression) 
it can return an object very quickly and 
it can build a module that makes sense in 
separating different functions. */  

//implement MVC strategy to code the webpage MVC means model, view and controller

// budget controller which is the model part of MVC and it is responsible for operating all kinds of data
var budgetController = (function(){
    
    // define two key class using constructors: Expense and Income
    // these two class both requires id, description and value to distinguish different item.
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    
    // use an object to store necessary data 
    // rather than using many arrays !
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    
    // access inner variables or objects with return sentence
    return {
        // type means inc or exp
        addItem: function(type, des, val){
            var newItem, ID;
            
            // create a new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }
            
            // create new item based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            
            // push it into our data structure
            data.allItems[type].push(newItem);
            
            // return the new element which ensures the newItem can be accessed outside
            return newItem;
        },
        
        deleteItem: function(type, id){
            var ids, index;
            // id = 6
            //data.allItems[type][id];
            
            // ids = [1 2 4 6 8]
            // index = 3
            
            // map return a new array
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            
            index = ids.indexOf(id);
            
            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },
        
        calculateBudget: function(){
          
            // calculate total incomes and total expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate the percentage of income that we spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
        },
        
        getBudget: function(){
          return {
              budget: data.budget,
              totalInc: data.totals.inc,
              totalExp: data.totals.exp,
              percentage: data.percentage
          }  
        },
        
        testing: function(){
            console.log(data);
        }
    }
    
    
})();


// UI controller which is the view part
var UIController = (function(){
    
    // define some useful attributes stored in an object
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };
    
    
    // use working scope to access private members
    return {
      getInput: function(){
          // return an object so that we can acquire these 3 parameters simultaneously
          return {
            type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
          };
      },
        
        addListItem: function(obj, type){
            var html, newHtml, element;
            // create html string with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            
            // insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            
        },
        
        deleteListItem: function(selectorID){
            
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
            
        },
        
        // here we defined a function to clear input space when current data has been registered
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription, + ',' + DOMstrings.inputValue);  
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            
            // convert to the first element in the array
            fieldsArr[0].focus();
        },
        
        displayBudget: function(obj){
            
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
            
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
               
        },
        
        // member method which can be used to acquire DOMstrings outside
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
    
})();


// Global app controller
// this module is used to make sure the former two modules can commnicate
// this is the controller part in MVC
var controller = (function(budgetCtrl, UICtrl){
    
    var setupEventListeners = function(){
    
    var DOM = UICtrl.getDOMstrings();
    // button event and keyboard event operation
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
    document.addEventListener('keypress',function(event){
        
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
        
    });
        
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
    };
    
    
    var updateBudget = function(){
        
        // 1. Calculate the budget 
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();
        
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
             // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type,input.description,input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
        }
        
    };
    
    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;
        
        // event.target is the element where we clicked and event is the click 
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID) {
            
            //inc-1 which can be cut down into inc and 1 with split function
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            // 3. update and show the new budget
            updateBudget();
            
        }
    }
    
    return {
        init: function(){
            console.log('Application has started!');
            UICtrl.displayBudget({
              budget: 0,
              totalInc: 0,
              totalExp: 0,
              percentage: 0
          });
            setupEventListeners();
        }
    };
    
    // pass former two functions here as parameters
})(budgetController, UIController);


// initialization 
controller.init();