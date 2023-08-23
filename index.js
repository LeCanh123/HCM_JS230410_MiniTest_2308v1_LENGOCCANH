"use strict";
class Note {
    constructor(name, id = Date.now() * Math.random()) {
        this.id = id;
        this.name = name;
    }
}
class NoteManager {
    constructor(notes) {
        this.notes = notes;
    }
    createNote(newNote) {
        this.notes.push(newNote);
        localStorage.setItem("Note1", JSON.stringify(this.notes));
    }
    getData() {
        return this.notes;
    }
    deleteNote(data) {
        this.notes = data;
        localStorage.setItem("Note1", JSON.stringify(data));
    }
}
let notes = new NoteManager([]);
function addNewNote() {
    const name = document.getElementById("InputText").value;
    if (name) {
        const newNote1 = new Note(name);
        notes.createNote(newNote1);
        render();
    }
    else {
        alert("Không được để trống nội dung");
    }
}
function deleteNote(id) {
    let notes1 = notes.getData().filter((item) => item.id != id);
    notes.deleteNote(notes1);
    render();
}
function render() {
    let renderNote = document.getElementById("RenderNote");
    let temp1 = "";
    notes.getData().map((item) => {
        temp1 += `
    <div class="" style="width: 200px;height: auto;min-height:80px;background-color:white; word-wrap: break-word">
    <div>${item.name}
    </div>
    <div class="d-flex flex-row-reverse"><i onclick ="deleteNote(${item.id})"  class="fa-solid fa-trash-can"></i></div>
    </div>
    `;
    });
    renderNote.innerHTML = temp1;
}
function getLocal1() {
    let getDataLocal = JSON.parse(localStorage.getItem("Note1"));
    if (getDataLocal) {
        for (let i = 0; i < getDataLocal.length; i++) {
            const newNote1 = new Note(getDataLocal[i].name);
            notes.createNote(newNote1);
        }
        render();
    }
}
getLocal1();
document.getElementById("AddTask").addEventListener("click", addNewNote);
