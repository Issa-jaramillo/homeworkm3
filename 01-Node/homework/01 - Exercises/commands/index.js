const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

function pwd(print) {
  print(process.cwd())
}

function date(print) {
   print(Date());
}

function echo(print, args) {
   print(args);
}

function ls(print) {
   fs.readdir(".", (error, files)=>{
    if(error) throw new Error(error);
    print(files.join(" "))
   })
}

function cat(print, args) {
   fs.readFile(args, "utf-8", (error, data)=>{
    if(error) throw new Error(error);
    print(data);
   })
  }

function head(print, args) {
    fs.readFile(args, "utf-8", (error, data)=>{
        if(error) throw new Error(error);
        const line = data .split("\n")[0];
        print(line);
       })
}

function tail(print, args) {
    fs.readFile(args, "utf-8", (error, data)=>{
        if(error) throw new Error(error);
        const lines = data .split("\n");
        const line = lines[lines.length -1].trim();
        print(line);
       })

}

function curl(print, args) {
   if(args.startsWith("https://")){
    
   utils.request(args, (error, response)=>{
        if(error) throw new Error(error);
        print(response)
    })


   } else {
        throw new Error("debe de comenzar  'https://'");
    }
     

  

}

module.exports = {pwd, date, echo, ls, cat, head, tail, curl};
