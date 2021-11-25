'use strict';

const price = document.getElementById('price');
const resultDivided = document.getElementById('result-area');
const dialog = document.querySelector('dialog');
const logTable = document.getElementById('logTable');
const closeButton = document.getElementById('close');
const startButton = document.getElementById('start-button');
//const startImg = document.getElementById('start-img');

var count=0;
var total=0;
var table = [];
const config = getConfig();

//
startButton.onclick = () => {
    gachaRun();
}

//画像をクリックした時の処理
/*startImg.onclick = () => {
    gachaRun();
}*/

//「詳細を閉じる」を押した時の処理
closeButton.onclick = () => {
    //startImg.classList.remove('hidden');
    dialog.close();
}

//ガチャの中身と確率
function getConfig(){
    /*return [
        {id: 100000, val: 3},
        {id: 10000, val: 17},
        {id: 5000, val: 30},
        {id: 500, val: 50}
    ];*/
    return 500;
}

/**
 * ガチャの抽選
 */
function gachaRun(){
    //画面リセット
    clearDisplay();
    //startImg.classList.add('hidden');
    //抽選
    /*const randomNum = Math.floor(Math.random()*100);
    let result = [];
    let totalProb = 0;
    for(let i=0;i<config.length;i++){
        totalProb += config[i].val;
        if(randomNum <= totalProb){
            result = config[i];
            break;
        }
    }*/

    //total += result.id;
    total += config;
    table.push(config);

    //ガチャ演出の設定
    const paragraph = document.createElement('p');
    /*switch (totalProb) {
        case 3:
            paragraph.setAttribute('class', 'ssr');
            break;
        case 20:
            paragraph.setAttribute('class', 'sr');
            break;
        case 50:
            paragraph.setAttribute('class', 'r');
            break;
        case 100:
            paragraph.setAttribute('class', 'c');
            break;
    }*/
    paragraph.innerText = config.toLocaleString()+'円';
    paragraph.className = 'c';
    //paragraph.innerText = result.id.toLocaleString()+'円';
    //gachaResult(result, paragraph);
    gachaResult(paragraph);

}

/**
 * ガチャの中身を画面に表示する関数
 * @param {htmlElement} paragraph 
 */
function gachaResult(paragraph){
    
    clearDisplay();
    //paragraph.innerText = result.id.toLocaleString()+'円';

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
        //td2.innerText = `${table[i].id.toLocaleString()}円`;
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