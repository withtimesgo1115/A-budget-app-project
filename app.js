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
        }
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
        expensesContainer: '.expenses__list'
    };
    
    
    // use working scope to access private members
    return {
      getInput: function(){
          // return an object so that we can acquire these 3 parameters simultaneously
          return {
            type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
          };
      },
        
        addListItem: function(obj, type){
            var html, newHtml, element;
            // create html string with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            
            // insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            
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
        
    };
    
    
    
    var ctrlAddItem = function(){
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();
        
        
        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type,input.description,input.value);
        
        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        
        // 4. Clear the fields
        UICtrl.clearFields();
        // 4. Calculate the budget 
        
        // 5. Display the budget on the 
        
    };
    
    return {
        init: function(){
            console.log('Application has started!');
            setupEventListeners();
        }
    };
    
    // pass former two functions here as parameters
})(budgetController, UIController);


// initialization 
controller.init();