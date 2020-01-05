let mainURL = 'http://localhost:3000/';

$(document).ready(function () {
    console.log('tes')
    getContact()
})

function getContact() {
    $.ajax({
        method: 'GET',
        url: mainURL
    })

        .done((data) => {
            fetchContact(data)
        })
        .fail(err => console.log(err))
}

function fetchContact(contacts) {
    $('#table-body').empty()
    contacts.forEach(contact => {
        $('#table-body').append(`
        <tr>
            <td>${contact.id}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.quote}</td>
            <td><button class="btn btn-primary" onclick="editContact(${contact.id})">Edit</button> | <button class="btn btn-primary" onclick="deleteContact(${contact.id})">Delete</button></td>
        </tr>
        `)
    });
}

function editContact(id) {

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
        .fail()
}