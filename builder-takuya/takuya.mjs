import { program } from "commander";
import * as fs from "node:fs/promises";
import { marked } from "marked";

program.parse(process.argv);
const filePath = program.args[0];

//ファイルに出力
function OutPut(HTML){
    //ファイル拡張子をHTMLに変換
    var newfileNM = filePath.split('.').slice(0, -1).join('.html');
    
    // 書き込み
    fs.writeFile(newfileNM, HTML, (err) => {
        if (err) throw err;
        console.log('正常に書き込みが完了しました');
    });

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