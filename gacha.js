'use strict';

const oneButton = document.getElementById('oneGacha');
const tenButton = document.getElementById('tenGacha');
const resultDivided = document.getElementById('result-area');

var intervalId;
var count=0;
var sum=0;
var gachaResult = new Array();

//「1回引く」を押した時の処理
oneButton.onclick = () => {
    lottery();
}

//「10回引く」を押した時の処理
tenButton.onclick = () => {
    intervalId = setInterval(lottery, 500);
}

//ガチャの中身
const items = [
    500,
    5000,
    10000,
    100000
];

/**
 * ガチャの抽選
 */
function lottery(){
    resultDivided.innerText="";
    const rare = Math.floor(Math.random()*100);
    let result = null;
    if(rare<=3){
        result = items[3];
    }else if(rare<=20){
        result = items[2];
    }else if(rare<=50){
        result = items[1];
    }else{
        result = items[0];
    }

    //抽選結果を保存
    gachaResult.push(result);
    sum+=result;

    //ガチャ結果の表示
    resultDivided.className = "back";
    const header = document.createElement('h3');
    header.innerText = (count%10+1) + "回目";
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    paragraph.innerText = result + "円";
    switch(result){
        case 500:
            paragraph.className = "c";
            break;
        case 5000:
            paragraph.className = "r";
            break;
        case 10000:
            paragraph.className = "sr";
            break;
        case 100000:
            paragraph.className = "ssr";
            break;
    }
    resultDivided.appendChild(paragraph);

    count++;
    
    //10回引き終わった後の処理
    if(count%10===0){
        //処理を止める
        clearInterval(intervalId);

        resultDivided.innerText="";
        resultDivided.className = "back";
        const header = document.createElement('h3');
        header.innerText = "ガチャ結果";
        resultDivided.appendChild(header);

        //合計金額を表示
        const paragraph = document.createElement('p');
        paragraph.innerText = "累計金額："+sum+"円\n\n";
        resultDivided.appendChild(paragraph);

        for(let i=0;i<gachaResult.length;i++){
            const paragraph = document.createElement('p');
            paragraph.innerText = (i+1) + "回目：" + gachaResult[i] + "円\n";
            switch(gachaResult[i]){
                case 500:
                    paragraph.className = "c";
                    break;
                case 5000:
                    paragraph.className = "r";
                    break;
                case 10000:
                    paragraph.className = "sr";
                    break;
                case 100000:
                    paragraph.className = "ssr";
                    break;
            }
            resultDivided.appendChild(paragraph);
        }

        gachaResult = [];
        count=0;
    }
}