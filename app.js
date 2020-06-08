/* IIFE(instant implement function expression) it can return an object very quickly and it can build a module that makes sense in separating different functions. */  

// budget controller
var budgetController = (function(){
    
    // private member of an object
    var x = 23;
    
    var add = function(a){
        return x + a;
    }
    
    // use closures here ! return a function(object)
    // closures make other objects use private members
    return {
        publicTest: function(b){
            return add(b);
        }
    }
})();


// UI controller
var UIController = (function(){
    
    // define some useful attributes stored in an object
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    
    
    // use closures to access private members
    return {
      getInput: function(){
          // return an object so that we can acquire these 3 parameters simultaneously
          return {
            type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
          };
      },
        // member method which can be used to acquire DOMstrings outside
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
    
})();


// Global app controller
// this module is used to make sure the former two modules can commnicate
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
        
        // 1. Get the field input data
        var input = UICtrl.getInput();
        console.log(input);
        
        
        // 2. Add the item to the budget controller
        
        // 3. Add the item to the UI
        
        // 4. Calculate the budget 
        
        // 5. Display the budget on the 
        
    };
    
    return {
        init: function(){
            console.log('Application has started!');
            setupEventListeners();
        }
    };
    
    
})(budgetController, UIController);


// initialization 
controller.init();