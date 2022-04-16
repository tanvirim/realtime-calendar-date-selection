const date = new Date();

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate();
 

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,0).getDay();


  const months = ["January","February","March","April","May","June","July",
  "August","September","October","November","December",];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().getFullYear();

  let days = "";


  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today"> ${i}</div>`;
      
    } else {
      days += `<div> ${i}</div>`;
    }
 
  }

 monthDays.innerHTML = days;
 


 select = document.querySelectorAll(".days div");
 console.log(select) ;
select.forEach(function(elem) {
  elem.addEventListener("click", function() {
   
     let divValue = document.createElement("array") ;
      divValue.innerHTML = elem.innerHTML+ "," ;
      console.log(divValue.innerHTML) ;
     newDiv =  document.getElementById("select") ;
     newDiv.appendChild(divValue) ;

  });
});






