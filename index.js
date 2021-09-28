const express = require('express')
const request = require('postman-request');
const app = express()



app.get('/getTimeStories', (req, res)=> {
    let str=''
  request('https://time.com', function (error, response, body) {
  console.log('error:', error);
  const start='<ol class="swipe-h">'
  const end=' </ol>'
//   console.log('body:', body.search(start));
//   console.log('body:', body.search(end));

   for(let i=99158;i<=101247;i++)
   {
       str=str+body.charAt(i)
   }
const h2='<a href=/'
const h2Ending='</a>'
const headlines={}
let key=1
// for(let i=0;i<str.length;i++)
// {
//     headlinesPosition[key]=str.search(h2)
// key++
// i=str.search(h2,i)
// }
// console.log(headlinesPosition)
// console.log(str.search(h2))
// console.log(str.search(h2Ending))
let startofHeading,endofHeading
// const a=(str.indexOf(h2Ending,str.indexOf(h2,str.indexOf(h2,str.indexOf(h2Ending)))))
// const b=(str.indexOf(h2,str.indexOf(h2Ending)))
// console.log(a)
// console.log(b)
//   console.log(str.slice(b,a))

while(key!=5)
{
startofHeading= startofHeading===undefined? str.indexOf(h2) : str.indexOf(h2,startofHeading)
endofHeading=str.indexOf(h2Ending,startofHeading+1)
headlines[key]=str.slice(startofHeading,endofHeading)
// console.log(startofHeading,endofHeading)
startofHeading=endofHeading+1


key++
}
//extracting links
const getLinks={}
let linkstart='/'
let linkeend='/>'
for(const title in headlines)
{
    getLinks[title]='https://time.com/'+headlines[title].slice(headlines[title].indexOf(linkstart)+1,headlines[title].indexOf(linkeend))
}

//extracting titles
const gettitles={}
let titlestart='/>'
for(const title in headlines)
{
    gettitles[title]=headlines[title].slice(headlines[title].indexOf(titlestart)+2,headlines[title].length-1)
}
//sending final data

const final=[]

for(const key in gettitles)
{
    final.push({title:gettitles[key],link:getLinks[key]})
}


res.send(final)

});





})

app.listen(3000,()=>{
    console.log('listening to port 3000')
})