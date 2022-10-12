window.addEventListener('DOMContentLoaded', event => {
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };
    navbarShrink();


    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

let myArr
if (!localStorage.getItem("users")) {
    myArr = []
} else {
    myArr = JSON.parse(localStorage.getItem("users"))
}






$("#deleteAccount").click(function () {
    for (let i = 0; i < myArr.length; i++) {
        if (myArr[i].email == $("#userTitle").text()) {
            myArr.splice(i, 1)
            localStorage.setItem("users", JSON.stringify(myArr))
            localStorage.removeItem("currentUser")
            localStorage.removeItem($("#userTitle").text())
            location.reload()
            break;
        }

    }
})

if (myArr.length == 0) {
    localStorage.removeItem("users")
}

const CreateSeller = function(user,email,pass,pos){
    this.username = user;
    this.email = email;
    this.pass = pass;
    this.pos = pos;
}

const CreateCustomer = function(user,email,pass,pos,balance= 100){
    this.username = user;
    this.email = email;
    this.pass = pass;
    this.pos = pos;
    this.balance = balance;
}


$("#signup").submit(function () {
    let myUser
    if($("#position").val()== "seller") {
        myUser = new CreateSeller($("#username").val(),$('#useremail').val(),$("#password").val(),$("#position").val())
    }
    if($("#position").val()== "customer") {
        myUser = new CreateCustomer($("#username").val(),$('#useremail').val(),$("#password").val(),$("#position").val(),100)
    }
    console.log(myUser);


    if (localStorage.getItem("users") != null) {
        for (let i = 0; i < myArr.length; i++) {
            if (myUser.email == myArr[i].email) {
                alert("Bu email artıq istifadə olunub")
                break;
            } else {
                myArr.push(myUser)
                localStorage.setItem('users', JSON.stringify(myArr))
                alert("Ugurla qeydiyyat olundu")
            }
        }
    }
    else {
        myArr.push(myUser)
        localStorage.setItem('users', JSON.stringify(myArr))
        alert("Ugurla qeydiyyat olundu")
    }


})

$("#loginlink").click(function () {
    $("#usernameInput").addClass("d-none")
    $("#signupbtn").addClass("d-none")
    $("#loginbtn").removeClass("d-none")
    $(this).addClass("d-none")
})

$("#loginbtn").click(function () {
    if (myArr) {
        let username = $("#useremail").val()
        let password = $("#password").val()
        let userExists = false
        for (let i = 0; i < myArr.length; i++) {
            if (myArr[i]["email"] == username && myArr[i]["password"] == password) {
                userExists = true
                localStorage.setItem("currentUser", username)
                // window.open("index.html", "_self")
                alert("Hesaba ugurla daxil oldunuz")
                location.reload()
                break;
            }
        }
        if (!userExists) {
            alert("Istifadeci adi ve ya parol sehvdir")
        }
    } else {
        alert("Istifadeci adi ve ya parol sehvdir")
    }
})



$("#close").click(function () {
    $("#usernameInput").removeClass("d-none")
    $("#signupbtn").removeClass("d-none")
    $("#loginbtn").addClass("d-none")
    $("#loginlink").removeClass("d-none")
})
$("#quit").click(function () {
    localStorage.removeItem("currentUser")
    location.reload()
})



let bookArr;
let allBooks;
if (localStorage.getItem("currentUser")) {
    $("#categories").addClass("d-none")
    $("#sign").addClass("d-none")
    $("#addbook").removeClass("disabled")
    $("#deleteAccount").removeClass("d-none")
    $("#userTitle").text(localStorage.getItem("currentUser"))
    if (localStorage.getItem($("#userTitle").text())) {
        const myBooks = JSON.parse(localStorage.getItem($("#userTitle").text()))
        for (let i = 0; i < myBooks.length; i++) {
            let str = `<div class="bg-succees col-md-6 col-lg-4 mb-5">
            <div class="portfolio-item mx-auto" 
            data-bs-toggle="modal" data-bs-target="#portfolioModal1">
            <div  class="box">
                <p>Kitabin adi: <span>${myBooks[i].bookname}</span></p>
                <p>Kitabin saticisi: <span>${myBooks[i].vendor}</span></p>
                <p>Kitabin novu: <span>${myBooks[i].type}</span></p>
                <button  btn-id="${i}"   class="dlt btn btn-danger">Delete</button>
                <button  edit-id="${i}"  type="button" class="edit btn btn-success" data-bs-toggle="modal" data-bs-target="#editModal">
                            Edit
                </button>
            </div>
         </div>
         </div>`
            $("#books").html($("#books").html() + str)
        }
        $(".dlt").click(function () {
            let x = $(this).attr("btn-id")
            myBooks.slice(x)
            let myJson = localStorage.getItem($("#userTitle").text())
            let myArray = JSON.parse(myJson)
            myArray.splice(x, 1)
            let myBooksJSON = JSON.stringify(myArray)
            localStorage.setItem($("#userTitle").text(), myBooksJSON)
            location.reload()
        })
        $(".edit").click(function () {
            let y = $(this).attr("edit-id")
            $("#editbtn").attr("edit-id", y)
            $("#editbookname").val(myBooks[y].bookname)
            $("#editvendor").val(myBooks[y].vendor)
            $("#edittype").val(myBooks[y].type)
        })
        $("#editbtn").click(function () {
            let n = $(this).attr("edit-id")
            myBooks[n].bookname = $("#editbookname").val()
            myBooks[n].vendor = $("#editvendor").val()
            myBooks[n].type = $("#edittype").val()
            localStorage.setItem($("#userTitle").text(), JSON.stringify(myBooks))
            alert("Ugurla deyisdirildi")
            location.reload()
        })
    }
} else {
    $("#categories").removeClass("d-none")
    $("#addbook").addClass("disabled")
    $("#quit").addClass("d-none")
    $("#sign").removeClass("d-none")
    $("#deleteAccount").addClass("d-none")
    $(".list-group-item").click(function () {
        $(".list-group-item").removeClass("active")
        $(this).addClass("active")
        $("#books").empty()
        const category = $(this).text()
        if (category == "All") {
            const usersArray = JSON.parse(localStorage.getItem("users"))
            for (let i = 0; i < usersArray.length; i++) {
                const email = usersArray[i].email
                if (localStorage.getItem(email)) {
                    const myBooksArray = JSON.parse(localStorage.getItem(email))
                    for (let j = 0; j < myBooksArray.length; j++) {
                        let str = `<div class="bg-succees col-md-6 col-lg-4 mb-5">
                    <div class="portfolio-item mx-auto" 
                    data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                    <div  class="box">
                        <p>Kitabin adi: <span>${myBooksArray[j].bookname}</span></p>
                        <p>Kitabin saticisi: <span>${myBooksArray[j].vendor}</span></p>
                        <p>Kitabin novu: <span>${myBooksArray[j].type}</span></p>
                    </div>
                 </div>
                 </div>`
                        $("#books").html($("#books").html() + str)
                    }
                }
            }
        } else {
            let isThereBook = false
            const usersArray = JSON.parse(localStorage.getItem("users"))
            for (let i = 0; i < usersArray.length; i++) {
                const email = usersArray[i].email
                if (localStorage.getItem(email)) {
                    const myBooksArray = JSON.parse(localStorage.getItem(email))
                    for (let j = 0; j < myBooksArray.length; j++) {
                        if (myBooksArray[j].type === category) {
                            isThereBook = true
                            let str = `<div class="bg-succees col-md-6 col-lg-4 mb-5">
                    <div class="portfolio-item mx-auto" 
                    data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                    <div  class="box">
                        <p>Kitabin adi: <span>${myBooksArray[j].bookname}</span></p>
                        <p>Kitabin saticisi: <span>${myBooksArray[j].vendor}</span></p>
                        <p>Kitabin novu: <span>${myBooksArray[j].type}</span></p>
                    </div>
                 </div>
                 </div>`
                            $("#books").html($("#books").html() + str)
                        }


                    }

                }
            }
            if (!isThereBook) {
                let str = `<div class="bg-succees col-md-6 col-lg-4 mb-5">
        <div class="portfolio-item mx-auto" 
        data-bs-toggle="modal" data-bs-target="#portfolioModal1">
        <div  class="box">
            <h1>Bu kateqoriyada kitab yoxdur</h1>
        </div>
     </div>
     </div>`
                $("#books").html($("#books").html() + str)
            }
        }
    })
}





if (localStorage.getItem($("#userTitle").text())) {
    bookArr = JSON.parse(localStorage.getItem($("#userTitle").text()))
} else {
    bookArr = []
}

$("#addbtn").click(function () {
    let myBook = {
        bookname: $("#addbookname").val(),
        vendor: $("#addvendor").val(),
        type: $("#addtype").val()
    }
    bookArr.push(myBook)
    //allBooks.push(myBook)
    localStorage.setItem($("#userTitle").text(), JSON.stringify(bookArr))
    alert("Kitab elave olundu")
    //let jsonAllBooks = JSON.stringify(allBooks)
    //localStorage.setItem("allBooks", jsonAllBooks)
    location.reload()
})

$("#username").keyup(function (e) {
    if ($(this).val().length <= 2) {
        if (document.getElementById("username").classList.contains("is-valid")) {
            $("#username").removeClass("is-valid")
        } else {
            $("#username").addClass("is-invalid")
        }
    } else {
        if (document.getElementById("username").classList.contains("is-invalid")) {
            $("#username").removeClass("is-invalid")
        } else {
            $("#username").addClass("is-valid")
        }
    }
})
$("#useremail").keyup(function (e) {
    if (!$(this).val().includes("@")) {
        if (document.getElementById("useremail").classList.contains("is-valid")) {
            $("#useremail").removeClass("is-valid")
        } else {
            $("#useremail").addClass("is-invalid")
        }
    } else {
        if (document.getElementById("useremail").classList.contains("is-invalid")) {
            $("#useremail").removeClass("is-invalid")
        } else {
            $("#useremail").addClass("is-valid")
        }
    }
})
$("#password").keyup(function (e) {
    if ($(this).val().length <= 6) {
        if (document.getElementById("password").classList.contains("is-valid")) {
            $("#password").removeClass("is-valid")
        } else {
            $("#password").addClass("is-invalid")
        }
    } else {
        if (document.getElementById("password").classList.contains("is-invalid")) {
            $("#password").removeClass("is-invalid")
        } else {
            $("#password").addClass("is-valid")
        }
    }
})


