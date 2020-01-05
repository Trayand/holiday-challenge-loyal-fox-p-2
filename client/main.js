let mainURL = 'http://localhost:3000/';

$(document).ready(function () {
    getContact()

    $('#form-add-contact').submit(function (e) {
        e.preventDefault()
        addContact()
    })

    $('#form-edit-contact').submit(function (e) {
        e.preventDefault()
        submitEdit()
    })
})

function getContact() {
    $.ajax({
        method: 'GET',
        url: mainURL
    })

        .done((data) => {
            fetchContact(data)
        })
}

function fetchContact(contacts) {
    $('#table-body').empty()
    contacts.forEach(contact => {
        let ultra = contact.quote
        console.log(contact);

        $('#table-body').append(`
        <tr>
            <th>${contact.id}</th>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td class="quoteClass">${contact.quote}</td>
            <td><button class="btn btn-warning" onclick="editContact('${contact.id}', '${contact.phone}', '${contact.name}', ${ultra})">Edit</button> | <button class="btn btn-danger" onclick="deleteContact(${contact.id})">Delete</button></td>
        </tr>
        `)
    });
}

function editContact(id, phone, name, quote) {
    $('#editName').val(name)
    $('#editPhone').val(phone)
    $('#editQuote').val(quote)
    $('#contactId').text(id)

    $('#editContactModal').modal('show')
}

function submitEdit() {
    console.log($('#contactId').html());
    $.ajax({
        method: "PUT",
        url: mainURL + $('#contactId').html(),
        data: {
            name: $('#editName').val(),
            phone: $('#editPhone').val(),
            quote: $('#editQuote').val()
        }
    })
        .done(_=> {
            // swal('Success', 'contact edited', "success")
            getContact()
        })
        .fail((err) =>{
            console.log(err);
        })
        $('#editContactModal').modal('hide')
}

function deleteContact(id) {
    console.log('tes delete');
    $.ajax({
        method: 'DELETE',
        url: mainURL + id
    })

        .done(_ => {
            getContact()
        })
        .fail(err => swal('error', err.responseJSON.name, 'error'))
}

function addContact() {
    $.ajax({
        method: "post",
        url: mainURL,
        data: {
            name: $('#inputName').val(),
            phone: $('#inputPhone').val(),
            quote: $('#inputQuote').val()
        }
    })
        .done((data) => {
            console.log(data);
            swal('Success', 'contact added', "success")
            getContact()
            $('#createContactModal').modal('hide')
        })
        .fail()

}