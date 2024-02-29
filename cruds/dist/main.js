// get ElementBy Id
let title = document.getElementById("title");
price = document.getElementById("price");
taxes = document.getElementById("taxes");
ads = document.getElementById("ads");
discount = document.getElementById("discount");
total = document.getElementById("total");
count = document.getElementById("count");
category = document.getElementById("category");
search= document.getElementById("search");
createBTN= document.getElementById("create-btn");
tbody= document.getElementById("tbody");
searchBTN=document.getElementById("searchBTN");
deleteAll= document.getElementById("deleteAll");
popup= document.getElementById("popup");
yesBTN= document.getElementById("YES");
noBTN= document.getElementById("NO");
popupH1= document.getElementById("popup-h1");
x=true;
let y;
let pop;

//console.log(body);

//getTotal
function getTotal(){
    if ("" != price.value) {
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value);
        total.innerHTML=`${result}`;
        total.style.cssText="background-color:#040";
    }else{
        total.innerHTML=``;
        total.style.cssText="background-color:red-950";
    }
}

// first step put all data in array
let allData;

// handel the (localStorage s-2) to save data when reload
if(localStorage.product != null){
    allData =JSON.parse(localStorage.product);
}else{
    allData=[];
}

// collect data when submit create 
function create() {
    // this-object have all data i need to create 
    let obj ={
        title: title.value.toLowerCase(),
        price :price.value,
        taxes :taxes.value,
        ads :ads.value,
        discount :discount.value,
        total :total.innerHTML,
        count :count.value,
        category :category.value,
    }

    //
    if (true === x) {
        if(obj.count > 1){
            for(let j=0; j < obj.count; j++){
                // push data to array
                  allData.push(obj);
            }
        }else{
            allData.push(obj);
        }
    }else{
        allData[y]=obj;
        x=true;
        createBTN.innerHTML='create'
        count.style.display='block'
    }



     //localStorage s-1
      localStorage.setItem('product',JSON.stringify(allData));
    
     //Run child function
    cleardata() 
    showdata()
    getTotal()
}

   //Run create function
   createBTN.addEventListener("click",create);

    //clear data
    function cleardata() {
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        category.value='';
    }
       //show data
       function showdata() {
        let table='';
        for(let i=0; i < allData.length; i++){
            table += ` <tr>
            <td>${i+1}</td>
            <td>${allData[i].title}</td>
            <td>${allData[i].price}</td>
            <td>${allData[i].taxes}</td>
            <td>${allData[i].ads}</td>
            <td>${allData[i].discount}</td>
            <td>${allData[i].total}</td>
            <td>${allData[i].category}</td>
            <td><button onclick="upDate(${i})" id="upDate">upDate</button></td>
            <td><button onclick="del(${i})"  id="Delete">Delete</button></td>
        </tr>`
        }
        tbody.innerHTML= table;


          //Delete all data S-1
      if( 0 < allData.length) {
        deleteAll.innerHTML=`<button onclick="delAll()">Delete All</button>`
     }else{
        deleteAll.innerHTML=``
     }
    }

    //Run showdata function
    showdata()

    //Delete data
    function deleteData(i) {
        allData.splice(i,1)
        localStorage.product=JSON.stringify(allData);
        showdata()
    }
    
    
     //Delete all data S-2
    function DeleteAll(){
      localStorage.clear();
      allData.splice(0);
      popup.style.display='none';
      deleteAll.innerHTML=``
      showdata()
}
    
function upDate(i) {
    title.value=allData[i].title,
    price.value=allData[i].price,
    taxes.value=allData[i].taxes,
    ads.value=allData[i].ads,
    discount.value=allData[i].discount,
    total.innerHTML=allData[i].total,
    count.style.display='none',
    category.value=allData[i].category,
    createBTN.innerHTML='up Date';
    search.value='';
    scroll({
        top:0,
        behavior:"smooth"
    })
    x=false;
    y=i;
}
//search
function getsearch(){
    let searchv=search.value.toLowerCase();
    let table='';
    for(let s=0; s<allData.length; s++){
        if(allData[s].title.includes(searchv)){
            table += ` <tr>
            <td>${s+1}</td>
            <td>${allData[s].title}</td>
            <td>${allData[s].price}</td>
            <td>${allData[s].taxes}</td>
            <td>${allData[s].ads}</td>
            <td>${allData[s].discount}</td>
            <td>${allData[s].total}</td>
            <td>${allData[s].category}</td>
            <td><button onclick="upDate(${s})" id="upDate">upDate</button></td>
            <td><button onclick="deleteData(${s})" id="Delete">Delete</button></td>
        </tr>`
        tbody.innerHTML= table;
        }else{
        tbody.innerHTML= table;
        }
    }
}
    //getpopup
    function getpopup(){
        popup.style.display='block';
    }

    function delAll(){
        pop=true;
        popupH1.innerHTML=`Are you sure to delete ALL products ?`
        getpopup()
    }

    function del(i){
        pop=false;
        popupH1.innerHTML=`Are you sure to delete THIS product ?`
        getpopup();
        y=i;
    }

    noBTN.addEventListener("click", function() {
        popup.style.display = 'none';
      });


    yesBTN.addEventListener("click", function() {
        if(true === pop){
            DeleteAll()
            popup.style.display = 'none';
        }else{
            deleteData(y)
            popup.style.display = 'none';
        }
      });
