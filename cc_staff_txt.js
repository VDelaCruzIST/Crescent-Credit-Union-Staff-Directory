"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Case Problem 2

   Author: Vanessa Dela Cruz
   Date: April 30, 2024
   
   Filename: cc_staff.js
   
      
*/


/* Constructor function for the employee class */
function employee(id, firstName, lastName, dept, position, email, phone, photo) {
   this.id = id;
   this.firstName = firstName;
   this.lastName = lastName;
   this.dept = dept;
   this.position = position;
   this.email = email;
   this.phone = phone;
   this.photo = photo;
}

/* Object literal for search results */
var searchResult = {
   employees : [],
   sortById : function() {
      this.employees.sort(function(a,b) {
         if (a.id < b.id) {return -1;}
         else {return 1;}
      });
   }
};

/* Event listener to retrieve and display employee records matching the search condition */
document.getElementById("searchButton").addEventListener("click", function()
{
   var tableBody = document.querySelector("table#staffTable tbody");
   var tableCaption = document.querySelector("table#staffTable caption");
   //apply method to remove all tr from previous searches
   tableBody.removeChildren();
   //setting employees array to empty
   searchResult.employees = [];
   //loop through each record in the directory
   staff.directory.forEach((record) => 
   {
      //get the value from the nameSearch input field
      var nameSearch = document.getElementById("nameSearch").value;
      //get the selected value from the nameSearchType dropdown
      var nameSearchType = document.getElementById("nameSearchType").selectedValue();
      //switch-case based on search terms on the selected nameSearchType
      switch (nameSearchType)
      {
         case "contains" :
            var nameRegExp = new RegExp (nameSearch, "i");
            break;
         case "beginsWith":
            var nameRegExp = new RegExp ("^" + nameSearch, "i");
            break;
         case "exact" :
            var nameRegExp = new RegExp ("^" + nameSearch + "$", "i");
            break;
      }
      //applying test() method to check if the last name matches the RegExp
      var foundName = nameRegExp.test(record.lastName);
      //get the value from the positionSearch input field
      var positionSearch = document.getElementById("positionSearch").value;
      ////get the selected value from the positionSearchType option
      var positionSearchType = document.getElementById("positionSearchType").selectedValue();
      //switch-case based on search terms on the selected positionSearchType
      switch (positionSearchType)
      {
         case "contains" :
            var positionRegExp = new RegExp (positionSearch, "i");
            break;
         case "beginsWith":
            var positionRegExp = new RegExp ("^" + positionSearch, "i");
            break;
         case "exact" :
            var positionRegExp = new RegExp ("^" + positionSearch + "$", "i");
            break;
      }
      //applying test() method to check if the position matches the RegExp
      var foundPosition = positionRegExp.test(record.position);
      //get the value from the deptSearch input field
      var deptSearch = document.getElementById("deptSearch").selectedValue()

      var foundDept = deptSearch === "" || deptSearch === record.dept;
      //displays employee info
      if (foundName && foundPosition && foundDept)
      {
         searchResult.employees.push(new employee(record.id, record.firstName, record.lastName, 
            record.position, record.dept, record.email, record.phone, record.photo));
      }
   });
tableCaption.textContent = searchResult.employees.length + " records found";
//sort the employees array by ID number
searchResult.sortById();

   //adding a table row to the body of the staff table
   searchResult.employees.forEach((record) =>
   {
      var newRow = document.createElement("tr");
      newRow.innerHTML= `
            <td><img src = "${record.photo}" /></td>
            <td>${record.firstName} ${record.lastName}</td>
            <td>${record.position}</td>
            <td>${record.dept}</td>
            <td><a href = "mailto:${record.email}">${record.email}</a></td>
            <td><a href = "tel:${record.phone}">${record.phone}</a></td>
         </tr>`;
         tableBody.appendChild(newRow);
   });
});

/* --- Methods added to native objects ---*/

/* Method added to any DOM element that removes all child nodes of element */
HTMLElement.prototype.removeChildren = function() {
   while (this.firstChild) {
      this.removeChild(this.firstChild);
   }   
};

/* Method added to the select element to return the value of the selected option */
HTMLSelectElement.prototype.selectedValue = function() {
   var sIndex = this.selectedIndex;
   return this.options[sIndex].value;
};


