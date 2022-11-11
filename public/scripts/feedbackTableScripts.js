// /* Formatting function for row details - modify as you need */
// function format(d) {
//     // `d` is the original data object for the row
//     return (
//         '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
//         '<tr>' +
//         '<td>Full name:</td>' +
//         '<td>' +
//         d.email +
//         '</td>' +
//         '</tr>' +
//         '<tr>' +
//         '<td>Extension number:</td>' +
//         '<td>' +
//         d.feedbackText +
//         '</td>' +
//         '</tr>' +
//         '<tr>' +
//         '<td>Extra info:</td>' +
//         '<td>And any further details here (images etc)...</td>' +
//         '</tr>' +
//         '</table>'
//     );
// }

// $(document).ready(function () {
//     // var data = document.getElementById("table-data").value;
//     var data = {data: parsed__data};

//     console.log(data);
//     var table = $('#feedback-table').DataTable({
//         ajax: JSON.stringify(data),
//         columns: [
//             {
//                 className: 'dt-control',
//                 orderable: false,
//                 data: null,
//                 defaultContent: '',
//             },
//             { data: 'name' },
//             { data: 'position' },
//             { data: 'office' },
//             { data: 'salary' },
//         ],
//         order: [[1, 'asc']],
//     });

//     // Add event listener for opening and closing details
//     $('#feedback-table-body').on('click', 'td.dt-control', function () {
//         var tr = $(this).closest('tr');
//         var row = table.row(tr);

//         if (row.child.isShown()) {
//             // This row is already open - close it
//             row.child.hide();
//             tr.removeClass('shown');
//         } else {
//             // Open this row
//             row.child(format(row.data())).show();
//             tr.addClass('shown');
//         }
//     });
// });

$(document).ready( function () {
    $('#feedback-table').DataTable({
        "columns": [
            {"width": "10px"},
            {"width": "250px"},
            null,
            null,
            {"width": "100px"}
        ],
        "language": {
            "emptyTable": "No Customer Feedback Yet"
        }
    });
} );

