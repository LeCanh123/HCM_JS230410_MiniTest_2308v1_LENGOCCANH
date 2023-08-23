interface NoteType {
    id: number;
    name: string;

}

class Note {
   id: number;
   name: string;


   constructor(name: string, id: number = Date.now() * Math.random(),) {
       this.id = id;
       this.name = name;
   }
}


class NoteManager {
    notes: Note[];
 
    constructor(notes: Note[]) {
        this.notes = notes;
    }

    createNote(newNote: Note ) {
        this.notes.push(newNote);
        localStorage.setItem("Note1", JSON.stringify(this.notes));
        
    }
    getData(): Note[]{
        return this.notes
    }
    deleteNote(data:Note[]){
        this.notes=data;
        localStorage.setItem("Note1", JSON.stringify(data));
    }
}

let notes = new NoteManager([]);

function addNewNote() {
    const name = (document.getElementById("InputText")as HTMLInputElement).value;
    if(name){
        const newNote1 = new Note(name);
        notes.createNote(newNote1);
        render();
    }else{
        alert("Không được để trống nội dung")
    }

  }
  function deleteNote(id:number){
    let notes1=notes.getData().filter((item)=>item.id!=id)
    notes.deleteNote(notes1)
    render();
  }

  function render() {
    let renderNote = document.getElementById("RenderNote") as HTMLElement;
    let temp1="";
notes.getData().map((item)=>{
    temp1+=`
    <div class="" style="width: 200px;height: auto;min-height:80px;background-color:white; word-wrap: break-word">
    <div>${item.name}
    </div>
    <div class="d-flex flex-row-reverse"><i onclick ="deleteNote(${item.id})"  class="fa-solid fa-trash-can"></i></div>
    </div>
    `
})
renderNote.innerHTML=temp1
  }

  function getLocal1 () {
    let getDataLocal=JSON.parse(localStorage.getItem("Note1") as any);
    if(getDataLocal){
        for (let i = 0; i < getDataLocal.length; i++) {
            const newNote1 = new Note(getDataLocal[i].name,);
            notes.createNote(newNote1);
        }
        render();
    }

  }
  getLocal1();

  (document.getElementById("AddTask") as HTMLInputElement).addEventListener("click", addNewNote);