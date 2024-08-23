const color = document.getElementById('color')
const createBtn = document.getElementById('createBtn')
const list = document.getElementById('list')

createBtn.addEventListener('click', () => {
  const newNote = document.createElement('div')
  newNote.classList.add('note')
  newNote.innerHTML = `
    <span class="close">x</span>
    <textarea placeholder="Write Content..." rows="10" cols="30"></textarea>
    `;
  newNote.style.borderColor = color.value;
  list.appendChild(newNote)
})
document.addEventListener('click', e => {
  if (e.target.classList.contains('close')) {
    e.target.parentNode.remove()
  }
})

const cursor = {
  x: null,
  y: null,
}
const note = {
  dom: null,
  x: null,
  y: null,
}
document.addEventListener('mousedown', e => {
  if (e.target.classList.contains('note')) {
    cursor.x = e.clientX
    cursor.y = e.clientY
    note.dom = e.target
    note.x = e.target.getBoundingClientRect().left
    note.y = e.target.getBoundingClientRect().top
    
  }
})
document.addEventListener('mousemove', (e) => {
  if (!note.dom) return
  const currentCursor = {
    x: e.clientX,
    y: e.clientY
  }
  const distance = {
    x: currentCursor.x - cursor.x,
    y: currentCursor.y - cursor.y,
  }
  note.dom.style.left = (distance.x + note.x) + 'px'
  note.dom.style.top = (distance.y + note.y) + 'px'
  note.dom.style.cursor = 'grab'
})
document.addEventListener('mouseup', () => {
  if (note.dom == null) return
  note.dom = null;
  note.dom.style.cursor = 'auto'
})