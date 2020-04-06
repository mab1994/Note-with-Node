const fs = require('fs');

Help = () => {
    console.log('\nadd \t\t\t\t to add a new note')
    console.log('remove \t\t\t\t to remove a note')
    console.log('list \t\t\t\t to list the notes')
    console.log('read \t\t\t\t to read a specific note')
    return
};

UnknownCommand = () => {
    console.log('\nCannot recognize command !')
    console.log('\nadd \t\t\t\t to add a new note')
    console.log('remove \t\t\t\t to remove a note')
    console.log('list \t\t\t\t to list the notes')
    console.log('read \t\t\t\t to read a specific note')
    console.log('help \t\t\t\t to seek help')
    return
};

Add = () => {
    let newNote = {};
    let titleIndex = process.argv.findIndex(el => el === '--title' || el === '-t');

    if (titleIndex === -1 || process.argv[titleIndex+1] === undefined) {
        console.log('\nMissing arguments!')
        console.log('\n--title or -t \t\t\t\t for note title')
        console.log('\n--body or -b \t\t\t\t for note body')
        return
    } else {
        newNote.Title = process.argv[titleIndex + 1]
    }

    let bodyIndex = process.argv.findIndex(el => el === '--body' || el === '-b');

    if (bodyIndex === -1 || process.argv[bodyIndex+1] === undefined) {
        console.log('\nMissing arguments!')
        console.log('\n--title or -t \t\t\t for note title')
        console.log('\n--body or -b \t\t\t for note body')
        return
    } else {
        newNote.Body = process.argv[bodyIndex + 1]
    }
    
    let noteJASON = fs.readFileSync('note.json', 'utf8');
    let notes = JSON.parse(noteJASON);
    let Notes = notes.concat(newNote);
    let NotesJSON = JSON.stringify(Notes);
    fs.writeFileSync('note.json',NotesJSON)

    console.log('\nNote successfully created!\n');
    console.log(`Title: ${newNote.Title}`);
    console.log(`Body: ${newNote.Body}`);
}

Remove = () => {
    
    let titleIndex = process.argv.findIndex(el => el === '--title' || el === '-t');

    if (titleIndex === -1 || process.argv[titleIndex+1] === undefined) {
        console.log('\nMissing arguments!')
        console.log('\n--title or -t \t\t\t\t for note title')
        console.log('\n--body or -b \t\t\t\t for note body')
        return
    } else {
        let NotesJSON = fs.readFileSync('note.json', 'utf8');
        let Notes = JSON.parse(NotesJSON);
        let FilteredNotes = Notes.filter(el => el.Title !== process.argv[titleIndex + 1]);
        if (FilteredNotes.length === Notes.length) {
            console.log('\nNote not found!')
            return
        }
        let FilteredNotesJSON = JSON.stringify(FilteredNotes);
        fs.writeFileSync('note.json', FilteredNotesJSON);
        console.log('\nNote removed !\n')
    }
}

List = () => {
    let NotesJSON = fs.readFileSync('note.json', 'utf8');
    let Notes = JSON.parse(NotesJSON);
    console.log(`\nDisplaying ${Notes.length} notes\n`);
    console.log('\n------------\n');
    Notes.forEach(el => {
        console.log(`\nTitle: ${el.Title}`);
        console.log(`Body: ${el.Body}`);
    })
}

Read = () => {
    let titleIndex = process.argv.findIndex(el => el === '--title' || el === '-t');

    if (titleIndex === -1 || process.argv[titleIndex+1] === undefined) {
        console.log('\nMissing arguments!')
        console.log('\n--title or -t \t\t\t\t for note title')
        console.log('\n--body or -b \t\t\t\t for note body')
        return
    } else {
        let NotesJSON = fs.readFileSync('note.json', 'utf8');
        let Notes = JSON.parse(NotesJSON);
        let Note = Notes.find(el => el.Title === process.argv[titleIndex+1]);

        if (Note) {
            console.log('\n Note found :\n');
            console.log(`\nTitle: ${Note.Title}`);
            console.log(`Body: ${Note.Body}`);
        } else {
            console.log('\n Cannot find note!\n');
        }
        
    }
}


switch (process.argv[2]) {
    case 'help':
        return Help()
    break;
    case 'add':
        return Add()
    break;
    case 'remove':
        return Remove()
    break;
    case 'list':
        return List()
    break;
    case 'read':
        return Read()
    break;
    default:
        return UnknownCommand()
};