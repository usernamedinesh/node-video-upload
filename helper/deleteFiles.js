import path from "path";
import fs from "fs";

// Function to delete all files in a directory
const deleteDir = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}: ${err}`);
      return;
    }
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) {
          console.error(`Error deleting file ${file}: ${err}`);
          return;
        }
        console.log(`Deleted file: ${file}`);
      });
    }
  });
};
export { deleteDir };
