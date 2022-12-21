// ввод нескольких строк в инпут node.js


const readline=require('readline');

const rl=readline.createInterface({
    input:process.stdin, 
})

let arr=[];

rl.on('line', (line)=>{
    arr.push(line);
    if(arr.length===2){
        const x = +arr[0];
        const y = +arr[1];
            if( x <= 32000 && x >= -32000){
                if( y <=32000 && y >= -32000){
                    process.stdout.write(String(x+y))
                }
            }else{console.log('error')}
           
        rl.close()
}})
