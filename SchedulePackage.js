


 const Course = class Course {
    CourseId;
    TSectionList = [];
    PSectionList = [];
    constructor(CourseId)
    {
        this.CourseId = CourseId;
    }

    addTSection(section)
    {
        this.TSectionList.push(section);
    }

    addPSection(section)
    {
        this.PSectionList.push(section);
    }

}

 const Section = class Section {
    CourseId;
    //ParentCourse;
    SectionId;
    Type = 'T';
    PeriodsList = [];
    
    constructor(sectionId, C, type)
    {
      //  this.ParentCourse = c;
      this.CourseId = C;
        this.SectionId = sectionId;
        this.Type = type;
    }
    addPeriod(p)
    {
        this.PeriodsList.push(p);
    }
    getPeriods()
    {
       return this.PeriodsList; 
    }

}
const ScheduleHelper = class ScheduleHelper{
    isValid = false;
    SectionList = []; // each section is from a different course;

    constructor(list)
    {
        this.SectionList = list;
    }

    checkValidation()
    {
        let allPeriodslist = [];
        this.SectionList.forEach(sec => {
            allPeriodslist = allPeriodslist.concat(sec.getPeriods());
        })
        let v = new Set(allPeriodslist);
    
        if (v.size == allPeriodslist.length){
            this.isValid = true;
        }
    }
}

// const c = new Course("math101");

// let s = new Section(1);
// s.PeriodsList.push(101, 102);
// let s2 = new Section(2);
// s2.PeriodsList.push(201, 202);

// c.addSection(s);
// c.addSection(s2);


// const b = new Course("arab101");

// s = new Section(1);
// s.PeriodsList.push(101, 102);
// s2 = new Section(2);
// s2.PeriodsList.push(201, 202);

// b.addSection(s);
// b.addSection(s2);

// const CoursesList = [c, b];

// console.log(CoursesList);

// var arr2d = [];
// CoursesList.forEach(e => {
//     arr2d.push(e.SectionList);
// })
// console.log(arr2d);
// let listofScheduleHelpers = [];

const combos = function combos(list, ListSch, n = 0, result = [], current = []){
;
    if (n === list.length)
    {
        let a = new ScheduleHelper(current); 
        ListSch.push(a);
    }
    else 
    {
        list[n].forEach(item => combos(list, ListSch, n+1, result, [...current, item]))
    }
        
 
}




// combos(arr2d, listofScheduleHelpers);
// listofScheduleHelpers.forEach(schHelp => {
//    schHelp.checkValidation();
// })

// console.log(listofScheduleHelpers);


module.exports = {Course, Section, ScheduleHelper, combos};