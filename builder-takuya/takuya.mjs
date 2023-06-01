import { program } from "commander";
import * as fs from "node:fs/promises";
import { marked } from "marked";

program.parse(process.argv);
const filePath = program.args[0];

//ファイルに出力
function OutPut(HTML){
    //ファイル拡張子をHTMLに変換
    var newfileNM = filePath.split('.').slice(0, -1);
    newfileNM = newfileNM + '.html';
    
    // 書き込み
    fs.writeFile(newfileNM, String(HTML));

    //console.log(HTML);
    //console.log(newfileNM);

}

//MDをHTMLに変換
function MDtoHTML(){
    var html;
    fs.readFile(filePath, { encoding: "utf8" }).then(file => {
        // gfmオプションを無効にする
        html = marked.parse(file, {
            gfm: true
        });
        console.log(typeof(html));
        OutPut(html);
        //console.log(html);
    
    }).catch(err => {
        console.error(err.message);
        process.exit(1);
    });

    console.log(html);
    return html;
}

//DO
MDtoHTML();
//console.log(html);
//OutPut(html);
//MDtoHTML();