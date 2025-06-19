const arr=[10,20,30];
const found=arr.find(x=>x+15);
const index=arr.findIndex(x=>x>15);
const filtered = arr.filter(x => x % 2 === 0);
arr.includes(5)
arr.push(3)
const last=arr.pop()
const double=arr.map(x=>x*2)
const list=arr.map((item)=>{
      return item;
})
const sum = arr.reduce((acc, val) => acc + val, 0);
const sliced = arr.slice(1, 3);
arr.splice(1, 2);
arr.splice(1,0,'a');
arr.splice(1,0,'b');
const first=arr.shift()
arr.unshift(1)
arr.valuesof(arr)
arr.forEach(x => console.log(x));
const hasEven = arr.some(x => x % 2 === 0);

