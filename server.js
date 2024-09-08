const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const myPackage = require('./SchedulePackage');
let ListofValidSchedules = [];

const port = 8081;

const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

const db = mysql.createConnection(
        {
            host: "127.0.0.1",
            user: "root",
            password: "QAZwsxEDC1324",
            database: "mydb",
            connectionLimit: 2
        }
)


app.get('/test', async (req, res) => {
    let sql = "Select course_id from course_tbl";
    let result = await queryPromise(sql);
    let list = [];
    
    result.forEach(el => {
        list.push(el.course_id);
    })
   
    let a = 
    {
        object: JSON.stringify(list)
    }
        
    res.render('index', a);
})


app.post('/send', async (req, res) => {

    let list = JSON.parse(req.body.obj);
    let txt = "";
    if (list.length != 0)
    {
        for (i = 0; i < list.length - 1; i++)
    {
        txt += '"' + list[i] + '", ';
    }
    txt += '"' + list[i] + '"';

    console.log("data sent")
    console.log(txt);
    let sqlmsg = "select course_id, group_concat(distinct Section_id separator ',') as Section_id, group_concat(Type separator ',') as Type from section_tbl where Course_id in (" + txt + ") group by Course_id;";
    
    
    


    
    await Function2(sqlmsg, JSON.parse(req.body.offDays));
    }

    let data = {
        ok: true,
        list: ListofValidSchedules
    }
    if (ListofValidSchedules.length == 0)
    {
        data.ok = false;
    }

    return res.json(data);

})


app.use('/new', express.static('newWindow.html'));

app.listen(port, () => {
    console.log("listening");
})


async function Function2(sqlmsg, offDays)
{

    res = await queryPromise(sqlmsg);
    let CoursesList = [];
    let c;
    let s;
    let CourseName;
    for (i = 0; i < res.length; i++)
    {
      el = res[i]; 
      CourseName = el.course_id;
      c = new myPackage.Course(CourseName);
      let sList = el.Section_id.split(',').map(Number);
      let tList = el.Type.split(',');
      for (j = 0; j < sList.length; j++)
      {
        s = new myPackage.Section(sList[j], CourseName, tList[j]);
        let txt = "select Section_id, group_concat(period separator ',') as period from time_tbl where Section_id =" + sList[j] + " group by Section_id;";
        result = await queryPromise(txt);
        if (result[0] != null)
        {
            s.PeriodsList = result[0].period.split(',').map(Number);
        }
        if (tList[j] == 'T')
        {
          c.addTSection(s);
        }
        else if (tList[j] == 'P')
        {
          c.addPSection(s);
        }
      }
      CoursesList.push(c);
      
    }

    

    var arr2d = [];
    let section = new myPackage.Section(0, "dayOff", 'T');
    
    for (i = 0; i < offDays.length; i++)
    {
      if (offDays[i] == 1)
      {
        let periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        for (j = 0; j < periods.length; j++)
        {
          periods[j] += (i + 1) * 100;
        }
        section.PeriodsList = periods;
      }
    }
    arr2d.push([section]);
    

    CoursesList.forEach(e => {
        arr2d.push(e.TSectionList);
        if (e.PSectionList.length != 0)
        {
          arr2d.push(e.PSectionList);
        }
    })

    let listofScheduleHelpers = [];
    myPackage.combos(arr2d, listofScheduleHelpers);

    let tmp = [];
    listofScheduleHelpers.forEach(schHelp => {
       schHelp.checkValidation();
       if (schHelp.isValid)
       {    
        tmp.push(schHelp);
       }
    })


    ListofValidSchedules = tmp;
    return;


}


function queryPromise(str) { 
    return new Promise((resolve, reject) => {
      db.query(str, (err, result, fields) => {
        if (err) reject(err); 
        resolve(result);
      })
    })
  }









