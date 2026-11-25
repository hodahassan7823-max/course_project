// 1. Course list: search and filter
var filter = document.getElementById("filterForm");
if (filter) {
    filter.onsubmit = function (e) {
        e.preventDefault();
        var rows = document.getElementById("courseTable").rows;
        for (var i = 1; i < rows.length; i++) {
            var row = rows[i];
            var text = (row.cells[0].innerText + " " + row.cells[1].innerText).toLowerCase();
            var isFull = parseInt(row.cells[2].innerText) == 0;
            var show = text.indexOf(filter.q.value.toLowerCase()) != -1;
            if (filter.dept.value != "All" && filter.dept.value != row.dataset.dept) show = false;
            if (filter.cr.value != "All" && filter.cr.value != row.dataset.cr) show = false;
            if (filter.av.value == "Available seats" && isFull) show = false;
            if (filter.av.value == "Full" && !isFull) show = false;
            row.style.display = show ? "" : "none";
        }
    };
    // The list updates while the student types (no need to press Search)
    filter.oninput = function () {
        filter.onsubmit(new Event("submit"));
    };
    filter.onchange = filter.oninput;
    // Clear shows all the courses again
    filter.onreset = function () {
        var rows = document.getElementById("courseTable").rows;
        for (var i = 1; i < rows.length; i++) rows[i].style.display = "";
    };
}

// 2. Drop, Leave Waitlist and Delete buttons: ask first, then hide the row
var buttons = document.querySelectorAll("button");
for (var j = 0; j < buttons.length; j++) {
    var word = buttons[j].innerText;
    if (word == "Drop" || word == "Leave Waitlist" || word == "Delete") {
        buttons[j].onclick = function (e) {
            e.preventDefault();
            if (confirm("Are you sure?")) this.closest("tr").style.display = "none";
        };
    }
}

