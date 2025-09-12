let arr = null;
let popup = false;
let editIndex = null; 
 showData();

function addtask(event) {
    event.preventDefault();
    let tasks = JSON.parse(localStorage.getItem("name")) || [];

    let tname = document.getElementById("taskname").value.trim();
    let tdate = document.getElementById("date").value;

     if (!tname || !tdate) {
        alert("Please enter both Task Name and Date!");
        return;
    }

    if (editIndex !== null) {
      
        tasks[editIndex].tname = tname;
        tasks[editIndex].tdate = tdate;
        editIndex = null;
    } else {
  
        let taskdata = { tname: tname, tdate: tdate, status: false };
        tasks.unshift(taskdata);

    }

    localStorage.setItem("name", JSON.stringify(tasks));
    showData();
    closetask();
}

function showData() {
    arr = JSON.parse(localStorage.getItem("name")) || [];

    let filter = document.getElementById("select")?.value || "all";  
    let HTML = "";

    arr.forEach((taskdata, index) => {
      
        if (
            filter === "all" ||
            (filter === "completed" && taskdata.status) ||
            (filter === "pending" && !taskdata.status)
        ) {
            HTML += `
                <tr>
                    <td><input type="checkbox" ${taskdata.status ? "checked" : ""} onchange="handleChange(${index})"></td>
                    <td><span style="text-decoration:${taskdata.status ? "line-through" : "none"}">${taskdata.tname}</span></td>
                    <td>${taskdata.tdate}</td>
                    <td>${taskdata.status ? "Completed" : "Pending"}</td>
                    <td>
                        <button class="editbtn" onclick="editData(${index})">Edit</button>
                        <button class="deletebtn" onclick="deleteData(${index})">Delete</button>
                    </td>
                </tr>`;
        }
    });

    document.getElementById("tablebody").innerHTML = HTML || "<tr><td colspan='5'>No tasks found</td></tr>";
}

function handleChange(index) {
    arr[index].status = !arr[index].status;
    localStorage.setItem("name", JSON.stringify(arr));
    showData();
}

function closetask() {
    document.getElementById("popup").style.display = "none";
    popup = false;
    document.getElementById("taskname").value = "";
    document.getElementById("date").value = "";
    editIndex = null; 
}

function addshow() {
    popup = !popup;
    document.getElementById("popup").style.display = popup ? "block" : "none";
    document.querySelector("#popup h1").innerText = "Add Task"; 
}

function deleteData(index) {
    if (confirm("Are you sure you want to delete this task?")) {
    let tasks = JSON.parse(localStorage.getItem("name"));
    tasks.splice(index, 1);
    localStorage.setItem("name", JSON.stringify(tasks));
    showData();
    }
}

function editData(index) {
    let tasks = JSON.parse(localStorage.getItem("name"));
    document.getElementById("taskname").value = tasks[index].tname;
    document.getElementById("date").value = tasks[index].tdate;

    editIndex = index; 
    document.getElementById("popup").style.display = "block";
    popup = true;

    
    document.querySelector("#popup h1").innerText = "Edit Task";
}

function searchTask() {
    let str = '';
    let searchValue = document.getElementById("search").value.toLowerCase();
    let tasks = JSON.parse(localStorage.getItem("name")) || [];

    tasks.filter(task => task.tname.toLowerCase().includes(searchValue)).map((searchedTask, index) => {
            str += `
                <tr>
                    <td><input type="checkbox" ${searchedTask.status ? "checked" : ""} onchange="handleChange(${index})"></td>
                    <td><span style="text-decoration:${searchedTask.status ? "line-through" : "none"}">${searchedTask.tname}</span></td>
                    <td>${searchedTask.tdate}</td>
                    <td>${searchedTask.status ? "Completed" : "Pending"}</td>
                    <td>
                        <button class="editbtn" onclick="editData(${index})">Edit</button>
                        <button class="deletebtn" onclick="deleteData(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });

    document.getElementById("tablebody").innerHTML = str || "<tr><td colspan='5'>No matching tasks found</td></tr>";
}