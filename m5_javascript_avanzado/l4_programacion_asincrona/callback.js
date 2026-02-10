function doHomework(subject, callback) {
    console.log(`Starting my ${subject} homework.`);
    callback(subject); // Llamara a una funcion pasada como argumento
}

function finished(subject) {
    console.log(`Finished my ${subject} homework.`);
}

doHomework("JavaScript", finished);