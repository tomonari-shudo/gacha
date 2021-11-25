'use strict';

const startButton = document.getElementById('start-button');
const price = document.getElementById('price');
const resultDivided = document.getElementById('result-area');
const dialog = document.querySelector('dialog');
const logTable = document.getElementById('logTable');
const closeButton = document.getElementById('close');


var count=0;
var total=0;
var table = [];
const config = getConfig();

//
startButton.onclick = () => {
    gachaRun();
}

//「詳細を閉じる」を押した時の処理
closeButton.onclick = () => {
    dialog.close();
}

//ガチャの中身と確率
function getConfig(){
    return 500;
}

/**
 * ガチャの抽選
 */
function gachaRun(){
    //画面リセット
    clearDisplay();

    total += config;
    table.push(config);

    //ガチャ演出の設定
    const paragraph = document.createElement('p');
    paragraph.innerText = config.toLocaleString()+'円';
    paragraph.className = 'c';

    gachaResult(paragraph);

}

/**
 * ガチャの中身を画面に表示する関数
 * @param {htmlElement} paragraph 
 */
function gachaResult(paragraph){
    
    clearDisplay();

    resultDivided.appendChild(paragraph);
    count++;

    setTimeout(()=>{
    
        clearDisplay();

        price.innerText = `🎊総額${total.toLocaleString()}円🎊`;

        createTable();

        dialog.showModal();

    },1000);

}

/**
 * ガチャ結果詳細の作成
 */
function createTable(){
    logTable.innerText="";

    for(let i=0;i<table.length;i++){
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerText = `${i+1}回目`;
        const td2 = document.createElement('td');
        td2.innerText = `${table[i].toLocaleString()}円`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        logTable.appendChild(tr);
    }
}

/**
 * 結果画面の初期化
 */
function clearDisplay(){
    for(let i=0;i<resultDivided.children.length;i++){
            resultDivided.children[i].remove();
    }
}