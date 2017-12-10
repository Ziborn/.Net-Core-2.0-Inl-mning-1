
$("#addForm button").click(function () {

    $.ajax({
        url: '/api/Customers/',
        method: 'POST',
        data: {
            "FirstName": $("#addForm [name=FirstName]").val(),
            "LastName": $("#addForm [name=LastName]").val(),
            "Email": $("#addForm [name=Email]").val(),
            "Age": $("#addForm [name=Age]").val(),
            "Gender": $("#addForm [name=Gender]").val()
        }

    })
        .done(function (result) {

            alert(`Success! Result = ${result}`);
            location.reload();

        })

        .fail(function (xhr, status, error) {

            alert(`Fail!`);
            console.log("Error", xhr, status, error);

        });
});

$(document).ready(function () {
    $.ajax({
        url: 'api/Customers/',
        method: 'GET'
    })
        .done(function (result) {
            var html = "";
            console.log("Success!", result);
            //clear();
            result.forEach(function (item) {
                html += GetCustomers(item);
            });
            $("#allCustomers").html(html);

        })
        .fail(function (xhr, status, error) {

            alert(error);
            console.log("Fail", xhr);
            //clear();
            $("#allCustomers").text(xhr.responseText);
        });
});

$(document).on("click", "#btnDelete", function () {
    var id = $(this).parent().siblings("#customerId").text();
    $.ajax({
        url: '/api/Customers/',
        method: 'DELETE',
        data: {
            id: id
        }

    })
        .done(function (result) {

            location.reload();

        })

        .fail(function (xhr, status, error) {

            alert(`Fail!`);
            console.log("Error", xhr, status, error);

        });
});

$(document).on("click", "#btnEdit", function () {
    var id = $(this).parent().siblings("#customerId").text();
    var row = $(this).parent().parent();
    
    $.ajax({
        url: '/api/Customers/',
        method: 'PUT',
        data: {
            id: id,
            "FirstName": $(".firstName", row).text(),
            "LastName": $(".lastName", row).text(),
            "Email": $(".email", row).text(),
            "Age": $(".age", row).html(),
            "Gender": $(".gender", row).text()
        }

    })
        .done(function (result) {
            alert(`Success! Result = ${result}`);
            location.reload();
        })

        .fail(function (xhr, status, error) {

            alert(`Fail!`);
            console.log("Error", xhr, status, error);

        });
});

function GetCustomers(customer) {

    var html = '<tr>';
    html += '<th id="customerId">' + customer.id + '</th>';
    html += '<td class="firstName" contenteditable="true">' + customer.firstName + '</td>';
    html += '<td class="lastName" contenteditable="true">' + customer.lastName + '</td>';
    html += '<td class="email" contenteditable="true">' + customer.email + '</td>';
    html += '<td class="gender" contenteditable="true">' + customer.gender + '</td>';
    html += '<td class="age" contenteditable="true">' + customer.age + '</td>';
    html += '<th><button id="btnEdit">Save changes</button></th>';
    html += '<th><button id="btnDelete">Remove</button></th>';
    html += '</tr>';
    
    console.log(html);
    return html;
}
