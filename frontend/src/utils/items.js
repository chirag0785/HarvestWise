export const getItemsCategoryWise=(items)=>{
    let category={};
    items.forEach((item)=>{
        category[item.category]=[];
    })
    items.forEach((item)=>{
        category[item.category].push(item);
    })

    return category;
}


// let user=[1,2,4];
// const sum=user.reduce((prevValue,currValue,indx)=>{
//     return prevValue+currValue;
// },0);
// console.log(sum);
let date=new Date('2024-07-19T07:26:25.290Z');
date.toDateString()
