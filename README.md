# knockout-ease
Use knockout without parentheses. 

# Installation
Load knockout-ease.min.js after knockout.js. 

Add more content later. 

# Example

js

````js
ko.ease(
      {
        context: self,
        data: {
          // userArray: [
          //   { name: "Bungle", type: "Bear" },
          //   { name: "George", type: "Hippo" },
          //   { name: "Zippy", type: "Unknown" }
          // ],
          headerStr: 'str1 value', 
          watchHeaderStr: '',
          firstName: 'Lee',
          lastName: 'Wen',
          address: {
            address1: 'Address1',
            address2: 'Address2'
          },
          watchAddress1Str: ''
        }, 
        watch: { // this is context property passed in
          headerStr: function(newVal){
            this.watchHeaderStr = newVal;
          },
          'address.address1': function(newVal){
            this.watchAddress1Str = newVal;
          }
        },
        computed: { // this is context property passed in
          fullName: function() { 
            return this.firstName + ' ' + this.lastName;
          },
          fullAddress: function() {
            return this.address.address1 + ' ' + this.address.address2;
          }
        }
      }
      );
````

html

````html
<div>
  <h1 data-bind="text: headerStr"></h1>
  <div>Watch Change (watchHeaderStr): <span data-bind="text: watchHeaderStr"></span></div> 
  <button data-bind="click: changeHeader">Change Header</button>
  <div>First Name (firstName): <input data-bind="value:firstName"></input></div>
  <div>Last Name (lastName): <input data-bind="value:lastName"></input></div>
  <div>Computed Full Name (fullName): <span data-bind="text: fullName"></span></div>
  <div>Address 1 (address.address1): <input data-bind="value:address.address1"></input></div>
  <div>Address 2: (address.address2)<input data-bind="value:address.address2"></input></div>
  <div>Computed Full Address (fullAddress): <span data-bind="text: fullAddress"></span></div>
  <div>Watch Change (watchAddress1Str): <span data-bind="text: watchAddress1Str"></span></div>
</div>
````

# TODO

Add detail guideline and more content in read me file. 

Support Array in future. 

Add test in future. 
