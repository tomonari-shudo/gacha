'use strict';
/**ここから */
const price = document.getElementById('price');
const resultDivided = document.getElementById('result-area');
const dialog = document.querySelector('dialog');
const logTable = document.getElementById('logTable');
const closeButton = document.getElementById('close');
const startImg = document.getElementById('start-img');

var count=0;
var total=0;
var table = [];
const config = getConfig();

//画像をクリックした時の処理
startImg.onclick = () => {
    /*format()
        .then(()=>{
            //return standBy();
            return gachaRun();
        });*/
    gachaRun();
}

//「詳細を閉じる」を押した時の処理
closeButton.onclick = () => {
    startImg.classList.remove('hidden');
    dialog.close();
}

//ガチャの中身と確率
function getConfig(){
    return [
        {id: 100000, val: 3},
        {id: 10000, val: 17},
        {id: 5000, val: 30},
        {id: 500, val: 50}
    ];
}

/**
 * 初期化用プロミス
 */
/*function format(){
    return new Promise((resolve) => {
        //count=0;
        //total=0;
        //table=[];
        //dialog.close();
        //showButton.className='hidden';
        clearDisplay();
        resolve();
    });
}*/

/**
 * ガチャ待機画面を表示する関数
 * @param {int} num ガチャを引く回数
 */
 /*function standBy(){

    clearDisplay();
    gachaRun();
}*/

/**
 * ガチャの抽選
 * @param {int} num ガチャの実行回数
 */
function gachaRun(){
    //画面リセット
    clearDisplay();
    startImg.classList.add('hidden');
    //抽選
    const randomNum = Math.floor(Math.random()*100);
    let result = [];
    let totalProb = 0;
    for(let i=0;i<config.length;i++){
        totalProb += config[i].val;
        if(randomNum <= totalProb){
            result = config[i];
            break;
        }
    }

    total += result.id;
    table.push(result);

    //ガチャ演出の設定
    const paragraph = document.createElement('p');
    const img = document.createElement('img');
    var rareEffect = true;
    switch (totalProb) {
        case 3:
            img.src = "./img/ssr.png";
            img.className = 'purun';
            paragraph.setAttribute('class', 'ssr');
            break;
        case 20:
            img.src = "./img/sr.png";
            img.className = 'poyon';
            paragraph.setAttribute('class', 'sr');
            break;
        case 50:
            rareEffect=false;
            paragraph.setAttribute('class', 'r');
            break;
        case 100:
            rareEffect=false;
            paragraph.setAttribute('class', 'c');
            break;
    }
    img.addEventListener('animationend', ()=>{
        gachaResult(result, paragraph);
    });

    //レア演出分岐
    if(rareEffect){
        resultDivided.appendChild(img);
    }else{
        gachaResult(result, paragraph);
    }

}

/**
 * ガチャの中身を画面に表示する関数
 * @param {object} result 
 * @param {int} num 
 * @param {htmlElement} paragraph 
 */
function gachaResult(result, paragraph){
    
    clearDisplay();
    paragraph.innerText = result.id.toLocaleString()+'円';

    resultDivided.appendChild(paragraph);
    count++;
    //console.log(count + ' : ' + num + ' : ' + result.val);

    //繰り返し処理
    //if(count<num){
        //setTimeout(standBy, 1000, num);
    //}else{
        setTimeout(()=>{
        
            clearDisplay();

            /*const resultHeader = document.createElement('h3');
            resultHeader.innerText = 'ガチャ結果';
            resultDivided.appendChild(resultHeader);

            const resultParagraph = document.createElement('p');
            resultParagraph.innerText = `🎊総額${total.toLocaleString()}円🎊`;
            resultParagraph.className = 'result';
            resultDivided.appendChild(resultParagraph);*/

            price.innerText = `🎊総額${total.toLocaleString()}円🎊`;

            createTable();
            //console.log(table);
            //showButton.className="";

            dialog.showModal();

        },1000);

    //}
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
        td2.innerText = `${table[i].id.toLocaleString()}円`;
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
        //if(resultDivided.children[i].className!=='box_imageLeft' && resultDivided.children[i].className!=='box_imageRight'){
            resultDivided.children[i].remove();
        //}
    }
}