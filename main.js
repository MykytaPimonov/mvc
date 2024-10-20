const url = "https://docs.google.com/spreadsheets/u/0/d/12N56fB90kUz5-dkTSD4aZSYEWN2ifg6gXtAmq8z4rrU/"
    + "export?format=tsv&id=12N56fB90kUz5-dkTSD4aZSYEWN2ifg6gXtAmq8z4rrU&gid=0";
const lineSep = "\r\n";
const cellSep = "\t";
const domTable = document.querySelector(".student-table")

function loadData() {
    fetch(url)
        .then(response => response.text())
        .then(body => parseData(body))
        .then(data => render(data));
}

function parseData(body) {
    const table = body
        .split(lineSep)
        .map(element => element.split(cellSep));
    const names = table.shift();

    return {
        names: names,
        students: table.map(element => {
                const student = {};
                names.forEach((name, i) => student[name] = element[i])
                return student
            }
        )
    };
}

function render(data) {
    domTable.innerHTML = `
    ${header(data.names)}
    <tbody>
        ${body(data.students)}
    </tbody>`;
}

function header(names) {
    return `
    <thead>
    <tr>
        <th scope="col">${names[0]}</th>
        <th scope="col">${names[1]}</th>
        <th scope="col">${names[2]}</th>
        <th scope="col">${names[3]}</th>
        <th scope="col">${names[4]}</th>
    </tr>
    </thead>`;
}

function body(students) {
    return `
    <tbody>
        ${students.map(it => row(it)).join("")}
    </tbody>`;
}

function row(student) {
    return `
    <tr>
        <th scope="row">${student.id}</th>
        <td>${student.name}</td>
        <td>${student.surname}</td>
        <td>${student.group}</td>
        <td>${student.birthdate}</td>
    </tr>`;
}

loadData();
