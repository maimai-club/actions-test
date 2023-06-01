import { program } from "commander";
import * as fs from "node:fs/promises";
import { marked } from "marked";

program.parse(process.argv);
const filePath = program.args[0];

//ファイルに出力
function OutPut(HTML){
    //ファイル拡張子をHTMLに変換
    var newfileNM = filePath.split('.').slice(0, -1).join('.html');

    var fs = WScript.CreateObject("Scripting.FileSystemObject");
    var file = fs.OpenTextFile(newfileNM, 2,true,-1);

    file.Write(HTML);

    //file.OutPut();

    file.Close();
}

//MDをHTMLに変換
function MDtoHTML(){
    fs.readFile(filePath, { encoding: "utf8" }).then(file => {
        // gfmオプションを無効にする
        const html = marked.parse(file, {
            gfm: true
        });
        return html;
        //console.log(html);
    
    }).catch(err => {
        console.error(err.message);
        process.exit(1);
    });
}

//DO
OutPut(MDtoHTML());